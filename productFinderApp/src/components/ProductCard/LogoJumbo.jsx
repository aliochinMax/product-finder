import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../../styles/Jumbo.css'
import logo from '../../assets/images/Logo.png';


const LogoJumbotron = ({ title, description }) => {
  return (
    <div className="jumbotron d-flex align-items-center justify-content-center">
        <img src={logo} alt="" />

    </div>
  );
};

export default LogoJumbotron;
