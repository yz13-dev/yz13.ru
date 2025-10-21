import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
  label?: string;
  link?: string;
};
export default function ({ children, label, link }: Props) {
  return (
    <div className="px-6 relative group">
      {link && (
        <Link href={link} target="_blank" className="absolute z-20 inset-0" />
      )}
      <div className="flex flex-col gap-1.5 justify-center items-center">
        <div className="size-16 rounded-lg border-2 group-hover:bg-secondary/50 group-hover:!border-foreground flex justify-center items-center p-2">
          {children}
        </div>
        {label && (
          <div className="flex items-center gap-2">
            <span className="text-center text-sm font-medium text-muted-foreground group-hover:underline">
              {label}
            </span>
            <ExternalLinkIcon className="size-3 text-muted-foreground group-hover:text-foreground" />
          </div>
        )}
      </div>
    </div>
  );
}
