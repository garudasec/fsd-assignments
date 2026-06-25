// here will use these and sare course show honge
//  fetch()
// useEffect()
// useState()

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        const techCourses = [
          {
            id: 1,
            title: "ReactJS",
          },
          {
            id: 2,
            title: "NodeJS",
          },
          {
            id: 3,
            title: "MongoDB",
          },
          {
            id: 4,
            title: "ExpressJS",
          },
          {
            id: 5,
            title: "Cyber Security",
          },
          {
            id: 6,
            title: "Linux",
          },
          {
            id: 7,
            title: "Networking",
          },
          {
            id: 8,
            title: "Cloud Security",
          },
          {
            id: 9,
            title: "Ethical Hacking",
          },
          {
            id: 10,
            title: "Python",
          },
        ];

        setCourses(techCourses);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <>
        <Navbar />
        <div className="page">
          <h1 className="page-title">Courses Page</h1>

          {loading ? (
            <p className="loading-text">Loading courses...</p>
          ) : (
            <div className="course-grid">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  id={course.id}
                />
              ))}
            </div>
          )}
        </div>
      </>
    </>
  );
}

export default Courses;
