import { ReactNode } from "react";

interface ModalProps {
    title: string;
    message?: string;
    action?: ReactNode;
    show: boolean;
}
const Modal: React.FC<ModalProps> = ({ title, message, action, show }) => {
    return (
        <div className={`modal ${show ? "modal-open" : ""}`}>
            <div className="modal-box  bg-white text-gray-600 dark:bg-zinc-800 dark:text-gray-300">
                <h3 className="text-lg font-bold">{title}</h3>
                {message && <p className="py-4">{message}</p>}
                <div className="modal-action">{action && action}</div>
            </div>
        </div>
    );
};
export default Modal;
