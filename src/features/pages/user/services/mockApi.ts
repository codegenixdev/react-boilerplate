import { Schema } from '@/features/pages/user/types/schema';
import { IdLabel } from '@/types/idLabel';
import { wait } from '@/utils/wait';

export async function getCities(): Promise<IdLabel[]> {
	await wait(500);

	return [
		{
			id: '1',
			label: 'کرج',
		},
		{
			id: '2',
			label: 'تهران',
		},
	];
}

export async function create(data: Schema) {
	await wait(1000);
}

export async function edit(data: Schema) {
	await wait(1000);
}

export async function getItem(id: string): Promise<Schema | undefined> {
	await wait(0);

	switch (id) {
		case '1':
			return {
				variant: 'edit',
				id,
				fullName: 'علی نادری',
				email: 'ali@naderi.com',
				city: '1',
			};
		case '2':
			return {
				variant: 'edit',
				id,
				fullName: 'حسین نامی',
				email: 'hosein@nami.com',
				city: '2',
			};
	}
}
