// css
import './Home.css';
// assets
import landingImg from '../../assets/landing.svg';
// libraries
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <div className="left-side">
        <h1>Start Making Friends Today</h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem sunt blanditiis ut inventore itaque sapiente magnam dolorem explicabo repellendus. Odit rem mollitia sequi fugit consequatur blanditiis impedit nostrum molestias consectetur!</p>
        <button className="btn">
          <Link to="/about">READ MORE</Link>
        </button>
      </div>
      <div className="right-side">
        <img src={landingImg} alt="" />
      </div>
    </div>
  );
};

export default Home;
