// welcome page 
// for example - welcome to the tech course hub

import Navbar from "../components/Navbar";

function Home() {
    return (
        <>
        <Navbar />
        <div className="page">
            <h1 className="page-title">Tech Courses Hub</h1>

            <p className="page-subtitle">Explore technology courses and save your favorites.</p>
        </div>
        </>
    )
}
export default Home;