import { ColumnFiltersState, PaginationState } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import route from "ziggy-js";
import { Pagination } from "@/Models/Helper";

export default function useFilterPagination<T>(
    onDataChange: (data: Pagination<T>) => void,
    apiUrl: string,
    columnFilterState: ColumnFiltersState = [],
    paginationState: PaginationState = {
        pageIndex: 0,
        pageSize: 10,
    }) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(columnFilterState);
    const [pagination, setPagination] = useState<PaginationState>(paginationState);

    const url = new URL(route('api.' + apiUrl));
    url.searchParams.set('page', (pagination.pageIndex + 1).toString());
    url.searchParams.set('perPage', pagination.pageSize.toString());
    url.searchParams.set('columnFilters', JSON.stringify(columnFilters ?? []));

    useEffect(() => {
        fetch(url.toString(), {
            method: 'GET',
        }).then(
            response => response.json()
        ).then(responseJson => {
            onDataChange(responseJson);
        }).catch(error => {
            console.error(error);
        });
    }, [url.toString()]);

    return {
        columnFilters,
        pagination,
        setColumnFilters,
        setPagination,
    }
}
