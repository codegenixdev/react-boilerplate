import { IdLabel } from '@/types/idLabel';
import { wait } from '@/utils/wait';

export async function getItems(): Promise<IdLabel[]> {
	await wait(900);

	return [
		{
			id: '1',
			label: 'علی نادری',
		},
		{
			id: '2',
			label: 'حسین نامی',
		},
	];
}

export async function deleteItem(id: string) {
	await wait(500);
}
