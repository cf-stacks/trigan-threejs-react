import { useCallback, useState } from "react";
import Table from "../../../../components/Table";
import useColumns from "./useColumns";
import {SortingState} from "@tanstack/react-table";
import { BlogPost } from "../../../../types/BlogPost";

interface Props {
  loading: boolean;
  data: BlogPost[];
}

function PostTable({ loading, data }: Props) {
}

export default PostTable;
