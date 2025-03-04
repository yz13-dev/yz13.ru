import CustomerData from "./customer-data";
import CustomerInfo from "./customer-info";

type PageProps = {
  searchParams: {
    tab?: string;
  };
};
const page = ({ searchParams }: PageProps) => {
  const tab = searchParams.tab ?? "activities";
  return (
    <div className="w-full flex lg:!flex-row flex-col gap-4">
      <div className="lg:!w-1/3 w-full h-fit space-y-8">
        <CustomerInfo />
      </div>
      <div className="lg:!w-2/3 w-full h-fit">
        <CustomerData tab={tab} />
      </div>
    </div>
  );
};

export default page;
