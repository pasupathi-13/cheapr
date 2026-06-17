import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import './NotFound.css';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 – Page Not Found | Cheapr</title>
        <meta name="description" content="The page you're looking for doesn't exist. Go back to Cheapr home." />
      </Helmet>
      <div className="notfound">
        <Navbar showSearch={false} />
        <div className="notfound-content container">
          <div className="notfound-icon">404</div>
          <h1 className="notfound-title">Page Not Found</h1>
          <p className="notfound-sub">The page you're looking for doesn't exist or has been moved.</p>
          <Link to="/home" className="notfound-btn">Go Home</Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;