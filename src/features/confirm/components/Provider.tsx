import { Fragment, ReactNode, useCallback, useState } from 'react';

import { Dialog } from '@/features/confirm/components/Dialog';
import { Context } from '@/features/confirm/context/context';
import { Options } from '@/features/confirm/types/options';

const DEFAULT_OPTIONS: Options = {
	title: 'Are you sure?',
	description: '',
	content: null,
	confirmationText: 'Ok',
	cancellationText: 'Cancel',
	dialogProps: {},
	dialogActionsProps: {},
	confirmationButtonProps: {},
	cancellationButtonProps: {},
	titleProps: {},
	contentProps: {},
	allowClose: true,
	hideCancelButton: false,
	buttonOrder: ['cancel', 'confirm'],
};

const buildOptions = (defaultOptions: Options, options: Options) => {
	const dialogProps = {
		...(defaultOptions.dialogProps || DEFAULT_OPTIONS.dialogProps),
		...(options.dialogProps || {}),
	};
	const dialogActionsProps = {
		...(defaultOptions.dialogActionsProps ||
			DEFAULT_OPTIONS.dialogActionsProps),
		...(options.dialogActionsProps || {}),
	};
	const confirmationButtonProps = {
		...(defaultOptions.confirmationButtonProps ||
			DEFAULT_OPTIONS.confirmationButtonProps),
		...(options.confirmationButtonProps || {}),
	};
	const cancellationButtonProps = {
		...(defaultOptions.cancellationButtonProps ||
			DEFAULT_OPTIONS.cancellationButtonProps),
		...(options.cancellationButtonProps || {}),
	};
	const titleProps = {
		...(defaultOptions.titleProps || DEFAULT_OPTIONS.titleProps),
		...(options.titleProps || {}),
	};
	const contentProps = {
		...(defaultOptions.contentProps || DEFAULT_OPTIONS.contentProps),
		...(options.contentProps || {}),
	};

	return {
		...DEFAULT_OPTIONS,
		...defaultOptions,
		...options,
		dialogProps,
		dialogActionsProps,
		confirmationButtonProps,
		cancellationButtonProps,
		titleProps,
		contentProps,
	};
};

type Props = {
	children: ReactNode;
	defaultOptions?: Options;
};

export function Provider({ children, defaultOptions = {} }: Props) {
	const [options, setOptions] = useState<Options>({});
	const [isLoading, setIsLoading] = useState(false);

	const [resolveReject, setResolveReject] = useState<
		((value?: unknown) => void)[]
	>([]);

	const [key, setKey] = useState(0);
	const [resolve, reject] = resolveReject;

	const confirm = useCallback((optionsArg = {}) => {
		return new Promise((resolveArg, rejectArg) => {
			setKey((prev) => prev + 1);
			setOptions(optionsArg);
			setResolveReject([resolveArg, rejectArg]);
		});
	}, []);

	const handleClose = useCallback(() => {
		setIsLoading(false);
		setResolveReject([]);
		if (options.handleClose) {
			options.handleClose();
		}
	}, [options]);

	const handleCancel = useCallback(() => {
		if (reject) {
			reject();
			handleClose();
		}
	}, [reject, handleClose]);

	const handleConfirm = useCallback(async () => {
		setIsLoading(true);
		if (resolve) {
			resolve();
		}
		if (options.handleConfirm) {
			await options.handleConfirm();
			handleClose();
		}
	}, [handleClose, options, resolve]);

	return (
		<Fragment>
			<Context.Provider value={confirm}>{children}</Context.Provider>
			<Dialog
				key={key}
				open={resolveReject.length === 2}
				options={buildOptions(defaultOptions, options)}
				onClose={handleClose}
				onCancel={handleCancel}
				onConfirm={handleConfirm}
				loading={isLoading}
			/>
		</Fragment>
	);
}
