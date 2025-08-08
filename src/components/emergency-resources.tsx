import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ambulance, BedDouble, Building, HeartPulse, Phone, Shield } from "lucide-react";

const resources = [
  { name: "City General Hospital", type: "Hospital", icon: HeartPulse, distance: "2.5 km" },
  { name: "Community Shelter", type: "Relief Camp", icon: Building, distance: "3.1 km" },
  { name: "Downtown Medical Center", type: "Hospital", icon: HeartPulse, distance: "4.8 km" },
  { name: "Red Cross Camp", type: "Relief Camp", icon: Building, distance: "5.2 km" },
];

export function EmergencyResources() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Emergency Resources</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="mb-2 text-sm font-medium text-muted-foreground">One-Tap SOS</h3>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="destructive" size="lg" className="h-20 flex-col gap-1">
              <Ambulance className="h-8 w-8" />
              <span>Medical</span>
            </Button>
            <Button variant="secondary" size="lg" className="h-20 flex-col gap-1">
              <Shield className="h-8 w-8" />
              <span>Rescue</span>
            </Button>
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium text-muted-foreground">Nearby Resources</h3>
          <div className="space-y-3">
            {resources.map((resource) => (
              <div key={resource.name} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <resource.icon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">{resource.name}</p>
                    <p className="text-xs text-muted-foreground">{resource.type}</p>
                  </div>
                </div>
                <span className="text-sm font-medium">{resource.distance}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
