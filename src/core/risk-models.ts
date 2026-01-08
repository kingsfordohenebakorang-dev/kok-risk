/**
 * Actuarial Logic & Calculations
 * Core mathematical models for Credit Risk.
 */

export interface RiskInput {
    creditScore: number;
    inflowVolatility: number; // 0-1 (1 is high volatility)
    loanAmount: number;
    tenor: number; // in months
}

export interface RiskOutput {
    pd: number; // Probability of Default (0-1)
    lgd: number; // Loss Given Default (0-1)
    ead: number; // Exposure at Default
    el: number;  // Expected Loss
}

/**
 * Calculates Expected Loss (EL) = PD * LGD * EAD
 */
export function calculateExpectedLoss(input: RiskInput): RiskOutput {
    const pd = calculatePD(input.creditScore, input.inflowVolatility);
    const lgd = calculateLGD(input.loanAmount); // Simplified LGD
    const ead = input.loanAmount; // Assuming EAD is total loan amount for simplicity of v1

    const el = pd * lgd * ead;

    return { pd, lgd, ead, el };
}

/**
 * Calculates Probability of Default (PD) based on credit score and volatility.
 * Logistic function approximation for demo purposes.
 */
function calculatePD(score: number, volatility: number): number {
    // Higher score -> Lower PD
    // Higher volatility -> Higher PD
    const basePD = 1 / (1 + Math.exp((score - 500) / 100));
    const adjustedPD = basePD * (1 + volatility);

    return Math.min(Math.max(adjustedPD, 0.01), 0.99); // Clamp between 1% and 99%
}

function calculateLGD(amount: number): number {
    // Standard fixed LGD for unsecured lending often around 45-80%
    // Here we use 0.5 (50%) as a baseline
    return 0.50;
}
