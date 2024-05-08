import { deleteItem } from '@/features/pages/users/services/mockApi';
import { showSnack } from '@/utils/showSnack';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteItem() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => deleteItem(id),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['users'] });
			showSnack('کاربر با موفقیت حذف شد');
		},
	});
}
