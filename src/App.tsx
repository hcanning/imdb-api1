
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { createContext, useState, useEffect } from "react";
import { Movie } from "./types/Movie";
import Index from "./pages/Index";
import MovieDetail from "./pages/MovieDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Create Movie Context
export const MovieContext = createContext<{
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
}>({
  movies: [],
  setMovies: () => {}
});

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MovieContext.Provider value={{ movies, setMovies }}>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </MovieContext.Provider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
