/*  2024-07-19 10:20:30


*/

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthProvider";
import { RxAvatar } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

/*

    <div className="rounded-full p-2 border">
      {user?.avatar ? (
        <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
      ) : (
        <RxAvatar fontSize="1.5em" />
      )}
    </div>
          <DropdownMenuTrigger asChild>
*/
const NavbarAvatar = () => {
  const navigate = useNavigate();
  const { user, signout } = useAuth();

  const handleSignout = () => {
    signout();
    navigate("/");
  };

  return (
    <div className="flex flex-row justify-between items-center  ">
      <div className=" ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="rounded-full ">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <RxAvatar fontSize="1.5em" />
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleSignout}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default NavbarAvatar;
