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

    const query = req.query as any;
    const regulator = query.regulator || 'BOG';
    const end_date = query.end_date ? new Date(query.end_date) : new Date();
    const start_date = query.start_date ? new Date(query.start_date) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days ago

    try {
        const report = await complianceService.generateReport(
            regulator,
            start_date,
            end_date
        );

        return res.json(report);
    } catch (error) {
        logger.error('Compliance Report Error', error);
        return res.status(500).json({ error: 'Report generation failed' });
    }
};
