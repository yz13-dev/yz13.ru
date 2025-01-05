import { permanentRedirect } from "next/navigation";

const page = () => {
  return permanentRedirect("/account/general");
};

export default page;
