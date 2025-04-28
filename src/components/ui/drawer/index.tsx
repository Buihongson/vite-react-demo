"use client";

import classNames from "classnames";
import { useEffect, useCallback } from "react";

type Position = "left" | "right" | "bottom" | "top";

interface DrawerProps {
  open: boolean;
  children: React.ReactNode;
  className?: string;
  title?: string;
  position?: Position;
  onClose: () => void;
  width?: string;
  height?: string;
}

const POSITION_CONFIG = {
  left: {
    position: "left-0",
    width: "w-[400px]",
    height: "h-full",
    transform: {
      start: "-translate-x-full",
      end: "translate-x-0",
    },
  },
  right: {
    position: "right-0",
    width: "w-[400px]",
    height: "h-full",
    transform: {
      start: "translate-x-full",
      end: "translate-x-0",
    },
  },
  top: {
    position: "top-0 left-0 right-0",
    width: "w-full",
    height: "h-[400px]",
    transform: {
      start: "-translate-y-full",
      end: "translate-y-0",
    },
  },
  bottom: {
    position: "bottom-0 left-0 right-0",
    width: "w-full",
    height: "h-[400px]",
    transform: {
      start: "translate-y-full",
      end: "translate-y-0",
    },
  },
} as const;

export default function Drawer({
  open,
  children,
  className,
  title,
  position = "right",
  width,
  height,
  onClose,
}: DrawerProps) {
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        onClose();
      }
    },
    [open, onClose]
  );

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    }
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, handleEscape]);

  const config = POSITION_CONFIG[position];

  return (
    <div
      className={classNames("fixed inset-0 z-[99999]", {
        "pointer-events-none": !open,
      })}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "drawer-title" : undefined}
    >
      <div
        className={classNames("fixed inset-0 bg-black/50 transition-opacity duration-300", {
          "opacity-0 pointer-events-none": !open,
          "opacity-100": open,
        })}
        onClick={onClose}
        aria-hidden="false"
      />
      <div
        className={classNames(
          "fixed z-[99999] flex flex-col bg-white shadow-lg transition-transform duration-300 ease-in-out dark:bg-gray-800",
          config.position,
          width || config.width,
          height || config.height,
          { [config.transform.start]: !open },
          { [config.transform.end]: open },
          className
        )}
      >
        <div className="flex items-center justify-between border-b p-4">
          {title && (
            <h2 id="drawer-title" className="text-lg font-semibold">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Close drawer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}
