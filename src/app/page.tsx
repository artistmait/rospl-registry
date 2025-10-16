import { Button } from "@/components/ui/button";
import { Navbar } from "@/registry/neutral/blocks/navbar";
import { Atom } from "lucide-react";
import HomePage from "./homepage/home";

export default function Home() {
  return (
   <>
   {/* <div className="flex p-10 gap-10">
   
    <Navbar logo={
      <span className="flex items-center gap-2">
        <Atom />
        <span className="font-bold text-lg">MaitLib</span>
      </span>
    }
    items={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
          ]}
          actions={<Button>Sign In</Button>}/>
   </div>
   <div className="flex p-10 gap-10">
    <Button className="p-4 text-center w-auto h-auto">Hello</Button>
    <Button variant='destructive' className="p-4 text-center w-auto h-auto">Hello</Button>
    <Button variant='outline' className="p-4 text-center w-auto h-auto">Hello</Button>
    <Button variant='secondary' className="p-4 text-center w-auto h-auto">Hello</Button>
    <Button variant='ghost' className="p-4 text-center w-auto h-auto">Hello</Button>
    </div> */}
    <HomePage/>
   </>
  );
}
