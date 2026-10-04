import { ComponentType } from "react";
import {
  Battery,
  Box,
  Box2,
  Camera,
  Camera2,
  Camera3,
  Cpu,
  Cpu3,
  CpuSetting,
  Gamepad,
  Gamepad2,
  Gamepad3,
  Gamepad4,
  HardDrive,
  Headphone,
  Headphones,
  Headphones2,
  Headphones3,
  IconProps,
  Keyboard,
  Keyboard3,
  KeyboardOpen,
  Laptop,
  Laptop2,
  Laptop3,
  Laptop4,
  LaptopMobile,
  Mic,
  Mic2,
  Mic3,
  Mic4,
  Monitor,
  Monitor3,
  Mouse,
  Mouse2,
  Package,
  Router,
  ShoppingBag,
  ShoppingCart,
  Speaker,
  Speaker2,
  Speaker4,
  Tv,
  Usb,
  Video,
  Video3,
  Wifi,
  Wifi3,
} from "reicon-react";

// ============================================================
// Types
// ============================================================
export type CategoryIcon = {
  name: string;
  label: string;
  icon: ComponentType<IconProps>;
};

export type CategoryIconComponent = ComponentType<IconProps>;

export const categoryIcons = {
  // ----------------------------------------------------------
  // Gaming
  // ----------------------------------------------------------

  gamepad: {
    name: "gamepad",
    label: "Gamepad",
    icon: Gamepad,
  },

  gamepad2: {
    name: "gamepad2",
    label: "Gamepad 2",
    icon: Gamepad2,
  },

  gamepad3: {
    name: "gamepad3",
    label: "Gamepad 3",
    icon: Gamepad3,
  },

  gamepad4: {
    name: "gamepad4",
    label: "Gamepad 4",
    icon: Gamepad4,
  },

  // ----------------------------------------------------------
  // Computer
  // ----------------------------------------------------------

  laptop: {
    name: "laptop",
    label: "Laptop",
    icon: Laptop,
  },

  laptop2: {
    name: "laptop2",
    label: "Laptop 2",
    icon: Laptop2,
  },

  laptop3: {
    name: "laptop3",
    label: "Laptop 3",
    icon: Laptop3,
  },

  laptop4: {
    name: "laptop4",
    label: "Laptop 4",
    icon: Laptop4,
  },

  laptopMobile: {
    name: "laptopMobile",
    label: "Laptop Mobile",
    icon: LaptopMobile,
  },

  monitor: {
    name: "monitor",
    label: "Monitor",
    icon: Monitor,
  },

  monitor3: {
    name: "monitor3",
    label: "Monitor 3",
    icon: Monitor3,
  },

  keyboard: {
    name: "keyboard",
    label: "Keyboard",
    icon: Keyboard,
  },

  keyboardOpen: {
    name: "keyboardOpen",
    label: "Keyboard Open",
    icon: KeyboardOpen,
  },

  keyboard3: {
    name: "keyboard3",
    label: "Keyboard 3",
    icon: Keyboard3,
  },

  mouse: {
    name: "mouse",
    label: "Mouse",
    icon: Mouse,
  },

  mouse2: {
    name: "mouse2",
    label: "Mouse 2",
    icon: Mouse2,
  },

  // ----------------------------------------------------------
  // Audio
  // ----------------------------------------------------------

  headphone: {
    name: "headphone",
    label: "Headphone",
    icon: Headphone,
  },

  headphones: {
    name: "headphones",
    label: "Headphones",
    icon: Headphones,
  },

  headphones2: {
    name: "headphones2",
    label: "Headphones 2",
    icon: Headphones2,
  },

  headphones3: {
    name: "headphones3",
    label: "Headphones 3",
    icon: Headphones3,
  },

  speaker: {
    name: "speaker",
    label: "Speaker",
    icon: Speaker,
  },

  speaker2: {
    name: "speaker2",
    label: "Speaker 2",
    icon: Speaker2,
  },

  speaker4: {
    name: "speaker4",
    label: "Speaker 4",
    icon: Speaker4,
  },

  mic: {
    name: "mic",
    label: "Microphone",
    icon: Mic,
  },

  mic2: {
    name: "mic2",
    label: "Microphone 2",
    icon: Mic2,
  },

  mic3: {
    name: "mic3",
    label: "Microphone 3",
    icon: Mic3,
  },

  mic4: {
    name: "mic4",
    label: "Microphone 4",
    icon: Mic4,
  },

  // ----------------------------------------------------------
  // Accessories
  // ----------------------------------------------------------

  cpu: {
    name: "cpu",
    label: "CPU",
    icon: Cpu,
  },

  cpu3: {
    name: "cpu3",
    label: "CPU 3",
    icon: Cpu3,
  },

  cpuSetting: {
    name: "cpuSetting",
    label: "CPU Settings",
    icon: CpuSetting,
  },

  hardDrive: {
    name: "hardDrive",
    label: "Hard Drive",
    icon: HardDrive,
  },

  usb: {
    name: "usb",
    label: "USB",
    icon: Usb,
  },

  battery: {
    name: "battery",
    label: "Battery",
    icon: Battery,
  },

  camera: {
    name: "camera",
    label: "Camera",
    icon: Camera,
  },

  camera2: {
    name: "camera2",
    label: "Camera 2",
    icon: Camera2,
  },

  camera3: {
    name: "camera3",
    label: "Camera 3",
    icon: Camera3,
  },

  video: {
    name: "video",
    label: "Video",
    icon: Video,
  },

  video3: {
    name: "video3",
    label: "Video 3",
    icon: Video3,
  },

  tv: {
    name: "tv",
    label: "TV",
    icon: Tv,
  },

  router: {
    name: "router",
    label: "Router",
    icon: Router,
  },

  wifi: {
    name: "wifi",
    label: "Wi-Fi",
    icon: Wifi,
  },

  wifi3: {
    name: "wifi3",
    label: "Wi-Fi 3",
    icon: Wifi3,
  },

  // ----------------------------------------------------------
  // General
  // ----------------------------------------------------------

  package: {
    name: "package",
    label: "Package",
    icon: Package,
  },

  box: {
    name: "box",
    label: "Box",
    icon: Box,
  },

  box2: {
    name: "box2",
    label: "Box 2",
    icon: Box2,
  },

  shoppingBag: {
    name: "shoppingBag",
    label: "Shopping Bag",
    icon: ShoppingBag,
  },

  shoppingCart: {
    name: "shoppingCart",
    label: "Shopping Cart",
    icon: ShoppingCart,
  },
} satisfies Record<string, CategoryIcon>;

