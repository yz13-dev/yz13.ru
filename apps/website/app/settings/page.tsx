import { LockIcon, SkullIcon, UserCircleIcon } from "lucide-react";
import { Button } from "mono/components/button";
import PublicHeader from "../(root)/header";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTrigger,
  FieldValue,
} from "./field";

const page = () => {
  return (
    <>
      <PublicHeader className="max-w-4xl mx-auto lg:!mt-24 mt-0" />
      <div className="max-w-4xl mx-auto p-3 flex sm:!flex-row flex-col gap-6">
        <aside className="flex flex-col gap-2 w-72">
          <span className="text-sm text-secondary pl-4">User settings</span>
          <div className="w-full space-y-1 *:!justify-start">
            <Button variant="ghost" className="w-full gap-2">
              <UserCircleIcon size={16} />
              Profile
            </Button>
            <Button variant="ghost" className="w-full gap-2">
              <LockIcon size={16} />
              Password
            </Button>
            <Button variant="ghost" className="w-full gap-2">
              <SkullIcon size={16} />
              Danger zone
            </Button>
          </div>
        </aside>
        <div className="w-full space-y-6">
          <h1 className="text-2xl font-semibold">Settings</h1>
          <Field>
            <FieldLabel>Username</FieldLabel>
            <FieldContent>
              <FieldValue>YZ13</FieldValue>
              <FieldTrigger>Edit</FieldTrigger>
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <FieldContent>
              <FieldValue>bot@example.com</FieldValue>
            </FieldContent>
          </Field>
          <Field type="select">
            <FieldLabel>Position</FieldLabel>
            <FieldContent>
              <FieldValue>Select...</FieldValue>
              <FieldTrigger>Edit</FieldTrigger>
            </FieldContent>
          </Field>
        </div>
      </div>
    </>
  );
};

export default page;
