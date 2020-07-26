import React, { useEffect } from "react";

import "./Contact.css";

function Contact() {
  useEffect(() => {
    document.title = "Twister | Contact";
  }, []);

  return (
    <div className="Contact">
      <p>Contact</p>
    </div>
  );
}

export default Contact;
