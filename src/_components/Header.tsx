import {
  AppBar,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FC, useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import ClearIcon from "@mui/icons-material/Clear";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const Header: FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [showSearch, setShowSearch] = useState(false);

  const handleSearchIconClick = () => {
    setShowSearch((prev) => !prev);
  };

  const handleSearchChange = () => {
    onSearchChange("");
    setShowSearch(false);
  };

  return (
    <AppBar position="sticky" color="default" elevation={2}>
      <Toolbar className="max-w-[1200px] mx-auto w-full flex justify-between flex-wrap gap-2 py-2 px-4 sm:px-6">
        {!isMobile && (
          <Typography
            variant="h6"
            noWrap
            className="font-semibold text-gray-800 flex-grow sm:flex-grow-0"
          >
            Anime Explorer 🎥
          </Typography>
        )}

        {isMobile ? (
          <>
          {(!showSearch || !isMobile) ? (
            <Box className="flex items-center justify-between w-full">
              <Typography
                variant="h6"
                noWrap
                className="font-semibold text-gray-800"
              >
                Anime Explorer 🎥
              </Typography>
              <IconButton onClick={handleSearchIconClick} color="default">
                <SearchIcon />
              </IconButton>
            </Box>
          ) : (
            <Box className="flex items-center justify-center w-full">
              <Box className="flex relative w-full max-w-[300px]">
                <InputBase
                  placeholder="Search Anime..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="rounded-full border px-4 py-1 bg-gray-100 w-full pl-4 pr-10"
                />
                {showSearch && (
                  <IconButton
                    onClick={() => {
                        handleSearchChange()
                        }}
                    size="small"
                    sx={{
                        position: "absolute",
                        right: 4,
                        top: "50%",
                        transform: "translateY(-50%)",
                        padding: 0.5,
                        color: "gray",
                    }}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            </Box>
          )}
        </>
        ) : (
          <Box className=" max-w-md w-[80%]">
            <InputBase
              placeholder="Search anime..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              fullWidth
              className="rounded-full border px-4 py-1 bg-gray-100"
            />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
