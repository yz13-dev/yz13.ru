import { get } from "@vercel/edge-config";
import { getFullPricing } from "@yz13/api/pricing";
import ServicesStand from "./services-stand";


const ServicesDetails = async () => {
  const { data } = await getFullPricing();
  const sign = await get<string>("price-sign");
  const services = (data ?? []).sort((a, b) => a.price - b.price);
  return <ServicesStand sign={sign} services={services} />;
};

export default ServicesDetails;
