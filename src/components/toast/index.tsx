import * as React from "react";

import ToastError from "./Toast-error.icon";
import ToastSuccess from "./Toast-success.icon";
import ToastWarn from "./Toast-warn.icon";

export enum Type {
    ERROR,
    SUCCESS,
    WARN,
}
export type ToastType = keyof typeof Type;
export type ToastProps = {
    message?: string;
    type?: ToastType;
    show: boolean;
};

const Toast: React.FC<ToastProps> = ({ message, type, show }: ToastProps) => {
    const typeSelector = (t: ToastType) => {
        switch (t.toUpperCase()) {
            case "SUCCESS":
                return <ToastSuccess />;
            case "WARN":
                return <ToastWarn />;
            case "ERROR":
                return <ToastError />;
            default:
                break;
        }
    };
    return (
        <div
            id="toast-success"
            className={`z-100 mb-4 flex w-full max-w-md items-center rounded-lg border bg-white p-4 text-gray-500 shadow-lg dark:bg-zinc-800 dark:text-gray-400
			${show ? "fixed bottom-5 right-5 " : "hidden"}
			`}
            role="alert"
        >
            {typeSelector(type || "ERROR")}
            <div className="text-md ml-3 font-normal">{message}</div>
            <button
                type="button"
                className="-mx-1.5 -my-1.5 ml-auto inline-flex h-10 w-10 rounded-lg bg-white p-1.5 text-gray-400 hover:bg-zinc-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-zinc-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
                data-dismiss-target="#toast-success"
                aria-label="Close"
            >
                <span className="sr-only">Close</span>
                <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    ></path>
                </svg>
            </button>
        </div>
    );
};

export default Toast;
