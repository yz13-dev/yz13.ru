import { ArrowLeftIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Tabs, TabsList, TabsTrigger } from "mono/components/tabs";
import Link from "next/link";

const CustomerData = ({ tab = "activities" }: { tab?: string }) => {
  return (
    <>
      <nav className="w-full h-fit flex items-center justify-between gap-2">
        <Button variant="ghost" size="sm" asChild className="gap-2">
          <Link href="/workspace/customers">
            <ArrowLeftIcon size={12} />
            Вернуться
          </Link>
        </Button>
        <Tabs defaultValue={tab}>
          <TabsList className="!rounded-b-none">
            <TabsTrigger value="activities">Взаимодействие</TabsTrigger>
            <TabsTrigger value="projects">Работы</TabsTrigger>
            <TabsTrigger value="invoices">Выплаты</TabsTrigger>
          </TabsList>
        </Tabs>
      </nav>
      <div className="w-full h-full flex flex-col gap-4 border rounded-xl"></div>
    </>
  );
};

export default CustomerData;
