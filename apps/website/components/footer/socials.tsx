import Link from "next/link";
import { links } from "../social-links";


export default function () {
  return (
    <div className="space-y-3">
      <span className="block text-muted-foreground">
        Социальные сети
      </span>
      <ul>
        {
          links.map((link) => (
            <li key={link.href} className="h-8 items-center">
              <Link
                target="_blank"
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <link.icon
                  size={16}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                />
                <span className="text-sm">
                  {link.name}
                </span>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
