import { spring, useCurrentFrame, useVideoConfig } from "remotion";
const TextSpring = ({ children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    fps,
    frame,
    config: {
      stiffness: 100,
      damping: 10,
    },
  });

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div
          className={`text-9xl p-6 text-center font-semibold drop-shadow-xl text-white`}
          style={{ transform: `scale(${scale})` }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default TextSpring;
