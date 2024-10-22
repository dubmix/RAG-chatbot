import React from 'react';
import Title from './components/Title.tsx';
import './styles/home.css';

function Home() {
  return (
    <>
    <div className='landing-page'>
      <img src="shape-1.png" className="fixed-shape" alt="Overlay" />
      <Title />
    </div>
    <div className="page-content">
      <div className="title-div">
        <h2>MISSION</h2>
      </div>
      <div className="subtitle-div">
        <h1>We focus on bringing social inclusion for asylum seekers and refugees to get settled in Germany</h1>
      </div>
      <div className="content-div">
        <p>Unlike existing websites, helpme.ai focus on the common problems of asylum procedures by providing answers in a user-friendly, empathic way. Its AI-driven approach allows for personalized interactions, understanding diverse user inquiries, and providing solutions in multiple languages. This level of customization and accessibility is a significant leap from traditional, one-size-fits-all information services.</p>
        <a className="try-me" href="chat">Try It</a>
      </div>
      <div className="image-div">
        <img src="helpme-phone.png" className="fixed-shape" alt="Overlay" />
      </div>
    </div>
    <footer className="footer">
      <ul className="footer-links">
          <li><a href="/chat">About</a></li>
          <li><a href="/chat">Imprint</a></li>
          <li><a href="/chat">Privacy</a></li>
          <li><a href="/chat">Contact</a></li>
      </ul>
      <p className="copyright">Copyright &copy; 2024 Hilfy</p>
    </footer>
    </>
  );
}

export default Home;