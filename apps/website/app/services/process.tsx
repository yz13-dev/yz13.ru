"use client";
import { useDebounceFn, useInterval, useTimeout } from "ahooks";
import {
  ArrowLeftRightIcon,
  BadgeRussianRubleIcon,
  BoxIcon,
  CheckIcon,
  FileArchiveIcon,
  FileImageIcon,
  GitCommitIcon,
  HistoryIcon,
  Loader2Icon,
  LucideIcon,
  RouteIcon,
} from "lucide-react";
import { Button } from "mono/components/button";
import { Separator } from "mono/components/separator";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "yz13/cn";
import { create } from "zustand";

type Step = {
  step: number;
  icon: LucideIcon;
  title: string;
  text: string;
};

const steps: Step[] = [
  {
    step: 1,
    icon: BoxIcon,
    title: "Интро",
    text: "Связь с клиентом, обсуждение разработки, согласование и начало работы.",
  },
  {
    step: 2,
    icon: HistoryIcon,
    title: "Начало работы",
    text: "При разработке, можно в любой момент запросить прогресс, будет открыт доступ к репозиторию и коду.",
  },
  {
    step: 3,
    icon: GitCommitIcon,
    title: "Итерация 1",
    text: "Любые поправки(с лимитом), никаких кардинальных изменений, при внесении поправок увеличиться время и стоимость.",
  },
  {
    step: 4,
    icon: GitCommitIcon,
    title: "Итерация 2",
    text: "Небольшие поправки, сдвинуть кнопку, поменять цвет - ничего кардинального.",
  },
  {
    step: 5,
    icon: RouteIcon,
    title: "Конец",
    text: "Подготовка кода, упаковка в архив или отправка в репозиторий, как удобно.",
  },
];

const minStep = 1;
const maxStep = steps.length;

type State = {
  onManual: boolean;
  open: boolean;
  step: number;
};

type Actions = {
  setOnManual: (onManual: boolean) => void;
  setOpen: (open: boolean) => void;
  setStep: (step: number) => void;
};

const useStepsStore = create<State & Actions>()((set) => ({
  onManual: false,
  open: false,
  step: 1,
  setStep: (step) => set({ step }),
  setOpen: (open) => set({ open }),
  setOnManual: (onManual) => set({ onManual }),
}));

const stepDuration = 4000;

const Process = () => {
  const onManual = useStepsStore((state) => state.onManual);
  const setOnManual = useStepsStore((state) => state.setOnManual);
  const step = useStepsStore((state) => state.step);
  const setStep = useStepsStore((state) => state.setStep);
  const open = useStepsStore((state) => state.open);
  const canBeReturnToAuto = useMemo(() => onManual && !open, [open, onManual]);
  useInterval(
    () => {
      if (step < maxStep) {
        setStep(step + 1);
      }
      if (step === maxStep) {
        setStep(minStep);
      }
    },
    onManual ? undefined : stepDuration,
  );
  useTimeout(
    () => {
      setOnManual(false);
    },
    canBeReturnToAuto ? 1000 : undefined,
  );
  return (
    <section className="w-full space-y-12">
      <div className="w-full space-y-6">
        <h2 className="text-secondary text-xl font-medium">
          Как проходит работа над проектом?
        </h2>
        <ProcessDemo currentStep={step} />
      </div>
      <div className="w-full space-y-6">
        <div className="w-full relative flex items-center justify-center">
          <AnimatePresence>
            {open && <ProcessDescription currentStep={step} />}
          </AnimatePresence>
          <Steps currentStep={step} />
        </div>
        <div className="w-full relative flex items-center justify-center">
          <span className="text-secondary text-sm text-center">
            Нажмите на шаг для просмотра описания
          </span>
        </div>
      </div>
    </section>
  );
};

