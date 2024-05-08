import { z } from 'zod';

import { patterns } from '@/utils/constants';

export const twoFaSchema = z
	.object({
		email: z.string().email({ message: 'ایمیل نامعتبر است' }),
	})
	.and(
		z.union([
			z.object({ step: z.literal('unknown') }),
			z.object({
				step: z.literal('enterEmail'),
			}),
			z.object({
				step: z.literal('enterValidationCode'),
				verificationCode: z
					.string()
					.min(1)
					.refine((val) => patterns.sixDigits.test(val), {
						message: 'کد فعال سازی نامعتبر است',
					}),
			}),
		])
	);

export type TwoFASchema = z.infer<typeof twoFaSchema>;

export const twoFADefaultValues: TwoFASchema = {
	step: 'unknown',
	email: '',
};
