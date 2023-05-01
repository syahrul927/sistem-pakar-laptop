import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { ISymptomSelect } from "~/type";
import DropdownList from "./DropdownList";
import TextInput from "./TextInput";

interface MultipleSelectProps {
    data: ISymptomSelect[];
    selected: ISymptomSelect[];
    onChange: (id: ISymptomSelect) => void;
}

const MultipleSelect: React.FC<MultipleSelectProps> = (props) => {
    const { data: dataOri, onChange, selected } = props;
    const [text, setText] = useState("");
    const [suggest, setSuggest] = useState<ISymptomSelect[]>([]);
    useEffect(() => {
        if (text) {
            setSuggest(
                dataOri.filter(
                    (item) =>
                        item.description
                            .toLowerCase()
                            .indexOf(text.toLowerCase()) > -1
                )
            );
        } else {
            setSuggest([]);
        }
    }, [text, dataOri]);
    const onSelect = (id: string) => {
        // const exist = selected.find((item) => item.id === ids);
        // if (exist) {
        //     setText("");
        //     return;
        // }
        const source = dataOri.find((item) => item.id === parseInt(id));
        if (source) {
            onChange(source);
        }
        setText("");
    };
    const onDelete = (id: ISymptomSelect) => {
        // setSelected(selected.filter((item) => item.id !== id));
        onChange(id);
    };
    return (
        <>
            <div className="dropdown-bottom dropdown  w-full">
                <TextInput
                    tabIndex={1}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    title="Cari Gejala"
                />
                <DropdownList
                    className="w-full overflow-y-auto"
                    tabIndex={1}
                    items={suggest.map((item) => ({
                        children: item.description,
                        action: onSelect,
                        id: item.id.toString(),
                    }))}
                />
            </div>
            <div className="flex w-full flex-col space-y-3">
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 ">
                    Gejala yang dipilih
                </p>
                <div className="flex flex-col space-y-2">
                    {selected.length ? (
                        selected.map((item, idx) => (
                            <SelectedItem
                                key={`selected-${idx}`}
                                description={item.description}
                                weight={item.weight}
                                onDelete={() => onDelete(item)}
                            />
                        ))
                    ) : (
                        <label className="text-center text-gray-400">
                            Belum ada gejala yang dipilih
                        </label>
                    )}
                </div>
            </div>
        </>
    );
};
export default MultipleSelect;

interface SelectedItemProps {
    description: string;
    weight: number;
    onDelete: () => void;
}
const SelectedItem = (props: SelectedItemProps) => {
    return (
        <div className="flex w-full flex-row items-center space-x-5 rounded-md border p-3 ">
            <div className="flex flex-1 flex-col ">
                <label className=" text-sm font-semibold">
                    {props.description}
                </label>
                <label className="text-xs text-gray-500 dark:text-gray-400">
                    Bobot {props.weight}
                </label>
            </div>
            <div className="flex h-8 w-8 cursor-pointer items-center justify-center text-red-400 hover:text-red-600 dark:hover:text-red-200">
                <FontAwesomeIcon icon={faTrash} onClick={props.onDelete} />
            </div>
        </div>
    );
};
