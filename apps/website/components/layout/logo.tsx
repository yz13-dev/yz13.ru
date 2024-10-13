import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center gap-x-2 text-center">
      <div className="size-8 relative">
        <Image fill className="light-mode-image" src="https://yzstatic.yz13.space/logo/yz-light.svg" alt="YZ13 LAB" />
        <Image fill className="dark-mode-image" src="https://yzstatic.yz13.space/logo/yz-dark.svg" alt="YZ13 LAB" />
      </div>
      <span className="font-pixel text-2xl">YZ13</span>
    </div>
  );
};
export { Logo };
