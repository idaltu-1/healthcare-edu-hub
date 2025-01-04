import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Courses from "@/pages/Courses";
import CourseDetail from "@/pages/CourseDetail";
import Settings from "@/pages/Settings";
import MyAccount from "@/pages/MyAccount";
import Community from "@/pages/Community";
import Forum from "@/pages/Forum";
import TopicDetail from "@/pages/TopicDetail";
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
          <Route path="/settings" element={<Settings />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/community" element={<Community />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum/topic/:topicId" element={<TopicDetail />} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;