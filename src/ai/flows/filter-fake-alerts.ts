'use server';

/**
 * @fileOverview AI flow to filter out fake disaster alerts.
 *
 * - filterFakeDisasterAlerts - A function that filters fake disaster alerts.
 * - FilterFakeDisasterAlertsInput - The input type for the filterFakeDisasterAlerts function.
 * - FilterFakeDisasterAlertsOutput - The return type for the filterFakeDisasterAlerts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FilterFakeDisasterAlertsInputSchema = z.object({
  alertText: z.string().describe('The text content of the disaster alert.'),
});
export type FilterFakeDisasterAlertsInput = z.infer<typeof FilterFakeDisasterAlertsInputSchema>;

const FilterFakeDisasterAlertsOutputSchema = z.object({
  isFake: z.boolean().describe('Whether the disaster alert is likely to be fake.'),
  confidence: z.number().describe('The confidence level (0-1) that the alert is fake.'),
  reason: z.string().optional().describe('The reason why the alert is classified as fake, if applicable.'),
});
export type FilterFakeDisasterAlertsOutput = z.infer<typeof FilterFakeDisasterAlertsOutputSchema>;

export async function filterFakeDisasterAlerts(input: FilterFakeDisasterAlertsInput): Promise<FilterFakeDisasterAlertsOutput> {
  return filterFakeDisasterAlertsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'filterFakeDisasterAlertsPrompt',
  input: {schema: FilterFakeDisasterAlertsInputSchema},
  output: {schema: FilterFakeDisasterAlertsOutputSchema},
  prompt: `You are an expert in identifying fake disaster alerts.

  Given the following disaster alert text, determine if it is likely to be fake.
  Provide a confidence level (0-1) that the alert is fake.
  If the alert is classified as fake, provide a reason why.

  Disaster Alert Text: {{{alertText}}}

  Consider factors such as the source of the alert, the language used, and the presence of sensationalism or misinformation.
  `,
});

const filterFakeDisasterAlertsFlow = ai.defineFlow(
  {
    name: 'filterFakeDisasterAlertsFlow',
    inputSchema: FilterFakeDisasterAlertsInputSchema,
    outputSchema: FilterFakeDisasterAlertsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
