"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DisasterDetection } from "@/components/disaster-detection";
import { FilterAlerts } from "@/components/filter-alerts";
import { SummarizeReports } from "@/components/summarize-reports";
import { BarChartIcon, ShieldCheckIcon, TextIcon } from "lucide-react";

export function AiTabs() {
  return (
    <Tabs defaultValue="detection" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="detection">
          <BarChartIcon className="mr-2 h-4 w-4" />
          Disaster Detection
        </TabsTrigger>
        <TabsTrigger value="filter">
          <ShieldCheckIcon className="mr-2 h-4 w-4" />
          Fake Alert Filter
        </TabsTrigger>
        <TabsTrigger value="summarize">
          <TextIcon className="mr-2 h-4 w-4" />
          Report Summarizer
        </TabsTrigger>
      </TabsList>
      <TabsContent value="detection">
        <DisasterDetection />
      </TabsContent>
      <TabsContent value="filter">
        <FilterAlerts />
      </TabsContent>
      <TabsContent value="summarize">
        <SummarizeReports />
      </TabsContent>
    </Tabs>
  );
}
