interface ProgressBarProps {
    total: number;
    currentState: number;
}
interface ItemProps {
    active: boolean;
}
const ProgressBar: React.FC<ProgressBarProps> = (props) => {
    const { total, currentState } = props;
    const renderItem = () => {
        const arr: React.ReactNode[] = [];
        for (let i = 1; i <= total; i++) {
            arr.push(<Item key={`${i}`} active={currentState >= i} />);
        }
        return arr;
    };
    return <div className="mx-2 flex flex-row space-x-2">{renderItem()}</div>;
};

const Item: React.FC<ItemProps> = (props) => {
    const { active } = props;
    return (
        <div
            className={`${
                active ? "bg-blue-400" : "bg-zinc-300 dark:bg-zinc-100"
            } h-2 w-full rounded-full`}
        ></div>
    );
};
export default ProgressBar;
