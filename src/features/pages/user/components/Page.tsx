import { useEffect, useMemo } from 'react';
import { SubmitHandler, useFormContext, useWatch } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { useConfirm } from '@/features/confirm';
import { Autocomplete } from '@/features/controllers/Autocomplete';
import { TextField } from '@/features/controllers/TextField';
import { useCreate, useEdit } from '@/features/pages/user/services/mutations';
import { useCities, useItem } from '@/features/pages/user/services/queries';
import { defaultValues, Schema } from '@/features/pages/user/types/schema';
import { LoadingButton } from '@mui/lab';
import { Button, Container, Stack } from '@mui/material';

export function Page() {
	const confirm = useConfirm();
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const itemQuery = useItem();

	const citiesQuery = useCities();
	const createMutation = useCreate();
	const editMutation = useEdit();

	const isPending = useMemo(
		() => createMutation.isPending || editMutation.isPending,
		[createMutation.isPending, editMutation.isPending]
	);

	const { handleSubmit, reset, control } = useFormContext<Schema>();
	const variant = useWatch({ control, name: 'variant' });

	const onSubmit: SubmitHandler<Schema> = async (data) => {
		if (variant === 'create') {
			createMutation.mutate(data);
		} else {
			await confirm({
				handleConfirm: async () => editMutation.mutateAsync(data),
			});
		}
	};

	useEffect(() => {
		if (itemQuery.data && id) {
			reset(itemQuery.data);
		} else {
			reset(defaultValues);
		}
	}, [reset, id, itemQuery.data]);

	return (
		<Container sx={{ marginTop: 5 }} maxWidth="sm">
			<Stack sx={{ gap: 1 }} component="form" onSubmit={handleSubmit(onSubmit)}>
				<TextField<Schema> name="fullName" label="نام" />
				<TextField<Schema> name="email" label="ایمیل" />
				<Autocomplete<Schema>
					name="city"
					loading={citiesQuery.isLoading}
					options={citiesQuery.data}
				/>
				<LoadingButton type="submit" variant="contained" loading={isPending}>
					{variant === 'create' ? 'ایجاد کاربر' : 'ویرایش کاربر'}
				</LoadingButton>
				<Button onClick={() => navigate('/users')} type="button">
					بازگشت
				</Button>
			</Stack>
		</Container>
	);
}
