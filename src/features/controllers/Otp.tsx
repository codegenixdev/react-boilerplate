import { MuiOtpInput, MuiOtpInputProps } from 'mui-one-time-password-input';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

import { ErrorMessage } from '@/components/ErrorMessage';
import { Stack } from '@mui/material';

type Props<T extends FieldValues> = {
	name: Path<T>;
} & Pick<MuiOtpInputProps, 'length' | 'onComplete'>;

export function Otp<T extends FieldValues>({ name, ...props }: Props<T>) {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<Stack>
					<MuiOtpInput
						{...field}
						{...props}
						autoFocus
						dir="ltr"
						color="red"
						TextFieldsProps={{ error: !!error }}
					/>
					<ErrorMessage name={name} />
				</Stack>
			)}
		/>
	);
}
