import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Bell, Info, ShieldAlert, Siren } from "lucide-react";

const alerts = [
    { title: "Earthquake Warning", location: "New Madrid, MO", severity: "High", icon: Siren, color: "bg-red-500" },
    { title: "Flood Watch", location: "Memphis, TN", severity: "Medium", icon: AlertTriangle, color: "bg-yellow-500" },
    { title: "High Wind Advisory", location: "St. Louis, MO", severity: "Low", icon: Info, color: "bg-green-500" },
];

export function RealTimeAlerts() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Real-Time Alerts</CardTitle>
                <CardDescription>Live updates on developing situations.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {alerts.map((alert) => (
                        <div key={alert.title} className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                            <alert.icon className={`h-6 w-6 shrink-0 mt-1 ${alert.color.replace('bg-', 'text-')}`} />
                            <div className="flex-grow">
                                <p className="font-semibold">{alert.title}</p>
                                <p className="text-sm text-muted-foreground">{alert.location}</p>
                            </div>
                            <Badge variant={alert.severity === 'High' ? 'destructive' : alert.severity === 'Medium' ? 'default' : 'secondary'} className={alert.severity === 'Medium' ? 'bg-accent text-accent-foreground' : ''}>
                                {alert.severity}
                            </Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
