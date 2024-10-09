"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

const Filter = () => {

  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    params.set(name,value);
    replace(`${pathName}?${params.toString()}`);

  }

  return (
    <div className="mt-12 flex justify-between">
      {/* Left Side Filter */}
      <div className="flex gap-6 flex-wrap">
        <select name="all" id=""
          className="py-3 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
          onChange={handleFilterChange}
        >
          <option>All Filters</option>
        </select>
        <input type="text" name="min" placeholder="min price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />
        <input type="text" name="max" placeholder="max price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />

        <select name="sub-category" id=""
          className="py-3 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
          onChange={handleFilterChange}
        >
          <option>Sub Category</option>
          <option value="sub-cat-1">Category 1</option>
          <option value="sub-cat-1">Category 2</option>
        </select>
      </div>
      {/* Right Side Filter */}
      <div>
        <select name="sort" id=""
          className="py-3 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
          onChange={handleFilterChange}
        >
          <option>Sort By</option>
          <option value="asc price">Price (Low to High)</option>
          <option value="desc price">Price (High to Low)</option>
          <option value="asc lastUpdated">Newest</option>
          <option value="desc lastUpdated">Oldest</option>
        </select>
      </div>
    </div>
  )
}

export default Filter
