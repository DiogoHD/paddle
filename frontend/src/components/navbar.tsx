import { House, Search, CircleUserRoundIcon } from "lucide-react";
import { Outlet } from "react-router";

export function NavBar() {
  return (
    <>
      <Outlet />
      <div className="fixed bottom-0 left-0 right-0 flex py-4 px-10 justify-between bg-primary-blue text-white w-full">
        <a href="/matches" className="hover:text-gray-300">
          <Search className="size-10" />
        </a>
        <a href="/home" className="hover:text-gray-300">
          <House className="size-10" />
        </a>
        <a href="/profile" className="hover:text-gray-300">
          <CircleUserRoundIcon className="size-10" />
        </a>
      </div>
    </>
  );
}