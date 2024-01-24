import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../../styles/Jumbo.css'

const LogoJumbotron = ({ title, description }) => {
  return (
    <div className="jumbotron d-flex align-items-center justify-content-center">
        <img src="../../../src/assets/images/Logo.png" alt="" />

    </div>
  );
};

export default LogoJumbotron;
