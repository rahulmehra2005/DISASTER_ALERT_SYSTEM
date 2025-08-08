'use server';
/**
 * @fileOverview Summarizes disaster reports to provide a quick understanding of the situation.
 *
 * - summarizeDisasterReports - A function that summarizes disaster reports.
 * - SummarizeDisasterReportsInput - The input type for the summarizeDisasterReports function.
 * - SummarizeDisasterReportsOutput - The return type for the summarizeDisasterReports function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeDisasterReportsInputSchema = z.object({
  reports: z.array(z.string()).describe('An array of disaster reports.'),
});
export type SummarizeDisasterReportsInput = z.infer<typeof SummarizeDisasterReportsInputSchema>;

const SummarizeDisasterReportsOutputSchema = z.object({
  summary: z.string().describe('A summarized report of the disaster including type and severity.'),
});
export type SummarizeDisasterReportsOutput = z.infer<typeof SummarizeDisasterReportsOutputSchema>;

export async function summarizeDisasterReports(input: SummarizeDisasterReportsInput): Promise<SummarizeDisasterReportsOutput> {
  return summarizeDisasterReportsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeDisasterReportsPrompt',
  input: {schema: SummarizeDisasterReportsInputSchema},
  output: {schema: SummarizeDisasterReportsOutputSchema},
  prompt: `You are an expert in summarizing disaster reports. Your goal is to provide a concise and informative summary of the disaster, including its type and severity. Use the following reports to generate the summary:\n\n{%#each reports%}\n- {{{this}}}{% endeach %}\n\nSummary: `,
});

const summarizeDisasterReportsFlow = ai.defineFlow(
  {
    name: 'summarizeDisasterReportsFlow',
    inputSchema: SummarizeDisasterReportsInputSchema,
    outputSchema: SummarizeDisasterReportsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
