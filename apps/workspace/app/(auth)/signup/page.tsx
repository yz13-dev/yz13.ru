import { Input } from "mono/components/input";

const page = () => {
  return (
    <div className="w-full h-dvh flex items-center flex-row bg-background-secondary">
      <div className="w-full max-w-screen-lg divide-x h-fit border rounded-lg mx-auto bg-background grid grid-cols-2 gap-6 *:p-6">
        <div className="w-full h-full space-y-2.5">
          <h1 className="text-2xl font-semibold text-foreground">
            Регистрация
          </h1>
          <p className="text-sm text-secondary">
            Для продолжения необходимо указать ключ регистрации
          </p>
        </div>
        <div className="w-full h-full">
          <Input placeholder="Ключ регистрации" />
        </div>
      </div>
    </div>
  );
};

export default page;
