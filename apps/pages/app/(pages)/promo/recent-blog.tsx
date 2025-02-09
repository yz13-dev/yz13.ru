import { ArrowRightIcon } from "lucide-react";
import { Button } from "mono/components/button";

const RecentBlog = () => {
  return (
    <section className="hover:bg-background-back transition-colors">
      <div className="container mx-auto w-full px-6 py-12 flex items-start justify-between gap-4">
        <div className="lg:!w-1/2 w-full flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="text-base text-secondary">8 Февраля 2025</span>
          </div>
          <h4 className="text-4xl font-medium">
            Новое приложение, "Pages" - библиотека страниц и компонентов.
          </h4>
          <div className="flex items-center mt-6 gap-2">
            <div className="size-10 rounded-full border" />
            <div className="flex flex-col">
              <span className="text-base font-medium">YZ13</span>
              <span className="text-xs text-secondary">Разработчик</span>
            </div>
          </div>
        </div>
        <Button variant="outline" size="icon">
          <ArrowRightIcon size={16} />
        </Button>
      </div>
    </section>
  );
};

export default RecentBlog;