const ProcessDescription = ({ currentStep }: { currentStep?: number }) => {
  const setStep = useStepsStore((state) => state.setStep);
  const setOpen = useStepsStore((state) => state.setOpen);
  const stepData = steps.find(({ step }) => step === currentStep);
  const handlePrev = () => {
    if (!currentStep) return;
    if (currentStep === 1) {
      setOpen(false);
    } else setStep(currentStep - 1);
  };
  const handleNext = () => {
    if (!currentStep) return;
    if (currentStep === steps.length) {
      setOpen(false);
    } else setStep(currentStep + 1);
  };
  if (!stepData) return null;
  const isFirst = currentStep === 1;
  const isLast = currentStep === steps.length;
  const { text, icon: Icon, title } = stepData;
  return (
    <motion.div
      layoutId="step-description"
      initial={{ y: 50, opacity: 0 }}
      animate={{ height: "fit-content", y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="max-w-sm z-20 bg-background/40 backdrop-blur-sm overflow-hidden absolute bottom-20 border rounded-3xl p-6 flex flex-col gap-12"
    >
      <div className="flex flex-col gap-3">
        <Icon size={24} className="text-secondary mb-2" />
        <span className="text-foreground text-xl font-medium">{title}</span>
        <span className="text-foreground/60 text-base font-medium">{text}</span>
      </div>
      <div className="w-full flex items-center justify-between">
        <Button
          size="sm"
          variant="secondary"
          className="rounded-full"
          onClick={handlePrev}
        >
          {isFirst ? "Закрыть" : "Предыдущий"}
        </Button>
        <Button
          size="sm"
          variant="secondary"
          className="rounded-full"
          onClick={handleNext}
        >
          {isLast ? "Закрыть" : "Следующий"}
        </Button>
      </div>
    </motion.div>
  );
};

const Steps = ({ currentStep }: { currentStep?: number }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const setOnManual = useStepsStore((state) => state.setOnManual);
  const onManual = useStepsStore((state) => state.onManual);
  const setStep = useStepsStore((state) => state.setStep);
  const ref = useRef<HTMLDivElement>(null);
  const ringSize = 40;
  const [width, setWidth] = useState(0);
  const lineWidth = useMemo(() => {
    const ringCount = steps.length;
    const totalRingsSize = ringSize * ringCount;
    const widthWithoutRings = width - totalRingsSize;
    return widthWithoutRings / (ringCount - 1);
  }, [width, ringSize]);
  const setOpen = useStepsStore((state) => state.setOpen);
  useEffect(() => {
    const div = ref.current;
    if (div) {
      const width = div.getBoundingClientRect().width;
      setWidth(width);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, []);
  const DurationLine = () => {
    const [progress, setProgress] = useState<number>(0);
    const timeSteps = 10;
    const subSteps = (stepDuration - 750) / timeSteps;
    const progressStep = 100 / timeSteps;
    const isCompleted = useMemo(() => progress === 100, [progress]);
    useInterval(
      () => {
        setProgress((prev) => prev + progressStep);
      },
      isCompleted ? undefined : subSteps,
    );
    return (
      <div
        style={{ width: lineWidth }}
        className="relative h-[2px] bg-neutral-300"
      >
        <motion.div
          layoutId="duration-line"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: progress + "%" }}
          exit={{ opacity: 0, width: 0 }}
          transition={{
            duration: 0.5,
            delayChildren: 0.5,
            staggerChildren: 0.5,
          }}
          className="absolute left top-0 h-full bg-foreground"
        />
      </div>
    );
  };
  return (
    <div
      className="w-full flex flex-row h-10 relative items-center justify-between"
      ref={ref}
    >
      {loading && (
        <div className="w-full z-50 h-10 bg-background-back rounded-lg absolute left-0 top-0" />
      )}
      {steps.map(({ step, icon: Icon, title }, i, arr) => {
        const isLast = i === arr.length - 1;
        const isDone = currentStep ? currentStep >= step : false;
        const isCurrent = currentStep === step;
        const needHighlight = isCurrent || isDone;
        if (isLast)
          return (
            <div
              key={`step-${i}`}
              className="flex items-center justify-center relative"
            >
              {!loading && (
                <span className="absolute -top-8 text-nowrap text-center text-xs font-medium text-secondary border px-2 py-1 rounded-full bg-background-back">
                  {title}
                </span>
              )}
              <button
                onClick={() => {
                  setOpen(true);
                  setOnManual(true);
                  setStep(step);
                }}
                style={{ width: ringSize, height: ringSize }}
                className={cn(
                  "size-10 rounded-full border-2 transition-all flex items-center justify-center",
                  "text-secondary",
                  needHighlight &&
                    "border-foreground text-background bg-foreground",
                )}
              >
                <Icon size={20} />
              </button>
            </div>
          );
        return (
          <div key={`step-${i}`} className="flex items-center">
            <div className="flex items-center justify-center relative">
              {!loading && (
                <span className="absolute text-nowrap -top-8 text-center text-xs font-medium text-secondary border px-2 py-1 rounded-full bg-background-back">
                  {title}
                </span>
              )}
              <button
                style={{ width: ringSize, height: ringSize }}
                onClick={() => {
                  setOpen(true);
                  setOnManual(true);
                  setStep(step);
                }}
                className={cn(
                  "size-10 rounded-full border-2 transition-all flex items-center justify-center",
                  "text-secondary",
                  needHighlight &&
                    "border-foreground text-background bg-foreground",
                )}
              >
                <Icon size={20} />
              </button>
            </div>
            {isCurrent ? (
              !onManual ? (
                <DurationLine />
              ) : (
                <Separator
                  style={{ width: lineWidth }}
                  className={cn(
                    "transition-all h-[2px]",
                    isCurrent ? false : isDone && "bg-foreground",
                  )}
                />
              )
            ) : (
              <Separator
                style={{ width: lineWidth }}
                className={cn(
                  "transition-all h-[2px]",
                  isDone && "bg-foreground",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
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
              "flex flex-col p-2 w-fit rounded-xl border gap-2",
              isClient ? "" : "ml-auto",
            )}
          >
            {message.text && (
              <div className="w-full flex flex-col gap-1">
                {false && (
                  <div
                    className={cn(
                      "flex flex-row gap-1 items-center w-full",
                      isClient ? "justify-start" : "justify-end",
                    )}
                  >
                    <span className="text-secondary text-xs capitalize">
                      {message.label}
                    </span>
                  </div>
                )}
                {message.text && (
                  <span
                    className={cn(
                      "text-foreground/80 text-xs",
                      isClient ? "text-left" : "text-right",
                    )}
                  >
                    {message.text}
                  </span>
                )}
              </div>
            )}
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
                      className="w-fit h-fit rounded-xl flex items-center gap-1 p-1 border bg-neutral-100"
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
    <div className="w-full aspect-video relative border rounded-3xl p-4">
      {currentStep === 1 && <Chat />}
      {currentStep === 3 && <UpdateSection />}
      {currentStep === 5 && <CodeSending />}
    </div>
  );
};

export default Process;
