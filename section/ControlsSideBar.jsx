import { Brush, ImagePlus, Layers, Music } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

const items = [
    { icon: Layers, text: "Frame" },
    { icon: Brush, text: "Color" },
    { icon: ImagePlus, text: "Background" },
    { icon: Music, text: "Audio" },
    
];

const ControlsSideBar = ({ setPanel, panel }) => {
  return (
    <TooltipProvider>
      <div className="hidden md:flex flex-col bg-slate-50 border-r border-slate-300">
        {items.map((item, index) => {
          const isActive = panel === index + 1;
          const color = isActive ? "blue" : "slate";
          return (
            <Tooltip key={index}>
              <TooltipTrigger onClick={() => setPanel(index + 1)} className={`flex flex-col items-center justify-center bg-${color}-100 m-2 rounded-lg shadow gap-1 p-2 px-2`}>
                <item.icon className={`text-${color}-400 w-4`} />
                <p className={`text-xs text-${color}-400`}>{item.text}</p>
              </TooltipTrigger>
              <TooltipContent side="right">{item.text}</TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
};

export default ControlsSideBar;
