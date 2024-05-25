import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
} from "@tanstack/react-table";
import Checkbox from "./Checkbox";
import PrimaryButton from "./PrimaryButton";
import TextInput from "./TextInput";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useReducer, useRef, useState } from "react";
import Pagination from "./Pagination";
import DebounceTextInput from "./DebounceTextIInput";
import Dropdown from "./Dropdown";
import {
    ArrowLongDownIcon,
    ArrowLongUpIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    FunnelIcon,
    MagnifyingGlassIcon,
    PlusIcon,
} from "@heroicons/react/20/solid";


export default function Datagrid({
    columns,
    rows,
    canCreate=true,
    filter=true,
    onCreate,
}) {
    const rerender = useReducer(() => ({}), {})[1];

    const [columnFilters, setColumnFilters] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const table = useReactTable({
        columns,
        data: rows,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        defaultColumn: {
            minSize: 200,
        },
    });

    const { rows: _rows } = table.getRowModel();

    const tableContainerRef = useRef(null);

    const rowVirtualizer = useVirtualizer({
        count: _rows.length,
        estimateSize: () => 33,
        getScrollElement: () => tableContainerRef.current,
        measureElement:
            typeof window !== "undefined" &&
            navigator.userAgent.indexOf("Firefox") === -1
                ? (element) => element?.getBoundingClientRect().height
                : undefined,
        overscan: 5,
    });

    return (
        <div className="bg-white bg-gray-800  relative shadow-md sm:rounded-lg overflow-hidden">
            {(canCreate || filter) && (
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    {filter && (
                        <div className="w-full md:w-1/2">
                            <form className="flex items-center">
                                <label
                                    htmlFor="simple-search"
                                    className="sr-only"
                                >
                                    Search
                                </label>
                                <div className="relative w-full">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 " />
                                    </div>
                                    <DebounceTextInput
                                        className="block w-full pl-10 placeholder-gray-400 "
                                        placeholder="Search"
                                        value={globalFilter ?? ""}
                                        onChange={(value) =>
                                            setGlobalFilter(String(value))
                                        }
                                    />
                                </div>
                            </form>
                        </div>
                    )}
                    <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                        {canCreate && (
                            <PrimaryButton
                                data-testid="add-button"
                                type="button"
                                className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 bg-primary-600  hover:bg-primary-700  focus:outline-none focus:ring-primary-800 "
                                onClick={onCreate}
                            >
                                <PlusIcon className="h-3.5 w-3.5 mr-2" />
                                Ajouter
                            </PrimaryButton>
                        )}
                        {filter && (
                            <div className="flex items-center space-x-3 w-full md:w-auto">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button
                                            id="filterDropdownButton"
                                            data-dropdown-toggle="filterDropdown"
                                            className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 focus:ring-gray-700  bg-gray-800  text-gray-400  border-gray-600  hover:text-white  hover:bg-gray-700 "
                                            type="button"
                                        >
                                            <FunnelIcon className="h-4 w-4 mr-2 text-gray-400" />
                                            Filter
                                            <svg
                                                className="-mr-1 ml-1.5 w-5 h-5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    clipRule="evenodd"
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <label
                                            htmlFor="apple"
                                            className="ml-2 text-sm font-medium text-gray-900 text-gray-100 "
                                        >
                                            <Checkbox /> Apple (56)
                                        </label>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div
                ref={tableContainerRef}
                className="overflow-auto relative w-full"
                style={{ height: "300px" }}
            >
                <table className="w-full text-sm text-left text-gray-500 text-gray-400  table-auto">
                    <thead className="sticky text-xs text-gray-700 uppercase bg-gray-300   text-gray-400 ">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        scope="col"
                                        key={header.id}
                                        className="px-4 py-3"
                                    >
                                        {!header.isPlaceholder && (
                                            <div
                                                {...{
                                                    className:
                                                        header.column.getCanSort()
                                                            ? "cursor-pointer select-none"
                                                            : "",
                                                    onClick:
                                                        header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext(),
                                                )}{" "}
                                                {{
                                                    asc: (
                                                        <ArrowLongUpIcon className="w-3 h-4 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                                                    ),
                                                    desc: (
                                                        <ArrowLongDownIcon className="w-3 h-4 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                                                    ),
                                                }[
                                                    header.column.getIsSorted() 
                                                ] ?? null}
                                            </div>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="relative">
                        {rowVirtualizer
                            .getVirtualItems()
                            .map((virtualRow, index) => {
                                const row = _rows[virtualRow.index];

                                return (
                                    <tr
                                        key={row.id}
                                        style={{
                                            height: `${virtualRow.size}px`,
                                            transform: `translateY(${
                                                virtualRow.start -
                                                index * virtualRow.size
                                            }px)`,
                                        }}
                                        className="border-b border-gray-700 "
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <td
                                                key={cell.id}
                                                scope="row"
                                                className="px-4 py-3"
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
            <nav
                className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                aria-label="Table navigation"
            >
                <span className="text-sm font-normal text-gray-500 text-gray-400 ">
                    Page{" "}
                    <span className="font-semibold text-gray-900 ">
                        {table.getState().pagination.pageIndex + 1}
                    </span>{" "}
                    sur{" "}
                    <span className="font-semibold text-gray-900 ">
                        {table.getPageCount().toLocaleString()}
                    </span>
                </span>
                <Pagination
                    pageCount={table.getPageCount()}
                    pageRangeDisplayed={5}
                    previousLabel={<ChevronLeftIcon className="w-5 h-5" />}
                    nextLabel={<ChevronRightIcon className="w-5 h-5" />}
                    onClick={({ index, isNext, isPrevious }) => {
                        if (isNext && table.getCanNextPage()) {
                            table.nextPage();
                            return;
                        }

                        if (isPrevious && table.getCanPreviousPage()) {
                            table.previousPage();
                            return;
                        }

                        table.setPageIndex(index ?? 0);
                    }}
                />
            </nav>
        </div>
    );
}
