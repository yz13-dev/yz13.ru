import { get } from "@vercel/edge-config";
import { getV1Pricing } from "@yz13/api";
import ServicesStand from "./services-stand";


const ServicesDetails = async () => {
  const { data } = await getV1Pricing();
  const sign = await get<string>("price-sign");
  const services = (data ?? []).sort((a, b) => a.price - b.price);
  return <ServicesStand sign={sign} services={services} />;
};

export default ServicesDetails;
