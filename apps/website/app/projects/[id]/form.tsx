"use client";

import AutoTextarea from "@/components/auto-textarea";
import { Release } from "@/const/releases";
import { Input } from "mono/components/input";
import { useEffect } from "react";
import useReleaseStore from "./project.store";

type FormProps = {
  initial: Release;
};
const Form = ({ initial }: FormProps) => {
  const release = useReleaseStore((state) => state.release);
  const setRelease = useReleaseStore((state) => state.setRelease);
  const edit = useReleaseStore((state) => state.edit);

  useEffect(() => {
    setRelease(initial);
  }, []);
  if (edit && release) {
    return (
      <>
        <Input
          value={release.name}
          onChange={(e) => setRelease({ ...release, name: e.target.value })}
          placeholder="Название проекта"
          className="text-2xl font-medium p-0 h-fit outline-none !ring-offset-0 !ring-0 rounded-none border-none"
        />
        <AutoTextarea
          className="text-secondary text-sm w-full p-0"
          value={release.description}
          onChange={(e) =>
            setRelease({ ...release, description: e.target.value })
          }
          placeholder="Описание для проекта"
        />
      </>
    );
  } else
    return (
      <>
        <h1 className="text-2xl font-medium block">{release?.name}</h1>
        <p className="text-secondary text-sm">{release?.description}</p>
      </>
    );
};

export default Form;
