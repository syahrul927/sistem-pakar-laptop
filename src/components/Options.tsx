interface OptionsProps {
  id: string;
  type: "radio" | "checkbox";
  list: string[];
  response: string | string[];
}

interface ItemProps {
  type: "radio" | "checkbox";
  id: string;
  selected?: boolean;
  text: string;
}
const Options: React.FC<OptionsProps> = (props) => {
  const { list, id, type } = props;
  return (
    <div className="flex flex-col space-y-2">
      {list.map((item) => (
        <ItemOption text={item} key={`id-${item}`} id={id} type={type} />
      ))}
    </div>
  );
};
export default Options;
const ItemOption: React.FC<ItemProps> = (props) => {
  const { text, selected, id, type } = props;
  return (
    <div
      className={`flex items-center justify-start space-x-3 rounded-full bg-zinc-200 px-6 py-3 font-light`}
    >
      <input type={type} name={id} checked={selected} />
      <div>{text}</div>
    </div>
  );
};
