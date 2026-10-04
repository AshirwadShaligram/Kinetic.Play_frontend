import { Game, Menu, X } from "reicon-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import NavigationLinks from "./center-section/NavigationLinks";
import MobileNavigationLinks from "./center-section/MobileNavigationLinks";

const Logo = () => {
  return (
    <div className="h-full flex items-center justify-center p-1 gap-2 kinetic-gold-glow">
      {/* Desktop */}
      <div className="hidden md:flex p-1 bg-black">
        <Game weight="Filled" color="white" />
      </div>

      {/* Mobile */}
      <div className="flex md:hidden p-1 bg-black">
        <Drawer swipeDirection="left">
          <DrawerTrigger>
            <Menu weight="Filled" color="white" />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="flex gap-2 justify-between">
                <div className="h-full flex items-center justify-center p-1 gap-2">
                  <div className="bg-black">
                    <Game weight="Filled" color="white" />
                  </div>
                  <div>
                    <h1 className="font-bold text-2xl">
                      KINETIC.<span className="text-gray-400">PLAY</span>
                    </h1>
                  </div>
                </div>
                <div>
                  <DrawerClose>
                    <X />
                  </DrawerClose>
                </div>
              </DrawerTitle>
            </DrawerHeader>

            {/* Nav Links */}
            <div className="flex-1 p-4">
              <div className="size-full ">
                <MobileNavigationLinks />
              </div>
            </div>

            <DrawerFooter>
              <h1>Logout</h1>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      <div>
        <h1 className="font-bold text-2xl">
          KINETIC.<span className="text-muted-foreground">PLAY</span>
        </h1>
      </div>
    </div>
  );
};

export default Logo;
