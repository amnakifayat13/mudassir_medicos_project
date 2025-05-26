import Link from "next/link"
import Image from "next/image"
import {  ArrowBigDownDashIcon, HeartIcon, PackageIcon, SearchIcon, ShoppingCartIcon, User, UserIcon } from "lucide-react"
import Menu from "../components/menu"
// import ShoppingCartButton from "./Helper/ShoppingCartButton"
// import SearchBar from "./Helper/searchbar"
// import { ClerkLoaded, SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs"
// import SearchBox from "./Helper/searchbar"
// import WishlistButton from "./Helper/wishlistButton"


export default function Nav(){
    // const { user }  = useUser();
    return(
<div className="md:w-[1170px] md:mx-auto sticky top-0 z-[100]">

<div className="h-[12vh] sticky top-0 z-[1] bg-white shadow-md">
            <div className="flex items-center justify-around w-[95%] md:w-4/5 mx-aotu h-full">
            {/* logo */}
            <Link href="/">
            <button className="ml-4  text-xl sm:2xl md:3xl xl:4xl font-bold text-[#252B42] mt-3">
                <Image src="/logo.png" alt="logo" width={100} height={80}/>
            </button>
            </Link>
            <div>
                <ul className="  hidden md:flex gap-6 font font-semibold cursor-pointer md:ml-8">
                    <li className="text-[#252B42]"><Link href="/">Home</Link></li>
                    <li className="text-[#252B42]"><Link href="/about">About</Link></li>
                    <li className="text-[#252B42]"><Link href="/contact">Contact</Link></li>
                    
                </ul>
            </div>
           
           <div className="md:hidden ml-2">
                <Menu/>
                </div>
                <ShoppingCartIcon/>
                <SearchIcon/>
                <UserIcon/>
            
            </div>
            
        </div>
        
</div>
    )
}