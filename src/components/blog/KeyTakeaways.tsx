import { Lightbulb } from "lucide-react";

interface KeyTakeawaysProps {
  takeaways: string[];
}

export default function KeyTakeaways({ takeaways }: KeyTakeawaysProps) {
  if (!takeaways || takeaways.length === 0) {
    return null;
  }

  return (
    <div className="not-prose bg-background-secondary rounded-[16px] p-6 my-8 border border-border-primary">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-8 h-8 bg-accent-blue-main rounded-full">
          <Lightbulb className="w-4 h-4 text-system-grey100" />
        </div>
        <h3 className="text-headline text-label-primary">
          Puntos clave
        </h3>
      </div>

      {/* Bullet List */}
      <ul className="space-y-3">
        {takeaways.map((takeaway, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-subheadline text-label-secondary"
          >
            <span className="flex-shrink-0 w-1.5 h-1.5 bg-accent-blue-main rounded-full mt-2" />
            <span>{takeaway}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
