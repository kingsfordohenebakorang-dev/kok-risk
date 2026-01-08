import { Request, Response } from 'express';

export const explainDecision = async (req: Request, res: Response) => {
    const { decision_id } = req.query;

    if (!decision_id) {
        return res.status(400).json({ error: 'Missing decision_id' });
    }

    // In a real system, query PostgreSQL Audit Vault for this decision ID
    // Mock response:
    return res.json({
        decision_id,
        timestamp: new Date().toISOString(),
        outcome: 'REJECTED',
        factors: [
            { factor: 'inflow_volatility', value: 'High', impact: 'Negative' },
            { factor: 'credit_score', value: 'Low', impact: 'Negative' }
        ],
        explanation: 'The loan application was rejected significantly due to high volatility in monthly inflows.'
    });
};
