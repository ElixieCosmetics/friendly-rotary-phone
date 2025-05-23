import { User } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const UserAccountButton = () => {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <Link href="/account">
        <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-foreground">
          <User className="h-5 w-5" />
        </Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-foreground">
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="text-sm font-normal">Welcome</span>
            <span className="font-medium">{user?.firstName || user?.username}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/my-account" className="cursor-pointer w-full">
            My Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/orders" className="cursor-pointer w-full">
            Order History
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-destructive focus:text-destructive"
          onClick={logout}
        >
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountButton;