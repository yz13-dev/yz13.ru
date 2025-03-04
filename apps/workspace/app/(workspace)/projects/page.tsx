import { Kanban, KanbanColumn } from "@/components/kanban";

const page = () => {
  return (
    <>
      <header className="w-full h-fit flex items-center justify-between">
        <h1 className="text-2xl font-medium text-foreground">Проекты</h1>
      </header>
      <Kanban>
        <KanbanColumn column="in_queue" label="В очереди"></KanbanColumn>
        <KanbanColumn column="in_progress" label="В работе" />
        <KanbanColumn column="in_tests" label="Тестируется" />
        <KanbanColumn column="in_review" label="На обзоре" />
        <KanbanColumn column="done" label="Выполнено" />
      </Kanban>
    </>
  );
};

export default page;
