import { Button } from "mono/components/button";
import Link from "next/link";
import ContactForm from "./contact-form";

const page = () => {
  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <Button variant="outline" className="shrink-0" asChild>
        <Link href="/">Домой</Link>
      </Button>

      <ContactForm />
    </div>
  );
};

export default page;
