import { SignupForm } from "@/app/signup/signup-form";
import ModalWrapper from "@/components/modal-wrapper";

const page = () => {
  return (
    <ModalWrapper className="space-y-0 px-6">
      <div className="py-6">
        <h1 className="text-4xl font-medium">Создать аккаунт</h1>
        <p className="text-base text-secondary">
          Введите свой адрес электронной почты и пароль
        </p>
      </div>
      <SignupForm back />
    </ModalWrapper>
  );
};

export default page;
