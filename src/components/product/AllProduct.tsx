"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import isEmpty from "lodash/isEmpty";
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

import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { IProduct } from "@/types/IProduct";

export default function AllProduct() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const columnHelper = createColumnHelper<IProduct>();

  const columns = useMemo<ColumnDef<IProduct, any>[]>(
    () => [
      columnHelper.accessor("name", {
        header: () => "Products",
        cell: (info) => <div>{info.getValue()}</div>,
      }),
      columnHelper.accessor("detail", {
        header: () => "Detail",
        cell: (info) => <div>{info.renderValue()}</div>,
      }),
      columnHelper.accessor("store", {
        header: "Store",
        cell: (info) => <div>{info.renderValue()}</div>,
      }),
      columnHelper.accessor("createdAt", {
        header: "User/Date Created",
        cell: (info) => info.getValue(),
      }),
      //   columnHelper.accessor("action", {
      //     header: "Action",
      //     cell: (info) => (
      //       <Flex alignItems="center" gap={1}>
      //         <AuthorizationComponentWrapper
      //           groupPermission={userInfo?.permissions}
      //           groupName={"UPDATE_PRODUCT"}
      //         >
      //           <IconButton
      //             bg="transparent"
      //             onClick={() => {
      //               history.push(`/admin/product/${info?.row?.original?._id}`);
      //             }}
      //           >
      //             <EditIcon cursor="pointer" boxSize={4} />
      //           </IconButton>

      //           <IconButton
      //             bg="transparent"
      //             onClick={() => {
      //               handleDeleteSize(info?.row?.original);
      //             }}
      //           >
      //             <DeleteIcon color="red.400" boxSize={4} />
      //           </IconButton>
      //         </AuthorizationComponentWrapper>
      //       </Flex>
      //     ),
      //   }),
    ],
    []
  );

  const table = useReactTable({
    columns,
    data: [],
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
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
                    //   "cursor-default": !header.column.getCanSort(),
                    // })}
                    // onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {/* {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? null} */}
                    </div>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
          {isEmpty(table.getRowModel().rows) ? (
            <TableRow>
              <td className="text-center px-5 py-4 sm:px-6 text-theme-sm" colSpan={4}>
                Không có dữ liệu
              </td>
            </TableRow>
          ) : (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
