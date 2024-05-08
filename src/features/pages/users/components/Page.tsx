import { useNavigate } from 'react-router-dom';

import { useConfirm } from '@/features/confirm';
import { useDeleteItem } from '@/features/pages/users/services/mutations';
import { useItems } from '@/features/pages/users/services/queries';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Container, Skeleton } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export function Page() {
	const confirm = useConfirm();

	const deleteItemMutation = useDeleteItem();

	const navigate = useNavigate();
	const itemsQuery = useItems();

	async function handleDelete(id: string) {
		await confirm({
			twoFA: true,
			handleConfirm: async () => await deleteItemMutation.mutateAsync(id),
		});
	}
	return (
		<Container sx={{ marginTop: 5 }} maxWidth="sm">
			<List>
				{itemsQuery.data ? (
					<>
						{itemsQuery.data.map((item) => (
							<ListItem
								disablePadding
								secondaryAction={
									<IconButton edge="end" onClick={() => handleDelete(item.id)}>
										<DeleteIcon />
									</IconButton>
								}
								key={item.id}
							>
								<ListItemButton onClick={() => navigate(`/user/${item.id}`)}>
									<ListItemText primary={item.label} />
								</ListItemButton>
							</ListItem>
						))}
					</>
				) : (
					<>
						<Skeleton height={70} />
					</>
				)}
			</List>
			<Button fullWidth variant="contained" onClick={() => navigate('/user')}>
				کاربر جدید
			</Button>
		</Container>
	);
}
