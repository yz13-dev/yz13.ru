"use client";
import { redirect } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import Sidebar from "./sidebar";

const Page = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  // console.log(isTabletOrMobile);
  if (isTabletOrMobile) return <Sidebar />;
  else return redirect("/account/settings/general");
};

export default Page;
