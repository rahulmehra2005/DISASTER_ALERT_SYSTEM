import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const firstAidTopics = [
  {
    title: "Treating Burns",
    steps: [
      "Cool the burn. Hold the burned area under cool (not cold) running water for 10 to 15 minutes.",
      "Remove rings or other tight items from the burned area. Try to do this quickly and gently, before the area swells.",
      "Don't break blisters. Fluid-filled blisters protect against infection.",
      "Apply lotion. Once a burn is completely cooled, apply a lotion, such as one with aloe vera or cocoa butter.",
      "Bandage the burn. Cover the burn with a sterile gauze bandage (not fluffy cotton).",
    ],
  },
  {
    title: "Managing Fractures",
    steps: [
        "Stop any bleeding. Apply pressure to the wound with a sterile bandage, a clean cloth or a clean piece of clothing.",
        "Immobilize the injured area. Don't try to realign the bone or push a bone that's sticking out back in.",
        "Apply ice packs to limit swelling and help relieve pain. Don't apply ice directly to the skin.",
        "Treat for shock. If the person feels faint or is breathing in short, rapid breaths, lay the person down with the head slightly lower than the trunk and, if possible, elevate the legs."
    ]
  },
  {
    title: "Controlling Bleeding",
    steps: [
        "Apply direct pressure on the cut or wound with a clean cloth, tissue, or piece of gauze.",
        "Maintain pressure by binding the wound tightly with a bandage or a piece of clean cloth.",
        "If the wound is on the arm or leg, raise the limb above the heart, if possible, to help slow bleeding.",
        "Do not remove the cloth if it becomes soaked with blood. Put a new cloth on top of the old one and continue to apply pressure.",
    ]
  }
];

export function FirstAidGuide() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>First Aid Guide</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {firstAidTopics.map((topic) => (
            <AccordionItem key={topic.title} value={topic.title}>
              <AccordionTrigger>{topic.title}</AccordionTrigger>
              <AccordionContent>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    {topic.steps.map((step, index) => <li key={index}>{step}</li>)}
                </ol>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
