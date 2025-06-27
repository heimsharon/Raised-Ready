import { Link } from 'react-router-dom';
import '../assets/styles/Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Raised Ready</h1>
      <p>Legacy in every thread. Customize your gear below.</p>
      <Link to="/customizer" className="start-button">Start Customizing</Link>
    </div>
  );
}
