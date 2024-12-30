const Screens = () => {
  return (
    <section className="w-full space-y-3">
      <span className="text-sm text-secondary">Screens</span>
      <div className="w-full grid grid-cols-4 gap-3 *:relative *:transition-colors *:overflow-hidden *:rounded-2xl *:bg-background/40 *:border *:p-3">
        <div className="w-full aspect-square hover:bg-background group">
          <span className="text-sm text-foreground">Signup</span>
          <span className="absolute left-3 bottom-3 text-5xl font-semibold text-secondary group-hover:text-foreground transition-colors">
            0
          </span>
          <div className="absolute border right-6 -bottom-3 w-14 aspect-[9/16] bg-yz-neutral-200 rounded-md" />
          <div className="absolute border right-3 bottom-0 w-14 aspect-[9/16] bg-yz-neutral-200 rounded-md" />
        </div>
        <div className="w-full aspect-square hover:bg-background group">
          <span className="text-sm text-foreground">Login</span>
          <span className="absolute left-3 bottom-3 text-5xl font-semibold text-secondary group-hover:text-foreground transition-colors">
            0
          </span>
          <div className="absolute border right-6 -bottom-3 w-14 aspect-[9/16] bg-yz-neutral-200 rounded-md" />
          <div className="absolute border right-3 bottom-0 w-14 aspect-[9/16] bg-yz-neutral-200 rounded-md" />
        </div>
        <div className="w-full h-full col-span-2 hover:bg-background group">
          <span className="text-sm text-foreground">Home</span>
          <span className="absolute left-3 bottom-3 text-5xl font-semibold text-secondary group-hover:text-foreground transition-colors">
            0
          </span>
          <div className="absolute border right-6 -bottom-3 w-14 aspect-[9/16] bg-yz-neutral-200 rounded-md" />
          <div className="absolute border right-3 bottom-0 w-14 aspect-[9/16] bg-yz-neutral-200 rounded-md" />
        </div>
      </div>
      <div className="w-full grid grid-cols-4 gap-3 *:group *:relative *:transition-colors *:overflow-hidden *:rounded-2xl *:bg-background/40 *:border *:p-3">
        <div className="w-full aspect-square hover:bg-background group">
          <span className="text-sm text-foreground">Seach</span>
          <span className="absolute left-3 bottom-3 text-5xl font-semibold text-secondary group-hover:text-foreground transition-colors">
            0
          </span>
          <div className="absolute border right-6 -bottom-3 w-14 aspect-[9/16] bg-yz-neutral-200 rounded-md" />
          <div className="absolute border right-3 bottom-0 w-14 aspect-[9/16] bg-yz-neutral-200 rounded-md" />
        </div>
        <div className="w-full aspect-square hover:bg-background group">
          <span className="text-sm text-foreground">Profile</span>
          <span className="absolute left-3 bottom-3 text-5xl font-semibold text-secondary group-hover:text-foreground transition-colors">
            0
          </span>
          <div className="absolute border right-6 -bottom-3 w-14 aspect-[9/16] bg-yz-neutral-200 rounded-md" />
          <div className="absolute border right-3 bottom-0 w-14 aspect-[9/16] bg-yz-neutral-200 rounded-md" />
        </div>
        <div className="w-full aspect-square hover:bg-background group">
          <span className="text-sm text-foreground">Checkout</span>
          <span className="absolute left-3 bottom-3 text-5xl font-semibold text-secondary group-hover:text-foreground transition-colors">
            0
          </span>
          <div className="absolute border right-6 -bottom-3 w-14 aspect-[9/16] bg-yz-neutral-200 rounded-md" />
          <div className="absolute border right-3 bottom-0 w-14 aspect-[9/16] bg-yz-neutral-200 rounded-md" />
        </div>
        <div className="w-full aspect-square hover:bg-background group">
          <span className="text-sm text-foreground">Settings</span>
          <span className="absolute left-3 bottom-3 text-5xl font-semibold text-secondary group-hover:text-foreground transition-colors">
            0
          </span>
          <div className="absolute border right-6 -bottom-3 w-14 aspect-[9/16] bg-yz-neutral-200 rounded-md" />
          <div className="absolute border right-3 bottom-0 w-14 aspect-[9/16] bg-yz-neutral-200 rounded-md" />
        </div>
      </div>
    </section>
  );
};

export default Screens;
