import { Button } from "mono/components/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldValue,
} from "../field";
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
          <UsernameField />
          <Field>
            <FieldLabel>Почта</FieldLabel>
            <FieldDescription>
              Почту изменять нельзя, но она отображается вместо профессии, если
              она не указана.
            </FieldDescription>
            <FieldContent>
              <FieldValue>bot@example.com</FieldValue>
            </FieldContent>
          </Field>
          <PositionField />
          <div className="flex flex-row gap-2 items-center justify-between">
            <span className="text-sm text-foreground">
              Изменения применятся сразу после сохранения
            </span>
            <Button>Сохранить</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
