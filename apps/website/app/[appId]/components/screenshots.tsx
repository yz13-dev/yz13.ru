import { getAppScreenshots } from "@/lib/app-screenshots";
import { cdn } from "@/lib/cdn";
import Image from "next/image";

export default async function Screenshots({ appId }: { appId: string }) {
  const screenshots = await getAppScreenshots(appId);
  return (
    <div className="h-fit flex items-center gap-3">
      {screenshots.map((screenshot, index) => (
        <Image
          key={screenshot}
          src={cdn(screenshot)}
          fill
          alt=""
          className="h-full !static !block object-cover"
        />
      ))}
    </div>
  );
}
