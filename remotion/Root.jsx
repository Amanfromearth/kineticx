import { Composition } from "remotion";
import { MyComp } from "./Composition"

export const MyVideo = () => {
  return (
    <>
      <Composition
        component={MyComp(list)}
        durationInFrames={120}
        width={1920}
        height={1080}
        fps={30}
        id="my-comp"
        defaultProps={{ text: "World" }}
      />
    </>
  );
};