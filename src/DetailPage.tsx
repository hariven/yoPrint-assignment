import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Chip, Typography } from "@mui/material";
import Header from "./_components/Header";

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
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
}

const AnimeDetailPage = () => {
  const { id, page } = useParams<{ id: string; page: string }>();
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

    if (id && page) fetchAnimeDetail();
  }, [id, page]);

  if (loading) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  if (!animeDetail) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <Typography variant="h6">Anime not found</Typography>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Anime Image */}
          <img
            src={animeDetail.images.jpg.image_url}
            alt={animeDetail.title}
            className="max-w-full h-auto md:w-[300px] rounded-xl shadow-md"
          />

          {/* Anime Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{animeDetail.title}</h1>
            <p className="text-gray-600 mb-4">
              Status: {animeDetail.status} | Episodes: {animeDetail.episodes}
            </p>
            <p className="text-gray-800 mb-4">{animeDetail.synopsis}</p>
            <p className="text-sm text-gray-500 mb-2">
              Rating: {animeDetail.rating}
            </p>

            {/* Stats Section */}
            <div className="mt-6 flex flex-wrap gap-4 items-center">
              {/* Rank */}
              <Chip
                label={`Rank: #${animeDetail.rank ?? "N/A"}`}
                color="primary"
                variant="outlined"
                sx={{ fontWeight: "bold" }}
              />

              {/* Popularity */}
              <Chip
                label={`Popularity: #${animeDetail.popularity ?? "N/A"}`}
                sx={{
                  bgcolor: "#f3e5f5",
                  color: "#6a1b9a",
                  fontWeight: "bold",
                }}
              />

              {/* Score */}
              <div className="px-3 py-1 rounded-md bg-blue-100 text-blue-700 font-medium shadow-sm">
                Score: {animeDetail.score ?? "N/A"}
              </div>

              {/* Scored By Users */}
              <div className="px-3 py-1 rounded-md bg-orange-100 text-orange-700 font-medium shadow-sm text-sm">
                Voted by: {animeDetail.scored_by?.toLocaleString() ?? "N/A"}{" "}
                users
              </div>
            </div>

            {/* Genres */}
            <div className="mt-4 flex flex-wrap gap-2">
              {animeDetail.genres.map((genre) => (
                <span
                  key={genre.name}
                  className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="my-8 border-t border-gray-300" />

        <h2 className="text-2xl font-semibold">More Info Coming Soon...</h2>
      </div>
    </>
  );
};

export default AnimeDetailPage;