export type CategoryIconName = keyof typeof categoryIcons;

export const categoryIconGroups = [
  {
    name: "Gaming",
    icons: ["gamepad", "gamepad2", "gamepad3", "gamepad4"],
  },

  {
    name: "Computer",
    icons: [
      "laptop",
      "laptop2",
      "laptop3",
      "laptop4",
      "laptopMobile",
      "monitor",
      "monitor3",
      "keyboard",
      "keyboardOpen",
      "keyboard3",
      "mouse",
      "mouse2",
    ],
  },

  {
    name: "Audio",
    icons: [
      "headphone",
      "headphones",
      "headphones2",
      "headphones3",
      "speaker",
      "speaker2",
      "speaker4",
      "mic",
      "mic2",
      "mic3",
      "mic4",
    ],
  },

  {
    name: "Accessories",
    icons: [
      "cpu",
      "cpu3",
      "cpuSetting",
      "hardDrive",
      "usb",
      "battery",
      "camera",
      "camera2",
      "camera3",
      "video",
      "video3",
      "tv",
      "router",
      "wifi",
      "wifi3",
    ],
  },

  {
    name: "General",
    icons: ["package", "box", "box2", "shoppingBag", "shoppingCart"],
  },
] satisfies {
  name: string;
  icons: CategoryIconName[];
}[];
