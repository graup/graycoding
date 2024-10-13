import Link from "next/link";

const navItems = {
  "/": {
    name: "about",
  },
  "/tag/product": {
    name: "product",
  },
  "/tag/ui": {
    name: "ui",
  },
  "/tag/global": {
    name: "global",
  },
};

export function Navbar() {
  return (
    <aside className="mb-16 lg:sticky lg:top-2 bg-background/80 tracking-tight">
      <nav
        className="flex flex-row items-center gap-4 relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
        id="nav"
      >
        <h1 className="text-[2.5em] font-mono font-light uppercase leading-[1.5em]">
          Paul{" "}
          <span className=" bg-[LightSlateGray] text-white -ml-[.5em]">
            Grau
          </span>
        </h1>
        <div className="flex flex-row space-x-0 ml-auto">
          {Object.entries(navItems).map(([path, { name }]) => {
            return (
              <Link
                key={path}
                href={path}
                className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
              >
                {name}
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
