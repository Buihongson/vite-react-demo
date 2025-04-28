import classNames from "classnames";

// const getIconName = type => {
//   switch (type) {
//     case 'success':
//       return 'CheckCircle2';
//     case 'error':
//       return 'XCircle';
//     default:
//       return 'CheckCircle2';
//   }
// };

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
  //   const iconName = getIconName(type);
  //   const iconClassName = getIconClassName(type);
  const typeClassName = getTittleClassName(type);

  return (
    <div className="flex flex-col gap-3">
      <span className={classNames("capitalize font-bold", typeClassName)}>
        {type}
      </span>
      <span className="w-full toast-content-component text-sm text-neutrals-3">
        {message}
      </span>
    </div>
  );
};

export default Toast;
