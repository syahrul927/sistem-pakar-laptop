import { useEffect, useRef, useState } from "react";
import { QuestionProps } from "~/type";

interface OptionsProps {
    type: "radio" | "checkbox";
    list: QuestionProps[];
    onAction: (str: string[]) => void;
}

interface ItemProps {
    type: "radio" | "checkbox";
    id: string;
    selected?: boolean;
    text: string;
    onChange: (str: string) => void;
}
const Options: React.FC<OptionsProps> = (props) => {
    const { list, type, onAction } = props;
    const [result, setResult] = useState<string[]>([]);
    const onChange = (str: string) => {
        if (type === "radio") {
            setResult([str]);
            return;
        }
        if (result.includes(str)) {
            setResult(result.filter((e) => e !== str));
            return;
        }
        setResult([...result, str]);
    };
    useEffect(() => {
        onAction(result);
    }, [result, onAction]);
    return (
        <div className="flex flex-col space-y-2">
            {list.map((item) => {
                const selected = result.includes(item.id);
                return (
                    <ItemOption
                        text={item.name}
                        key={`id-${item.name}`}
                        id={item.id}
                        selected={selected}
                        type={type}
                        onChange={onChange}
                    />
                );
            })}
        </div>
    );
};
export default Options;
const ItemOption: React.FC<ItemProps> = (props) => {
    const { text, selected, id, type, onChange } = props;
    const ref = useRef<HTMLInputElement>(null);
    return (
        <div
            className={`flex cursor-pointer select-none items-center justify-start space-x-3 rounded-full bg-zinc-100 px-6 py-3 text-sm dark:bg-zinc-600`}
            onClick={() => {
                if (ref && ref.current) {
                    ref.current.checked = !ref.current.checked;
                    onChange(id);
                }
            }}
        >
            <input
                ref={ref}
                type={type}
                name={type === "radio" ? "key" : id}
                checked={selected}
                onChange={() => onChange(id)}
            />
            <div>{text}</div>
        </div>
    );
};
