import { ShoppingBag, ShoppingCart, X } from "reicon-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

const CartBtn = () => {
  return (
    <div className="h-full flex items-center justify-center p-1 gap-2">
      {/* Cart Bag */}
      <Drawer swipeDirection="right">
        <DrawerTrigger>
          <div className="relative flex">
            <ShoppingCart />
            <span className="absolute left-2 bottom-3 bg-green-600 h-5 w-5 flex items-center justify-center rounded-full">
              1
            </span>
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="flex gap-2 justify-between">
              <div className="flex gap-2">
                <ShoppingBag />
                Your Dispatch Cart 0
              </div>
              <div>
                <DrawerClose>
                  <X />
                </DrawerClose>
              </div>
            </DrawerTitle>
          </DrawerHeader>

          <div className="flex-1 p-4">
            <div className="size-full " />
          </div>
          <DrawerFooter className="bg-muted">
            <div className="p-4">
              <div className="flex justify-between text-xs">
                <p className="text-gray-700">Instant Cloud Delivery</p>
                <span className="text-green-600 ">FREE (₹0)</span>
              </div>
              <div className="flex justify-between  font-bold">
                <p className="text-gray-700">Total Due</p>
                <span className="text-black "> ₹0</span>
              </div>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default CartBtn;
