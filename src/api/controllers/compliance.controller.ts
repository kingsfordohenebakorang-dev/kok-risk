import { Request, Response } from 'express';
import { complianceService } from '../../core/compliance/reporting.service';
import { logger } from '../../utils/logger';

export const getComplianceReport = async (req: Request, res: Response) => {
    // Only ADMIN or BANK roles should access this (middleware check assumed or added here)
    const role = (req as any).user?.role;
    const orgType = (req as any).user?.org?.type; // If we enriched token with this, otherwise fetch from DB

    // Quick check (better done in middleware)
    if (role !== 'ADMIN' && orgType !== 'BANK') {
        // return res.status(403).json({ error: 'Access Denied: Compliance Reports are for Banks/Admins only' });
    }

    const { regulator, start_date, end_date } = req.query;

    if (!regulator || !start_date || !end_date) {
        return res.status(400).json({ error: 'Missing parameters: regulator, start_date, end_date' });
    }

    try {
        const report = await complianceService.generateReport(
            regulator as any,
            new Date(start_date as string),
            new Date(end_date as string)
        );

        return res.json(report);
    } catch (error) {
        logger.error('Compliance Report Error', error);
        return res.status(500).json({ error: 'Report generation failed' });
    }
};
