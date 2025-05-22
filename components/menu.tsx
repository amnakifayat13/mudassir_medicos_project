import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { MenuIcon, Search, User, ShoppingCartIcon,HeartIcon  } from "lucide-react"
import Link from "next/link"
  
export default function Menu(){
    return (
        <div className="md:hidden">
            <Dialog >
  <DialogTrigger>
        <MenuIcon className="text-[#80b934]"/>
  </DialogTrigger>
  <DialogContent>
  <h1 className="text-2xl text-[#252B42] underline">Menu</h1>
  {/* <ul className="block gap-10   font font-semibold cursor-pointer "> */}
  <ul className="   md:hidden gap-10 font font-semibold cursor-pointer md:ml-48">
                    <li className="text-[#252B42] mt-2"><Link href="/">Home</Link></li>
                    <li className="text-[#252B42] mt-2"><Link href="/about">About</Link></li>
                    <li className="text-[#252B42] mt-2"><Link href="/contact">Contact</Link></li>
                   
                </ul>
                
           
                
               
  </DialogContent>
</Dialog>

        </div>
    )
}