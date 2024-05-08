import { useMemo, useRef } from 'react';
import {
	FormProvider,
	SubmitHandler,
	useForm,
	useWatch,
} from 'react-hook-form';

import Timer from '@/components/Timer';
import {
	useSendCodeForLoggedInUser,
	useVerifyCodeForLoggedInUser,
} from '@/features/confirm/services/mutations';
import { Options } from '@/features/confirm/types/options';
import {
	twoFADefaultValues,
	twoFaSchema,
	TwoFASchema,
} from '@/features/confirm/types/twoFaSchema';
import { Otp } from '@/features/controllers/Otp';
import { TextField } from '@/features/controllers/TextField';
import { zodResolver } from '@hookform/resolvers/zod';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import {
	Dialog as MuiDialog,
	DialogContentText,
	ModalProps,
	Stack,
} from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

type Props = {
	options: Options;
	open: boolean;
	onCancel: () => void;
	onConfirm: () => Promise<void>;
	onClose: ModalProps['onClose'];
	loading?: boolean;
};

export function Dialog({
	open,
	options,
	onCancel,
	onConfirm,
	onClose,
	loading,
}: Props) {
	const {
		title,
		description,
		content,
		confirmationText,
		cancellationText,
		dialogProps,
		dialogActionsProps,
		confirmationButtonProps,
		cancellationButtonProps,
		titleProps,
		contentProps,
		allowClose,
		hideCancelButton,
		buttonOrder,
		twoFA,
		twoFaDescription,
	} = options;
	const sendCodeForLoggedInUserMutation = useSendCodeForLoggedInUser();
	const verifyCodeForLoggedInUserMutation = useVerifyCodeForLoggedInUser();

	const isPending = useMemo(
		() =>
			sendCodeForLoggedInUserMutation.isPending ||
			verifyCodeForLoggedInUserMutation.isPending,
		[
			sendCodeForLoggedInUserMutation.isPending,
			verifyCodeForLoggedInUserMutation.isPending,
		]
	);

	const methods = useForm<TwoFASchema>({
		mode: 'onSubmit',
		defaultValues: twoFADefaultValues,
		resolver: zodResolver(twoFaSchema),
	});

	const step = useWatch({ control: methods.control, name: 'step' });

	const email = useWatch({
		control: methods.control,
		name: 'email',
	});

	async function onConfirmWrapper() {
		if (twoFA) {
			methods.setValue('step', 'enterEmail');
		} else {
			await onConfirm();
		}
	}

	const dialogActions = buttonOrder?.map((buttonType) => {
		if (buttonType === 'cancel') {
			return (
				!hideCancelButton && (
					<Button key="cancel" {...cancellationButtonProps} onClick={onCancel}>
						{cancellationText}
					</Button>
				)
			);
		}

		if (buttonType === 'confirm') {
			return (
				<LoadingButton
					key="confirm"
					color="primary"
					loading={loading}
					{...confirmationButtonProps}
					onClick={onConfirmWrapper}
				>
					{confirmationText}
				</LoadingButton>
			);
		}

		throw new Error(
			`Supported button types are only "confirm" and "cancel", got: ${buttonType}`
		);
	});

	function handleSendCodeSuccess() {
		methods.setValue('step', 'enterValidationCode');
		methods.setValue('verificationCode', '');
		methods.reset(undefined, { keepValues: true });
	}

	const handleTimerClick = () => {
		sendCodeForLoggedInUserMutation.mutate(
			{ data: { step: 'enterEmail', email: email } },
			{ onSuccess: handleSendCodeSuccess }
		);
	};

	const handleEditEmailOrPhoneNumberClick = () =>
		methods.setValue('step', 'enterEmail');

	const onSubmit: SubmitHandler<TwoFASchema> = (data) => {
		switch (data.step) {
			case 'enterEmail':
				sendCodeForLoggedInUserMutation.mutate(
					{ data },
					{ onSuccess: handleSendCodeSuccess }
				);
				break;

			case 'enterValidationCode':
				verifyCodeForLoggedInUserMutation.mutate({
					data,
					handle: onConfirm,
				});
		}
	};

	const formRef = useRef<HTMLFormElement>(null);

	return (
		<MuiDialog
			disableRestoreFocus
			fullWidth
			{...dialogProps}
			open={open}
			onClose={allowClose && !loading ? onClose : undefined}
		>
			{title && <DialogTitle {...titleProps}>{title}</DialogTitle>}
			{content ? (
				<DialogContent {...contentProps}>{content}</DialogContent>
			) : description ? (
				<DialogContent {...contentProps}>
					{step === 'unknown' && (
						<DialogContentText>{description}</DialogContentText>
					)}
					{step === 'enterEmail' && (
						<DialogContentText>{twoFaDescription}</DialogContentText>
					)}
					{step === 'enterValidationCode' && (
						<Stack>
							<Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
								<DialogContentText>کد به این ایمیل ارسال شد</DialogContentText>
								<Button
									endIcon={<EditOutlinedIcon />}
									onClick={handleEditEmailOrPhoneNumberClick}
								>
									{email}
								</Button>
							</Stack>

							<DialogContentText>کد ارسال شده را وارد کنید</DialogContentText>
						</Stack>
					)}
				</DialogContent>
			) : (
				<></>
			)}

			<DialogActions {...dialogActionsProps}>
				{step === 'unknown' ? (
					<>{dialogActions}</>
				) : (
					<FormProvider {...methods}>
						{step === 'enterEmail' && (
							<Stack
								sx={{ width: 1, gap: 1 }}
								component="form"
								onSubmit={methods.handleSubmit(onSubmit)}
							>
								<TextField<TwoFASchema>
									name="email"
									label={'ایمیل'}
									autoFocus
								/>
								<LoadingButton
									sx={{ alignSelf: 'end' }}
									loading={isPending}
									variant="contained"
									type="submit"
								>
									دریافت کد
								</LoadingButton>
							</Stack>
						)}

						{step === 'enterValidationCode' && (
							<Stack
								sx={{ width: 1, gap: 1 }}
								component="form"
								onSubmit={methods.handleSubmit(onSubmit)}
								ref={formRef}
							>
								<Otp<TwoFASchema>
									name="verificationCode"
									length={6}
									// eslint-disable-next-line @typescript-eslint/ban-ts-comment
									// @ts-expect-error
									onComplete={methods.handleSubmit(onSubmit)}
								/>
								<LoadingButton
									sx={{ alignSelf: 'end' }}
									loading={isPending}
									variant="contained"
									type="submit"
								>
									تایید کد
								</LoadingButton>
								<Timer onClick={handleTimerClick} isPending={isPending} />
							</Stack>
						)}
					</FormProvider>
				)}
			</DialogActions>
		</MuiDialog>
	);
}
