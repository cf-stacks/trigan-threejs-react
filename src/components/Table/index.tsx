import { createStyles, Loader } from "@mantine/core";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  TableOptions,
  useReactTable,
} from "@tanstack/react-table"
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const useStyles = createStyles(() => ({
  table: {
    borderCollapse: "separate",
    borderSpacing: "0rem 1.5rem",
  },

  bodyRow: {
    backgroundColor: "#39394B",
  }
}))

interface TableProps<T> extends Omit<TableOptions<T>, "getCoreRowModel"> {
  data: T[];
  columns: ColumnDef<T>[];
  loading: boolean;
  getCoreRowModel?: TableOptions<T>["getCoreRowModel"];
}

function Table<T>({ loading, ...tableOptions }: TableProps<T>) {
  const {classes, cx} = useStyles()
  const table = useReactTable({
    ...tableOptions,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="p-2">
      <table className={cx(classes.table, "text-white w-full")}>
        <thead className="text-xs">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                let sortIcon = null;
                switch (header.column.getIsSorted()) {
                  case "asc": {
                    sortIcon = (<FaChevronUp />);
                    break;
                  }
                  case "desc": {
                    sortIcon = (<FaChevronDown />);
                    break;
                  }
                }
                return (
                  <th
                    key={header.id}
                    className="font-normal text-left px-4"
                    {...{
                      colSpan: header.colSpan,
                      style: {
                        width: header.getSize(),
                      },
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'flex cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        {sortIcon && (
                          <span className="ml-2">{sortIcon}</span>
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="text-sm">
          {loading ? (
            <tr className={cx(classes.bodyRow, "mb-6")}>
              <td className="p-4" colSpan={999}>
                <div className="flex justify-center">
                  <Loader />
                </div>
              </td>
            </tr>
          ) : table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              className={cx(classes.bodyRow, "mb-6")}
            >
              {row.getVisibleCells().map(cell => (
                <td
                key={cell.id}
                className="p-4"
                {...{
                  style: {
                    width: cell.column.getSize(),
                  },
                }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  )
}

export default Table;