import { TwoFASchema } from '@/features/confirm';
import { wait } from '@/utils/wait';

export const sendCodeForLoggedInUser = async ({
	data,
}: {
	data: TwoFASchema;
}) => {
	await wait(500);
	if (data.email !== 'test@gmail.com') {
		throw new Error('کاربری با این ایمیل یافت نشد');
	}
};

export const verifyCodeForLoggedInUser = async ({
	data,
}: {
	data: TwoFASchema;
}) => {
	await wait(500);
	if (data.step === 'enterValidationCode') {
		if (data.verificationCode !== '123456') {
			throw new Error('کد فعال سازی اشتباه است');
		}
	}
};
