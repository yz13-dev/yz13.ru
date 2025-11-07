"use client";
import { Button } from "@yz13/ui/button";
import { ArrowLeftIcon, PlusIcon, SendIcon } from "@yz13/ui/icons";
import { Input } from "@yz13/ui/input";
import { Textarea } from "@yz13/ui/textarea";
import Link from "next/link";
import { useEffect } from "react";
import { useJsonStore } from "../stores/json.store";




export default function ({ username }: { username: string }) {
  const json = useJsonStore(state => state.json)
  const setJson = useJsonStore(state => state.setJson)

  const profession = json.profession || "";
  const setProfession = (e: React.ChangeEvent<HTMLInputElement>) => setJson({ ...json, profession: e.target.value });

  const fullname = json.user.fullname || "";
  const setFullname = (e: React.ChangeEvent<HTMLInputElement>) => setJson({ ...json, user: { ...json.user, fullname: e.target.value } });

  const description = json.user.description || "";
  const setDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => setJson({ ...json, user: { ...json.user, description: e.target.value } });

  useEffect(() => {
    if (username)
      if (json.user.username !== username) setJson({ ...json, user: { ...json.user, username } })
  }, [username, json])
  return (
    <div className="w-full text-sm space-y-8 max-w-sm">
      <div className="flex items-center justify-between gap-4">
        <Button variant="secondary" asChild>
          <Link href="/new">
            <ArrowLeftIcon /><span>Назад</span>
          </Link>
        </Button>
        <Button variant="secondary">Загрузить аватар</Button>
      </div>
      <h1 className="text-2xl font-medium">{username}</h1>
      <div className="w-full space-y-4">
        <div className="flex gap-2 *:w-1/2">
          <Input placeholder="Имя фамилия"
            value={fullname}
            onChange={setFullname}
          />
          <Input placeholder="Профессия"
            value={profession}
            onChange={setProfession}
          />
        </div>
        <Textarea placeholder="Описание"
          value={description}
          onChange={setDescription}
        />
      </div>
      <div className="w-full flex flex-row gap-2 items-start flex-wrap">
        <Button variant="outline"><PlusIcon /><span>Telegram</span></Button>
        <Button variant="outline"><PlusIcon /><span>Github</span></Button>
        <Button variant="outline"><PlusIcon /><span>X</span></Button>
      </div>
      <Button variant="outline" className="w-full"><PlusIcon /><span>Добавить ссылку</span></Button>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-end">
          <Button><span>Отправить</span><SendIcon /></Button>
        </div>
      </div>
    </div>
  )
}
