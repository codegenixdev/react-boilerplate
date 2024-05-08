import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

export function useFormLogger() {
	const { watch } = useFormContext();

	useEffect(() => {
		// eslint-disable-next-line no-console
		const { unsubscribe } = watch((value) => console.log(value));
		return unsubscribe;
	}, [watch]);
}
