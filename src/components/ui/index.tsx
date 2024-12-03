import { IChildrenProps } from "@/types/auxProps";
import { XMarkIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { MouseEventHandler } from "react";

interface IComponentProps {
  children: React.ReactNode;
  className?: string;
}

interface IModalProsps extends IComponentProps {
  children: React.ReactNode;
  className?: string;
  onMouseDown?: MouseEventHandler<HTMLDivElement> | undefined;
  isOpen?: boolean;
}

interface ICloseProps {
  className?: string;
  onClick: () => void;
}

// componente de overlay (vai atrás do modal)
export const Overlay = ({
  children,
  className,
  onMouseDown,
  isOpen = true,
}: IModalProsps) => (
  <div
    onMouseDown={onMouseDown}
    className={classNames(
      // "fixed inset-0 mx-auto flex w-full items-center justify-center rounded-md bg-black bg-opacity-10 px-10 py-[22px] backdrop-blur-md transition-opacity duration-300",
      "fixed inset-0 mx-auto flex w-full items-center justify-center rounded-md bg-black bg-opacity-10 px-10 py-[22px] backdrop-blur-md transition-opacity duration-300",
      className,
      isOpen ? "opacity-100" : "opacity-0",
    )}
  >
    {children}
  </div>
);

export const ModalContainer = ({
  children,
  className,
  onMouseDown,
  isOpen = true,
}: IModalProsps) => (
  <div
    onMouseDown={onMouseDown}
    className={classNames(
      // "relative transform rounded-lg bg-bgModal/95 p-12 shadow-lg transition-transform duration-300",
      "relative transform rounded-md bg-bgModal/95 p-6 shadow-lg transition-transform duration-300",
      className,
      isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0",
    )}
  >
    {children}
  </div>
);

// componente que contem apenas o icone de X
export const Close = ({ onClick, className }: ICloseProps) => (
  <XMarkIcon
    className={classNames(
      // "absolute right-3 top-3 z-10 size-8 cursor-pointer text-white",
      "absolute right-3 top-3 z-10 size-4 cursor-pointer text-white",
      className,
    )}
    onClick={onClick}
  />
);

export const Container = ({ children, className }: IComponentProps) => (
  <div
    className={classNames(
      // "mx-auto rounded-lg px-10 py-[22px] backdrop-blur-md",
      "mx-auto rounded-lg px-4 pt-[12px] pb-[-8px] backdrop-blur-md",
      className,
    )}
  >
    {children}
  </div>
);

export const Wrapper = ({ children, className }: IComponentProps) => (
  <div className={`flex flex-col text-center drop-shadow-xl ${className} `}>
    {children}
  </div>
);

export const H1 = ({ children, className }: IComponentProps) => (
  <h1 className={`text-[20px] font-medium text-white ${className}`}>
    {children}
  </h1>
);

export const H2 = ({ children, className }: IComponentProps) => (
  <h2 className={classNames("w-auto font-semibold text-white text-[12px] mb-2", className)}>
    {children}
  </h2>
);

export const SelectContainer = ({ children, className }: IComponentProps) => (
  <h1 className={classNames("text-xl font-semibold text-white", className)}>
    {children}
  </h1>
);

export const SelectWrapper = ({ children, className }: IComponentProps) => (
  <div className={classNames("flex flex-col gap-2", className)}>
    {children}
  </div>
);

interface INavButtonProps extends IChildrenProps {
  className?: string;
  onClick?: () => void;
  icon: string;
}

export const Li = ({ className, onClick, children, icon }: INavButtonProps) => {
  return (
    <li
      onClick={onClick}
      // className={classNames("flex cursor-pointer gap-3.5 text-white items-center", {
      className={classNames("flex cursor-pointer gap-2 text-white items-center text-[9px] hover:bg-black/30 py-2 px-1.5 w-full rounded-md", {
        className,
      })}
    >
      <img
        src={`/icons/${icon}.svg`}
        alt={`icone ilustrativo de ${icon}`}
        // className="h-6"
        className="h-3"
      />
      {children}
    </li>
  );
};
