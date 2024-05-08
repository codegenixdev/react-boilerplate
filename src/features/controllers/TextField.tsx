import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

import {
	TextField as MuiTextField,
	TextFieldProps as MuiTextFieldProps,
} from '@mui/material';

type Props<T extends FieldValues> = {
	name: Path<T>;
	adornment?: string;
	loading?: boolean;
	valueShape?: 'array' | 'string';
} & Pick<
	MuiTextFieldProps,
	| 'inputProps'
	| 'label'
	| 'disabled'
	| 'size'
	| 'fullWidth'
	| 'placeholder'
	| 'sx'
	| 'type'
	| 'maxRows'
	| 'multiline'
	| 'InputProps'
	| 'autoFocus'
	| 'autoComplete'
	| 'error'
>;

export function TextField<T extends FieldValues>(props: Props<T>) {
	const {
		name,
		adornment,
		loading = false,
		valueShape = 'string',
		autoFocus,
		...restProps
	} = props;
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({
				field: { onChange, ...restField },
				fieldState: { error },
			}) => (
				<MuiTextField
					{...restField}
					label={restProps.label}
					onChange={(e) => {
						if (valueShape === 'string') {
							onChange(e.target.value);
						} else {
							onChange([e.target.value]);
						}
					}}
					disabled={restProps.disabled || restField.disabled || loading}
					fullWidth
					{...(!restProps.disabled
						? {
								error: !!error || !!props.error,
								helperText: error?.message,
						  }
						: {})}
					InputProps={{
						endAdornment: <>{adornment}</>,
					}}
					{...restProps}
					autoFocus={autoFocus}
				/>
			)}
		/>
	);
}
