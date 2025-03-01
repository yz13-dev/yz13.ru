"use client";
import { deleteProject, updateProject } from "@/actions/projects/projects";
import { Release } from "@/const/releases";
import { isEqual } from "lodash";
import { Edit3Icon, Loader2Icon, TrashIcon, XIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import useReleaseStore, { setEdit } from "./project.store";

type Props = {
  id: string;
  initialRelease: Release;
};
const ProjectControls = ({ id, initialRelease }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const edit = useReleaseStore((state) => state.edit);
  const router = useRouter();
  const release = useReleaseStore((state) => state.release);
  const noChanges = useMemo(
    () => isEqual(initialRelease, release) === true,
    [initialRelease, release],
  );
  const patchProject = async () => {
    if (!release) return;
    setLoading(true);
    try {
      await updateProject(id, release);
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  const removeProject = async () => {
    setLoading(true);
    try {
      await deleteProject(id);
      router.push("/projects");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  if (edit) {
    return (
      <>
        <Button variant="secondary" size="icon" onClick={() => setEdit(false)}>
          <XIcon size={16} />
        </Button>
        <Button disabled={noChanges} onClick={patchProject} className="gap-2">
          {loading && <Loader2Icon size={16} className="animate-spin" />}
          Сохранить
        </Button>
      </>
    );
  } else
    return (
      <>
        <Button
          variant="secondary"
          size="icon"
          disabled={loading}
          onClick={() => setEdit(true)}
        >
          <Edit3Icon size={16} />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          disabled={loading}
          onClick={removeProject}
        >
          <TrashIcon size={16} />
        </Button>
      </>
    );
};

export default ProjectControls;
