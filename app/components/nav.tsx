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
        className="flex flex-row items-center gap-6 relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
        id="nav"
      >
        <h1 className="whitespace-nowrap text-[2em] sm:text-[2.5em] font-mono font-light uppercase tracking-tight leading-[1.5em]">
          <Link href="/">
            Paul{" "}
            <span className=" bg-[LightSlateGray] text-white -ml-[.5em]">
              Grau
            </span>
          </Link>
        </h1>
        <div className="flex flex-row flex-wrap justify-end space-x-0 ml-auto font-mono text-sm gap-x-2 tracking-tight">
          {Object.entries(navItems).map(([path, { name }]) => {
            return (
              <Link
                key={path}
                href={path}
                data-name={name}
                className="transition-all text-foreground/80 hover:text-foreground p-1 px-2 data-[name=about]:hidden data-[name=about]:sm:block"
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
