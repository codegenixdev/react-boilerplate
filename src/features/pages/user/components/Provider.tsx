import { FormProvider, useForm } from 'react-hook-form';

import { Page } from '@/features/pages/user/components/Page';
import {
	defaultValues,
	Schema,
	schema,
} from '@/features/pages/user/types/schema';
import { zodResolver } from '@hookform/resolvers/zod';

export function Provider() {
	const methods = useForm<Schema>({
		resolver: zodResolver(schema),
		defaultValues,
		mode: 'all',
	});

	return (
		<FormProvider {...methods}>
			<Page />
		</FormProvider>
	);
}
