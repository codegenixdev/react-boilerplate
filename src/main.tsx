import './index.css';

import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from '@/App';
import { StyledSnackbar } from '@/components/StyledSnackbar';
import ThemeProviders from '@/components/ThemeProviders';
import { User } from '@/features/pages/user';
import { Users } from '@/features/pages/users';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/user/:id?',
		element: <User />,
	},
	{
		path: '/users',
		element: <Users />,
	},
]);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ThemeProviders>
				<SnackbarProvider
					Components={{
						error: StyledSnackbar,
						success: StyledSnackbar,
					}}
				/>
				<RouterProvider router={router} />
			</ThemeProviders>
			<ReactQueryDevtools buttonPosition="bottom-left" />
		</QueryClientProvider>
	</React.StrictMode>
);
