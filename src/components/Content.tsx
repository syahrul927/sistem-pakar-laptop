export interface IContentProps extends React.ComponentPropsWithoutRef<"div"> {
  title?: string;
}
const Content: React.FC<IContentProps> = (props) => {
  return (
    <div
      className={`flex flex-col rounded-md border border-zinc-300 bg-white p-4 text-gray-600 dark:border-zinc-600 dark:bg-zinc-800 dark:text-gray-300 ${
        props.className ? props.className : ""
      }`}
    >
      {props.title && (
        <p className="text-lg text-gray-800 dark:text-gray-200">
          {props.title}
        </p>
      )}
      <hr className="my-2 h-0.5 border-t-0 bg-zinc-300 text-gray-600 dark:bg-zinc-600 dark:text-gray-600" />
      {props.children}
    </div>
  );
};
export default Content;
