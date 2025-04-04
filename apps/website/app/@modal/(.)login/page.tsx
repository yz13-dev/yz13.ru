import { LoginForm } from "@/app/login/login-form";
import ModalWrapper from "@/components/modal-wrapper";

const page = () => {
  return (
    <ModalWrapper className="space-y-0 px-6">
      <div className="py-6">
        <h1 className="text-4xl block font-medium">Вход</h1>
        <p className="text-base block text-secondary">
          Используйте свой аккаунт
        </p>
      </div>
      <LoginForm back />
    </ModalWrapper>
  );
};

export default page;
