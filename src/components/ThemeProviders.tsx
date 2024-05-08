import { useEffect, useMemo } from 'react';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

import { ConfirmProvider } from '@/features/confirm';
import { useThemeStore } from '@/hooks/useThemeStore';
import { getDesignTokens } from '@/utils/theme';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import {
	createTheme,
	CssBaseline,
	ThemeProvider,
	useMediaQuery,
} from '@mui/material';
import { faIR as coreFaIR } from '@mui/material/locale';
import { faIR as dataGridFaIR } from '@mui/x-data-grid-premium/locales';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers-pro/AdapterDateFnsJalali';
import { faIR as datePickerFaIR } from '@mui/x-date-pickers-pro/locales';

const cacheRtl = createCache({
	key: 'muirtl',
	stylisPlugins: [prefixer, rtlPlugin],
});

export default function ThemeProviders({
	children,
}: {
	children: React.ReactNode;
}) {
	const themeMode = useThemeStore((state) => state.mode);

	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	const faIR = useMemo(() => [datePickerFaIR, coreFaIR, dataGridFaIR], []);

	const theme = useMemo(() => {
		return createTheme(
			getDesignTokens(
				themeMode === 'system'
					? prefersDarkMode
						? 'dark'
						: 'light'
					: themeMode === 'dark'
					? 'dark'
					: 'light'
			),
			...faIR
		);
	}, [themeMode, prefersDarkMode, faIR]);

	useEffect(() => {
		if (
			themeMode === 'system'
				? prefersDarkMode
					? 'dark'
					: 'light'
				: themeMode === 'dark'
				? 'dark'
				: 'light'
		) {
			document.body.style.colorScheme = 'dark';
		} else {
			document.body.style.colorScheme = 'light';
		}

		if ((themeMode === 'system' && prefersDarkMode) || themeMode === 'dark') {
			document.body.style.colorScheme = 'dark';
		} else {
			document.body.style.colorScheme = 'light';
		}
	}, [prefersDarkMode, themeMode]);

	return (
		<CacheProvider value={cacheRtl}>
			<ThemeProvider theme={theme}>
				<LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
					<CssBaseline />

					<ConfirmProvider
						defaultOptions={{
							title: 'تایید عملیات',
							description: 'آیا اطمینان دارید؟',
							confirmationText: 'بله',
							hideCancelButton: true,
							confirmationButtonProps: {
								autoFocus: true,
								variant: 'contained',
							},
							dialogProps: { maxWidth: 'xs' },
							twoFaDescription: 'برای ادامه ایمیل خود را وارد کنید',
						}}
					>
						{children}
					</ConfirmProvider>
				</LocalizationProvider>
			</ThemeProvider>
		</CacheProvider>
	);
}
