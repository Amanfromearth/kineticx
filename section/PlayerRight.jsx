"use client";
import { usedata, useframe } from "@/lib/store";
import MyComp from "@/remotion/Composition";
import { Player } from "@remotion/player";
import { useState, useEffect, useRef } from "react";

const PlayerRight = () => {
  const data = usedata((state) => state.data);
  const frame = useframe((state) => state.frame);
  const [showReady, setShowReady] = useState(false);
  const prevDataRef = useRef();

  const isInitialData = (data) => {
    return (
      data.length === 39 &&
      data[0].text === "Embrace the lush" &&
      data[data.length - 1].text === "our responsibility"
    );
  };

  useEffect(() => {
    if (
      data.length > 0 &&
      !isInitialData(data) &&
      JSON.stringify(data) !== JSON.stringify(prevDataRef.current)
    ) {
      setShowReady(true);
      const timer = setTimeout(() => {
        setShowReady(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
    prevDataRef.current = data;
  }, [data]);

  if (showReady) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
        <div className="text-2xl font-bold text-blue-600">
          Video Ready to Play
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-3 md:p-10">
      <div className="w-full relative h-44 md:h-full">
        <Player
          className="border-slate-300 bg-white rounded-lg border"
          component={MyComp}
          inputProps={{ textList: data }}
          durationInFrames={frame}
          compositionWidth={1920}
          compositionHeight={1080}
          fps={60}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          controls
        />
      </div>
      <div className="w-full mt-2 text-slate-500 text-sm text-center">
        Frame 4/60
      </div>
    </div>
  );
};

export default PlayerRight;
