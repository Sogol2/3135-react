// src/Contract.jsx
import { useEffect } from "react";

export default function Contract() {
  useEffect(() => {
    document.title = "Sogol Maghzian || ITIS3135 Contract";
  }, []);

  
    // Use today's date or keep your fixed date from the static page:
    // const signedOn = "07/09/2025";
    const signedOn = new Date().toLocaleDateString("en-US");
  
    return (
      <article className="contract-page">
        <h2 className="contract-title">Contract</h2>
  
        <p className="contract-body">
          I, <strong>Sogol Maghzian</strong> agree to abide by the terms of the course contract in my
          <strong> SEMESTER 2025</strong>, <strong>ITIS 3135</strong>, Web App Development with my instructor,
          <strong> Professor D.I. von Briesen</strong>. I understand that all work that I do on publicly
          available online tools will be available to the world, and will not put information there that is
          inappropriate for schoolwork, or that I wish to keep private. I also understand that it is my work
          that counts for attendance, not logins or showing up for class. As such, failure to turn in assignments
          may show as absences. I also understand that given the structure and content of this class it’s possible
          to find many examples online or even view my classmates’ code directly. I swear that I will only use
          these resources to learn, and will not cut and paste code except where I have properly given credit
          (i.e. external libraries) and never from my classmates.
        </p>
  
        <p className="contract-signature">
          Signed: <strong>Sogol Maghzian</strong>, <time dateTime={new Date().toISOString()}>{signedOn}</time>
        </p>
      </article>
    );
  }
  