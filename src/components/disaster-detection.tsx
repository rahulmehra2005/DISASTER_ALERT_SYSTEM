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
import { handleDetectDisaster } from "@/app/actions";
import type { DetectDisasterInput, DetectDisasterOutput } from "@/ai/flows/detect-disaster";
import { AlertTriangle, BarChart, ChevronsRight, Loader2, MapPin, BadgePercent } from "lucide-react";
import { Progress } from "./ui/progress";

const formSchema = z.object({
  apiData: z.string().min(10, { message: "Please provide more detailed API data." }),
  socialMediaData: z.string().min(10, { message: "Please provide more detailed social media data." }),
  userReports: z.string().min(10, { message: "Please provide more detailed user reports." }),
});

export function DisasterDetection() {
  const [result, setResult] = useState<DetectDisasterOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiData: "USGS: 6.8 magnitude earthquake near New Madrid, Missouri.",
      socialMediaData: "Twitter: #earthquake felt in St. Louis. Buildings are shaking!",
      userReports: "User from Memphis, TN: 'My whole house just shook violently for about 20 seconds.'",
    },
  });

  const onSubmit: SubmitHandler<DetectDisasterInput> = async (data) => {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await handleDetectDisaster(data);
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
        <CardTitle>AI-Powered Disaster Analysis</CardTitle>
        <CardDescription>Input data from various sources to detect potential disasters using GenAI.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField control={form.control} name="apiData" render={({ field }) => (
                    <FormItem><FormLabel>Official API Data</FormLabel><FormControl><Textarea placeholder="e.g., IMD, NDMA, USGS data" {...field} rows={4} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="socialMediaData" render={({ field }) => (
                    <FormItem><FormLabel>Social Media Feeds</FormLabel><FormControl><Textarea placeholder="e.g., Twitter/X, Instagram posts" {...field} rows={4} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="userReports" render={({ field }) => (
                    <FormItem><FormLabel>User Reports</FormLabel><FormControl><Textarea placeholder="e.g., Text messages, direct reports" {...field} rows={4} /></FormControl><FormMessage /></FormItem>
                )} />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</> : "Detect Disaster"}
            </Button>
          </form>
        </Form>

        {result && (
          <Card className="mt-6 border-accent">
            <CardHeader>
              <CardTitle>Analysis Result</CardTitle>
            </CardHeader>
            <CardContent>
              {result.isDisasterDetected ? (
                <div className="space-y-4">
                    <div className="flex items-center text-lg font-medium">
                        <AlertTriangle className="mr-2 h-6 w-6 text-destructive" /> Disaster Detected
                    </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center"><ChevronsRight className="mr-2 h-4 w-4 text-primary" /><strong>Type:</strong><span className="ml-2">{result.disasterType}</span></div>
                    <div className="flex items-center"><MapPin className="mr-2 h-4 w-4 text-primary" /><strong>Location:</strong><span className="ml-2">{result.location}</span></div>
                    <div className="flex items-center"><BarChart className="mr-2 h-4 w-4 text-primary" /><strong>Severity:</strong><span className="ml-2">{result.severity}</span></div>
                    <div className="flex items-center"><BadgePercent className="mr-2 h-4 w-4 text-primary" /><strong>Confidence:</strong><span className="ml-2">{(result.confidenceScore * 100).toFixed(0)}%</span></div>
                  </div>
                  <Progress value={result.confidenceScore * 100} className="w-full" />
                </div>
              ) : (
                <p className="text-muted-foreground">No disaster detected based on the provided data.</p>
              )}
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
