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

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ITransaction } from "../../types/ITransaction";
import Select from "../form/Select";
import { StatusTransaction } from "../../shared/constants/common";
import { formatUSD, formatVND } from "../../shared/utils/helpers";

interface ITransactionListProps {
  transactions: Array<ITransaction>;
  handleEditCategory: (e: string, data: ITransaction) => void;
}

export default function TransactionList({
  transactions,
  handleEditCategory,
}: ITransactionListProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const columnHelper = createColumnHelper<ITransaction>();

  const columns = useMemo<ColumnDef<ITransaction, any>[]>(
    () => [
      columnHelper.accessor("orderId", {
        header: () => "OrderId",
        cell: (info) => <div>{info.getValue()}</div>,
      }),
      columnHelper.accessor("username", {
        header: () => "Username",
        cell: (info) => <div>{info.renderValue()}</div>,
      }),
      columnHelper.accessor("amount", {
        header: () => "Amount",
        cell: (info) => (
          <div className="font-semibold">
            {formatUSD(info.renderValue()) +
              " USD " +
              `(${formatVND(info.row?.original?.amountVND)})`}
          </div>
        ),
      }),
      columnHelper.accessor("currency", {
        header: () => "Currency",
        cell: (info) => <div>{info.renderValue()}</div>,
      }),
      columnHelper.accessor("type", {
        header: () => "Type",
        cell: (info) => <div>{info.renderValue()}</div>,
      }),
      columnHelper.accessor("status", {
        header: () => "Status",
        cell: (info) => (
          <Select
            disabled={
              info?.row.original?.status !== StatusTransaction.PROCESSING
            }
            defaultValue={info?.row.original?.status}
            options={(
              Object.keys(StatusTransaction) as Array<
                keyof typeof StatusTransaction
              >
            ).map((item) => ({
              label: item,
              value: StatusTransaction[item],
            }))}
            placeholder="Select Option"
            onChange={(e: string) => {
              const confirmDelete = window.confirm(
                "Are you sure you want to change status this record?"
              );
              if (!confirmDelete) {
                return;
              }
              handleEditCategory(e, info?.row.original);
            }}
            className="dark:bg-dark-900 !w-[100px] !p-0 !text-center"
          />
        ),
      }),
      // columnHelper.accessor("_id", {
      //   header: "Action",
      //   cell: (info) => (
      //     <div className="flex items-center gap-2">
      //       <button
      //         className="rounded hover:bg-gay-400"
      //         onClick={() => {
      //           handleEditCategory(info?.row.original);
      //         }}
      //       >
      //         <MdChangeCircle size={16} />
      //       </button>
      //     </div>
      //   ),
      // }),
    ],
    []
  );

  const data = useMemo(() => transactions || [], [transactions]);

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
