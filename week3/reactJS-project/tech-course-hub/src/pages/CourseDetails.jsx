//  here will use this
// useParams()
// and single course ka detail show hoga..

import Navbar from "../components/Navbar";
import { useParams} from "react-router-dom";
import { useState, useEffect } from "react";


function CourseDetails() {
    const {id} = useParams();

    const [course, setCourse] = useState(null);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
        .then((data) => {
            setCourse(data);
        })
    }, [id]);

    if(!course) {
        return <h2 className="loading-text">Loading.........</h2>
    }


    return (
        <>
        <Navbar />

        <div className="page">
            <h1 className="page-title">Course Details Page</h1>

            <div className="details-box">
                <h2 className="detail-id">Course ID: {course.id}</h2>
                <h3 className="detail-title">{course.title}</h3>
                <p className="detail-body">{course.body}</p>
            </div>
        </div>
        </>
    )
}

export default CourseDetails;