import { permanentRedirect } from "next/navigation";

const page = () => {
  return permanentRedirect("/account/settings/general");
};

export default page;
