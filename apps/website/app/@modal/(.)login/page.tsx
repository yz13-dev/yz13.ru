import { LoginForm } from "@/app/login/login-form";
import ModalWrapper from "@/components/modal-wrapper";
import { DialogDescription, DialogTitle } from "mono/components/dialog";

const page = () => {
  return (
    <ModalWrapper className="space-y-0 px-6">
      <div className="py-6">
        <DialogTitle className="text-4xl block font-medium">Вход</DialogTitle>
        <DialogDescription className="text-base block text-muted-foreground">
          Используйте свой аккаунт
        </DialogDescription>
      </div>
      <LoginForm back />
    </ModalWrapper>
  );
};

export default page;
