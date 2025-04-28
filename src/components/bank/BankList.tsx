"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  createColumnHelper,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";
import { MdDelete } from "react-icons/md";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { IBank } from "../../types/IBank";

interface IBankListProps {
  banks: Array<IBank>;
  handleEditBank: (status: string, data: IBank) => void;
  handleDeleteBank: (data: IBank) => void;
}

export default function BankList({ banks, handleDeleteBank }: IBankListProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const columnHelper = createColumnHelper<IBank>();

  const columns = useMemo<ColumnDef<IBank, any>[]>(
    () => [
      columnHelper.accessor("id", {
        header: () => "ID",
        cell: (info) => <div>{info?.row.original?.id}</div>,
      }),
      columnHelper.accessor("bin", {
        header: () => "Bin",
        cell: (info) => <div>{info.renderValue()}</div>,
      }),
      columnHelper.accessor("code", {
        header: () => "Code",
        cell: (info) => <div>{info.renderValue()}</div>,
      }),
      columnHelper.accessor("name", {
        header: () => "Name",
        cell: (info) => <div>{info.renderValue()}</div>,
      }),
      columnHelper.accessor("shortName", {
        header: () => "Short Name",
        cell: (info) => <div>{info.renderValue()}</div>,
      }),
      columnHelper.accessor("logo", {
        header: () => "Logo",
        cell: (info) => (
          <img
            width={40}
            height={40}
            src={info.renderValue()}
            alt="User"
            className="w-fit h-[40px] object-cover"
          />
        ),
      }),
      columnHelper.accessor("lookupSupported", {
        header: () => "Lookup Supported",
        cell: (info) => (
          <div className="text-green-700">{info.renderValue()}</div>
        ),
      }),
      columnHelper.accessor("transferSupported", {
        header: () => "Transfer Supported",
        cell: (info) => (
          <div className="text-green-700">{info.renderValue()}</div>
        ),
      }),
      columnHelper.accessor("_id", {
        header: "Action",
        cell: (info) => (
          <div className="flex items-center gap-2">
            <button
              className="text-red-500 rounded hover:bg-gay-400"
              onClick={() => {
                handleDeleteBank(info?.row.original);
              }}
            >
              <MdDelete size={20} color="bg-red-400" />
            </button>
          </div>
        ),
      }),
    ],
    []
  );

  const data = useMemo(() => banks || [], [banks]);

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
