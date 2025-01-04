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
          <Button variant="ghost" className="w-full">
            Profile
          </Button>
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
          <div className="flex flex-row items-center gap-6 min-h-10">
            <div className="w-1/4">
              <span className="text-sm font-medium">Username</span>
            </div>
            <div className="w-3/4 flex flex-row items-center justify-between gap-2">
              <span className="text-sm font-normal text-secondary">yz13</span>
              {/* <Input placeholder="yz13" className="w-64" /> */}
              <button className="text-secondary text-sm hover:text-foreground">
                Edit
              </button>
            </div>
          </div>
          <div className="flex flex-row items-center gap-6 min-h-10">
            <div className="w-1/4">
              <span className="text-sm font-medium">Email</span>
            </div>
            <div className="w-3/4 flex flex-row items-center justify-between gap-2">
              <span className="text-sm font-normal text-secondary">
                bot@example.com
              </span>
              {/* <Input placeholder="yz13" className="w-64" /> */}
              <button className="text-secondary text-sm hover:text-foreground">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
