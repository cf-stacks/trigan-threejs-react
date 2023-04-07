import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { UserType } from "../../../../components/admin/users/UsersTable";
import moment from "moment";
import { Avatar, Checkbox } from "@mantine/core";

interface Arguments {
  edit: (user: UserType) => void;
  remove: (id: UserType["id"]) => void;
}

const columnHelper = createColumnHelper<UserType>();

const dateFormatter = (value: string) => moment(value).format("DD MMM, YYYY");

const useColumns = ({ edit, remove }: Arguments) => {
  const columns: ColumnDef<UserType, any>[] =  useMemo(() => [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        <div className="px-1">
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </div>
      ),
    },
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
      cell: () => new Array(8).fill("*"),
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
    /*
    columnHelper.accessor(row => row.lastName, {
      id: "lastName",
      cell: info => <i>{info.getValue()}</i>,
      header: () => <span>Last Name</span>,
    }),
    columnHelper.accessor("age", {
      header: () => "Age",
      cell: info => info.renderValue(),
    }),
    columnHelper.accessor("visits", {
      header: () => <span>Visits</span>,
    }),
    columnHelper.accessor("status", {
      header: "Status",
    }),
    columnHelper.accessor("progress", {
      header: "Profile Progress",
    }),
    */
  ], [edit, remove]);
  return columns;
}

export default useColumns;