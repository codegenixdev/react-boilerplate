import { getItems } from '@/features/pages/users/services/mockApi';
import { useQuery } from '@tanstack/react-query';

export function useItems() {
	return useQuery({
		queryFn: getItems,
		queryKey: ['users'],
	});
}
