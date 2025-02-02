import { Header } from "@/components/header";
import NewDraftForm from "./new-draft-form";

const page = () => {
  return (
    <>
      <Header>
        <Header.Left
          className="gap-4"
          title="Drafts"
          logo={{
            light: "/apps/yz-drafts-light.svg",
            dark: "/apps/yz-drafts-dark.svg",
          }}
        >
          <nav className="flex gap-3 items-center *:text-sm *:text-secondary">
            <span>Популярные</span>
            <span>Новые</span>
            <span>Подписки</span>
          </nav>
        </Header.Left>
        <Header.Center></Header.Center>
        <Header.Right></Header.Right>
      </Header>

      <div className="p-6 min-h-[calc(100dvh-64px)] space-y-6">
        <NewDraftForm />
      </div>
    </>
  );
};

export default page;
