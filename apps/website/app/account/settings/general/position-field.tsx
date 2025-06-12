"use client";
import { createClient } from "@yz13/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldSelect,
} from "../field";
import { useUserStore } from "../user.store";

const positions = [
  {
    label: "Frontend developer",
    value: "frontend",
  },
  {
    label: "Backend developer",
    value: "backend",
  },
  {
    label: "Fullstack developer",
    value: "fullstack",
  },
  {
    label: "UI/UX designer",
    value: "ui",
  },
  {
    label: "Product manager",
    value: "product",
  },
  {
    label: "Marketing",
    value: "marketing",
  },
  {
    label: "Sales",
    value: "sales",
  },
];

const PositionField = () => {
  const user = useUserStore((state) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const initialValue = "";
  const [position, setPosition] = useState(initialValue);
  const supabase = createClient();
  const router = useRouter();
  const handlePosition = async (position: string) => {
    const target = positions.find((p) => p.value === position);
    if (!target) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: { position: target.label },
      });
      if (error) throw error;
      if (data) router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Field>
        <div className="space-y-0 *:block">
          <FieldLabel>Профессия</FieldLabel>
          <FieldDescription>
            Необезательно, но она отображается вместо почты в списке
            пользователей.
          </FieldDescription>
        </div>
        <FieldContent>
          <FieldSelect
            value={position}
            onValueChange={(value) => setPosition(value)}
            placeholder="Ваша позиция..."
            options={positions}
          />
        </FieldContent>
      </Field>
    </>
  );
};

export default PositionField;
