import { Logo } from "@/components/logo";
import SocialLinks from "@/components/social-links";

const Footer = () => {
  return (
    <footer className="w-full h-fit *:max-w-5xl *:mx-auto flex flex-col gap-16 bg-background-secondary p-6">
      <div className="w-full flex flex-row gap-2 items-center justify-between">
        <Logo size={{ width: 96, height: 21 }} type="full" />
        <div className="w-fit flex flex-row gap-2 items-center">
          <SocialLinks />
        </div>
      </div>
      <div className="w-full flex flex-row gap-2 items-center justify-between">
        <div className="w-fit flex flex-row gap-2 items-center">
          <span className="text-secondary text-sm">© 2025 Pages</span>
        </div>
        <div className="w-fit flex flex-row gap-2 items-center"> </div>
      </div>
    </footer>
  );
};

export default Footer;
