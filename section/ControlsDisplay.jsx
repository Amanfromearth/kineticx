"use client";
import { useState } from "react";
import ControlsSideBar from "./ControlsSideBar";
import DescribeLeftOne from "./DescribeLeft/DescribeLeftOne";
import PlayerRight from "./PlayerRight";
import DescribeLeftTwo from "./DescribeLeft/DescribeLeftTwo";
import DescribeLeftThree from "./DescribeLeft/DescribeLeftThree";
import DescribeLeftFour from "./DescribeLeft/DescribeLeftFour";

const ControlsDisplay = () => {
  const [panel, setPanel] = useState(1);
  return (
    <section className="w-full flex-grow flex flex-col md:flex-row bg-neutral-50 overflow-hidden">
      <div className="w-full md:w-1/2 flex-shrink-0 bg-white border-r border-slate-300 flex">
        <ControlsSideBar panel={panel} setPanel={setPanel} />
        {panel === 1 ? (
          <DescribeLeftOne />
        ) : panel === 2 ? (
          <DescribeLeftTwo />
        ) : panel === 3 ? (
          <DescribeLeftThree />
        ) : (
          <DescribeLeftFour />
        )}
      </div>
      <div className="w-full md:w-1/2  flex-shrink-0 flex p-3 md:p-10 overflow-auto">
        <PlayerRight />
      </div>
    </section>
  );
};

export default ControlsDisplay;