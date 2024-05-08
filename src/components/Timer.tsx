import { useEffect, useState } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import { Stack, Typography } from '@mui/material';

type Props = {
	onClick: () => void;
	isPending: boolean;
	initialTimeLeft?: number;
};
export default function Timer({
	onClick,
	isPending,
	initialTimeLeft = 5,
}: Props) {
	const [timeLeft, setTimeLeft] = useState(initialTimeLeft);

	function onClickWrapper() {
		onClick();
		setTimeLeft(initialTimeLeft);
	}

	useEffect(() => {
		if (timeLeft !== 0) {
			const timer = setTimeout(() => {
				setTimeLeft(timeLeft - 1);
			}, 1000);
			return () => clearTimeout(timer);
		}
	}, [timeLeft]);

	return (
		<Stack
			sx={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}
		>
			<Typography variant="caption">هنوز کد را دریافت نکرده اید؟</Typography>
			<LoadingButton
				onClick={onClickWrapper}
				variant="text"
				disabled={timeLeft !== 0}
				loading={isPending}
			>
				ارسال مجدد {timeLeft}
			</LoadingButton>
		</Stack>
	);
}
