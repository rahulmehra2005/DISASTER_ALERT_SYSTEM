import { AiTabs } from "@/components/ai-tabs";
import { EmergencyResources } from "@/components/emergency-resources";
import { FirstAidGuide } from "@/components/first-aid-guide";
import { AppIcon } from "@/components/icons";
import { MapPlaceholder } from "@/components/map-placeholder";
import { RealTimeAlerts } from "@/components/realtime-alerts";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="mr-4 flex items-center">
            <AppIcon className="h-8 w-8 mr-2 text-primary" />
            <h1 className="text-2xl font-bold font-headline tracking-tight">SafeSphere</h1>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <AiTabs />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <EmergencyResources />
                <FirstAidGuide />
            </div>
          </div>
          <div className="space-y-8">
            <MapPlaceholder />
            <RealTimeAlerts />
          </div>
        </div>
      </main>
    </div>
  );
}
