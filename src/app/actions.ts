"use server";

import { detectDisasterFromDataSources, DetectDisasterInput, DetectDisasterOutput } from "@/ai/flows/detect-disaster";
import { filterFakeDisasterAlerts, FilterFakeDisasterAlertsInput, FilterFakeDisasterAlertsOutput } from "@/ai/flows/filter-fake-alerts";
import { summarizeDisasterReports, SummarizeDisasterReportsInput, SummarizeDisasterReportsOutput } from "@/ai/flows/summarize-disaster-reports";
import { z } from "zod";

const detectDisasterSchema = z.object({
  apiData: z.string(),
  socialMediaData: z.string(),
  userReports: z.string(),
});

export async function handleDetectDisaster(input: DetectDisasterInput): Promise<DetectDisasterOutput> {
    const validatedInput = detectDisasterSchema.parse(input);
    try {
        const result = await detectDisasterFromDataSources(validatedInput);
        return result;
    } catch (error) {
        console.error("Error in handleDetectDisaster:", error);
        throw new Error("Failed to detect disaster. Please try again.");
    }
}

const filterAlertsSchema = z.object({
    alertText: z.string().min(1, "Alert text cannot be empty."),
});

export async function handleFilterAlerts(input: FilterFakeDisasterAlertsInput): Promise<FilterFakeDisasterAlertsOutput> {
    const validatedInput = filterAlertsSchema.parse(input);
    try {
        const result = await filterFakeDisasterAlerts(validatedInput);
        return result;
    } catch (error) {
        console.error("Error in handleFilterAlerts:", error);
        throw new Error("Failed to filter alert. Please try again.");
    }
}

const summarizeReportsSchema = z.object({
    reports: z.string().min(1, "Reports cannot be empty."),
});

export async function handleSummarizeReports(input: { reports: string }): Promise<SummarizeDisasterReportsOutput> {
    const validatedInput = summarizeReportsSchema.parse(input);
    try {
        const reportsArray = validatedInput.reports.split('\n').filter(r => r.trim() !== '');
        const result = await summarizeDisasterReports({ reports: reportsArray });
        return result;
    } catch (error) {
        console.error("Error in handleSummarizeReports:", error);
        throw new Error("Failed to summarize reports. Please try again.");
    }
}
