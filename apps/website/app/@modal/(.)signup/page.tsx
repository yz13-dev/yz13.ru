import { SignupForm } from "@/app/signup/signup-form";
import ModalWrapper from "@/components/modal-wrapper";
import { DialogDescription, DialogTitle } from "mono/components/dialog";

const page = () => {
  return (
    <ModalWrapper className="space-y-0 px-6">
      <div className="py-6">
        <DialogTitle className="text-4xl font-medium">Создать аккаунт</DialogTitle>
        <DialogDescription className="text-base text-muted-foreground">
          Введите свой адрес электронной почты и пароль
        </DialogDescription>
      </div>
      <SignupForm back />
    </ModalWrapper>
  );
};

export default page;
