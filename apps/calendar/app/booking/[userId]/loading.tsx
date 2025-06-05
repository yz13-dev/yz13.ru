import { ArrowLeftIcon } from "lucide-react";
import { Button } from "mono/components/button";



export default function () {
  return (
    <>
      <div className="max-w-2xl w-full mx-auto px-6 space-y-6 mt-[10%]">
        <Button variant="outline">
          <ArrowLeftIcon size={16} />
          Вернуться
        </Button>
        <div className="space-y-3">
          <h1 className="text-2xl font-medium">Новый созвон</h1>
          <p className="text-sm text-muted-foreground">
            Создайте новый созвон, чтобы обговорить ваши планы или подробности о
            проекте.
          </p>
        </div>
      </div>
    </>
  )
}
