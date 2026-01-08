import { calculatePremium } from './pricing';

describe('Pricing Engine', () => {

    test('should apply standard risk loading for USD loans', () => {
        const input = {
            expectedLoss: 100,
            loanAmount: 1000,
            currency: 'USD' as const
        };

        const result = calculatePremium(input);

        // Expected:
        // Tech Premium = 100 + (100 * 0.10) = 110
        // Ops Cost = 1000 * 0.05 = 50
        // Inflation (USD) = 1000 * 0.01 = 10
        // Total = 170
        expect(result.premium).toBe(170);
        expect(result.currency).toBe('USD');
    });

    test('should apply HIGH inflation buffer for NGN loans', () => {
        const input = {
            expectedLoss: 100,
            loanAmount: 1000,
            currency: 'NGN' as const
        };

        const result = calculatePremium(input);

        // Expected:
        // Tech Premium = 110
        // Ops Cost = 50
        // Inflation (NGN 15%) = 1000 * 0.15 = 150
        // Total = 310 (Much higher than USD)
        expect(result.premium).toBe(310);
    });

});
