import { enqueueSnackbar, SnackbarOrigin } from 'notistack';

const SNACKBAR_DURATION = 3000;
const SNACKBAR_POSITION = {
	bottomRight: { horizontal: 'right', vertical: 'bottom' } as SnackbarOrigin,
};
const SNACKBAR_CONFIG = {
	autoHideDuration: SNACKBAR_DURATION,
	anchorOrigin: SNACKBAR_POSITION.bottomRight,
};

export function showSnack(message?: string, type?: 'error' | 'success') {
	message = message || '';
	type = type || 'success';

	return enqueueSnackbar(message, {
		...SNACKBAR_CONFIG,
		variant: type,
	});
}
