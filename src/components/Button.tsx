import { type ComponentPropsWithoutRef } from "react";

const Button: React.FC<ComponentPropsWithoutRef<"button">> = (props) => {
  const { children, ...butt } = props;
  return (
    <div className="flex justify-center space-x-2">
      <button
        {...butt}
        type="button"
        className="inline-block rounded border border-zinc-300 bg-white px-6 py-1 text-xs font-medium leading-normal text-neutral-600 transition duration-150 ease-in-out hover:bg-secondary-100 focus:outline-none focus:ring-0 active:bg-secondary-300 dark:border-zinc-600  dark:bg-zinc-800 dark:text-neutral-300 dark:hover:bg-zinc-600 "
      >
        {children}
      </button>
    </div>
  );
};
export default Button;
