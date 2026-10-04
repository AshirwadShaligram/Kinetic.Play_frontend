import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/authTypes";

interface AdminInfoProps {
  user: User | null;
  isLoggedIn: boolean;
}

const AdminInfo = ({ user, isLoggedIn }: AdminInfoProps) => {
  return (
    <div className="flex items-center gap-2  p-1 rounded-2xl bg-foreground text-background font-bold">
      <Avatar>
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
          className="grayscale"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      {user?.email.split("@", 1)}
    </div>
  );
};

export default AdminInfo;
