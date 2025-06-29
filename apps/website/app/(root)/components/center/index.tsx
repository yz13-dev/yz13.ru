"use client"
import { AnimatePresence } from "motion/react";
import Button from "./button";
import Overlay from "./overlay";
import Row from "./row";
import { useCenterStore } from "./store";

export default function () {
  const open = useCenterStore((state) => state.open)

  return (
    <>
      <AnimatePresence>
        {
          open &&
          <Overlay>
            <div>
              <div className="w-full bg-secondary h-56 rounded-md"></div>
            </div>
            <div>
              <div className="w-full grid grid-cols-2 gap-6">
                <div className="w-full bg-secondary h-56 rounded-md"></div>
                <div className="w-full bg-secondary h-56 rounded-md"></div>
              </div>
            </div>
          </Overlay>
        }
      </AnimatePresence>
      <div className="flex items-center gap-2">
        <Row>
          <Button />
        </Row>
      </div>
    </>
  )
}
