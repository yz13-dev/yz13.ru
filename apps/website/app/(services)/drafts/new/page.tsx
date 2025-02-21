import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import NewDraftForm from "./new-draft-form";

const page = async () => {
  const user = await auth();
  if (!user) return redirect("/drafts");
  const uid = user?.id;
  const userName = user?.user_metadata?.username;
  const email = user?.email;
  const avatarUrl = user?.user_metadata?.avatar_url;
  return (
    <>
      <div className="p-6 min-h-[calc(100dvh-64px)] space-y-6">
        <NewDraftForm
          uid={uid}
          avatarUrl={avatarUrl}
          email={email}
          userName={userName}
        />
      </div>
    </>
  );
};

export default page;
