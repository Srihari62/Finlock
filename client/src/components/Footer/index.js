import React from "react";

import "./index.css";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-left">
        <p className="footer-para-span">Powered by</p>
        <img
          className="footer-img"
          src="https://i.ibb.co/VVWj11P/zaperon-logo-2x.png"
          alt="zaperon-logo-2x"
        />
      </div>
      <div className="footer-right">
        <p className="footer-para">Need Help?</p>
        <p className="footer-para">
          Privacy Policy <span className="footer-para-span">&</span>
          Terms
        </p>
      </div>
    </div>
  );
}

export default Footer;
