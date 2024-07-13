import BottomNav from "@/section/BottomNav";
import ControlsDisplay from "@/section/ControlsDisplay";
import NavBar from "@/section/Nav";

const Dash = () => {
  return (
    <main className="flex flex-col h-full md:h-screen w-full overflow-hidden">
      <NavBar />
      <div className="flex-grow overflow-hidden flex flex-col">
        <ControlsDisplay />
        <BottomNav />
      </div>
    </main>
  );
};

export default Dash;