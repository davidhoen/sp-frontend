import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

type FilterConfig = {
    key: string;
    type?: 'single' | 'array';
    removeOnAll?: boolean;
    setValue?: (value: any) => void;
}

type FilterValue = string | string[];

export function useQueryFilter(config: FilterConfig) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleFilter = useDebouncedCallback((value: FilterValue) => {
        const params = new URLSearchParams(searchParams);
        const { key, type = 'single', removeOnAll = true, setValue } = config;

        if (type === 'array' && Array.isArray(value)) {
            const newestValue = value[value.length - 1];
            if (newestValue === 'all' || !value.length) {
                params.delete(key);
                setValue?.(newestValue === 'all' ? ['all'] : []);
            } else {
                const filtered = value.filter(v => v !== 'all');
                params.set(key, filtered.join(','));
                setValue?.(filtered);
            }
        } else if (type === 'single' && typeof value === 'string') {
            if (value && (!removeOnAll || value !== 'all')) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        }

        params.delete('page');
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return handleFilter;
}