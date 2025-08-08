// This is a server-side file, marked with `'use server'`.
'use server';

/**
 * @fileOverview Disaster detection AI agent.
 *
 * - detectDisasterFromDataSources - A function that detects potential disasters from various data sources.
 * - DetectDisasterInput - The input type for the detectDisasterFromDataSources function.
 * - DetectDisasterOutput - The return type for the detectDisasterFromDataSources function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectDisasterInputSchema = z.object({
  apiData: z.string().describe('Data fetched from official APIs (e.g., IMD, NDMA, USGS).'),
  socialMediaData: z.string().describe('Data fetched from social media (e.g., Twitter/X).'),
  userReports: z.string().describe('Data from user reports.'),
});
export type DetectDisasterInput = z.infer<typeof DetectDisasterInputSchema>;

const DetectDisasterOutputSchema = z.object({
  isDisasterDetected: z.boolean().describe('Whether a disaster is detected or not.'),
  disasterType: z.string().describe('The type of disaster detected.'),
  location: z.string().describe('The location of the disaster.'),
  severity: z.string().describe('The severity of the disaster (e.g., low, medium, high).'),
  confidenceScore: z.number().describe('Confidence score (0-1) of the disaster detection.'),
});
export type DetectDisasterOutput = z.infer<typeof DetectDisasterOutputSchema>;

export async function detectDisasterFromDataSources(input: DetectDisasterInput): Promise<DetectDisasterOutput> {
  return detectDisasterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectDisasterPrompt',
  input: {schema: DetectDisasterInputSchema},
  output: {schema: DetectDisasterOutputSchema},
  prompt: `You are an AI-powered disaster detection system. Analyze the provided data from various sources to identify potential disasters.

  Consider the following information:
  - Official API Data: {{{apiData}}}
  - Social Media Data: {{{socialMediaData}}}
  - User Reports: {{{userReports}}}

  Based on this information, determine if a disaster is occurring. If so, identify the disaster type, location, severity, and a confidence score.
  Output the information in JSON format according to the schema.  If you are unsure, set isDisasterDetected to false.
  Be sure to filter out fake alerts and rumors.  Use NLP to determine the relevance of social media posts.
  `,
});

const detectDisasterFlow = ai.defineFlow(
  {
    name: 'detectDisasterFlow',
    inputSchema: DetectDisasterInputSchema,
    outputSchema: DetectDisasterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
