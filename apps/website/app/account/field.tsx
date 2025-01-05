"use client";
import randomId from "@/lib/random-id";
import { Loader2Icon } from "lucide-react";
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
import { cn } from "yz13/cn";
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

const FieldValue = ({ children }: { children?: React.ReactNode }) => {
  return <span className="text-sm font-normal text-secondary">{children}</span>;
};

const FieldInput = ({
  placeholder = "",
  value,
  onValueChange,
}: {
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}) => {
  const isEditing = useField((state) => state.isEditing);
  if (!isEditing) return <FieldValue>{value ?? placeholder}</FieldValue>;
  return (
    <Input
      className="w-64 bg-yz-neutral-200"
      value={value}
      onChange={(e) => onValueChange && onValueChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};

type SelectOptions = {
  label: string;
  value: string;
}[];

const FieldSelect = ({
  placeholder = "",
  value,
  onValueChange,
  options = [],
}: {
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  options?: SelectOptions;
}) => {
  const id = randomId();
  const isEditing = useField((state) => state.isEditing);
  if (!isEditing) return <FieldValue>{value ?? placeholder}</FieldValue>;
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-64">
        <SelectValue placeholder={placeholder ?? "Select..."} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option, index) => (
            <SelectItem key={id + "-" + index} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const FieldTrigger = ({
  children,
  onAction,
  loading=false
}: {
  children?: React.ReactNode,
  loading?: boolean,
  onAction?: () => void
}) => {
  const setEditing = useField((state) => state.setEditing);
  const isEditing = useField((state) => state.isEditing);
  if (isEditing)
    return (
      <button
        disabled={loading}
        onClick={() => {
          setEditing(false)
          onAction && onAction()
        }}
        className={cn(
          "text-secondary text-sm hover:text-foreground",
          "disabled:text-secondary",
        )}
      >
        {loading && <Loader2Icon className="animate-spin" size={16} />}
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
  FieldSelect,
  FieldTrigger,
  FieldValue
};
