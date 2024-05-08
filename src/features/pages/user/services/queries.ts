import { useParams } from 'react-router-dom';

import { getCities, getItem } from '@/features/pages/user/services/mockApi';
import { useQuery } from '@tanstack/react-query';

export function useCities() {
	return useQuery({
		queryFn: getCities,
		queryKey: ['cities'],
	});
}

export function useItem() {
	const { id } = useParams<{ id: string }>();

	return useQuery({
		queryFn: () => getItem(id!),
		queryKey: ['user'],
		enabled: !!id,
	});
}
