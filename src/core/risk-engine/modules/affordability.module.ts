/**
 * Affordability Module
 * Analyzes Debt-to-Income (DTI) and Disposable Income
 */

export interface AffordabilityInput {
    monthlyIncome: number;
    loanAmount: number;
    tenorDays: number;
}

export class AffordabilityModule {
    evaluate(input: AffordabilityInput): { score: number; dti: number } {
        if (!input.monthlyIncome || input.monthlyIncome <= 0) return { score: 0, dti: 1.0 };

        // 1. Calculate Monthly Installment
        // Approximate interest included (e.g., 5% flat per month for calculation)
        const tenorMonths = Math.max(input.tenorDays / 30, 1);
        const principlePerMonth = input.loanAmount / tenorMonths;
        const interestPerMonth = input.loanAmount * 0.05;
        const installment = principlePerMonth + interestPerMonth;

        // 2. Calculate DTI
        const dti = installment / input.monthlyIncome;

        // 3. Score Mapping
        // DTI < 30% -> Perfect (100)
        // DTI > 60% -> Fail (0)
        let score = 0;
        if (dti <= 0.30) score = 100;
        else if (dti <= 0.40) score = 85;
        else if (dti <= 0.50) score = 60;
        else if (dti <= 0.60) score = 40;
        else score = 0;

        return { score, dti };
    }
}
