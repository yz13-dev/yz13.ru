import { LoginForm } from "@/app/login/login-form";
import ModalWrapper from "@/components/modal-wrapper";

const page = () => {
  return (
    <ModalWrapper className="space-y-0 pt-6">
      <div className="p-6">
        <h1 className="text-4xl block font-medium">Вход</h1>
        <p className="text-base block text-secondary">
          Используйте свой аккаунт
        </p>
      </div>
      <LoginForm back className="!px-0" />
    </ModalWrapper>
  );
};

export default page;
