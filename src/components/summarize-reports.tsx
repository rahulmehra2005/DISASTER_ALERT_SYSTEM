"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { handleSummarizeReports } from "@/app/actions";
import type { SummarizeDisasterReportsOutput } from "@/ai/flows/summarize-disaster-reports";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  reports: z.string().min(20, { message: "Please provide more detailed reports." }),
});

export function SummarizeReports() {
  const [result, setResult] = useState<SummarizeDisasterReportsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reports: "Report 1: A powerful cyclone, named 'Sagar', is expected to make landfall on the eastern coast tomorrow evening. Wind speeds could reach up to 150 km/h.\nReport 2: Local authorities have issued evacuation orders for all coastal villages in the path of Cyclone Sagar. Heavy rainfall is predicted.\nReport 3: The national disaster response force has been deployed to the affected regions. Fishermen are advised not to venture into the sea.",
    },
  });

  const onSubmit: SubmitHandler<{reports: string}> = async (data) => {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await handleSummarizeReports(data);
      setResult(response);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Summarizer</CardTitle>
        <CardDescription>Consolidate multiple disaster reports into a single, easy-to-read summary.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField control={form.control} name="reports" render={({ field }) => (
              <FormItem><FormLabel>Disaster Reports (one per line)</FormLabel><FormControl><Textarea placeholder="Paste reports here..." {...field} rows={8} /></FormControl><FormMessage /></FormItem>
            )} />
            <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Summarizing...</> : "Summarize Reports"}
            </Button>
          </form>
        </Form>

        {result && (
          <Card className="mt-6 border-accent">
            <CardHeader>
                <CardTitle>AI Generated Summary</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{result.summary}</p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
