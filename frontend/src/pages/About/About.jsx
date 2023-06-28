import './About.css';

const About = () => {
  return (
    <div className="About">
      <div className="header">
        <h1>About MakeFriends</h1>
        <p>
          Welcome to MakeFriends, a web application developed as a part of my journey to master the MERN stack (MongoDB, Express, React, Node.js). MakeFriends allows users to connect with one another, add and remove friends. This project showcases my proficiency in various technologies and
          demonstrates my ability to build a functional and interactive web application
        </p>
      </div>
      <div className="technologies-used">
        <h2>Technologies Used</h2>
        <ul>
          <li>React</li>
          <li>React Router</li>
          <li>ExpressJS</li>
          <li>Node.js</li>
          <li>Mongoose</li>
          <li>MongoDB</li>
          <li>Cloudinary API (A cloud-based image and video management service.)</li>
          <li>JWT (JSON Web Tokens)</li>
        </ul>
      </div>
      <div className="goals">
        <h2>Project Goals</h2>
        <ul>
          <li>Learning MERN Stack</li>
          <li>Creating User Connections</li>
          <li>Secure Authentication</li>
        </ul>
      </div>
      <div className="conclusion">
        <h2>Conclusion</h2>
        <p>
          MakeFriends is the culmination of my efforts to develop a robust and functional web application using the MERN stack. Through this project, I have gained valuable experience in building scalable and interactive applications, leveraging technologies such as React, Express, Node.js, MongoDB,
          Cloudinary API, and JWT. MakeFriends demonstrates my ability to create engaging user experiences and highlights my dedication to continuous learning and improvement as a web developer.
        </p>
        <br />
        <p>Thank you for visiting MakeFriends, and I hope you enjoy exploring the application! 🖤</p>
      </div>
    </div>
  );
};

export default About;
