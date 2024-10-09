"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({
    currentPage,
    hasNext,
    hasPrev
}: {
    currentPage: number;
    hasNext: boolean;
    hasPrev: boolean;
}) => {

    const pathName = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const createPageUrl = (pageNumber:number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        replace(`${pathName}?${params.toString()}`);
    }

    return (
        <div className="mt-12 flex justify-between w-full">
            <button className="rounded-md bg-redColor text-white p-2 text-sm w-24
       disabled:bg-red-200 cursor-pointer hover:bg-red-400 disabled:cursor-not-allowed"
                disabled={!hasPrev} onClick={()=>createPageUrl(currentPage-1)}>
                Go Back
            </button>
            <button className="rounded-md bg-redColor text-white p-2 text-sm w-24
       disabled:bg-red-200 cursor-pointer hover:bg-red-400 disabled:cursor-not-allowed"
                disabled={!hasNext}
                onClick={()=>createPageUrl(currentPage+1)}>
                Next Page
            </button>
        </div>
    )
}

export default Pagination
