"use client"

import { Button } from "@/components/ui/button"
import { addItem, CartItem, loadCartFromLocalStorage, removeItem } from "../../store/cartSlice"
import { RootState } from "../../store/store"
import Image from "next/image"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { checkStockInSanity } from "../stock"

export default function Cart (){
    const dispatch = useDispatch();

    // get our cart items
    const items = useSelector((state:RootState) => state.cart.items)
    // calculating total quantity
    const totalQuantity =items.reduce((total, item) =>
        total + item.quantity, 0)

    // calculate the total price
    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    // value added tax (Vat 15%)

    const vat = (+totalPrice * 0.15).toFixed(2)

    // total price with vat
    const totalPriceWithVat = (+totalPrice + +vat).toFixed(2)

    // get authenticate user

   
    //add item
    const addItemHandler = async (item: CartItem) => {
        const isInStock = await checkStockInSanity(item.id);
    
        if (isInStock) {
            dispatch(addItem(item));
        } else {
            alert("This item is out of stock!");
        }
    };

    // rempve item
    const removeItemHandler = (id:string) => {
        dispatch(removeItem({id}))
    }
    // Load the cart from localStorage when the component mounts
      useEffect(() => {
        dispatch(loadCartFromLocalStorage()); // Dispatch action to load the cart from localStorage
      }, [dispatch]);
      
      
    

    return(
        <div className="mt-8 min-h-auto md:w-[1170px] md:mx-auto">
            {/* if the card is empty */}

            {items.length === 0 && (
                <div className="flex items-center  h-[80vh] flex-col justify-center">
                    <Image src="/cart.png" alt="Emptycart" width={200} height={200}
                    className="object-cover mx-auto"/>
                    <h1 className="mt-8 text-2xl font-semibold">Your Cart is empty</h1>
                    <Link href="/">
                    <Button className="bg-[#80b934] text-white hover:bg-[#6fa12b] mt-4"> Shop Now</Button>
                    </Link>

                </div>
            )}
            {/* if items are exist */}
            {items.length>0 && (
                <div className="md:w-4/5 w-[95%] mx-auto grid grid-cols-1 xl:grid-cols-6 gap-12">
                    {/* cart items */}
                    <div className="rounded-lg shadow-md overflow-hidden xl:col-span-4">
                        <h1 className="p-4 text-xl sm:text-2xl md:text-3xl font-bold text-white bg-[#80b934]">
                            Your cart ({ totalQuantity} Items)</h1>
                            {items.map((item) =>{
                                return(
                                    <div key={item.id}>
                                        <div className="flex pb-6 mt-2 p-5 border-b-[1.5px] border-opacity-25 border-gray-700
                                        items-center space-x-10">
                                            <div>
                                                <Image src={item.imageUrl} alt={item.name} width={180} height={180}/>
                                            </div>
                                            <div>
                                            <Link href={`/products/productDetails/${item.id}`}>
                                                <h1 className="md:text-xl text-base font-bold text-black">{item.name}</h1>
                                                </Link>
                                                <h1 className="md:text-lg text-sm font-semibold">Category: {item.category}</h1>
                                                <h1 className="md:text-2xl text-lg font-bold text-blue-950">Rs.{item.price}</h1>
                                                <h1 className="md:text-lg text-sm font-semibold">Quantity: {item.quantity}</h1>
                                                <div className="flex items-center mt-4 space-x-2">
                                                    <Button onClick={()=>{addItemHandler(item)}} className="bg-[#80b934] text-white hover:bg-[#6fa12b] px-8 py-6 "
                                                    >Add More</Button>
                                                    <Button onClick={() => {removeItemHandler(item.id)}} className="bg-[#80b934] text-white hover:bg-[#6fa12b] px-8 py-6"
                                                    >Remove</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                    {/* cart summary */}
                    <div className="xl:col-span-2">
                        <div className="bg-indigo-950 sticky top-[25vh] p-6 rounded-lg">
                            <h1 className="text-center mt-8 mb-8 text-white text-3xl font-semibold">Summary</h1>
                            <div className="w-full h-[1.2px] bg-white bg-opacity-20"></div>
                            <div className="flex mt-4 text-xl uppercase font-semibold text-white items-center
                            justify-between">
                                <span>Sub Total</span>
                                <span>Rs.{totalPrice}</span>
                            </div>

                            {/* <div className="flex mt-10 mb-10 text-xl uppercase font-semibold text-white items-center
                            justify-between">
                                <span>VAT</span>
                                <span>${vat}</span>
                            </div> */}

                            
                            <div className="w-full h-[1.2px] bg-white bg-opacity-20"></div>
                            <div className="flex mt-6 mb-6 text-xl uppercase font-semibold text-white items-center
                            justify-between">
                                <span>Total</span>
                                <span>Rs.{totalPrice}</span>
                            </div>
                            <Link href="/order">
                            <button className="w-full bg-yellow-600 py-3 px-4 rounded-[20px] text-center text-xl font-bold text-slate-800">
                            CheckOut
                        </button>
                            </Link>
                            
                        </div>
                       
                    </div>
                </div>
            )}

        </div>
    )
}