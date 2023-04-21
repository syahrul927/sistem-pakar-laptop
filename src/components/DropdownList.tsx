import { ComponentPropsWithoutRef } from "react";

interface DropdownListItemProps {
    children: React.ReactNode | string;
    id: string;
    action?: (id: string) => void;
}
interface DropdownListProps extends ComponentPropsWithoutRef<"ul"> {
    items: DropdownListItemProps[];
    tabIndex: number;
}
const DropdownList: React.FC<DropdownListProps> = (props) => {
    const { className, tabIndex, items } = props;
    return (
        <ul
            tabIndex={tabIndex}
            className={`dropdown-content menu rounded-box w-52 bg-white p-2 shadow dark:bg-zinc-800 ${
                className ? className : ""
            }`}
        >
            {items.map((e, idx) => (
                <li key={`dropdown-${idx}`} onClick={() => e.action?.(e.id)}>
                    <div>{e.children}</div>
                </li>
            ))}
        </ul>
    );
};
export default DropdownList;
