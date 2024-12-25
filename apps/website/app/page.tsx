import { permanentRedirect } from "next/navigation";

const page = () => {
  return permanentRedirect("/discover");
};

export default page;