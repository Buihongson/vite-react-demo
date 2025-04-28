import classNames from "classnames";
import { FaRegCircleCheck, FaCircleInfo } from "react-icons/fa6";

const getIconName = (type: string) => {
  switch (type) {
    case "success":
      return FaRegCircleCheck;
    case "error":
      return FaCircleInfo;
    default:
      return FaRegCircleCheck;
  }
};

// const getIconClassName = (type: string) => {
//   switch (type) {
//     case 'success':
//       return 'fill-[#63C244]';
//     case 'error':
//       return 'fill-[#E76D64]';
//     default:
//       return 'fill-[#63C244]';
//   }
// };

const getTittleClassName = (type: string) => {
  switch (type) {
    case "success":
      return "text-[#58BD7D]";
    case "error":
      return "text-[#E76D64]";
    default:
      return "text-[#63C244]";
  }
};

type Props = {
  type: string;
  message: string;
};

const Toast = ({ type, message }: Props) => {
  const Icon = getIconName(type);
  //   const iconClassName = getIconClassName(type);
  const typeClassName = getTittleClassName(type);

  return (
    <div className="flex items-center gap-3">
      <span className={classNames("capitalize font-bold", typeClassName)}>
        <Icon />
      </span>
      <span className="w-full toast-content-component text-sm text-neutral-700 dark:text-neutral-100">
        {message}
      </span>
    </div>
  );
};

export default Toast;
