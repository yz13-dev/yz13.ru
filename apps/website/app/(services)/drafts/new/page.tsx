import { Header } from "@/components/header";

const page = () => {
  return (
    <>
      <Header>
        <Header.Left className="gap-4" link="/drafts">
          <nav className="flex gap-3 items-center *:text-sm *:text-secondary">
            <span>Popular</span>
            <span>Newest</span>
            <span>Following</span>
          </nav>
        </Header.Left>
        <Header.Center></Header.Center>
        <Header.Right></Header.Right>
      </Header>

      <div className="p-3 space-y-3">
        <div className="w-full py-12 flex items-center justify-center flex-col gap-8">
          <span className="text-2xl font-medium">Create a new draft</span>
        </div>
      </div>
    </>
  );
};

export default page;
