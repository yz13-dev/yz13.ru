import { Logo } from "@/components/logo";
import { SparklesText } from "@/components/sparkle-text";
import Availability from "./(root)/(public)/discover/availability";

const page = () => {
  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center gap-6">
      <div className="w-full max-w-lg space-y-6 p-6">
        <div className="flex items-start gap-3">
          <div className="flex flex-col gap-1">
            <div className="inline-flex items-center mb-2 gap-2 flex-wrap">
              <Logo size={{ width: 32, height: 32 }} />
              <span className="text-foreground text-xl font-pixel font-semibold">
                YZ13
              </span>
            </div>
            <span className="text-secondary text-xl font-medium">
              <SparklesText
                text="Фронтенд разработчик"
                className="text-foreground inline mr-2 text-xl font-medium"
              />
              {/* <span className="text-foreground">Фронтенд разработчик</span>, */}
              ничего серьезного.
            </span>
            <span className="text-secondary text-xl font-medium">
              На пути к фуллстеку.
            </span>
          </div>
        </div>
        <div className="w-full px-2">
          <Availability />
        </div>
      </div>
    </div>
  );
};

export default page;
