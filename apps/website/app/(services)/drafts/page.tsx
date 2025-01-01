import { Header } from "@/components/header";
import { HeartIcon, UploadIcon, UserIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Input } from "mono/components/input";

const page = () => {
  return (
    <>
      <Header>
        <Header.Left className="gap-4">
          <nav className="flex gap-3 items-center *:text-sm *:text-secondary">
            <span>Popular</span>
            <span>Newest</span>
            <span>Following</span>
          </nav>
        </Header.Left>
        <Header.Center></Header.Center>
        <Header.Right>
          <Button rounded="full" className="gap-2">
            <UploadIcon size={16} />
            Publish
          </Button>
        </Header.Right>
      </Header>
      <div className="p-3 space-y-3">
        <div className="w-full py-12 flex items-center justify-center flex-col gap-8">
          <span className="text-2xl font-medium">Discover drafts</span>
          <Input
            placeholder="Search drafts"
            className="max-w-md rounded-full"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-1.5">
            <div className="w-full aspect-video bg-background rounded-xl" />
            <div className="flex items-center justify-between px-2">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground/80">
                  Draft title
                </span>
                <div className="flex flex-row items-center gap-1">
                  <span className="text-xs text-secondary">by</span>
                  <span className="text-xs text-secondary">YZ13</span>
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <button className="flex flex-row items-center gap-1 text-secondary">
                  <HeartIcon size={14} />
                  <span className="text-xs">1.2k</span>
                </button>
                <div className="flex flex-row items-center gap-1 text-secondary">
                  <UserIcon size={14} />
                  <span className="text-xs">1.2k</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
