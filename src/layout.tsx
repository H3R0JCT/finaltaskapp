import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div>
            {/* Navigation bar centered on the page */}
            <nav
                style={{
                    display: 'flex',           // Use flexbox
                    justifyContent: 'center',  // Center the links horizontally
                    gap: '20px',               // Space between links
                    padding: '10px 20px',
                }}
            >
                <Link to="/" style={{}}>Home</Link>
                <Link to="/to_do" style={{}}>To Do</Link>
                <Link to="/completed" style={{}}>Completed</Link>
            </nav>
            {/* Render the matched child route */}
            <Outlet />
        </div>
    );
}