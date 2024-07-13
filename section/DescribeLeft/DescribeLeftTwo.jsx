import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { usecolor } from "@/lib/store";
import React from "react";

const colorList = [
  { text: "White", value: "1", bg: "#f9f9f9", color: "#000000" },
  { text: "Green", value: "2", bg: "#9DDE8B", color: "#006769" },
  { text: "Blue", value: "3", bg: "#DBE2EF", color: "#3F72AF" },
  { text: "Red", value: "4", bg: "#F67280", color: "#355C7D" },
  { text: "Purple", value: "5", bg: "#DCD6F7", color: "#424874" },
];

const DescribeLeftTwo = () => {
  const color = usecolor(state => state.color); // Fetch current color
  const updatecolor = usecolor(state => state.updatecolor); // Function to update color

  const handleValueChange = (newValue) => {
    updatecolor(newValue); // Update color using the new value
  };

  return (
    <section className="w-full h-full flex flex-col gap-3 p-3">
      <h3 className="scroll-m-20 border-b pb-2 mb-3 text-3xl font-semibold tracking-tight">
        Select a Color Palette for the Video
      </h3>
      <RadioGroup
        className="flex flex-col w-full h-full"
        onValueChange={handleValueChange}
        defaultValue={color}
      >
        {colorList.map((list, index) => (
         <Label
         key={index}
         htmlFor={list.value}
         style={{ backgroundColor: list.bg, color: list.color }}
         className="flex items-center space-x-2 rounded-lg h-full px-10"
       >
            <RadioGroupItem value={list.value} id={list.value} />
            <span className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight">
              {list.text}
            </span>
          </Label>
        ))}
      </RadioGroup>
    </section>
  );
};

export default DescribeLeftTwo;
