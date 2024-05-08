import { createContext } from 'react';

import { ContextState } from '@/features/confirm/context/contextState';

export const Context = createContext<ContextState | undefined>(undefined);
