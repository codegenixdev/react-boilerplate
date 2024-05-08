import { ArrayPath, FieldValues, Path } from 'react-hook-form';

import { ErrorMessage as RHFErrorMessage } from '@hookform/error-message';
import { FormHelperText } from '@mui/material';

type Props<T extends FieldValues> = {
	name: Path<T> | ArrayPath<T>;
};
export function ErrorMessage<T extends FieldValues>({ name }: Props<T>) {
	return (
		<RHFErrorMessage
			name={name}
			as={<FormHelperText sx={{ color: 'error.500' }} />}
		/>
	);
}
