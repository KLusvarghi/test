import classNames from 'classnames';

interface IErrorProps {
  error: null | string | unknown;
  className?: string
}

// Componente que exibe o erro
const Error = ({ error, className }: IErrorProps) => {
  if (typeof error === 'string')
    // return <p className={classNames("text-red-600", className)}>{error}</p>;
    return <p className={classNames("text-red-600 text-[10px] text-start", className)}>{error}</p>;
};

export default Error;
