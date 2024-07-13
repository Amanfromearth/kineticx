"use client";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import { time } from "@/lib/constants";
import TextOne from "./textone";
import TextMultiple from "./textmultiple";
import { usecolor } from "@/lib/store";

const colorPalettes = [
  ["#ffffff", "#ffffff", "#000000", "#000000"],
  ["E6FF94", "9DDE8B", "40A578", "006769"],
  ["F9F7F7", "DBE2EF", "3F72AF", "112D4E"],
  ["F67280", "C06C84", "6C5B7B", "355C7D"],
  ["F4EEFF", "DCD6F7", "A6B1E1", "424874"],
];

const MyComp = ({ textList }) => {
  const color = usecolor((state) => state.color);
  const colorPalette = colorPalettes[Number(color)-1];
  const { fps } = useVideoConfig();
  const frameLengthInSeconds = time();
  const frameDurations = frameLengthInSeconds.map((seconds) =>
    Math.floor(seconds * fps)
  );
  const startFrames = frameDurations.reduce((acc, current, index) => {
    const lastFrame =
      index > 0 ? acc[index - 1] + frameDurations[index - 1] : 0;
    acc.push(lastFrame);
    return acc;
  }, []);

  // Function to determine background and text color based on frame index
  const getColorScheme = (index) => {
    const isLightBg = index % 2 === 0; // Alternate color scheme for each frame
    const bgColor = isLightBg
      ? `#${colorPalette[index % 2]}`
      : `#${colorPalette[2 + (index % 2)]}`;
    const textColor = isLightBg
      ? `#${colorPalette[2 + (index % 2)]}`
      : `#${colorPalette[index % 2]}`;
    return { bgColor, textColor };
  };

  return (
    <AbsoluteFill>
      {textList.map((text, index) => {
        const { bgColor, textColor } = getColorScheme(index);
        return (
          <Sequence
            key={index}
            from={startFrames[index]}
            durationInFrames={frameDurations[index]}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                backgroundColor: bgColor,
                color: textColor,
              }}
            >
              {text.num === 1 ? (
                <TextOne textcolor={textColor}>{text.text}</TextOne>
              ) : (
                <TextMultiple
                  textcolor={textColor}
                  durationInFrames={frameDurations[index]}
                >
                  {text.text}
                </TextMultiple>
              )}
            </div>
          </Sequence>
        );
      })}
      <Audio pauseWhenBuffering={true} src={staticFile("stomp.mp3")} />
    </AbsoluteFill>
  );
};

export default MyComp;
