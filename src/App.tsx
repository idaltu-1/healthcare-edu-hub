import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Courses from "@/pages/Courses";
import CourseDetail from "@/pages/CourseDetail";
import { Toaster } from "sonner"; // Ensure to import Toaster if it's used

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
