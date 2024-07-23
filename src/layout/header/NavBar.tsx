import NavbarAuth from "@/components/navBar/NavbarAuth";
import { ModeToggle } from "@/components/navBar/ThemeToggler";
import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 flex h-12 items-center justify-center  w-[100dvw] bg-accent p-3 text-md z-50">
      <div className="flex items-center justify-between w-full max-w-screen-lg ">
        <Link to="/" className="text-xl">
          🐐
        </Link>
        <nav className="hidden md:block ">
          <div className="flex flex-row justify-around items-center">
            <ul className="flex flex-row justify-center items-center gap-8">
              <li>
                <Link to="/users">Users</Link>
              </li>
              <li>
                <Link to="/posts">Posts</Link>
              </li>
              <li>
                <Link to="/todos">Todos</Link>
              </li>
              <li>
                <Link to="/popup">Popup</Link>
              </li>
            </ul>
            <ModeToggle />
            <NavbarAuth />
          </div>
        </nav>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
        {isOpen && (
          <div className="absolute top-12 left-0 w-full bg-gray-200 md:hidden">
            <ul className="flex flex-col items-center py-2">
              <li className="py-2">
                <Link to="/store" onClick={() => setIsOpen(false)}>
                  Store
                </Link>
              </li>
              <li className="py-2">
                <Link to="popup" onClick={() => setIsOpen(false)}>
                  Popup
                </Link>
              </li>
              <li className="py-2">
                <Link to="about" onClick={() => setIsOpen(false)}>
                  About
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
