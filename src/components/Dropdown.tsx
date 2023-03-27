import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface DropdownProps {
    children: React.ReactNode | string;
    action?: () => void;
}
const DropDownItem: React.FC<{ item: DropdownProps }> = (props) => {
    const { action, children } = props.item;
    return (
        <li>
            <a
                className="block w-full whitespace-nowrap py-2 px-4 text-sm font-normal text-gray-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-neutral-600"
                data-te-dropdown-item-ref
                onClick={() => action?.()}
            >
                {children}
            </a>
        </li>
    );
};

const Dropdown: React.FC<{
    items: DropdownProps[];
    component?: React.ReactNode;
}> = (props) => {
    const { items, component } = props;
    return (
        <div className="w-fit" data-te-dropdown-ref>
            {component ? (
                <div
                    id="dropdown"
                    data-te-dropdown-toggle-ref
                    aria-expanded="false"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                >
                    {component}
                </div>
            ) : (
                <button
                    id="dropdown"
                    data-te-dropdown-toggle-ref
                    aria-expanded="false"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    type="button"
                    className="inline-block rounded border border-zinc-300 px-3 py-1 text-xs font-medium leading-normal text-neutral-600 transition duration-150 ease-in-out hover:bg-secondary-100 focus:outline-none focus:ring-0  active:bg-secondary-300 dark:border-zinc-600 dark:text-neutral-300 dark:hover:bg-neutral-600 "
                >
                    <FontAwesomeIcon icon={faEllipsisH} />
                </button>
            )}
            <ul
                className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border border-zinc-300 bg-white bg-clip-padding text-left shadow-lg dark:border-zinc-600 dark:bg-zinc-800 [&[data-te-dropdown-show]]:block"
                aria-labelledby="dropdown"
                data-te-dropdown-menu-ref
            >
                {items.map((item, idx) => (
                    <DropDownItem item={item} key={idx} />
                ))}
            </ul>
        </div>
    );
};

export default Dropdown;
