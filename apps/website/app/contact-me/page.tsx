import { auth } from "@/lib/auth";
import { get } from "@vercel/edge-config";
import { redirect } from "next/navigation";
import ContactForm from "./contact-form";

const page = async () => {
  const user = await auth();
  const email = user?.email;
  const busy = (await get<boolean>("busy")) ?? false;
  if (busy) return redirect("/");
  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <ContactForm userEmail={email} />
    </div>
  );
};

export default page;
