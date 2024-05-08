import { ButtonProps } from '@mui/material/Button';
import { DialogProps } from '@mui/material/Dialog';
import { DialogActionsProps } from '@mui/material/DialogActions';
import { DialogContentProps } from '@mui/material/DialogContent';
import { DialogTitleProps } from '@mui/material/DialogTitle';

export type Options = {
	title?: React.ReactNode;
	titleProps?: DialogTitleProps;
	description?: React.ReactNode;
	twoFaDescription?: string;
	content?: React.ReactNode | null;
	contentProps?: DialogContentProps;
	confirmationText?: React.ReactNode;
	cancellationText?: React.ReactNode;
	dialogProps?: Omit<DialogProps, 'open'>;
	dialogActionsProps?: DialogActionsProps;
	confirmationButtonProps?: ButtonProps;
	cancellationButtonProps?: ButtonProps;
	twoFA?: boolean;
	handleClose?: () => void;
	handleConfirm?: () => Promise<void> | void;
	allowClose?: boolean;
	hideCancelButton?: boolean;
	buttonOrder?: string[];
};
