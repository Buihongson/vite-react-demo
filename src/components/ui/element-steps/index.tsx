import React from "react";
import classNames from "classnames";
import { CheckLineIcon } from "@/icons";

export interface Step {
  id: string;
  title: string;
  description?: string;
}

interface ElementStepsProps {
  steps: Step[];
  currentStep: string;
  className?: string;
  onStepClick?: (stepId: string) => void;
}

export function ElementSteps({ steps, currentStep, onStepClick, className }: ElementStepsProps) {
  const getStepStatus = (stepId: string, index: number) => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep);
    if (index < currentIndex) return "completed";
    if (index === currentIndex) return "current";
    return "upcoming";
  };

  return (
    <nav aria-label="Progress" className={className}>
      <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id, index);
          return (
            <li key={step.id} className="md:flex-1">
              <div
                className={classNames("group flex flex-col py-2 pl-4 md:pb-0 md:pl-0 md:pt-4")}
                onClick={() => {
                  const currentIndex = steps.findIndex((step) => step.id === currentStep);

                  if (index > currentIndex) return;

                  onStepClick?.(step.id);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    onStepClick?.(step.id);
                  }
                }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={classNames(
                      "text-sm font-medium, w-[32px] h-[32px] rounded-full flex items-center justify-center",
                      {
                        "bg-blue-600 text-white": status === "completed" || status === "current",
                        "text-gray-500": status === "upcoming",
                      }
                    )}
                  >
                    {status === "completed" ? <CheckLineIcon /> : index + 1}
                  </div>
                  <div
                    className={classNames("text-sm font-medium", {
                      "text-blue-600": status === "completed" || status === "current",
                      "text-gray-500": status === "upcoming",
                    })}
                  >
                    {step.title}
                  </div>
                </div>
                {step.description && (
                  <span
                    className={classNames("text-sm", {
                      "text-blue-600": status === "completed" || status === "current",
                      "text-gray-500": status === "upcoming",
                    })}
                  >
                    {step.description}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
