/**
 * Insurance Pricing Logic
 * Premium = Expected Loss + Risk Loading + Operational Margin + [Inflation Buffer]
 */

export interface PricingInput {
    expectedLoss: number;
    loanAmount: number;
    currency: 'GHS' | 'NGN' | 'KES' | 'USD';
}

export interface PricingOutput {
    premium: number;
    rate: number; // premium as % of loan
    currency: string;
    breakdown: any;
}

const BASE_RISK_LOADING = 0.10;
const OPS_MARGIN = 0.05;

// Volatility buffer for diverse currencies
const FX_VOLATILITY_BUFFER: Record<string, number> = {
    'GHS': 0.12, // 12% buffer for inflation/depreciation
    'NGN': 0.15,
    'KES': 0.08,
    'USD': 0.01
};

export function calculatePremium(input: PricingInput): PricingOutput {
    const fxBuffer = FX_VOLATILITY_BUFFER[input.currency] || 0.10;

    const riskLoading = input.expectedLoss * BASE_RISK_LOADING;
    const operationalCost = input.loanAmount * OPS_MARGIN;
    const inflationAdjustment = input.loanAmount * fxBuffer;

    const technicalPremium = input.expectedLoss + riskLoading;
    const finalPremium = technicalPremium + operationalCost + inflationAdjustment;

    return {
        premium: +finalPremium.toFixed(2),
        rate: +(finalPremium / input.loanAmount).toFixed(4),
        currency: input.currency,
        breakdown: {
            technicalPremium,
            operationalCost,
            inflationAdjustment
        }
    };
}
