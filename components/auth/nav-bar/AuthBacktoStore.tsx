import Link from "next/link";
import { User } from "reicon-react";

const AuthBacktoStore = () => {
  return (
    <Link href="/" className="flex p-2 items-center gap-1">
      <h1 className="text-xs">Return to Storefront</h1>
      <User className="bg-foreground text-background border w-6 h-6 p-1 rounded-xl" />
    </Link>
  );
};

export default AuthBacktoStore;
