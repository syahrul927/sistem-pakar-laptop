import { type ComponentPropsWithoutRef } from "react";

const Button: React.FC<ComponentPropsWithoutRef<"label">> = (props) => {
    const { children, className, ...butt } = props;
    return (
        <div className="flex select-none justify-center space-x-2">
            <label
                {...butt}
                className={`${
                    className !== undefined ? className : ""
                } hover:bg-secondary-100 inline-block rounded border border-zinc-300 bg-white px-6 py-2 text-xs font-medium leading-normal text-neutral-600 transition duration-150 ease-in-out focus:outline-none focus:ring-0 dark:border-zinc-600  dark:bg-zinc-800 dark:text-neutral-300 dark:hover:bg-zinc-600 `}
            >
                {children}
            </label>
        </div>
    );
};
export default Button;
