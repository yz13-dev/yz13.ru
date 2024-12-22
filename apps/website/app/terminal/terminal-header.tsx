import { Logo } from "@/components/logo";
import { CogIcon } from "lucide-react";
import Link from "next/link";
import terminalCSS from "./terminal.module.css";

const TerminalHeader = () => {
  return (
    <div className={terminalCSS["terminal-header"]}>
      <div className="flex items-center gap-2">
        <Link href="/">
          <Logo className="size-6" />
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <CogIcon size={16} />
      </div>
    </div>
  )
}

export default TerminalHeader