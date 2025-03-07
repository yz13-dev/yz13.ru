import dayjs from "dayjs";
import { redirect } from "next/navigation";

const page = () => {
  const today = dayjs().locale("ru").format("YYYY-MM-DD");
  return redirect(`/calendar/${today}`);
};
export default page;
