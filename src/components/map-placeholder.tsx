import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map, Pin } from "lucide-react";

export function MapPlaceholder() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Affected Areas</CardTitle>
        <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded-full bg-red-500/70"></div>High</div>
            <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded-full bg-yellow-500/70"></div>Medium</div>
            <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded-full bg-green-500/70"></div>Low</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-video w-full rounded-lg overflow-hidden border">
          <Image
            src="https://placehold.co/800x450.png"
            alt="Map of affected areas"
            layout="fill"
            objectFit="cover"
            data-ai-hint="satellite map"
          />
          <div className="absolute inset-0 bg-black/20">
            <div className="absolute top-[30%] left-[40%] h-24 w-24 rounded-full bg-red-500/50 animate-pulse"></div>
            <div className="absolute top-[50%] left-[55%] h-20 w-20 rounded-full bg-yellow-500/50 animate-pulse delay-200"></div>
            <div className="absolute top-[25%] left-[65%] h-16 w-16 rounded-full bg-green-500/50 animate-pulse delay-500"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
