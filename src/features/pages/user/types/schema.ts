import { z } from 'zod';

export const schema = z.intersection(
	z.object({
		fullName: z.string().min(1, { message: 'نام کاربر ضروری است' }),
		email: z.string().email({ message: 'ایمیل نامعتبر است' }),
		city: z.string().min(1, { message: 'شهر ضروری است' }),
	}),
	z.discriminatedUnion('variant', [
		z.object({
			variant: z.literal('create'),
		}),
		z.object({
			variant: z.literal('edit'),
			id: z.string().min(1),
		}),
	])
);

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
	variant: 'create',
	fullName: '',
	email: '',
	city: '',
};
