import { addItem, CartItem, loadCartFromLocalStorage, removeItem } from "../store/cartSlice";
import Image from "next/image";
import { Button } from "../components/ui/button";
import Link from "next/link";
import { SheetClose } from "../components/ui/sheet";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkStockInSanity } from "../app/stock";

type Props = {
  items: CartItem[];
};

export default function CartSideBar({ items }: Props) {
  const dispatch = useDispatch();
  // Load the cart from localStorage when the component mounts
    useEffect(() => {
      dispatch(loadCartFromLocalStorage()); // Dispatch action to load the cart from localStorage
    }, [dispatch]);

  // Add item to cart
  const addCartHandler = async (item: CartItem) => {
    const isAvailable = await checkStockInSanity(item.id);
    if (isAvailable) {
      dispatch(addItem(item));
    } else {
      alert("Item is out of stock!");
    }
  };

  // Remove item from cart
  const removeFromCartHandler = (id: string) => dispatch(removeItem({ id }));

  return (
    <div className="mt-28 mb-6 h-full ml-12">
      <h1 className="text-center font-bold text-lg mb-6">Your Cart</h1>
      
      {items.length === 0 && (
        <div className="flex items-center w-full h-[80vh] flex-col justify-center">
          <Image
            src="/cart.png"
            alt="cart"
            width={200}
            height={200}
            className="object-cover mx-auto"
          />
          <h1 className="mt-8 text-2xl font-semibold">Your cart is empty</h1>
        </div>
      )}

      {items.length > 0 && (
        <div>
          {items.map((item) => (
            <div
              key={item.id}
              className="pb-4 border-b-2 border-gray-300 border-opacity-60"
            >
              <div>
                <Image
                  src={item?.imageUrl}
                  alt={item?.name}
                  width={60}
                  height={60}
                  className="object-cover mb-4"
                />
              </div>
              <div>
                <h1 className="text-sm w-4/5 font-semibold truncate">{item?.name}</h1>
                <h1 className="text-base text-blue-950 font-bold">
                  Rs.{(item?.price * item?.quantity).toFixed(2)}
                </h1>
                <h1 className="text-base font-bold mb-2">
                  Quantity: {item?.quantity}
                </h1>

                <div className="flex items-center space-x-4">
                  <Button
                    onClick={() => removeFromCartHandler(item.id)}
                    size={"sm"}
                    className="bg-[#80b934] text-white hover:bg-[#6fa12b] px-6 py-4"
                  >
                    Remove
                  </Button>

                  <Button
                    onClick={() => addCartHandler(item)}
                    size={"sm"}
                    className="bg-[#80b934] text-white hover:bg-[#6fa12b] px-6 py-4"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <Link href="/cart">
            <SheetClose>
              <Button className="mt-6 mb-6 w-full bg-green-700 text-white hover:bg-green-600">
                View All Cart
              </Button>
            </SheetClose>
          </Link>
        </div>
      )}
    </div>
  );
}
