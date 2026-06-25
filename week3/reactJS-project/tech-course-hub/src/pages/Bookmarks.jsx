// jo book mark kara hoga vo yaha show hoga

import Navbar from "../components/Navbar";
import { useContext } from "react";
import { BookmarkContext } from "../context/BookmarkContext";

function Bookmarks() {
  const { bookmarks } = useContext(BookmarkContext);

  return (
    <>
      <Navbar />

      <div className="page">
        <h1 className="page-title">Bookmarks Page</h1>

        {bookmarks.map((course) => (
          <div className="bookmark-item" key={course.id}>
            <h3 className="bookmark-title">{course.title}</h3>
            <p className="bookmark-id">Course ID: {course.id}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Bookmarks;