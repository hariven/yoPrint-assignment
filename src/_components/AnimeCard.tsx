import { FC } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Link,
} from '@mui/material';

interface AnimeCardProps {
  id: string;
  title: string;
  imageUrl: string;
}

export const AnimeCard: FC<AnimeCardProps> = ({ id, title, imageUrl }) => {
  return (
    <Link component="a" href={`/anime/${id}`} style={{ textDecoration: 'none' }}>
    <Card
      sx={{
        width: 250,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: '#fff',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.03)',
        },
      }}
    >
      <CardMedia
        component="img"
        height="330"
        image={imageUrl}
        alt={title}
        sx={{ objectFit: 'obtain', height: 330 }}
      />
      <CardContent sx={{ py: 1.5, px: 2 }}>
        <Typography
          variant="body2"
          fontWeight={500}
          color="text.primary"
          noWrap
          title={title}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
    </Link>
  );
};
