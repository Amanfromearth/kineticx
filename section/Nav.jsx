import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { Clash } from "next/font/google";

const NavBar = () => {
  return (
    <nav className=" w-full px-3 py-1 border-b flex justify-between border-slate-300">
      <div className="flex items-center justify-center p-3 gap-3">
        <Image src="/kineticx.png" alt="logo" width={100} height={100} />
      </div>
      <div className="flex items-center justify-center p-3 gap-3">
        <Button>Render<ArrowDown className=" ml-2 w-4"/></Button>
      </div>
    </nav>
  );
};

export default NavBar;
