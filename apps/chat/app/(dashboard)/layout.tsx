import { Skeleton } from "mono/components/skeleton";
import { Suspense } from "react";
import Header from "@/app/(root)/header";
import { cn } from "yz13/cn";
import { Logo } from "@/components/logo";
import { ListTodoIcon, MessageCircleIcon } from "lucide-react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return <>{children}</>;
};

export default Layout;
