import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "mono/components/resizable";
import { redirect } from "next/navigation";
import { Fragment } from "react";
import { getView, ViewKey } from "./views";

type PageProps = {
  params: Promise<{
    chatId: string;
    view: string[];
  }>;
};
const page = async ({ params }: PageProps) => {
  const { view: views, chatId } = await params
  // .filter((view) => viewKeys.includes(view));
  if (views.length === 0) return redirect(`/${chatId}`);
  const onlyUniqueViews = [...new Set(views)];
  if (onlyUniqueViews.length !== views.length)
    return redirect(`/${chatId}/split/${onlyUniqueViews.join("/")}`);
  else
    return (
      <div className="w-full h-dvh">
        <ResizablePanelGroup direction="horizontal">
          {views.map((viewKey, index, arr) => {
            const isFirst = index === 0;
            const isLast = arr.length - 1 === index;
            const view = getView(viewKey as ViewKey);
            const View = view;
            return (
              <Fragment key={index}>
                {!isFirst && <ResizableHandle withHandle />}
                <ResizablePanel minSize={10} className="h-full">
                  <div className="w-full h-full overflow-y-auto">
                    {View && <View params={{ chatId }} />}
                  </div>
                </ResizablePanel>
              </Fragment>
            );
          })}
        </ResizablePanelGroup>
      </div>
    );
};

export default page;
