"use client";
import { Input } from "mono/components/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "mono/components/select";
import { ReactElement } from "react";
import { FieldProvider, FieldType, useField } from "./field.store";

type FieldProps = {
  children?: ReactElement<typeof FieldLabel | typeof FieldContent>[];
  type?: FieldType;
};

const Field = ({ type = "input", children }: FieldProps) => {
  return (
    <FieldProvider type={type}>
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
}: {
  children?:
    | ReactElement<
        typeof FieldValue | typeof FieldTrigger | typeof FieldInput
      >[]
    | ReactElement<typeof FieldValue | typeof FieldTrigger | typeof FieldInput>;
}) => {
  return (
    <div className="w-3/4 flex flex-row items-center justify-between gap-2">
      {children}
    </div>
  );
};

const FieldValue = ({
  children,
  placeholder = "",
}: {
  placeholder?: string;
  children?: React.ReactNode;
}) => {
  const isEditing = useField((state) => state.isEditing);
  const type = useField((state) => state.type);
  if (isEditing && type === "select")
    return <FieldSelect placeholder={placeholder} />;
  if (isEditing && type === "input")
    return <FieldInput placeholder={placeholder} />;
  return <div className="text-sm font-normal text-secondary">{children}</div>;
};

const FieldInput = ({ placeholder = "" }: { placeholder?: string }) => {
  return <Input className="w-64 bg-yz-neutral-200" placeholder={placeholder} />;
};

const FieldSelect = ({ placeholder = "" }: { placeholder?: string }) => {
  return (
    <Select>
      <SelectTrigger className="w-64">
        <SelectValue placeholder={placeholder ?? "Select..."} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="1">Option 1</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const FieldTrigger = ({ children }: { children?: React.ReactNode }) => {
  const setEditing = useField((state) => state.setEditing);
  const isEditing = useField((state) => state.isEditing);
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
