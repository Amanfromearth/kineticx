"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { time, words } from "@/lib/constants";
import { joinWords } from "@/lib/joinwords";
import MyComp from "@/remotion/Composition";
import { Player } from "@remotion/player";
import { useRef, useState } from "react";

const times = time();
const numWords = words();

const Home = () => {
  const [value, setValue] = useState("Anurag");
  const [data, setData] = useState([]);
  const [durationInFrames, setDurationInFrames] = useState(1680);
  const [loading, setLoading] = useState(false);
  const playerRef = useRef(null);

  const calculateDuration = (textList) => {
    const totalSeconds = textList.reduce((acc, _, i) => acc + (times[i] || 0), 0);
    setDurationInFrames(Math.floor(totalSeconds * 60)); // Assuming 60 fps as a standard.
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData: value })
      });
      if (!response.ok) throw new Error("Network response was not ok");

      const dataFromAPI = await response.json();
      const textList = await joinWords(numWords, dataFromAPI);
      calculateDuration(textList);
      setData(dataFromAPI);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setValue(e.target.value);

  return (
    <section className="w-full min-h-screen pt-12 overflow-y bg-neutral-950 flex flex-col items-center justify-center">
      <h1 className="text-white text-6xl">Idea to video</h1>
      <div className="w-full flex flex-col md:flex-row items-center justify-center">
        <Card className="bg-neutral-900 text-white m-4 p-4">
          <CardContent>
            <Label htmlFor="name">Describe</Label>
            <Input id="name" value={value} onChange={handleChange} className="bg-neutral-800 m-2 text-white text-lg" />
            <Button onClick={handleSubmit} className="bg-purple-700 m-2 hover:bg-purple-600">
              {loading ? "Loading..." : "Generate"}
            </Button>
          </CardContent>
        </Card>
        {data.length > 0 && (
          <div className=" w-full md:w-1/2 h-full flex items-center justify-center">
          <div className="w-full flex items-center justify-center">
          <Player
            ref={playerRef}
            component={MyComp}
            inputProps={{ list: data }}
            durationInFrames={durationInFrames}
            compositionWidth={1920}
            compositionHeight={1080}
            fps={60}
            style={{ maxWidth: "100%", maxHeight: "40.25vw" }}
            controls
          /></div></div>
        )}
      </div>
    </section>
  );
};

export default Home;
