import Injections from "@/components/injections";
import Lotions from "@/components/lotions";
import Syrup from "@/components/syrup";
import Tablets from "@/components/tablets";

export default function Home() {
  return (
    <div className="md:w-[1170px] md:mx-auto">
     <Syrup/>
     <Tablets/>
     <Injections/>
     <Lotions/>
      
     
    </div>
  );
}