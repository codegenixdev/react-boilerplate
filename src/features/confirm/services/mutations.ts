import { TwoFASchema } from '@/features/confirm';
import {
	sendCodeForLoggedInUser,
	verifyCodeForLoggedInUser,
} from '@/features/confirm/services/mockApi';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { showSnack } from '@/utils/showSnack';
import { useMutation } from '@tanstack/react-query';

export function useSendCodeForLoggedInUser() {
	return useMutation({
		mutationKey: ['sendCodeForLoggedInUser'],
		mutationFn: ({ data }: { data: TwoFASchema }) =>
			sendCodeForLoggedInUser({ data }),

		onSuccess: () => {
			showSnack('کد ارسال شد');
		},

		onError: (error) => {
			showSnack(getErrorMessage(error), 'error');
		},
	});
}

export function useVerifyCodeForLoggedInUser() {
	type Props = { data: TwoFASchema; handle: () => Promise<void> };
	return useMutation({
		mutationFn: ({ data }: Props) => verifyCodeForLoggedInUser({ data }),

		onSuccess: async (_, variables) => {
			showSnack('کد تایید شد');
			await variables.handle();
		},

		onError: (error) => {
			showSnack(getErrorMessage(error), 'error');
		},
	});
}
