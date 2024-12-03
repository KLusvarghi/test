import React, { useEffect, useState } from "react";
import classNames from "classnames";
import useSystemGeneralProviderContext from "@/hooks/useSystemGeneralProviderContext";

const Notification = () => {
  const [progress, setProgress] = useState(0);
  const { notificationContent, setNotificationContent } =
    useSystemGeneralProviderContext();

  // Efeito que caso o status da notificação seja diferente de null ele entra em execução e realiza o efeito
  useEffect(() => {
    if (notificationContent.status !== null) {
      setProgress(0);

      // Para aplicar o efeito de progresso
      const interval = setInterval(() => {
        setProgress((prev) => {
          const nextValue = prev + 1;
          if (nextValue >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setNotificationContent({ status: null, message: null });
            }, 500);
          }
          return nextValue;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [notificationContent, setNotificationContent]);

  if (notificationContent.status === null) {
    return null; // Não renderiza o componente se não houver notificação ativa
  }

  return (
    <div
      // className={classNames("w-1/6 absolute top-5 right-5 p-4 rounded-lg shadow-lg",
      className={classNames(
        "absolute right-5 top-5 w-1/6 rounded-md px-2 pb-1 pt-2 shadow-lg",
        notificationContent.status ? "bg-green-500" : "bg-red-500",
      )}
    >
      {/* <p className="text-white font-bold">{notificationContent.message}</p> */}
      <p className="text-[8px] font-bold text-white">
        {notificationContent.message}
      </p>
      <div className="relative mt-2 h-1 w-full bg-gray-300">
        <div
          className={classNames(
            "absolute left-0 top-0 h-full bg-green-600 transition-all",
            notificationContent.status ? "bg-green-300" : "bg-red-300",
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Notification;
