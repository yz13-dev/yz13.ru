"use client";
import { useDebounceFn, useInterval, useTimeout } from "ahooks";
import {
  ArrowLeftRightIcon,
  BadgeRussianRubleIcon,
  BoxIcon,
  CheckIcon,
  FileArchiveIcon,
  FileImageIcon,
  HistoryIcon,
  Loader2Icon,
  RouteIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "yz13/cn";

const Process = () => {
  // https://vercel.com/frameworks/nextjs - partial rendering section
  const minStep = 1;
  const maxStep = 3;
  const [step, setStep] = useState<number>(1);
  useInterval(() => {
    if (step < maxStep) {
      setStep(step + 1);
    }
    if (step === maxStep) {
      setStep(minStep);
    }
  }, 4000);
  return (
    <section className="w-full space-y-6 py-12">
      <h2 className="text-secondary text-xl font-medium">
        Как проходит работа над проектом?
      </h2>
      <div className="w-full gap-6 flex md:!flex-row flex-col">
        <ProcessDemo currentStep={step} />
        <div className="md:!w-1/3 w-full py-2 flex flex-row gap-6 relative">
          <ProcessList currentStep={step} />
        </div>
      </div>
    </section>
  );
};

const Chat = ({ duration = 1000 }: { duration?: number }) => {
  const [conversation, setConversation] = useState<
    {
      who: string;
      text?: string;
      label: string;
      attachments?: { type: string; name: string }[];
    }[]
  >([]);
  const toPush = [
    {
      who: "client",
      label: "Клиент",
      text: "Нужно сделать редезайн секции на странице сайта.",
      attachments: [
        {
          type: "image",
          name: "redesign.png",
        },
      ],
    },
    {
      who: "developer",
      label: "Разработчик",
      text: "Через 2 дня будет готово.",
      attachments: [
        {
          type: "request",
          name: "2000₽",
        },
      ],
    },
    {
      who: "client",
      label: "Клиент",
      attachments: [
        {
          type: "transaction",
          name: "2000₽",
        },
      ],
    },
  ];
  const applyPush = useDebounceFn(
    (message: any) => {
      setConversation((prev) => [...prev, message]);
    },
    { wait: 200 },
  );
  const push = () => {
    for (let i = 0; i <= toPush.length; i++) {
      const time = i * 750;
      setTimeout(() => {
        const message = toPush[i];
        if (message) {
          applyPush.run(message);
        }
      }, time);
    }
  };
  useEffect(() => {
    push();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "89%" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.5, delayChildren: 0.5, staggerChildren: 0.5 }}
      className="w-64 h-56 border rounded-2xl absolute right-4 overflow-hidden bottom-4 p-2 flex flex-col gap-1"
    >
      {conversation.map((message, index) => {
        const isClient = message.who === "client";
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ staggerChildren: 0.4 }}
            key={message.who + "-" + index}
            className={cn(
              "flex flex-col p-1 w-fit rounded-xl border gap-2",
              isClient ? "" : "ml-auto",
            )}
          >
            <div className="w-full flex flex-col gap-1">
              <div
                className={cn(
                  "flex flex-row gap-1 items-center w-full px-1",
                  isClient ? "justify-start" : "justify-end",
                )}
              >
                <span className="text-secondary text-xs capitalize">
                  {message.label}
                </span>
              </div>
              {message.text && (
                <span
                  className={cn(
                    "text-foreground/80 text-xs px-1",
                    isClient ? "text-left" : "text-right",
                  )}
                >
                  {message.text}
                </span>
              )}
            </div>
            {message.attachments && (
              <div
                className={cn(
                  "flex flex-row flex-wrap items-start gap-2",
                  isClient ? "flex-row" : "flex-row-reverse",
                )}
              >
                {message.attachments.map((attachment, index) => {
                  return (
                    <div
                      key={
                        message.who +
                        "-" +
                        index +
                        "-" +
                        attachment.name +
                        "-" +
                        index
                      }
                      className="w-fit h-fit rounded-xl flex items-center gap-1 p-1 border bg-yz-neutral-100"
                    >
                      {attachment.type === "request" && (
                        <BadgeRussianRubleIcon
                          size={14}
                          className="text-secondary"
                        />
                      )}
                      {attachment.type === "image" && (
                        <FileImageIcon size={14} className="text-secondary" />
                      )}
                      {attachment.type === "zip" && (
                        <FileArchiveIcon size={14} className="text-secondary" />
                      )}
                      {attachment.type === "transaction" && (
                        <ArrowLeftRightIcon
                          size={14}
                          className="text-secondary"
                        />
                      )}
                      <span className="text-xs text-secondary">
                        {attachment.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
};

const UpdateSection = () => {
  const [switched, setSwitched] = useState<boolean>(false);
  useTimeout(() => {
    setSwitched(true);
  }, 3000);
  return (
    <>
      <div className="w-full h-12 border-2 border-dashed rounded-lg mb-4 bg-background-back"></div>
      <div className="w-full h-48 relative">
        <AnimatePresence>
          {!switched && (
            <motion.div
              layoutId="code-updated"
              initial={{ opacity: 0 }}
              animate={!switched ? { opacity: 1, height: 144 } : { opacity: 0 }}
              exit={{ opacity: 0 }}
              className="absolute left-0 top-0 w-full h-36 border-2 border-dashed rounded-lg border-warning-border bg-warning-background"
            />
          )}
          {switched && (
            <motion.div
              layoutId="code-updated"
              initial={{ opacity: 0 }}
              animate={switched ? { opacity: 1, height: 192 } : { opacity: 0 }}
              exit={{ opacity: 0 }}
              className="absolute left-0 top-0 w-full h-48 border-2 border-dashed rounded-lg border-success-border bg-success-background"
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

const CodeSending = () => {
  const fileName = "final-code.zip";
  const [sended, setSended] = useState<boolean>(false);
  useTimeout(() => {
    setSended(true);
  }, 2000);
  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center">
      <div className="w-2/3">
        <div className="w-full h-fit rounded-xl px-3 py-2 border flex items-center gap-3">
          <div
            className={cn(
              "size-8 flex items-center justify-center border border-transparent transition-all rounded-full",
              sended
                ? "text-success bg-success-background border-success-border"
                : "text-secondary",
            )}
          >
            {!sended && <Loader2Icon size={20} className="animate-spin " />}
            {sended && <CheckIcon size={20} className="" />}
          </div>
          <div className="flex flex-col ">
            <span className="text-xs text-secondary">
              {sended ? "Отправлено" : "Отправка..."}
            </span>
            <span className="font-medium">{fileName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProcessDemo = ({ currentStep }: { currentStep?: number }) => {
  return (
    <div className="md:!w-2/3 w-full aspect-video relative border rounded-xl p-4">
      {currentStep === 1 && <Chat />}
      {currentStep === 2 && <UpdateSection />}
      {currentStep === 3 && <CodeSending />}
    </div>
  );
};

const ProcessList = ({ currentStep }: { currentStep?: number }) => {
  const steps = [
    {
      step: 1,
      icon: BoxIcon,
      text: "Связь с клиентом, обсуждение разработки, согласование и начало работы.",
    },
    {
      step: 2,
      icon: HistoryIcon,
      text: "Разработка, проверка кода, тестирование, внесение поправок (при необходимости).",
    },
    {
      step: 3,
      icon: RouteIcon,
      text: "Внесение доп. поправок (при необходимости). Подготовка кода, проверка кода, тестирование, отправка кода клиенту.",
    },
  ];
  return (
    <ul className="flex md:!flex-col sm:!flex-row flex-col gap-6">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isCurrent = currentStep === step.step;
        return (
          <li
            key={index}
            className={cn(
              "w-full relative transition-all flex md:!flex-row sm:!flex-col flex-row gap-3",
              isCurrent && "scale-105",
            )}
          >
            <div
              className={cn(
                "size-8 shrink-0 rounded-full border flex items-center justify-center transition-colors",
                isCurrent
                  ? "border-foreground bg-foreground text-background"
                  : "bg-background text-secondary",
              )}
            >
              <Icon size={16} />
            </div>
            <span
              className={cn(
                "text-sm transition-all",
                isCurrent ? "text-foreground" : "text-secondary",
              )}
            >
              {step.text}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default Process;
