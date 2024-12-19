import React from 'react';
import Title from './components/Title.tsx';
import './styles/home.css';

function Home() {
  return (
    <>
    <div className='landing-page'>
      {/* <img src="shape-1.png" className="fixed-shape" alt="Overlay" /> */}
      <Title />
    </div>
    <div className="page-content">
      <div className="title-div">
        <h2>CONCEPT</h2>
      </div>
      <div className="subtitle-div">
        <h1>Enhance an existing AI model with additional data to receive personalized answers.</h1>
      </div>
      <div className="content-div">
        <p>RAG (Retrieval-Augmented Generation) is an advanced AI approach that combines retrieval-based methods with generative models. By retrieving relevant information from a large dataset or knowledge base, RAG enhances the generation of accurate and context-aware responses. It leverages the power of both retrieval and generation, ensuring that the AI can provide precise answers to complex queries, making it highly effective for tasks requiring in-depth knowledge.</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <a className="try-me" href="chat">Try It</a>
        </div>
      </div>
      <div className="image-div">
        <img src="database.jpg" className="fixed-shape" alt="Overlay" />
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