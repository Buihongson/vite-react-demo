import classNames from "classnames";
import { toast as toastify } from "react-toastify";
import Toast from "./Toast";
import { ToastType } from "../../shared/constants/common";

export const toast = (
  type: string,
  message: string,
  toastId?: string | undefined,
  autoClose = 5000
) => {
  toastify.clearWaitingQueue();
  toastify.dismiss();
  setTimeout(() =>
    toastify(<Toast type={type} message={message} />, {
      toastId,
      autoClose,
      closeButton: true,
      closeOnClick: true,
      position: "top-right",
      className: classNames("min-h-[58px] border-2 text-[#404040]", {
        "border-[#58BD7D] bg-[#F2FBF0]": type === ToastType.Success,
        "border-[#E76D64] bg-[#FDF1F1]": type === ToastType.Error,
      }),
    })
  );
};
