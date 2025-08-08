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
import { handleFilterAlerts } from "@/app/actions";
import type { FilterFakeDisasterAlertsInput, FilterFakeDisasterAlertsOutput } from "@/ai/flows/filter-fake-alerts";
import { Loader2, ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";
import { Badge } from "./ui/badge";

const formSchema = z.object({
  alertText: z.string().min(10, { message: "Please provide a more detailed alert text." }),
});

export function FilterAlerts() {
  const [result, setResult] = useState<FilterFakeDisasterAlertsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      alertText: "URGENT!! Massive tsunami wave heading for the coast, everyone evacuate immediately! The government is hiding this! Share to save lives!!!",
    },
  });

  const onSubmit: SubmitHandler<FilterFakeDisasterAlertsInput> = async (data) => {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await handleFilterAlerts(data);
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
        <CardTitle>Fake Alert Filter</CardTitle>
        <CardDescription>Analyze disaster alerts to filter out potential misinformation and fake news.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField control={form.control} name="alertText" render={({ field }) => (
              <FormItem><FormLabel>Alert Text</FormLabel><FormControl><Textarea placeholder="Paste the alert text here..." {...field} rows={6} /></FormControl><FormMessage /></FormItem>
            )} />
            <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Filtering...</> : "Filter Alert"}
            </Button>
          </form>
        </Form>

        {result && (
          <Card className="mt-6 border-accent">
            <CardHeader className="flex-row items-center gap-4 space-y-0">
                {result.isFake ? <ShieldAlert className="h-10 w-10 text-destructive" /> : <ShieldCheck className="h-10 w-10 text-green-500" />}
                <div>
                    <CardTitle>
                        {result.isFake ? "Likely Fake Alert" : "Likely Authentic Alert"}
                    </CardTitle>
                    <CardDescription>Confidence: {(result.confidence * 100).toFixed(0)}%</CardDescription>
                </div>
            </CardHeader>
            {result.isFake && result.reason && (
                <CardContent>
                    <p className="font-semibold">Reason:</p>
                    <p className="text-muted-foreground">{result.reason}</p>
                </CardContent>
            )}
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
