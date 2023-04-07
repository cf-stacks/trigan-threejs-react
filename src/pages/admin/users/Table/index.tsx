import { useCallback, useState } from "react";
import { UserType } from "../../../../components/admin/users/UsersTable";
import Table from "../../../../components/Table";
import useColumns from "./useColumns";
import {SortingState} from "@tanstack/react-table";

interface Props {
  loading: boolean;
  data: UserType[];
}

function UserTable({ loading, data }: Props) {
  const [rowSelection, setRowSelection] = useState({})
  const [sorting, setSorting] = useState<SortingState>([])

  const columns = useColumns({
    edit: useCallback(() => {}, []),
    remove: useCallback(() => {}, []),
  });

  return (
    <Table
      loading={loading}
      columns={columns}
      data={data}
      state={{ rowSelection, sorting }}
      onSortingChange={setSorting}
      enableRowSelection={true}
      onRowSelectionChange={setRowSelection}
    />
  );
}

export default UserTable;