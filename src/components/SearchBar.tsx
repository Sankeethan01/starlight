"use client"
import searchImg from '@/../../public/search.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SearchBar = () => {

    const router = useRouter();

    const handleSearch = (e:React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const searchText = (formData.get("search-text") as string).toLowerCase();
            if(searchText)
            {
             router.push(`/list?searchText=${searchText}`);
            } 
    }

  return (
    <form className="flex items-center justify-between gap-4 bg-gray-100 p-2 rounded-md flex-1/2 md:flex-1" onSubmit={handleSearch}>
        <input type="text" name='search-text' placeholder="Search here" className='flex-1 bg-transparent outline-none'/>
        <button className='cursor-pointer' type='submit'>
          <Image src={searchImg} alt='search image' width={16} height={16}/>
        </button>
    </form>
  )
}

export default SearchBar
