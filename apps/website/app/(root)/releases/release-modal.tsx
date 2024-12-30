"use client";
import Modal from "@/components/modal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getRelease } from "./releases";

const ReleaseModal = ({ id }: { id: string }) => {
  const release = getRelease(id);
  const router = useRouter();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  const pathname = usePathname();
  if (!release) return null;
  return (
    <Modal
      className="p-3 max-w-md mx-auto rounded-xl border bg-background w-full"
      onClose={() => {
        newSearchParams.delete("id");
        if (newSearchParams.toString() === "") return router.push(pathname);
        else router.push(newSearchParams.toString());
      }}
    >
      <div className="size-12 shrink-0 rounded-md border bg-yz-neutral-100" />
    </Modal>
  );
};

export default ReleaseModal;
