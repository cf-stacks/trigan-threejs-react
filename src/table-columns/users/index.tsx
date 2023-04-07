import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import moment from "moment";
import { Avatar } from "@mantine/core";
import {UserType} from "../../components/admin/users/UsersTable";
import {useSelectColumn} from "../../components/Table/useSelectColumn";

interface Arguments {
  edit: (user: UserType) => void;
  remove: (id: UserType["id"]) => void;
}

const columnHelper = createColumnHelper<UserType>();

const dateFormatter = (value: string) => moment(value).format("DD MMM, YYYY");

export const useColumns = ({ edit, remove }: Arguments) => {
  const selectColumn = useSelectColumn();
  const columns: ColumnDef<UserType, any>[] =  useMemo(() => [
    selectColumn,
    columnHelper.accessor("role_id", {
      header: "Role ID",
      cell: ({ getValue }) => `#${getValue()}`,
    }),
    columnHelper.accessor((row) => `${row.first_name} ${row.last_name}`, {
      header: "Username",
      cell: ({ getValue }) => (
        <div className="flex items-center">
          <Avatar />
          <span className="ml-2">{getValue()}</span>
        </div>
      ),
    }),
    columnHelper.accessor("email", {
      header: "Email",
    }),
    columnHelper.accessor("phone", {
      header: "Phone",
    }),
    columnHelper.accessor("password", {
      header: "Password",
      cell: () => new Array(8).fill("*").join(""),
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
