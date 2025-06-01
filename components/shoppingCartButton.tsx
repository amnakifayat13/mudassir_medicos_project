"use client";
import { RootState } from "../store/store";
import { ShoppingCartIcon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import CartSideBar from "./cartSidebar"; 
import { useEffect } from "react";
import {  loadCartFromLocalStorage } from "../store/cartSlice";



export default function ShoppingCartButton() {
    const dispatch = useDispatch();
    // Load the cart from localStorage when the component mounts
      useEffect(() => {
        dispatch(loadCartFromLocalStorage()); // Dispatch action to load the cart from localStorage
      }, [dispatch]);
    const items = useSelector((state: RootState) => state.cart.items);
    
    // Ensure items is always an array
const totalQuantity = (items || []).reduce((total, item) => total + item.quantity, 0);
console.log( "ye chla ya nhi??? ", totalQuantity)

    
    return (
        <Sheet>
            <SheetTrigger>
               
                <div className="relative">
                     <span className="absolute -top-3 -right-2 w-6 h-6 bg-red-500 text-center
                        flex items-center justify-center flex-col text-xs text-white rounded-full hover:text-black">
                        {totalQuantity}
                    </span> 
                    <ShoppingCartIcon size={26} cursor={"pointer"} />
                </div>
            </SheetTrigger>
            <SheetContent className="overflow-auto h-full">
                {/*  cart sidebar  */}
                 <CartSideBar items={items} />
            </SheetContent>
        </Sheet>
    );
}
