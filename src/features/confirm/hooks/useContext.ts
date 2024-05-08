import { useContext as useReactContext } from 'react';

import { Context } from '@/features/confirm/context/context';

export function useContext() {
	const context = useReactContext(Context);

	if (context === undefined) {
		throw new Error('useContext must be used with a context(confirm)');
	}
	return context;
}
