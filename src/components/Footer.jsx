// src/components/Footer.jsx
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        padding: "1rem 1.25rem",
        borderTop: "1px solid #eee",
        marginTop: "2rem",
        fontSize: "0.9rem",
        lineHeight: 1.6,
      }}
    >
      <nav
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          alignItems: "center",
        }}
      >
        <a href="https://webpages.charlotte.edu/smaghzia/" target="_blank" rel="noopener noreferrer">
          Charlotte.edu
        </a>
        <span aria-hidden="true">||</span>
        <a href="https://github.com/Sogol2" target="_blank" rel="noopener noreferrer">
          Github
        </a>
        <span aria-hidden="true">||</span>
        <a href="https://github.com/Sogol2/smaghzia.github.io" target="_blank" rel="noopener noreferrer">
          Github.io
        </a>
        <span aria-hidden="true">||</span>
        <a href="https://www.freecodecamp.org/sogoli44" target="_blank" rel="noopener noreferrer">
          freeCodeCamp
        </a>
        <span aria-hidden="true">||</span>
        <a href="https://www.codecademy.com/profiles/sogoli44" target="_blank" rel="noopener noreferrer">
          Codecademy
        </a>
        <span aria-hidden="true">||</span>
        <a href="https://www.linkedin.com/in/sogol-maghzian/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <span aria-hidden="true">||</span>
        <a
          href="https://webpages.charlotte.edu/smaghzia/mascot/about.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          about.html
        </a>
      </nav>

      <p style={{ marginTop: "0.75rem" }}>
        Page Built by{" "}
        <a href="https://maghziansm.com" target="_blank" rel="noopener noreferrer">
          Maghzian Enterprises
        </a>{" "}
        © {year}
      </p>

      <p>&copy; {year} Sunny Macaw · Site by Maghzian Enterprises</p>
      <p>
        <em>Busy vibes. Better focus.</em>
      </p>
    </footer>
  );
}
