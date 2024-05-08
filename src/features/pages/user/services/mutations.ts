import { useNavigate } from 'react-router-dom';

import { create, edit } from '@/features/pages/user/services/mockApi';
import { Schema } from '@/features/pages/user/types/schema';
import { showSnack } from '@/utils/showSnack';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreate() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: (data: Schema) => create(data),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['users'] });
			showSnack('کاربر با موفقیت ایجاد شد');
			navigate('/users');
		},
	});
}

export function useEdit() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	return useMutation({
		mutationFn: (data: Schema) => edit(data),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['users'] });
			showSnack('کاربر با موفقیت ویرایش شد');
			navigate('/users');
		},
	});
}
