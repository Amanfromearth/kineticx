"use client";
import { usedata, useframenum } from "@/lib/store";  // Corrected the hook names

const BottomNav = () => {
  const { data, toggleSelect } = usedata((state) => ({
    data: state.data,
    toggleSelect: state.toggleSelect,
  }));
  const { updateframenum } = useframenum();

  const handleSubmit = (index) => () => {
    // Check if the frame to be toggled is currently selected
    const isSelected = data[index].selected;
    toggleSelect(index);
    // If the frame was previously selected, set framenum to -1, otherwise to the index
    updateframenum(isSelected ? -1 : index);
  };

  return (
    <section className="w-full border-t flex items-center justify-center border-slate-300">
      <div className="w-[95vw] overflow-auto scroll-auto flex">
        {data.map((frame, index) => (
          <span
            key={index}
            onClick={handleSubmit(index)}  // Corrected the onClick handler
            className={`px-2 py-8 cursor-pointer mx-[1px] flex items-center justify-center min-w-36 h-24 relative border-4 rounded-lg ${
              frame.selected ? "border-blue-200" : "border-slate-200"
            } bg-white text-black my-3`}
          >
            <div
              className={`absolute top-1 p-1 left-1 rounded-full ${
                frame.selected ? "bg-blue-100" : "bg-slate-200"
              } text-[8px] text-slate-600`}
            >
              {index + 1}
            </div>
            <div className="font-semibold text-sm w-full flex items-center justify-center">
              {frame.text}
            </div>
            <div
              className={`absolute bottom-1 p-1 right-2 rounded-full ${
                frame.selected ? "bg-blue-100" : "bg-slate-200"
              } text-[8px] text-slate-600`}
            >
              {frame.time} s
            </div>
          </span>
        ))}
      </div>
    </section>
  );
};

export default BottomNav;
