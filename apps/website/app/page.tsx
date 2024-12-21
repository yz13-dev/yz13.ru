import { Logo } from "@/components/logo"
import User from "@/components/user"
import { ArrowRightIcon, BriefcaseBusinessIcon, ClockIcon, EllipsisIcon, GlobeIcon } from "lucide-react"
import { Button } from "mono/components/button"
import { Checkbox } from "mono/components/checkbox"
import { Label } from "mono/components/label"
import { RadioGroup, RadioGroupItem } from "mono/components/radio-group"
import { PiGithubLogoDuotone, PiTelegramLogoDuotone, PiTwitterLogoDuotone } from "react-icons/pi"

const page = () => {
  return (
    <>
      <header className="w-full max-w-4xl mx-auto mt-24 h-16 sticky top-0 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo className="size-9" />
          <span className="font-pixel text-2xl">YZ13</span>
        </div>
        <div className="flex items-center gap-2">
          <User />
        </div>
      </header>
      <div
        className="h-fit w-full p-3 max-w-4xl mx-auto min-h-[calc(100dvh - 64px)] space-y-6"
      >
        <div className="flex items-center justify-between px-3">
          <span className="text-base font-medium">December, 21 2024</span>
          <span className="text-sm text-secondary">Today</span>
        </div>
        <section className="w-full flex flex-row gap-6">
          <div className="w-fit rounded-xl border h-fit p-1 flex flex-col gap-1">
            <div className="p-2 space-y-2 rounded-lg bg-yz-neutral-100 hover:bg-yz-neutral-200 cursor-pointer border border-transparent hover:border-yz-neutral-300">
              <ClockIcon size={18} />
              <span className="text-sm inline-block">12:00</span>
            </div>
            <div className="p-2 space-y-2 rounded-lg bg-yz-neutral-100 hover:bg-yz-neutral-200 cursor-pointer border border-transparent hover:border-yz-neutral-300">
              <PiGithubLogoDuotone size={18} />
              <span className="text-sm inline-flex items-center gap-2">YZ13-ENV</span>
            </div>
            <div className="p-2 space-y-2 rounded-lg bg-yz-neutral-100 hover:bg-yz-neutral-200 cursor-pointer border border-transparent hover:border-yz-neutral-300">
              <PiTelegramLogoDuotone size={18} />
              <span className="text-sm inline-flex items-center gap-2">YZTHECEO</span>
            </div>
            <div className="p-2 space-y-2 rounded-lg bg-yz-neutral-100 hover:bg-yz-neutral-200 cursor-pointer border border-transparent hover:border-yz-neutral-300">
              <PiTwitterLogoDuotone size={18} />
              <span className="text-sm inline-flex items-center gap-2">YZ13_DEV</span>
            </div>
          </div>
          <RadioGroup defaultValue="frontend" className="w-full h-fit flex items-start justify-between gap-2">
            <div className="w-1/3 flex flex-col gap-2">
              <div className="border w-full rounded-xl p-3 flex flex-row items-start gap-2 hover:bg-yz-neutral-200 hover:border-yz-neutral-300">
                <RadioGroupItem value="frontend" id="r1" className="mt-1" />
                <div className="w-full space-y-1">
                  <Label htmlFor="r1" className="text-sm">Frontend</Label>
                  <span className="block text-sm text-secondary">$40</span>
                </div>
              </div>
              <div className="w-full h-fit rounded-xl border p-3">
                <ul className="space-y-2">
                  <li>
                    <div className="flex items-center gap-2">
                      <Checkbox checked aria-readonly="true" className="rounded-full" />
                      <span className="text-sm">Website</span>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-2">
                      <Checkbox checked aria-readonly="true" className="rounded-full" />
                      <span className="text-sm">Componets</span>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-2">
                      <Checkbox checked aria-readonly="true" className="rounded-full" />
                      <span className="text-sm">UI-kit</span>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-2">
                      <Checkbox checked aria-readonly="true" className="rounded-full" />
                      <span className="text-sm">Connect to API</span>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-2">
                      <Checkbox checked aria-readonly="true" className="rounded-full" />
                      <span className="text-sm">Authentication</span>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-2">
                      <Checkbox checked aria-readonly="true" className="rounded-full" />
                      <span className="text-sm">Request work</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-1/3 flex flex-col gap-2">
              <div className="border w-full rounded-xl p-3 flex flex-row items-start gap-2">
                <RadioGroupItem value="backend" id="r2" className="mt-1" />
                <div className="w-full space-y-1">
                  <Label htmlFor="r2" className="text-sm">Backend</Label>
                  <span className="block text-sm text-secondary">$20</span>
                </div>
              </div>
              <div className="w-full h-fit rounded-xl border p-3">
                <ul className="space-y-2">
                  <li>
                    <div className="flex items-center gap-2">
                      <Checkbox checked aria-readonly="true" className="rounded-full" />
                      <span className="text-sm">REST-API</span>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-2">
                      <Checkbox checked aria-readonly="true" className="rounded-full" />
                      <span className="text-sm">Caching</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-1/3 flex flex-col gap-2">
              <div className="border w-full rounded-xl p-3 flex flex-row items-start gap-2">
                <RadioGroupItem value="fullstack" id="r3" className="mt-1" />
                <div className="w-full space-y-1">
                  <Label htmlFor="r3" className="text-sm">Fullstack</Label>
                  <div className="flex items-center gap-2">
                    <span className="block text-sm text-secondary">$40</span>
                    <span className="block text-sm text-secondary/50 line-through">$60</span>
                  </div>
                </div>
              </div>
              <div className="w-full h-fit rounded-xl border p-3">
                <ul className="space-y-2">
                  <li>
                    <div className="flex items-center gap-2">
                      <Checkbox checked aria-readonly="true" className="rounded-full" />
                      <span className="text-sm">Website</span>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-2">
                      <Checkbox checked aria-readonly="true" className="rounded-full" />
                      <span className="text-sm">Componets</span>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-2">
                      <Checkbox checked aria-readonly="true" className="rounded-full" />
                      <span className="text-sm">UI-kit</span>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-2">
                      <Checkbox checked aria-readonly="true" className="rounded-full" />
                      <span className="text-sm">Connect to API</span>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-2">
                      <Checkbox checked aria-readonly="true" className="rounded-full" />
                      <span className="text-sm">Authentication</span>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-2">
                      <Checkbox checked aria-readonly="true" className="rounded-full" />
                      <span className="text-sm">Request work</span>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-2">
                      <Checkbox checked aria-readonly="true" className="rounded-full" />
                      <span className="text-sm">REST-API</span>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-2">
                      <Checkbox checked aria-readonly="true" className="rounded-full" />
                      <span className="text-sm">Caching</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </RadioGroup>
        </section>
        <section className="w-full space-y-3">
          <div className="w-full flex items-center justify-between px-3">
            <h3 className="text-sm inline-flex items-center gap-2"><BriefcaseBusinessIcon size={16} /> Works</h3>
            <Button className="rounded-full size-6 p-0" size="icon" variant="ghost">
              <ArrowRightIcon size={14} />
            </Button>
          </div>
          <div className="grid w-full gap-3 grid-cols-3">
            <div className="w-full rounded-xl p-1 space-y-1 border">
              <div className="w-full rounded-xl bg-yz-neutral-100 hover:bg-yz-neutral-200 border border-transparent hover:border-yz-neutral-300 aspect-[16/10]"></div>
              <div className="flex flex-col gap-2 p-1">
                <div className="w-full flex items-center gap-2">
                  <GlobeIcon size={16} />
                  <span className="text-sm">Website</span>
                </div>
                <div className="w-full flex items-center justify-between pl-6 gap-2">
                  <span className="text-xs text-secondary">Updated years ago</span>
                  <EllipsisIcon size={16} />
                </div>
              </div>
            </div>

            <div className="w-full rounded-xl p-1 space-y-1 border">
              <div className="w-full rounded-xl bg-yz-neutral-100 hover:bg-yz-neutral-200 border border-transparent hover:border-yz-neutral-300 aspect-[16/10]"></div>
              <div className="flex flex-col gap-2 p-1">
                <div className="w-full flex items-center gap-2">
                  <GlobeIcon size={16} />
                  <span className="text-sm">Website</span>
                </div>
                <div className="w-full flex items-center justify-between pl-6 gap-2">
                  <span className="text-xs text-secondary">Updated years ago</span>
                  <EllipsisIcon size={16} />
                </div>
              </div>
            </div>

            <div className="w-full rounded-xl p-1 space-y-1 border">
              <div className="w-full rounded-xl bg-yz-neutral-100 hover:bg-yz-neutral-200 border border-transparent hover:border-yz-neutral-300 aspect-[16/10]"></div>
              <div className="flex flex-col gap-2 p-1">
                <div className="w-full flex items-center gap-2">
                  <GlobeIcon size={16} />
                  <span className="text-sm">Website</span>
                </div>
                <div className="w-full flex items-center justify-between pl-6 gap-2">
                  <span className="text-xs text-secondary">Updated years ago</span>
                  <EllipsisIcon size={16} />
                </div>
              </div>
            </div>
          </div>

        </section>
      </div>
    </>
  )
}

export default page
