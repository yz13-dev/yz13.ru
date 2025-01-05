import { Field, FieldContent, FieldLabel, FieldValue } from "../field";
import PositionField from "./position-field";
import UsernameField from "./username-field";

const page = () => {
  return (
    <>
      <div className="w-full space-y-6">
        <h1 className="text-2xl font-semibold">Account</h1>
        <div className="w-full space-y-3">
          <UsernameField />
          <Field>
            <FieldLabel>Email</FieldLabel>
            <FieldContent>
              <FieldValue>bot@example.com</FieldValue>
            </FieldContent>
          </Field>
          <PositionField />
        </div>
      </div>
    </>
  );
};

export default page;
