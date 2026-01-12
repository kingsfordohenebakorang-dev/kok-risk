import { AffordabilityModule } from './modules/affordability.module';
import { AlternativeDataModule } from './modules/alternative-data.module';
import { calculateProbabilityOfDefault, calculateRiskGrade, Weights } from './formulas';

export interface RiskEngineInput {
    borrowerId: string;
    amount: number;
    tenor: number;
    income: number;
    employmentType: 'SALARIED' | 'SME' | 'GIG' | 'INFORMAL';
    bureauScore?: number; // Optional Bureau Score
}

export interface RiskEngineOutput {
    score: number;
    grade: string;
    pd: number;
    approved: boolean;
    breakdown: any;
}

export class RiskEngineOrchestrator {
    private affordability = new AffordabilityModule();
    private altData = new AlternativeDataModule();

    public async evaluate(input: RiskEngineInput): Promise<RiskEngineOutput> {

        // 1. Run Modules
        const affordResult = this.affordability.evaluate({
            monthlyIncome: input.income,
            loanAmount: input.amount,
            tenorDays: input.tenor
        });

        const altResult = this.altData.evaluate({
            employmentType: input.employmentType
        });

        const bureauScore = input.bureauScore || 600; // Default if no bureau

        // 2. Aggregate Score
        // Formula: (Bureau * 0.3) + (Affordability * 0.4) + (AltData * 0.3)
        const weightedScore =
            (bureauScore * Weights.CREDIT_HISTORY / 8.50) + // Normalize 850 base to 100 roughly
            (affordResult.score * Weights.AFFORDABILITY) +
            (altResult.score * Weights.ALTERNATIVE_DATA);

        // Scale back up to 0-850 range for display familiar to banks? 
        // Or keep 0-100. Let's stick to 0-100 for internal Logic, but mapped to 850 if needed.
        // Let's use 0-100 internal score.

        const finalScore = Math.floor(weightedScore);

        // 3. Calculate Derived Metrics
        const pd = calculateProbabilityOfDefault(finalScore * 8.5); // scaling 100 -> 850 for formula
        const grade = calculateRiskGrade(finalScore * 8.5);

        // 4. Decision Rule
        // Approve if Score > 50 AND DTI < 60%
        const isAffordable = affordResult.dti <= 0.60;
        const isScorePassing = finalScore > 50;
        const approved = isAffordable && isScorePassing;

        return {
            score: finalScore,
            grade,
            pd,
            approved,
            breakdown: {
                affordability: affordResult,
                altData: altResult,
                bureau: bureauScore
            }
        };
    }
}

export const riskEngine = new RiskEngineOrchestrator();
