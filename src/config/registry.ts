export const ModelRegistry = {
    activeModelId: 'v1.0.0', // Current active model
    shadowModelId: 'v1.1.0-beta', // Shadow mode model

    parameters: {
        minCreditScore: 500,
        insuranceTaxRate: 0.175, // Ghana VAT/Levies approximation
        maxInflowVolatility: 0.50,
    },

    features: {
        enableShadowMode: true,
        enableDegradedMode: true,
    }
};
