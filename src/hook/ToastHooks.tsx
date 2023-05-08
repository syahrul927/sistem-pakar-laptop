import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import Toast, { ToastProps } from "../components/toast";
import { Props } from "./Props";

const initialState: ToastProps = {
    show: false,
};
export interface ToastCtxProps extends ToastProps {
    notify: (message: string, type: string) => void;
}
const ToastCtx = createContext<
    [ToastProps, Dispatch<SetStateAction<ToastProps>> | (() => void)]
>([
    initialState,
    () => {
        //todo
    },
]);

export function ToastProvider({ children }: Props) {
    const [toast, setToast] = useState<ToastProps>(initialState);
    useEffect(() => {
        if (toast.show) {
            setTimeout(() => setToast({ ...toast, show: false }), 5000);
        }
    }, [toast, toast.show]);
    const { message, type, show } = toast;
    const renderToast = () => {
        return <Toast message={message} type={type} show={show} />;
    };
    return (
        <ToastCtx.Provider value={[toast, setToast]}>
            {children}
            {renderToast()}
        </ToastCtx.Provider>
    );
}
export function useToastContext(): [
    ToastProps,
    Dispatch<SetStateAction<ToastProps>>
] {
    return useContext(ToastCtx);
}
