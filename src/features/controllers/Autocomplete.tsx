import { useEffect } from 'react';
import {
	Controller,
	FieldValues,
	Path,
	PathValue,
	useFormContext,
	useWatch,
} from 'react-hook-form';

import { IdLabel } from '@/types/idLabel';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {
	Autocomplete as MuiAutocomplete,
	Box,
	Checkbox,
	Stack,
	SxProps,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material';

const checkedIcon = <CheckBoxIcon fontSize="small" />;
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;

type Props<T extends FieldValues> = {
	name: Path<T>;
	options?: IdLabel[];
	label?: string;
	variant?: 'simple' | 'multiple' | 'group';
	handle?: () => void;
	loading?: boolean;
	disabled?: boolean;
	startAdornment?: JSX.Element;
	readonly?: boolean;
	sx?: SxProps;
	disableClearable?: boolean;
	enforceValue?: boolean;
	size?: 'small' | 'medium';
};

export function Autocomplete<T extends FieldValues>({
	options = [],
	name,
	label,
	loading = false,
	variant = 'simple',
	handle,
	disabled = false,
	startAdornment,
	readonly = false,
	sx,
	disableClearable = false,
	enforceValue = false,
	size = 'medium',
}: Props<T>) {
	const { control, setValue } = useFormContext<T>();

	const watchedValue = useWatch({ control, name });

	useEffect(() => {
		if (enforceValue) {
			if (options[0] && options[0].id) {
				const isValueInOptions = !!options.find(
					(item) => item.id === watchedValue
				);

				if (!watchedValue || !isValueInOptions) {
					setValue(name, options[0].id as PathValue<T, Path<T>>);
				}
			}
		}
	}, [enforceValue, name, options, setValue, watchedValue]);

	return (
		<Tooltip title={readonly ? 'غیر قابل ویرایش' : ''}>
			<Box component="div">
				<Controller
					control={control}
					name={name}
					render={({
						field: { ref, onChange, value },
						fieldState: { error },
					}) => (
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						<MuiAutocomplete
							sx={sx}
							readOnly={readonly}
							isOptionEqualToValue={(option, newValue) =>
								(option as IdLabel).id === (newValue as IdLabel).id
							}
							noOptionsText={'یافت نشد'}
							disabled={loading || disabled}
							loading={loading}
							size={size}
							loadingText={'در حال فراخوانی'}
							{...(variant === 'simple'
								? {
										onChange: (_, newValue) => {
											onChange((newValue as IdLabel)?.id ?? '');
											if (handle) handle();
										},
										options: options || [],
										value: value
											? options?.find((option) => value === option.id) ?? null
											: null,
										disableClearable,
								  }
								: variant === 'multiple'
								? {
										value: (value as Array<string>)?.map(
											(val) =>
												options?.find((item) => item.id === val) ?? 'بدون نتیجه'
										),
										getOptionLabel: (option: { id: string; label: string }) =>
											options?.find((item) => item.id === option.id)?.label ??
											'',

										onChange: (_, newValue: IdLabel[]) => {
											onChange(newValue.map((item) => item.id));
											if (handle) handle();
										},
										disableCloseOnSelect: true,
										multiple: true,
										options: options || [],
										disableClearable,
								  }
								: variant === 'group'
								? {
										disableCloseOnSelect: true,
										getOptionLabel: (option: { id: string; label: string }) =>
											options
												?.find((item) => item.id === option.id)
												?.label.split('/')[0] ?? '',
										onChange: (_, newValue: IdLabel[]) => {
											onChange(newValue.map((item) => item.id));
											if (handle) handle();
										},
										options: options
											?.map((option) => {
												const group = option.label.split('/')[0];
												return {
													group: /[0-9]/.test(group) ? '0-9' : group,
													label: option.label
														.split('/')
														.filter((_, index) => index !== 0)
														.join('/'),
													id: option.id,
												};
											})
											?.sort((a, b) => -b.group.localeCompare(a.group)),
										multiple: true,
										groupBy: (option: { group: string }) => option.group,
										value: (value as Array<string>).map(
											(val) =>
												options?.find((item) => item.id === val) ?? 'بدون نتیجه'
										),
								  }
								: {})}
							{...(variant === 'group' || variant === 'multiple'
								? {
										renderOption: (props, option: IdLabel, { selected }) => (
											<Box component="li" {...props}>
												<Checkbox
													icon={icon}
													checkedIcon={checkedIcon}
													style={{ marginRight: 8 }}
													checked={selected}
												/>
												{variant === 'multiple' && <>{option.label}</>}
												{variant === 'group' && (
													<Stack>
														<Typography sx={{ fontSize: '1rem' }}>
															{option.label.split('/')[0]}
														</Typography>
														<Typography sx={{ fontSize: '0.875rem' }}>
															{option.label.split('/')[1]}
														</Typography>
													</Stack>
												)}
											</Box>
										),
								  }
								: {})}
							renderInput={(params) => (
								<TextField
									{...params}
									fullWidth
									disabled={loading || disabled}
									inputRef={ref}
									error={!!error}
									InputLabelProps={{ shrink: true }}
									helperText={error ? error?.message ?? 'اجباری' : ''}
									InputProps={{
										...params.InputProps,
										...(variant === 'simple' ? { startAdornment } : {}),
									}}
									label={
										disabled ? 'غیر فعال' : loading ? 'در حال فراخوانی' : label
									}
									placeholder={'انتخاب'}
								/>
							)}
						/>
					)}
				/>
			</Box>
		</Tooltip>
	);
}
