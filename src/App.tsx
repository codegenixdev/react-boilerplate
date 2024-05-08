import { useNavigate } from 'react-router-dom';

import { LayoutSettings } from '@/components/LayoutSettings';
import { Button } from '@mui/material';

export function App() {
	const navigate = useNavigate();

	return (
		<>
			<LayoutSettings />
			<Button onClick={() => navigate('/users')}>کاربران</Button>
		</>
	);
}
