"use client"
import { Badge } from "@yz13/ui/badge";
import { Button } from "@yz13/ui/button";
import { DrawerDescription, DrawerFooter, DrawerTitle } from "@yz13/ui/drawer";
import { CheckIcon, CopyIcon } from "@yz13/ui/icons";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { Json } from "../schemas/link.schema";



export default function ({ link, id }: { link: Json, id: string }) {

  const url = `https://yz13.link/${id}`;

  const [copied, setCopied] = useState<boolean>(false);

  const copy = () => {
    try {
      navigator.clipboard.writeText(url);
      setCopied(true);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  }

  return (
    <>
      <div className="w-full aspect-square flex items-center justify-center px-3 py-6">
        <div className="rounded-xl bg-secondary w-full p-4 space-y-4">
          <div className="p-4 rounded-xl bg-background">
            <QRCodeSVG value={url} className="size-full" bgColor="transparent" />
          </div>
          <div className="flex justify-center">
            <span className="text-sm text-center w-full font-medium text-muted-foreground">Наведите камеру на QR-код</span>
          </div>
        </div>
      </div>
      <div className="w-full px-3 pb-6 space-y-3">
        {
          link.profession &&
          <Badge variant="secondary">{link.profession}</Badge>
        }
        <div className="*:block space-y-1">
          <DrawerTitle className="text-2xl font-medium">
            {link.user.fullname ? link.user.fullname : (link.user.username || "Username")}
          </DrawerTitle>
          <span className="text-base font-medium text-muted-foreground">@{link.user.username}</span>
        </div>
        {
          link.user.description &&
          <DrawerDescription>{link.user.description}</DrawerDescription>
        }
      </div>
      <DrawerFooter className="w-full px-3 pb-6">
        <Button className="w-full" size="lg" onClick={copy} disabled={copied}>
          {
            copied
              ? <CheckIcon />
              : <CopyIcon />
          }
          <span>Скопировать</span>
        </Button>
      </DrawerFooter>
    </>
  )
}
