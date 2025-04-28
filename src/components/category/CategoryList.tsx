"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
// import isEmpty from "lodash/isEmpty";
// import classNames from "classnames";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  createColumnHelper,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";
import { FaEdit, FaTrash } from "react-icons/fa";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ICategory } from "../../types/ICategory";

interface ICategoryListProps {
  categories: Array<ICategory>;
  handleEditCategory: (data: ICategory) => void;
  handleDeleteCategory: (data: ICategory) => void;
}

export default function CategoryList({
  categories,
  handleEditCategory,
  handleDeleteCategory,
}: ICategoryListProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const columnHelper = createColumnHelper<ICategory>();

  const columns = useMemo<ColumnDef<ICategory, any>[]>(
    () => [
      columnHelper.accessor("title", {
        header: () => "Title",
        cell: (info) => <div>{info.getValue()}</div>,
      }),
      columnHelper.accessor("description", {
        header: () => "Description",
        cell: (info) => <div>{info.renderValue()}</div>,
      }),
      columnHelper.accessor("_id", {
        header: "Action",
        cell: (info) => (
          <div className="flex items-center gap-2">
            <button
              className="rounded hover:bg-gay-400"
              onClick={() => {
                handleEditCategory(info?.row.original);
              }}
            >
              <FaEdit size={16} />
            </button>

            <button
              className="text-red-500 rounded hover:bg-gay-400"
              onClick={() => {
                handleDeleteCategory(info?.row.original);
              }}
            >
              <FaTrash color="bg-red-400" />
            </button>
          </div>
        ),
      }),
    ],
    []
  );

  const data = useMemo(() => categories || [], [categories]);

  const table = useReactTable({
    columns,
    data,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true, // Disable debug mode
  });

  return (
    <div className="overflow-x-auto max-w-full overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <Table>
        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell
                  key={header.id}
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  {header.isPlaceholder ? null : (
                    <div
                    // className={classNames({
                    //   "cursor-pointer": header.column.getCanSort(),
                    // })}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="px-5 py-3 text-gray-700 text-theme-sm dark:text-gray-300"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="px-5 py-3 text-center text-gray-500 dark:text-gray-400">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
