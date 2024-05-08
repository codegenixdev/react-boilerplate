import { Options } from '@/features/confirm/types/options';

export type ContextState = (optionsArg: Options) => Promise<unknown>;
