import { MaterialDesignContent } from 'notistack';

import { lightPalette } from '@/utils/colorPalettes';
import { styled } from '@mui/material';

export const StyledSnackbar = styled(MaterialDesignContent)({
	'&.notistack-MuiContent-success': {
		backgroundColor: lightPalette.primary[900],
		borderRadius: 12,
	},
	'&.notistack-MuiContent-error': {
		backgroundColor: lightPalette.error[500],
		borderRadius: 12,
	},
});
