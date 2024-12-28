import AppsLine from "./apps-line";
import Sidebar from "./sidebar";

type PageProps = {};
const page = ({}: PageProps) => {
  return (
    <div className="h-fit w-full p-3 max-w-4xl mx-auto min-h-[calc(100dvh - 64px)] space-y-6">
      <div className="w-full flex items-start gap-6">
        <Sidebar />
        <div className="w-full space-y-3">
          <AppsLine />
          <section className="w-full space-y-3">
            <span className="text-sm text-secondary">Screens</span>
            <div className="w-full grid grid-cols-4 gap-3">
              <div className="w-full h-36 col-span-full flex items-center justify-center rounded-xl border border-dashed">
                <span className="text-sm text-secondary">Different</span>
              </div>
              {/* <div className="w-full aspect-square rounded-xl bg-yz-neutral-100"></div> */}
              {/* <div className="w-full aspect-square rounded-xl bg-yz-neutral-100"></div> */}
              {/* <div className="w-full h-full col-span-2 rounded-xl bg-yz-neutral-100"></div> */}
            </div>
            <div className="w-full grid grid-cols-4 gap-3">
              <div className="w-full h-36 col-span-full flex items-center justify-center rounded-xl border border-dashed">
                <span className="text-sm text-secondary">Screens</span>
              </div>
              {/* <div className="w-full aspect-square rounded-xl bg-yz-neutral-100"></div> */}
              {/* <div className="w-full aspect-square rounded-xl bg-yz-neutral-100"></div> */}
              {/* <div className="w-full aspect-square rounded-xl bg-yz-neutral-100"></div> */}
              {/* <div className="w-full aspect-square rounded-xl bg-yz-neutral-100"></div> */}
            </div>
          </section>
          {/* <section className="w-full space-y-3">
            <span className="text-sm text-secondary">UI Elements</span>
            <ul
              className={cn(
                "w-full h-fit flex items-start flex-wrap gap-1",
                "*:bg-yz-neutral-200 *:text-foreground/80 *:px-3 *:py-1 *:rounded-full *:text-sm"
              )}
            >
              <li className="hover:text-foreground transition-colors cursor-pointer">Button</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Input</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Card</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Badge</li>
              <li className="hover:text-foreground transition-colors cursor-pointer">Avatar</li>
            </ul>
          </section> */}
        </div>
      </div>
    </div>
  );
};

export default page;
