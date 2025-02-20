import { auth } from "@/lib/auth";
import NewDraftForm from "./new-draft-form";

const page = async () => {
  const user = await auth();
  const uid = user?.id;
  return (
    <>
      <div className="p-6 min-h-[calc(100dvh-64px)] space-y-6">
        <NewDraftForm uid={uid} />
      </div>
    </>
  );
};

export default page;
