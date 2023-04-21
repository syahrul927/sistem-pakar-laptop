import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Transition, Dialog } from "@headlessui/react";
import { ComponentPropsWithoutRef, Fragment, useEffect, useState } from "react";

interface SlidePanelProps extends ComponentPropsWithoutRef<"div"> {
    show: boolean;
    onClose: (val: boolean) => void;
    title: string;
}

const SlidePanel: React.FC<SlidePanelProps> = ({
    show,
    onClose,
    title,
    children,
}) => {
    const [open, setOpen] = useState(show);
    useEffect(() => {
        setOpen(show);
    }, [show]);
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden text-base-300 dark:text-white">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-500"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                            <button
                                                type="button"
                                                className="rounded-md text-gray-300 hover:text-white "
                                                onClick={() => onClose(false)}
                                            >
                                                <span className="sr-only">
                                                    Close panel
                                                </span>
                                                <FontAwesomeIcon icon={faX} />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl dark:bg-zinc-800">
                                        <div className="px-4 sm:px-6">
                                            <Dialog.Title className="font-semibold leading-6  ">
                                                {title}
                                            </Dialog.Title>
                                        </div>
                                        <div className="relative mt-6 flex-1 space-y-3 px-4 sm:px-6">
                                            {children}
                                            {/* Your content */}
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};
export default SlidePanel;
