import { useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

export function useFetchData<T>() {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();

    const fetchData = useCallback(async (fetchMethod: (params: any) => Promise<any>, { additionalDeps = [], transformParams, onSuccess }: { additionalDeps?: any[]; transformParams?: (params: any) => any; onSuccess?: (data: T) => void; } = {}) => {
        setLoading(true);
        try {
            const params = {
                page: searchParams.get('page') || '1',
                search: searchParams.get('search') || '',
                ...Object.fromEntries(searchParams.entries())
            };

            const finalParams = transformParams ? { query: transformParams(params) } : { query: params };
            const result = await fetchMethod(finalParams);

            setData(result);
            onSuccess?.(result);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [searchParams]);

    return { data, loading, fetchData };
}