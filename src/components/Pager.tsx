import { PagingSchema } from "@/zod/Pagination";
import { ReactNode } from "react";
import Paginator from "./Paginator";

type Props<T> = {
    pagerObject?: PagingSchema<T> | null;
    renderItem: (item: T, index: number) => ReactNode;
    emptyMessage: string;
    renderAsTable?: boolean;
    headerItems?: string[];
    wrapperClass?: string;
}

//This component renders a pager for a paging object with data
//@param pagerObject: a generic pager object with the data as a types array
//@param renderItem: a callback to render the given item from the data array
//@param emptyMessage: a string to render when there are no items
//@param renderAsTable: a boolean to indicate that the pager must be rendered as a table
//@param headerItems: an array with headers when renderAsTable is true
//@param wrapperClass: an optional string with classes to give to the content div or table
export function Pager<T>({ pagerObject, renderItem, emptyMessage, renderAsTable, headerItems, wrapperClass }: Props<T>) {
    const paging = pagerObject?.meta;

    if (!pagerObject?.data.length)
        return <div className="font-bold italic text-center">{emptyMessage}</div>

    return <div>
        {renderAsTable
            ? <table className={wrapperClass || "table table-zebra"}>
                {!!headerItems?.length &&
                    <thead>
                        <tr>
                            {headerItems.map(headerItem => <th key={headerItem}>{headerItem}</th>)}
                        </tr>
                    </thead>
                }
                {pagerObject.data.map((item, index) => renderItem(item, index))}
            </table>
            : <div className={wrapperClass || "grid grid-cols-1 md:grid-cols-3 gap-8"}>
                {pagerObject.data.map((item, index) => renderItem(item, index))}
            </div>
        }

        {/* Render the pagination */}
        {(paging && paging.last_page > 1) && <div className="flex justify-center mt-8">
            <Paginator
                currentPage={paging.current_page}
                itemCount={paging.total}
                pageSize={paging.per_page}
            />
        </div>}
    </div>
}