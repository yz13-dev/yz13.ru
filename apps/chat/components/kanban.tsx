"use client";
import {
  createContext,
  forwardRef,
  ReactElement,
  ReactNode,
  useContext,
} from "react";
import { cn } from "yz13/cn";

const KanbanContext = createContext({});

const useKanban = () => {
  const context = useContext(KanbanContext);
  if (!context)
    throw new Error("useKanban must be used within a KanbanProvider");
  return context;
};

const KanbanProvider = ({ children }: { children?: ReactNode }) => {
  return <KanbanContext.Provider value={{}}>{children}</KanbanContext.Provider>;
};

type KanbanProps = {
  className?: string;
  children?:
    | ReactElement<typeof KanbanColumn>
    | ReactElement<typeof KanbanColumn>[];
};
const Kanban = ({ children, className = "" }: KanbanProps) => {
  return (
    <KanbanProvider>
      <div
        className={cn(
          "w-full flex gap-4 overflow-x-auto no-scrollbar",
          className,
        )}
      >
        {children}
      </div>
    </KanbanProvider>
  );
};

type KanbanColumnProps = {
  label?: string;
  column: string;
  children?:
    | ReactElement<typeof KanbanColumnCard>
    | ReactElement<typeof KanbanColumnCard>[];
  className?: string;
};

const KanbanColumn = ({
  column,
  label,
  children,
  className = "",
}: KanbanColumnProps) => {
  return (
    <div
      className={cn(
        "w-80 h-fit rounded-xl shrink-0 border p-2 space-y-2",
        className,
      )}
    >
      <div className="w-full px-2">
        <span className="text-sm">{label}</span>
      </div>
      {children && <ul className={cn("flex flex-col gap-2")}>{children}</ul>}
    </div>
  );
};

export interface KanbanColumnCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const KanbanColumnCard = forwardRef<HTMLDivElement, KanbanColumnCardProps>(
  ({ className = "", ...props }, ref) => {
    return null;
  },
);

export { Kanban, KanbanColumn, KanbanColumnCard };
