import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink } from "./navLink";

const navItems = {
  "/": {
    name: "about",
  },
  "/tag/product": {
    name: "#product",
  },
  "/tag/ops": {
    name: "#ops",
  },
  "/tag/library": {
    name: "#library",
  },
};

export function Navbar() {
  return (
    <header className="flex flex-col items-baseline max-w-[840px] sm:flex-row sm:justify-between">
      <h1 className="tracking-tight text-[44px] font-medium lowercase [font-variant:small-caps] whitespace-nowrap">
        <img
          src="/loop.svg"
          className="h-[0.5em] w-auto inline invert-when-dark"
        />{" "}
        Humanloop
      </h1>
      <nav className="flex gap-[0.5em] items-baseline flex-wrap text-base ">
        {Object.entries(navItems).map(([path, { name }]) => {
          return (
            <NavLink key={path} href={path}>
              {name}
            </NavLink>
          );
        })}
      </nav>
    </header>
  );
}
