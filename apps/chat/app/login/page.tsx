import { permanentRedirect } from "next/navigation";

const page = () => {
  return permanentRedirect(
    "https://yz13.ru/login?continue=https://chat.yz13.ru",
  );
};

export default page;
