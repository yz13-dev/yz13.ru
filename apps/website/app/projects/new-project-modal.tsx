"use client";
import { createProject } from "@/actions/projects/projects";
import AutoTextarea from "@/components/auto-textarea";
import { ReleaseStage } from "@/const/releases";
import { Loader2Icon, PlusIcon, XIcon } from "lucide-react";
import { Button } from "mono/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "mono/components/dialog";
import { Input } from "mono/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "mono/components/select";
import { useToast } from "mono/components/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "yz13/cn";

const NewProjectModal = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [stage, setStage] = useState<ReleaseStage>("in_plans");
  const [type, setType] = useState<"app" | "widget">("app");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const router = useRouter();
  const handleUpload = async () => {
    try {
      setLoading(true);
      const newRelease = await createProject({
        name,
        description,
        stage,
        type,
      });
      if (newRelease) {
        setOpen(false);
        toast({
          title: "Проект успешно создан",
          description: "Вы можете просмотреть его в списке проектов",
          status: "success",
        });
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={loading ? true : open} onOpenChange={setOpen}>
      <DialogTrigger className="gap-2" asChild>
        <Button variant="outline" size="sm">
          <PlusIcon size={16} /> Добавить
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-sm space-y-4 mx-auto bg-background border rounded-2xl p-6">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Новый проект</DialogTitle>
          <DialogClose disabled={loading}>
            <XIcon size={16} />
          </DialogClose>
        </DialogHeader>
        <div className="flex flex-col items-center gap-2">
          <Select
            value={stage}
            onValueChange={(value) => setStage(value as ReleaseStage)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите статус проекта" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="in_plans">В планах</SelectItem>
              <SelectItem value="in_progress">В разработке</SelectItem>
              <SelectItem value="in_review">На обзоре</SelectItem>
              <SelectItem value="in_testing">Тестируется</SelectItem>
              <SelectItem value="released">Выпущено</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={type}
            onValueChange={(value) => setType(value as "app" | "widget")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите тип проекта" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="app">Приложение</SelectItem>
              <SelectItem value="widget">Виджет</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full">
          <Input
            placeholder="Название проекта"
            className="!rounded-b-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <AutoTextarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Описание проекта"
            className={cn(
              "px-3 py-1 rounded-b-lg w-full border-b border-x rounded-t-none",
              "outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-foreground",
            )}
          />
        </div>
        <DialogFooter className="gap-2 flex md:!flex-row flex-col-reverse">
          <DialogClose asChild className="md:!w-1/2 w-full">
            <Button disabled={loading}>Отмена</Button>
          </DialogClose>
          <Button
            disabled={loading}
            className="md:!w-1/2 w-full gap-2"
            variant="secondary"
            onClick={handleUpload}
          >
            {loading ? (
              <Loader2Icon size={16} className="animate-spin" />
            ) : (
              <PlusIcon size={16} />
            )}
            {loading ? "Добавляем..." : "Добавить"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectModal;
