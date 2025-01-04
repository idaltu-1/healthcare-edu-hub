import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Toaster } from "sonner";
import { supabase } from "./integrations/supabase/client";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Business from "./pages/Business";
import Practice from "./pages/Practice";
import Finance from "./pages/Finance";
import Leadership from "./pages/Leadership";
import Community from "./pages/Community";
import Innovation from "./pages/Innovation";
import Forum from "./pages/Forum";
import TopicDetail from "./pages/TopicDetail";
import MyAccount from "./pages/MyAccount";
import Settings from "./pages/Settings";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";

const queryClient = new QueryClient();

function App() {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/business" element={<Business />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/community" element={<Community />} />
            <Route path="/innovation" element={<Innovation />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/forum/topic/:id" element={<TopicDetail />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
          </Routes>
          <Toaster position="top-right" />
        </Router>
      </QueryClientProvider>
    </SessionContextProvider>
  );
}

export default App;