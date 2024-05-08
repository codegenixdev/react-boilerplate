import { darkPalette, lightPalette } from '@/utils/colorPalettes';
import { alpha, PaletteMode } from '@mui/material';
import { ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
	interface BreakpointOverrides {
		xs: true;
		sm: true;
		md: true;
		lg: true;
		xl: true;
		'2xl': true;
	}
}

export const getDesignTokens = (mode: PaletteMode) =>
	({
		palette: {
			mode,
			...(mode === 'light'
				? {
						primary: lightPalette.primary,
						secondary: lightPalette.secondary,
						grey: lightPalette.grey,
						error: lightPalette.error,

						background: {
							default: lightPalette.mainBackground[900],
							paper: lightPalette.mainBackground[100],
						},
						divider: lightPalette.grey[100],
						text: {
							primary: lightPalette.text[900],
						},
						info: lightPalette.info,
						warning: lightPalette.warning,
				  }
				: {
						primary: darkPalette.primary,
						secondary: darkPalette.secondary,
						grey: darkPalette.grey,
						error: darkPalette.error,
						background: {
							default: darkPalette.mainBackground[500],
							paper: darkPalette.mainBackground[600],
						},

						divider: darkPalette.grey[100],
						text: {
							primary: darkPalette.text[900],
						},
						info: darkPalette.info,
						warning: darkPalette.warning,
				  }),
		},

		breakpoints: {
			values: {
				xs: 0,
				sm: 600,
				md: 900,
				lg: 1200,
				xl: 1536,
				'2xl': 2500,
			},
		},
		direction: 'rtl',
		typography: {
			fontFamily: 'IRANSansXV',
		},

		components: {
			MuiFormControlLabel: {
				styleOverrides: {
					root: {
						'& .MuiFormControlLabel-label': {
							fontSize: '.875rem',
						},
					},
				},
			},
			MuiFormLabel: {
				styleOverrides: {
					root: {
						fontSize: '0.875rem',
					},
				},
			},
			MuiListSubheader: {
				styleOverrides: {
					root: {
						color:
							mode === 'light' ? lightPalette.text[900] : darkPalette.text[900],
					},
				},
			},
			MuiTypography: {
				styleOverrides: {
					h2: { fontSize: '1.625rem', fontWeight: 700 },
					h5: { fontSize: '1rem', fontWeight: 700 },
					h6: { fontSize: '.875rem', fontWeight: 700 },
					caption: {
						fontSize: '.875rem',
						fontWeight: 500,
						color:
							mode === 'light' ? lightPalette.text[300] : darkPalette.text[300],
					},
				},
			},
			MuiAvatar: {
				styleOverrides: {
					root: {
						backgroundColor: lightPalette.primary[500],
					},
				},
			},

			MuiPaper: {
				styleOverrides: {
					root: {
						backgroundImage: 'none',
						borderRadius: 12,
						boxShadow: 'rgba(145, 158, 171, 0.16) 0px 1px 2px 0px;',
					},
				},
			},
			MuiChip: {
				styleOverrides: {
					root: { borderRadius: 12, fontWeight: 700, fontSize: '.75rem' },
				},
			},

			MuiListItemButton: { styleOverrides: { root: { borderRadius: 12 } } },
			MuiButton: {
				defaultProps: {
					disableElevation: true,
				},
				styleOverrides: { root: { borderRadius: 12 } },
			},
			MuiDrawer: {
				styleOverrides: {
					paper: {
						backgroundImage: 'none',
					},
				},
			},
			MuiSkeleton: {
				defaultProps: {
					animation: 'wave',
					variant: 'rounded',
				},
				styleOverrides: {
					rounded: {
						borderRadius: 12,
					},
				},
			},
			MuiTextField: {
				defaultProps: {
					InputLabelProps: { shrink: true },
				},
			},
			MuiOutlinedInput: {
				styleOverrides: {
					root: { borderRadius: 12 },
				},
			},
			MuiDialog: {
				styleOverrides: {
					root: {
						'& .MuiPaper-root': {
							borderRadius: 12,
						},
					},
				},
			},

			MuiDialogContent: {
				styleOverrides: {
					root: {
						scrollBehavior: 'smooth',
						scrollPaddingTop: 20,
					},
				},
			},
			MuiMenu: {
				styleOverrides: {
					root: {
						'& .MuiMenu-paper': {
							borderRadius: 12,
							paddingLeft: 8,
							paddingRight: 8,
						},
						'& .Mui-selected': {
							backgroundColor: `${alpha(
								lightPalette.primary[500],
								0.2
							)} !important`,
						},
						'& .MuiMenuItem-root': {
							borderRadius: 12,
						},
					},
				},
			},
			MuiTabs: {
				styleOverrides: {
					root: { borderTopLeftRadius: 12, borderTopRightRadius: 12 },
				},
			},
			MuiAlert: {
				styleOverrides: {
					root: {
						borderRadius: 12,
					},
				},
			},
			MuiButtonGroup: {
				defaultProps: {
					disableElevation: true,
				},
				styleOverrides: {
					root: {
						borderRadius: 12,
					},
					middleButton: {
						// border: '0px !important',
					},
					firstButton: {
						// border: '0px !important',
					},
					lastButton: {
						// border: '0px !important',
					},
				},
			},

			MuiAccordion: {
				styleOverrides: {
					root: {
						borderRadius: '12px !important',
						':before': {
							display: 'none',
						},
					},
				},
			},
			MuiPopover: {
				styleOverrides: {
					paper: {
						borderRadius: 12,
					},
				},
			},
			MuiTooltip: {
				styleOverrides: {
					tooltip: {
						borderRadius: 12,
						backgroundColor: darkPalette.mainBackground[300],
					},
				},
			},
			MuiImageListItemBar: {
				styleOverrides: {
					root: {
						borderRadius: 12,
						width: 'fit-content',
						background: 'none',
					},
					titleWrap: { display: 'none' },
				},
			},
			MuiToggleButton: {
				styleOverrides: {
					root: {
						borderRadius: 12,
						padding: '2px 5px 2px 5px',
					},
				},
			},
			MuiToggleButtonGroup: {
				styleOverrides: {
					root: {
						padding: 0,
						'& .MuiToggleButton-root.Mui-selected': {
							border: `${lightPalette.primary[500]} 1px solid`,
						},
					},
				},
			},
			MuiDialogActions: { styleOverrides: { root: { margin: 4 } } },
		},
	} satisfies ThemeOptions);
