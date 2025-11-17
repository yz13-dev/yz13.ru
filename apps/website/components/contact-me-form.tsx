import { github, telegram, x } from "@/const/socials";
import { cn } from "@yz13/ui/cn";
import { ExternalLinkIcon } from "@yz13/ui/icons";
import Link from "next/link";
import QRCode from "react-qr-code";
import ContactForm from "./contact-form";


export default function ContactMeForm() {
  return (
    <section className="max-w-4xl mx-auto overflow-hidden bg-card border rounded-3xl">
      <div className="flex lg:flex-row flex-col">
        <div
          className={cn(
            "lg:max-w-2xs max-w-full w-full lg:border-r border-r-0 lg:border-b-0 border-b",
            "flex lg:flex-col sm:flex-row flex-col justify-between",
          )}
        >
          <div>
            <div className="*:block space-y-2 px-6 pt-6">
              <h3 className="text-2xl font-medium text-foreground">
                Готов работать над фронтендом
              </h3>
              <p className="text-lg text-muted-foreground">
                Чем могу помочь?
              </p>
            </div>
            <ul className="*:py-1 p-6">
              <li className="group">
                <Link
                  href={telegram}
                  target="_blank"
                  className="text-lg inline-flex items-center gap-2 hover:underline [&>svg]:size-4"
                >
                  Telegram
                  <ExternalLinkIcon className="transition-colors text-muted-foreground group-hover:text-foreground" />
                </Link>
              </li>
              <li className="group">
                <Link
                  href={github}
                  target="_blank"
                  className="text-lg inline-flex items-center gap-2 hover:underline [&>svg]:size-4"
                >
                  Github
                  <ExternalLinkIcon className="transition-colors text-muted-foreground group-hover:text-foreground" />
                </Link>
              </li>
              <li className="group">
                <Link
                  href={x}
                  target="_blank"
                  className="text-lg inline-flex items-center gap-2 hover:underline [&>svg]:size-4"
                >
                  X
                  <ExternalLinkIcon className="transition-colors text-muted-foreground group-hover:text-foreground" />
                </Link>
              </li>
            </ul>
          </div>
          <div className="px-6 lg:pt-0 pt-6 pb-6">
            <div className="size-full sm:max-w-full max-w-2xs p-6 rounded-2xl bg-card border">
              <QRCode
                className="aspect-square"
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={telegram}
                viewBox={`0 0 256 256`}
              />
            </div>
          </div>
        </div>
        <div className="w-full px-6 pt-6 pb-2 flex flex-col justify-between">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
