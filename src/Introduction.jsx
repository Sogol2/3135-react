// src/Introduction.jsx
import portrait from './assets/IMG_3965.JPG';
import { useEffect } from "react";

export default function Introduction() {
  useEffect(() => {
    document.title = "Sogol Maghzian || ITIS3135 Introduction";
  }, []);


  return (
    <article className="intro-page">
      <figure className="intro-figure">
        <img src={portrait} alt="Sogol Maghzian portrait" />
        <figcaption>portrait</figcaption>
      </figure>

      <p>
        Hi, my name is Sogol. I’m a junior at UNCC, majoring in Computer Science. I’m passionate
        about technology and problem-solving. In my free time I enjoy dancing, listening to music
        and podcasts, going to the gym, and spending time with friends.
      </p>

      <p><strong>Personal Background:</strong> I’m originally from Iran, and I moved to Charlotte about four years ago.</p>
      <p><strong>Academic Background:</strong> Currently pursuing a B.A. in Computer Science with a minor in Data Science at UNCC.</p>
      <p><strong>Background in this course:</strong> I’ve completed HTML/CSS modules on freeCodeCamp and have built several small sites.</p>
      <p><strong>Primary Computer:</strong> Apple, macOS, laptop, desk</p>
      <p><strong>Funny Story:</strong> My cockatiel (Limoo) once whistled my alarm tone five minutes early, now he is my unofficial project manager.</p>
      <p><strong>Something Else to Share:</strong> I actually enjoy working and studying in busy areas with lots of noise.</p>

      <h2>Courses I’m Taking, &amp; Why</h2>
      <ul className="course-list">
        <li><strong>ITIS 3135 – Front-End Web Application Development:</strong> required for my major and to strengthen my web fundamentals.</li>
        <li><strong>ITSC 2600 – Computing Professionals II:</strong> required for my major; helps with professional skills and career readiness.</li>
      </ul>

      <blockquote className="intro-quote">
        “Be yourself; everyone else is already taken.”<br />
        <span>— Oscar Wilde</span>
      </blockquote>
    </article>
  );
}
