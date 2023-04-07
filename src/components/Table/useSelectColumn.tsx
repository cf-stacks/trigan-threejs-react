import { Checkbox, createStyles } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react"

const useStyles = createStyles(() => ({
  checkbox: {
    borderRadius: "2px",
    height: "20px",
    width: "20px",

    input: {
      height: "20px",
      width: "20px",
      outline: "0px !important",

      ":checked, :hover": {
        backgroundColor: "#A855F7 !important",
      },
    }
  },

  indeterminate: {
    input: {
      backgroundColor: "#A855F7 !important",
    },
  },
}))

export const useSelectColumn = () => {
  const {classes, cx} = useStyles();
  const column: ColumnDef<any, any> = useMemo(() => ({
    id: 'select',
    header: ({ table }) => {
      const indeterminate = table.getIsSomeRowsSelected();
      return (
        <Checkbox
          className={cx(classes.checkbox, indeterminate && classes.indeterminate)}
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate,
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      );
    },
    cell: ({ row }) => {
      const indeterminate = row.getIsSomeSelected();
      return (
        <div className="px-1">
          <Checkbox
            className={cx(classes.checkbox, indeterminate && classes.indeterminate)}
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </div>
      );
    },
  }), [classes, cx]);
  return column;
}
