import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Animated, Move, Fade } from 'remotion-animated';
const TextOpacity = ({ children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = interpolate(frame, [fps / 2, fps], [0, 1], {
    extrapolateRight: "clamp",
  });



  return (
    <div className="relative w-full h-full">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div
          className={`text-9xl p-6 text-center font-semibold drop-shadow-xl text-white`}
          style={{opacity: opacity}}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default TextOpacity;
