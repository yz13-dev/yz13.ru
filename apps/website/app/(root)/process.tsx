"use client";
import { useInterval } from "ahooks";
import { BoxIcon, HistoryIcon, RouteIcon } from "lucide-react";
import { useState } from "react";
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
  }, 3000);
  return (
    <div className="w-full space-y-6 py-12">
      <span className="text-secondary text-xl font-medium">
        Как проходит работа над проектом?
      </span>
      <div className="w-full gap-6 flex md:!flex-row flex-col">
        <ProcessDemo />
        <div className="md:!w-1/3 w-full py-2 flex flex-row gap-6 relative">
          <ProcessList currentStep={step} />
        </div>
      </div>
    </div>
  );
};

const ProcessDemo = () => {
  return (
    <div className="md:!w-2/3 w-full aspect-video border rounded-xl"></div>
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
      text: "Подготовка кода, проверка кода, тестирование, внесение поправок (при необходимости). Отправка кода клиенту.",
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
