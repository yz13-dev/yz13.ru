import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldValue,
} from "../field";
import AvatarField from "./avatar-field";
import PositionField from "./position-field";
import UsernameField from "./username-field";

const page = () => {
  return (
    <>
      <div className="w-full space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Аккаунт</h2>
          <p className="text-sm text-foreground">
            Публичные данные вашего аккаунта
          </p>
        </div>
        <div className="w-full border rounded-lg bg-background *:p-3 divide-y">
          <AvatarField />
          <UsernameField />
          <Field>
            <div className="space-y-0 *:block">
              <FieldLabel>Почта</FieldLabel>
              <FieldDescription>
                Почту изменять нельзя, но она отображается вместо профессии,
                если она не указана.
              </FieldDescription>
            </div>
            <FieldContent>
              <FieldValue>bot@example.com</FieldValue>
            </FieldContent>
          </Field>
          <PositionField />
          {/* <div className="flex flex-row gap-2 items-center justify-between">
            <span className="text-sm text-foreground">
              Изменения применятся сразу после сохранения
            </span>
            <Button>Сохранить</Button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default page;
