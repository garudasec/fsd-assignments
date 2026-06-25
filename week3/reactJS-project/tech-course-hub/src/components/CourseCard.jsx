// Har course ke liye card
// exmaple
// reactJS 8 week view details bookmark

import { useContext } from "react";
import { Link } from "react-router-dom";
import { BookmarkContext } from "../context/BookmarkContext";

function CourseCard(props) {

  const { bookmarks, setBookmarks } =
    useContext(BookmarkContext);

  function addBookmark() {
    setBookmarks([
      ...bookmarks,
      {
        id: props.id,
        title: props.title,
      },
    ]);
  }

  return (
    <div className="course-card">
      <h3 className="course-title">{props.title}</h3>

      <p className="course-id">Course ID: {props.id}</p>

      <Link className="btn btn-secondary" to={`/course/${props.id}`}>
        View Details
      </Link>

      <button className="btn btn-primary" onClick={addBookmark}>
        Bookmark
      </button>
    </div>
  );
}

export default CourseCard;