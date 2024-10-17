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
    <aside className="mb-12 lg:sticky lg:top-0 bg-background/90">
      <nav
        className="flex flex-row items-center gap-4 relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
        id="nav"
      >
        <h1 className="text-[2.5em] font-mono font-light uppercase tracking-tight leading-[1.5em]">
          <Link href="/">
            Paul{" "}
            <span className=" bg-[LightSlateGray] text-white -ml-[.5em]">
              Grau
            </span>
          </Link>
        </h1>
        <div className="flex flex-row space-x-0 ml-auto font-mono text-sm gap-2 tracking-tight">
          {Object.entries(navItems).map(([path, { name }]) => {
            return (
              <Link
                key={path}
                href={path}
                className="transition-all text-foreground/80 hover:text-foreground p-1 px-2"
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
