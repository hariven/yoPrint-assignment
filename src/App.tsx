import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Index from "./Index";
import AnimeDetailPage from "./DetailPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/page/:page" element={<Index />} />
          <Route path="/" element={<Index />} />
          <Route path="/page/:page/anime/:id" element={<AnimeDetailPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
