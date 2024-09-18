import React from 'react';
import Title from './components/Title.tsx';
import Menu from './components/Menu.tsx';
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
        <h1>Lorem Ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacus sapien, vehicula et eros sed,</h1>
      </div>
      <div className="content-div">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacus sapien, vehicula et eros sed, ultrices blandit magna. Aliquam elit tellus, porttitor ac finibus pretium, scelerisque vitae enim. In bibendum dapibus cursus. Aenean vel lacus eu orci tempor mattis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus auctor nisi ullamcorper, tempor leo in, molestie mauris. Praesent mollis porta malesuada. Praesent commodo fringilla quam a bibendum. Fusce at mattis lorem. Donec elit nisi, imperdiet id neque sit amet, malesuada hendrerit arcu.</p>
        <a className="try-me" href="chat">Try It</a>
      </div>
      <div className="image-div">
        <img src="hilfy-phone.png" className="fixed-shape" alt="Overlay" />
      </div>
    </div>
    <footer className="footer">
      <ul className="footer-links">
          <li><a href="/about">About</a></li>
          <li><a href="/imprint">Imprint</a></li>
          <li><a href="/privacy">Privacy</a></li>
          <li><a href="/contact">Contact</a></li>
      </ul>
      <p className="copyright">Copyright &copy; 2024 Hilfy</p>
    </footer>
    </>
  );
}

export default Home;