import { ComponentPropsWithoutRef } from "react";

export interface TextInputProps extends ComponentPropsWithoutRef<"input"> {
  title?: string;
}
const TextInput: React.FC<TextInputProps> = (props) => {
  const { className, title, required, ...attr } = props;
  return (
    <div className="flex flex-col space-y-2">
      {title && (
        <div className="flex flex-row space-x-1 text-xs font-semibold capitalize">
          <div className="text-gray-600 dark:text-gray-300">{title}</div>
          {required && <div className="text-red-600">*</div>}
        </div>
      )}
      <input
        className={`rounded-md border border-zinc-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-600 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-gray-300 ${
          className ? className : ""
        }`}
        {...attr}
      />
    </div>
  );
};
export default TextInput;
