"use client";

import { Input } from "mono/components/input";
import { ReactElement, useEffect } from "react";
import { FieldProvider, useField } from "./field.store";

type FieldProps = {
  children?: ReactElement<typeof FieldLabel | typeof FieldContent>[];
};

const Field = ({ children }: FieldProps) => {
  const field = useField();
  return (
    <FieldProvider value={field}>
      <div className="flex flex-row items-center gap-6 min-h-10">
        {children}
      </div>
    </FieldProvider>
  );
};

const FieldLabel = ({ children }: { children?: React.ReactNode }) => {
  return <div className="text-sm font-medium w-1/4">{children}</div>;
};

const FieldContent = ({
  children,
  type = "input",
}: {
  type?: "input";
  children?: ReactElement<
    typeof FieldValue | typeof FieldTrigger | typeof FieldInput
  >[];
}) => {
  const field = useField();
  useEffect(() => {
    field.setType(type);
  }, [type]);
  return (
    <div className="w-3/4 flex flex-row items-center justify-between gap-2">
      {children}
    </div>
  );
};

const FieldValue = ({ children }: { children?: React.ReactNode }) => {
  const { isEditing, type } = useField();
  if (isEditing && type === "input") return <FieldInput />;
  return <div className="text-sm font-normal text-secondary">{children}</div>;
};

const FieldInput = () => {
  return <Input placeholder="yz13" className="w-64 bg-yz-neutral-200" />;
};

const FieldTrigger = ({ children }: { children?: React.ReactNode }) => {
  const { setEditing, isEditing } = useField();
  if (isEditing)
    return (
      <button
        onClick={() => setEditing(false)}
        className="text-secondary text-sm hover:text-foreground"
      >
        Save
      </button>
    );
  return (
    <button
      onClick={() => setEditing(true)}
      className="text-secondary text-sm hover:text-foreground"
    >
      {children}
    </button>
  );
};

Field.displayName = "Field";
FieldLabel.displayName = "FieldLabel";
FieldContent.displayName = "FieldContent";
FieldValue.displayName = "FieldValue";
FieldInput.displayName = "FieldInput";
FieldTrigger.displayName = "FieldTrigger";

export {
  Field,
  FieldContent,
  FieldInput,
  FieldLabel,
  FieldTrigger,
  FieldValue,
};
