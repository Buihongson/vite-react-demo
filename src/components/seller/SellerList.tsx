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
// import { TbLockCheck } from "react-icons/tb";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ISeller, TYPE_STATUS_SELLER } from "../../types";
import Select from "../form/Select";
import { formatUSD } from "../../shared/utils/helpers";

interface ICategoryListProps {
  categories: Array<ISeller>;
  handleEditSeller: (status: string, data: ISeller) => void;
  handleDeleteSeller: (data: ISeller) => void;
}

const options = [
  { value: TYPE_STATUS_SELLER.Active, label: "Active" },
  { value: TYPE_STATUS_SELLER.Inactive, label: "Inactive" },
  { value: TYPE_STATUS_SELLER.Suspended, label: "Suspended" },
  { value: TYPE_STATUS_SELLER.PENDING, label: "Pending" },
];

export default function SellerList({
  categories,
  handleEditSeller,
}: // handleDeleteSeller,
ICategoryListProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const columnHelper = createColumnHelper<ISeller>();

  const columns = useMemo<ColumnDef<ISeller, any>[]>(
    () => [
      columnHelper.accessor("firstname", {
        header: () => "Name",
        cell: (info) => (
          <div>
            {info?.row.original?.firstname
              ? info?.row.original?.firstname +
                " " +
                info?.row.original?.lastname
              : info?.row.original?.fullname}
          </div>
        ),
      }),
      columnHelper.accessor("email", {
        header: () => "Email",
        cell: (info) => <div>{info.renderValue()}</div>,
      }),
      columnHelper.accessor("phone", {
        header: () => "Phone",
        cell: (info) => <div>{info.renderValue()}</div>,
      }),
      columnHelper.accessor("balance", {
        header: () => "Balance",
        cell: (info) => (
          <div className="text-green-700">{formatUSD(info.renderValue())}</div>
        ),
      }),
      columnHelper.accessor("available", {
        header: () => "Available",
        cell: (info) => <div>{formatUSD(info.renderValue()) + " USD"}</div>,
      }),
      columnHelper.accessor("credit", {
        header: () => "Credit",
        cell: (info) => <div>{formatUSD(info.renderValue()) + " USD"}</div>,
      }),
      columnHelper.accessor("hold", {
        header: () => "Hold",
        cell: (info) => <div>{formatUSD(info.renderValue()) + " USD"}</div>,
      }),
      columnHelper.accessor("referralCode", {
        header: () => "Referral Code",
        cell: (info) => <div>{info.renderValue()}</div>,
      }),
      columnHelper.accessor("status", {
        header: () => "Status",
        cell: (info) => (
          <Select
            defaultValue={info?.row.original?.status}
            options={options}
            placeholder="Select Option"
            onChange={(e: string) => {
              const confirmDelete = window.confirm(
                "Are you sure you want to change status this record?"
              );
              if (!confirmDelete) {
                return;
              }
              handleEditSeller(e, info?.row.original);
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
      //         className="text-red-500 rounded hover:bg-gay-400"
      //         onClick={() => {
      //           handleDeleteSeller(info?.row.original);
      //         }}
      //       >
      //         <TbLockCheck size={20} color="bg-red-400" />
      //       </button>
      //     </div>
      //   ),
      // }),
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
                  className="truncate px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
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
                    className="truncate px-5 py-3 text-gray-700 text-theme-sm dark:text-gray-300"
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
