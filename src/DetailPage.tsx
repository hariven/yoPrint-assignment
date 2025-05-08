import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Chip,
  Divider,
} from "@mui/material";

interface AnimeDetail {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  rating: string;
  genres: { name: string }[];
  synopsis: string;
  status: string;
  episodes: number;
}

const AnimeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [animeDetail, setAnimeDetail] = useState<AnimeDetail | null>(null);

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        const data = await response.json();
        setAnimeDetail(data.data);
      } catch (error) {
        console.error("Failed to fetch anime detail:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAnimeDetail();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!animeDetail) {
    return (
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Anime not found</Typography>
      </Box>
    );
  }

  return (
    <>
      <Container sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            alignItems: "flex-start",
          }}
        >
          {/* Anime Image */}
          <Box
            component="img"
            src={animeDetail.images.jpg.image_url}
            alt={animeDetail.title}
            sx={{
              width: { xs: "100%", md: "300px" },
              borderRadius: 2,
              boxShadow: 3,
            }}
          />

          {/* Anime Info */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" gutterBottom>
              {animeDetail.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Status: {animeDetail.status} | Episodes: {animeDetail.episodes}
            </Typography>
            <Typography variant="body1" paragraph>
              {animeDetail.synopsis}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Rating: {animeDetail.rating}
            </Typography>

            {/* Genres */}
            <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
              {animeDetail.genres.map((genre) => (
                <Chip key={genre.name} label={genre.name} />
              ))}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5">More Info Coming Soon...</Typography>
      </Container>
    </>
  );
};

export default AnimeDetailPage;
