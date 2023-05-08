import React, { ReactNode, useEffect, useState } from "react";
import { makeid } from "~/utils/StringUtils";

export interface TableHeadProps<T extends { [S: string]: string | ReactNode }> {
    id: keyof T;
    title: string;
    minSizeShow?: string;
}

export interface TableProps<T extends { [S: string]: string | ReactNode }> {
    column: TableHeadProps<T>[];
    data: T[];
    numbering?: boolean;
}

const Table = <T extends { [S: string]: string | ReactNode }>(
    props: TableProps<T>
) => {
    const { data } = props;
    const [countPerPage, setCountPerPage] = useState<number>(10);
    const [list, setList] = useState<T[]>(data);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(
        Math.ceil(data.length / countPerPage)
    );

    const changePage = (action?: string, page?: number) => {
        if (page) {
            setCurrentPage(page);
            return;
        }
        if (action === "inc") {
            if (totalPage <= currentPage) return;
            setCurrentPage(currentPage + 1);
            return;
        }
        if (1 >= currentPage) return;
        setCurrentPage(currentPage - 1);
        return;
    };
    const onChangeCounter = (count: string) => {
        if (count === "All") {
            setCountPerPage(0);
            return;
        }
        const counter = parseInt(count);
        setCurrentPage(1);
        setCountPerPage(counter);
    };

    useEffect(() => {
        if (countPerPage && countPerPage != 0) {
            const currPage = currentPage * countPerPage;
            const arr = data.slice(currPage - countPerPage, currPage);
            setTotalPage(Math.ceil(data.length / countPerPage));
            setList(arr);
        } else {
            setList(data);
        }
    }, [countPerPage, currentPage, data]);

    return (
        <div className="flex flex-col">
            <div className="sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-y-auto">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    {props.column.map((item) => {
                                        return (
                                            <th
                                                scope="col"
                                                className={`px-6 py-4 ${
                                                    item.minSizeShow
                                                        ? `hidden ${item.minSizeShow}:table-cell`
                                                        : ""
                                                }`}
                                                key={item.id.toString()}
                                            >
                                                {item.title}
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((item, idx) => {
                                    let className = "";
                                    if (typeof item.className === "string") {
                                        className = item.className;
                                    }
                                    return (
                                        <tr
                                            className={`border-b dark:border-neutral-500 ${className}`}
                                            key={idx}
                                        >
                                            {props.column.map((col) => {
                                                if (col.id === "className")
                                                    return;
                                                const value =
                                                    item[col.id] || "[Empty]";
                                                return (
                                                    <td
                                                        className={`max-w-[16rem] truncate whitespace-nowrap px-6 py-4 font-medium lg:max-w-sm  ${
                                                            col.minSizeShow
                                                                ? `hidden ${col.minSizeShow}:table-cell`
                                                                : ""
                                                        }`}
                                                        key={`col-${makeid(4)}`}
                                                    >
                                                        {value}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div
                className={`flex items-end ${
                    !countPerPage ? "justify-end" : "justify-between"
                }`}
            >
                {countPerPage ? (
                    <Pagination
                        currentPage={currentPage}
                        totalPage={totalPage}
                        onAction={changePage}
                    />
                ) : (
                    <></>
                )}
                <OptionCounter
                    selected={countPerPage.toString()}
                    onChange={onChangeCounter}
                />
            </div>
        </div>
    );
};
export default Table;

interface PaginationProps {
    currentPage: number;
    totalPage: number;
    onAction: (action?: string, page?: number) => void;
}

const Pagination: React.FC<PaginationProps> = (props) => {
    const renderPage = (page: number) => {
        const curr = page === props.currentPage;
        return (
            <li
                key={`id-page-${page}`}
                onClick={() => props.onAction("", page)}
                aria-current={curr ? "page" : false}
            >
                <a
                    className={`${
                        curr
                            ? "text-primary-700 relative block rounded bg-zinc-200 px-3 py-1.5 text-sm font-medium transition-all duration-300 dark:bg-zinc-700"
                            : "relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                    }`}
                    href="#!"
                >
                    {page}
                    {curr && (
                        <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
                            (current)
                        </span>
                    )}
                </a>
            </li>
        );
    };
    const renderAllPage = (page: number) => {
        const arr: React.ReactNode[] = [];
        let start = page - 2;
        let end = page + 2;
        if (start < 1) {
            start = 1;
        }
        if (end > props.totalPage) {
            end = props.totalPage;
        }
        arr.push(
            <li key={"id-prev"} onClick={() => props.onAction("dec")}>
                <a
                    className={`${
                        props.currentPage === 1
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                    } relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white`}
                >
                    Previous
                </a>
            </li>
        );
        if (start >= 2) {
            arr.push(renderPage(1));
            if (start > 2) {
                arr.push(
                    <li key={"id-dot-prev"}>
                        <a
                            className={`${
                                props.currentPage === 1
                                    ? "cursor-not-allowed"
                                    : "cursor-pointer"
                            } relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400`}
                        >
                            ...
                        </a>
                    </li>
                );
            }
        }
        for (let i = start; i <= end; i++) {
            arr.push(renderPage(i));
        }
        if (end <= props.totalPage - 1) {
            if (end < props.totalPage - 1) {
                arr.push(
                    <li key={"id-dot-next"}>
                        <a
                            className={`${
                                props.currentPage === 1
                                    ? "cursor-not-allowed"
                                    : "cursor-pointer"
                            } relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400`}
                        >
                            ...
                        </a>
                    </li>
                );
            }
            arr.push(renderPage(props.totalPage));
        }
        arr.push(
            <li key="id-next" onClick={() => props.onAction("inc")}>
                <a
                    className={`${
                        props.currentPage === props.totalPage
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                    } relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white`}
                >
                    Next
                </a>
            </li>
        );

        return arr;
    };
    return (
        <div className="flex w-fit justify-end">
            <nav aria-label="Page navigation example">
                <ul className="list-style-none flex">
                    {renderAllPage(props.currentPage)}
                </ul>
            </nav>
        </div>
    );
};

const OptionCounter = (props: {
    selected: string;
    onChange: (count: string) => void;
}) => {
    const arr = ["10", "25", "50", "All"];

    return (
        <div className="flex items-center justify-end space-x-2">
            <p className="text-xs">Total Per Page</p>
            <div className="xl:w-24">
                <select
                    className="w-full rounded-md bg-white px-2 py-0.5 capitalize dark:bg-zinc-800"
                    onChange={(ev) => props.onChange(ev.target.value)}
                >
                    {arr.map((item) => {
                        return (
                            <option
                                key={item}
                                className="capitalize"
                                value={item}
                            >
                                {item}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
};
