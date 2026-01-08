import { Router } from 'express';
import * as IngestController from './controllers/ingest.controller';
import * as EvaluateController from './controllers/evaluate.controller';
import * as ExplainController from './controllers/explain.controller';
import * as SandboxController from './controllers/sandbox.controller';
import * as AuthController from './controllers/auth.controller';
import { authenticate } from './middleware/auth.middleware';

const router = Router();

// Public Routes (Auth)
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

// Gateway: Authentication & Rate Limiting (handled in middleware)
router.use(authenticate);

import * as WebhookController from './controllers/webhook.controller';
import * as ComplianceController from './controllers/compliance.controller';

// ... existing imports

// Core Endpoints
router.post('/ingest', IngestController.ingestData);
router.post('/evaluate', EvaluateController.evaluateRisk);
router.get('/explain', ExplainController.explainDecision);
router.post('/sandbox/reset', SandboxController.resetSandbox);

// Advanced Endpoints (Unicorn Features)
router.post('/webhooks/repayment', WebhookController.handleRepaymentWebhook);
router.get('/compliance/report', ComplianceController.getComplianceReport);

export const apiRoutes = router;
