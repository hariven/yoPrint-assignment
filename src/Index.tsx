import { useEffect, useState } from "react";
import { AnimeCard } from "./_components/AnimeCard";
import Header from "./_components/Header";
import {
  Container,
  Grid,
  CircularProgress,
  Box,
  Typography,
  Pagination,
  Alert,
} from "@mui/material";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";

interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
}

interface AnimeResponse {
  data: Anime[];
}

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  //   const [filteredAnimeList, setFilteredAnimeList] = useState<Anime[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [queryParam, setQueryParam] = useSearchParams();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const { page } = useParams<{ page: string }>();

  const currentPage = parseInt(page || "1"); // Default to 1 if undefined

  const qParam = queryParam.get("q");

  // Debounce the search query to avoid excessive API calls
  useEffect(() => {
    const fetchData = async (
      page = currentPage,
      limit = 20
    ): Promise<AnimeResponse> => {
      try {
        const search = debouncedSearchQuery ? `&q=${debouncedSearchQuery}` : "";
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(
          `${apiUrl}?page=${page}&limit=${limit}${search}` // Updated URL to include search query
        );
        const data = await response.json();
        console.log("API Response:", data?.data);

        const filtered = debouncedSearchQuery
          ? data.data.filter((anime: Anime) =>
              anime.title
                .toLowerCase()
                .includes(debouncedSearchQuery.toLowerCase())
            )
          : data.data;
        setAnimeList(filtered);
        console.log(data);
        //   setAnimeList(data.data);
        setTotalPages(data.pagination.last_visible_page);
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
        throw error;
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, debouncedSearchQuery]);

  // watch the search qparam and set the search query
  useEffect(() => {
    if (qParam !== null) {
      setSearchQuery(qParam);
      const handler = setTimeout(() => {
        setDebouncedSearchQuery(qParam);
      }, 250);
      return () => clearTimeout(handler);
    } else {
      setQueryParam({});
    }
  }, [qParam, setQueryParam]);

  const handlePageChange = (page: number) => {
    const q = queryParam.get("q");
    navigate(`/page/${page}${q ? `?q=${q}` : ""}`);
  };

  const handleSearchChange = (value: string) => {
    // setSearchQuery(value);
    setQueryParam({ q: value });
  };

  // useEffect(() => {
  //   if (searchQuery) {
  //     setQueryParam({ q: searchQuery });
  //   } else {
  //     setQueryParam({});
  //   }
  // }, [searchQuery, setQueryParam]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      {loading ? (
        // Loading spinner
        <Box
          sx={{
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <div className="h-screen mt-6">
          <Box className="fixed top-0 right-0 left-0 z-30">
            <Header
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
            />
            <div
              className="h-1 bg-black transition-all duration-200"
              style={{ width: `${scrollProgress}%` }}
            />
          </Box>
          <Container className="" sx={{ py: 8, width: "90%" }}>
            {animeList.length > 0 && !loading ? (
              <Grid container spacing={4} justifyContent="center">
                {animeList.map((anime) => (
                  <Grid
                    key={anime.mal_id}
                    sx={{ display: "flex", justifyContent: "center" }}
                    component="div"
                  >
                    <AnimeCard
                      id={anime.mal_id.toString()}
                      title={anime.title}
                      imageUrl={anime.images.jpg.image_url}
                      currentPage={currentPage.toString()}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box
                sx={{
                  height: "80vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" color="textSecondary">
                  No data available
                </Typography>
              </Box>
            )}

            <Pagination
              count={totalPages}
              page={currentPage}
              variant="outlined"
              shape="rounded"
              onChange={(e, page) => {
                e.preventDefault();
                handlePageChange(page);
              }}
              color="secondary"
              sx={{ mt: 4, display: "flex", justifyContent: "center" }}
            />
          </Container>
        </div>
      )}
    </div>
  );
};

export default Index;
