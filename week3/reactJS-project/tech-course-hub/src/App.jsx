import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Courses from "./pages/Courses.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";
import Bookmarks from "./pages/Bookmarks.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/courses" element={<Courses />}></Route>
        <Route path="/course/:id" element={<CourseDetails />}></Route>
        <Route path="/bookmarks" element={<Bookmarks />}></Route>
        <Route></Route>
        <Route></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
