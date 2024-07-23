/*  2024-07-19 10:14:59


*/

import { useAuth } from "@/context/AuthProvider";
import { IoIosLogIn } from "react-icons/io";
import NavbarAvatar from "./NavbarAvatar";
import { Link } from "react-router-dom";

const NavbarAuth = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="rounded-full  p-2 cursor-pointer">
      {isAuthenticated ? (
        <NavbarAvatar />
      ) : (
        <Link to="/signin">
          <IoIosLogIn fontSize="1.5em" />
        </Link>
      )}
    </div>
  );
};

export default NavbarAuth;
