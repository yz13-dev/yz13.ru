import { XIcon } from "lucide-react";
import { Checkbox } from "mono/components/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "mono/components/dialog";
import { Label } from "mono/components/label";

const Todos = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md bg-background border rounded-2xl p-4 mx-auto">
        <DialogHeader className="flex w-full flex-row items-center justify-between">
          <DialogTitle>Задачи</DialogTitle>
          <DialogClose>
            <XIcon size={16} />
          </DialogClose>
        </DialogHeader>
        <div className="py-4">
          <ul className="w-full space-y-2">
            <li>
              <div className="w-full flex items-center gap-2">
                <Checkbox id="task-1" />
                <Label htmlFor="task-1" className="text-sm">
                  Задача 1
                </Label>
              </div>
            </li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Todos;
