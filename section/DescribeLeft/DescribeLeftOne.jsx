"use client"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState, useCallback } from "react";
import { usedata, useframe } from "@/lib/store";
import { joinWords } from "@/lib/joinwords";
import { time, words } from "@/lib/constants";
import EditableCard from "../EditableCard";

const times = time();
const numOfWords = words();

const DescribeLeftOne = () => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const updateData = usedata(state => state.updateData);
  const updateFrame = useframe(state => state.updateFrame);

  const calculateDuration = useCallback((textList) => {
    const totalSeconds = textList.reduce((acc, _, i) => acc + (times[i] || 0), 0);
    updateFrame(Math.floor(totalSeconds * 60));
  }, [updateFrame]);

  const handleChange = useCallback((e) => setValue(e.target.value), []);

  const handleTemplateChange = useCallback((template) => {
    setValue(
      template === "environment" ? "Make a Video About Environment protection" :
      template === "rcb" ? "Make a Video about RCB winning the match" :
      "Make a video about "
    );
  }, []);

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData: value }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const dataFromAPI = await response.json();
      const textList = joinWords(numOfWords, dataFromAPI);
      calculateDuration(textList);
      updateData(textList);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }, [value, calculateDuration, updateData]);

  return (
    <div className="flex flex-col w-full">
      <fieldset className="grid gap-4 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">Describe</legend>
        <div className="grid gap-3">
          <Label htmlFor="role">Templates</Label>
          <Select onValueChange={handleTemplateChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a Template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="environment">Make a Video About Environment protection</SelectItem>
              <SelectItem value="rcb">Make a Video about RCB winning the match</SelectItem>
              <SelectItem value="other">Other (Describe Below)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="name"
            value={value}
            onChange={handleChange}
            placeholder="Make a video about..."
          />
        </div>
        <div>
          <Button
            onClick={handleSubmit}
            className="bg-blue-600 m-2 hover:bg-blue-500"
          >
            {loading ? "Loading..." : "Generate"}
          </Button>
        </div>
      </fieldset>
      <div className="w-full h-full">
        <EditableCard/>
      </div>
    </div>
  );
};

export default DescribeLeftOne;