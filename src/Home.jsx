// src/Home.jsx
import { Link } from 'react-router-dom'
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    document.title = "Sogol Maghzian || ITIS3135 Home";
  }, []);

  return (
    <section className="home">
      <header className="home-hero">
        <h2>Welcome</h2>
        <p>
          My name is Sogol. I’m pursuing a B.A. in Computer Science with a minor in Data Science at
          UNC Charlotte. I’m passionate about technology and problem-solving, and I’ve developed skills
          in SQL, Java, JavaScript, Python, and C++. In my free time I enjoy dancing, podcasts, books,
          the gym, and time with friends.
        </p>
      </header>

    </section>
  );
}
