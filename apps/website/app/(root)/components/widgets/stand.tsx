import { getWiget } from "@/app/[appId]/registry";
import GitHubActivityMap from "../github-activity-map";
import NewsChart from "../news-chart";
import { Stand, TabsProvider } from "./tabs";

const getWidgets = () => {
  const OgsWidget = getWiget("ogs")

  return [
    {
      value: "activity",
      title: "Активность",
      description: "Календарь активности GitHub.",
      content: <GitHubActivityMap username="yz13-dev" blockSize={24} blockRadius={6} />
    },
    {
      value: "news",
      title: "Кол-во новостей",
      description: "Кол-во новых новостей по месяцам.",
      content: <NewsChart />
    },
    {
      value: "ogs",
      title: "Новые OGs",
      description: "Новые OGs по месяцам.",
      content: OgsWidget ? <OgsWidget className="lg:grid-cols-4 grid-cols-2" title={false} /> : null
    }
  ]
}

export default function StandWidget() {
  const widgets = getWidgets()

  return (
    <TabsProvider>
      <Stand
        widgets={widgets}
        title="Виджеты"
        description="Последние добавленные виджеты."
        defaultSelected="activity"
        showDescription={true}
        buttonSize="lg"
        layout="horizontal"
      />
    </TabsProvider>
  )
}
