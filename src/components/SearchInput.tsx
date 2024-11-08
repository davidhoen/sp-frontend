import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';
import { Input } from "./ui/input";

export default function SearchInput({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams.toString());
        if (term) {
            params.set('search', term);
            // Remove page parameter when searching to avoid so results on search
            params.delete('page')
        } else {
            params.delete('search');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return <Input defaultValue={searchParams.get('search')?.toString()} placeholder={placeholder} onChange={({ target: { value } }) => handleSearch(value)} />

}
