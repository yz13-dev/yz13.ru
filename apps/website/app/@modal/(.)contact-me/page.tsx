import ContactForm from "@/app/contact-me/contact-form";
import ModalWrapper from "@/components/modal-wrapper";
import { auth } from "@/lib/auth";

const page = async () => {
  const user = await auth();
  const email = user?.email;
  return (
    <ModalWrapper>
      <ContactForm userEmail={email} />
    </ModalWrapper>
  );
};

export default page;
