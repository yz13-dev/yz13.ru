import { Button } from "mono/components/button";
import Link from "next/link";
import { ReactNode } from "react";

const Nav = ({ children }: { children?: ReactNode }) => {
  return (
    <nav className="flex items-center gap-2">
      <div className="flex items-center gap-0">
        <Button className="gap-2" variant="link" asChild>
          <Link href="/services">Услуги</Link>
        </Button>
        <Button className="gap-2" variant="link" asChild>
          <Link href="/projects">Проекты</Link>
        </Button>
      </div>
      {children}
    </nav>
  );
};

export default Nav;
