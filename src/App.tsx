import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Courses from "@/pages/Courses";
import CourseDetail from "@/pages/CourseDetail";
import { Toaster } from "sonner";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<CourseDetail />} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;