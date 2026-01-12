/**
 * KOK Risk - Actuarial Formulas
 * v1.0
 */

export const Weights = {
    CREDIT_HISTORY: 0.30,
    AFFORDABILITY: 0.40,
    ALTERNATIVE_DATA: 0.30
};

export function normalizeScore(rawScore: number, min: number, max: number): number {
    // Normalize to 0-100 scale
    return Math.min(100, Math.max(0, ((rawScore - min) / (max - min)) * 100));
}

export function calculateProbabilityOfDefault(score: number): number {
    // Logistic Regression Curve Approximation
    // Score 0   -> PD 99%
    // Score 500 -> PD 20%
    // Score 850 -> PD 2%
    // PD = 1 / (1 + e^((score - midpoint) / steepness))

    const midpoint = 400; // Score where PD is 50% (shifted for higher risk population)
    const steepness = 120;

    // Inverted because Higher Score = Lower Risk
    const logit = (score - midpoint) / steepness;
    const pd = 1 - (1 / (1 + Math.exp(-logit)));

    return parseFloat(pd.toFixed(4));
}

export function calculateRiskGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
    if (score >= 800) return 'A';
    if (score >= 700) return 'B';
    if (score >= 600) return 'C';
    if (score >= 500) return 'D';
    return 'F';
}
