import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import moment from "moment";
import {useSelectColumn} from "../../components/Table/useSelectColumn";
import {BlogPost} from "../../types/BlogPost";

interface Arguments {
  edit: (data: BlogPost) => void;
  remove: (id: BlogPost["id_post"]) => void;
}

const columnHelper = createColumnHelper<BlogPost>();

const dateFormatter = (value: string) => moment(value).format("DD MMM, YYYY");

export const useColumns = ({ edit, remove }: Arguments) => {
  const selectColumn = useSelectColumn();
  const columns: ColumnDef<BlogPost, any>[] =  useMemo(() => [
    selectColumn,
    columnHelper.accessor("author", {
      header: "Author",
    }),
    columnHelper.accessor("content", {
      header: "Content",
      cell: ({ getValue }) => (
        <div className="w-[300px] truncate">
          {getValue()}
        </div>
      ),
    }),
    columnHelper.accessor("categories", {
      header: "Content",
      cell: ({ getValue }) => {
        const value: string[] = getValue();
        return (
          <div className="flex flex-wrap gap-2 max-w-[300px]">
            {value?.map((item: string) => (
              <span key={item} className="rounded bg-white text-primary px-2 py-1">
                {item}
              </span>
            ))}
          </div>
        );
      },
    }),
    columnHelper.accessor("original_filename", {
      header: "Original File Name",
    }),
    columnHelper.accessor("created_at", {
      header: "Date created",
      cell: ({ getValue }) => dateFormatter(getValue()),
    }),
    columnHelper.accessor("updated_at", {
      header: "Last updated",
      cell: ({ getValue }) => dateFormatter(getValue()),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: () => (
        <div className="flex gap-x-4">
          <span className="cursor-pointer">
            <AiFillEdit size={20} />
          </span>

          <span className="cursor-pointer">
            <AiFillDelete size={20} />
          </span>
        </div>
      ),
    }),
  ], [selectColumn, edit, remove]);
  return columns;
}
