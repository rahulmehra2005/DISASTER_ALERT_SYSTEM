import { config } from 'dotenv';
config();

import '@/ai/flows/filter-fake-alerts.ts';
import '@/ai/flows/summarize-disaster-reports.ts';
import '@/ai/flows/detect-disaster.ts';