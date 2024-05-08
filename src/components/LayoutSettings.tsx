import { IconMenuItem, NestedMenuItem } from 'mui-nested-menu';
import { MouseEvent, useState } from 'react';

import { useThemeStore } from '@/hooks/useThemeStore';
import { ThemeMode } from '@/types/themeMode';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ContrastOutlinedIcon from '@mui/icons-material/ContrastOutlined';
import DesktopWindowsRoundedIcon from '@mui/icons-material/DesktopWindowsRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { Box, IconButton, Menu } from '@mui/material';

export function LayoutSettings() {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const open = Boolean(anchorEl);

	const themeMode = useThemeStore((state) => state.mode);
	const setThemeMode = useThemeStore((state) => state.setMode);

	const handleChangeThemeColorMode = (mode: ThemeMode) => {
		setThemeMode(mode);
	};

	const handleClick = (e: MouseEvent<HTMLButtonElement>) =>
		setAnchorEl(e.currentTarget);

	const handleClose = () => setAnchorEl(null);

	return (
		<Box>
			<IconButton sx={{ color: 'inherit' }} onClick={handleClick}>
				<SettingsRoundedIcon sx={{ fontSize: '1rem' }} />
			</IconButton>
			<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
				<NestedMenuItem
					sx={{
						flexDirection: (theme) =>
							theme.direction === 'rtl' ? 'row-reverse' : 'row',
					}}
					label={'قالب'}
					parentMenuOpen={open}
					leftIcon={<ContrastOutlinedIcon sx={{ color: 'grey.400' }} />}
				>
					<IconMenuItem
						sx={{
							...(themeMode === 'dark' && { backgroundColor: 'grey.500' }),
						}}
						leftIcon={<Brightness4Icon sx={{ color: 'grey.400' }} />}
						onClick={() => handleChangeThemeColorMode('dark')}
						label={'تیره'}
						MenuItemProps={{ selected: themeMode === 'dark' }}
					/>
					<IconMenuItem
						leftIcon={<Brightness7Icon sx={{ color: 'grey.400' }} />}
						onClick={() => handleChangeThemeColorMode('light')}
						label={'روشن'}
						MenuItemProps={{ selected: themeMode === 'light' }}
					/>
					<IconMenuItem
						leftIcon={<DesktopWindowsRoundedIcon sx={{ color: 'grey.400' }} />}
						onClick={() => handleChangeThemeColorMode('system')}
						label={'سیستم'}
						MenuItemProps={{ selected: themeMode === 'system' }}
					/>
				</NestedMenuItem>
			</Menu>
		</Box>
	);
}
