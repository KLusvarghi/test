import classNames from "classnames";
import { IChildrenProps } from "../../types/auxProps";

interface IButtonProps extends IChildrenProps {
  className?: string;
  onClick?: () => void;
  type?: "submit" | "button";
  disabled?: boolean
}

// Componente de botão
const Button = ({
  children,
  className,
  onClick,
  type = "button",
  disabled = false
}: IButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={classNames(
        // "rounded-lg bg-btn hover:bg-c05 px-5 py-2 text-txt01 text-[12px] transition delay-75 ease-in-out focus:bg-c05 focus:outline-none focus:ring-2 focus:ring-c03 disabled:cursor-not-allowed disabled:bg-c05 font-semibold",
        "rounded-md bg-btn hover:bg-c05 px-3 py-1 text-txt01 text-[8px] transition delay-75 ease-in-out disabled:cursor-not-allowed disabled:bg-c05 font-semibold",
        className,
      )}
    >
      {children}
    </button>
  );
};
 
export default Button;
