import { useEffect, useState } from "react";

const API_URL = "https://dvonb.xyz/api/2025-fall/itis-3135/students?full=1";

function StudentCard({ student }) {
  const {
    name,
    prefix,
    mascot,
    platform,
    backgrounds,
    personalStatement,
    quote,
    funFact,
    links,
    media,
  } = student;

  const displayName = `${name.preferred || name.first} ${name.last}`;

  return (
    <article className="student-card">
      <header className="student-card__header">
        <h2>{displayName}</h2>
        {mascot && <p className="student-card__mascot">{mascot}</p>}
        <p className="student-card__prefix">Email prefix: {prefix}</p>
      </header>

      <div className="student-card__body">
        {media?.hasImage && (
          <figure className="student-card__media">
            {/* media.src is a relative path, so prefix with the domain */}
            <img
              src={`https://dvonb.xyz${media.src}`}
              alt={media.caption || displayName}
            />
            {media.caption && <figcaption>{media.caption}</figcaption>}
          </figure>
        )}

        <div className="student-card__content">
          {platform && (
            <p className="student-card__platform">
              <strong>Platform:</strong> {platform.device} ({platform.os})
            </p>
          )}

          {backgrounds && (
            <>
              <h3>Background</h3>
              {backgrounds.personal && (
                <p>
                  <strong>Personal:</strong> {backgrounds.personal}
                </p>
              )}
              {backgrounds.professional && (
                <p>
                  <strong>Professional:</strong> {backgrounds.professional}
                </p>
              )}
              {backgrounds.academic && (
                <p>
                  <strong>Academic:</strong> {backgrounds.academic}
                </p>
              )}
              {backgrounds.subject && (
                <p>
                  <strong>Subject / Web Dev:</strong> {backgrounds.subject}
                </p>
              )}
            </>
          )}

          {personalStatement && (
            <>
              <h3>Personal Statement</h3>
              <p>{personalStatement}</p>
            </>
          )}

          {quote?.text && (
            <blockquote className="student-card__quote">
              <p>{quote.text}</p>
              {quote.author && <footer>— {quote.author}</footer>}
            </blockquote>
          )}

          {funFact && (
            <p>
              <strong>Fun fact:</strong> {funFact}
            </p>
          )}

          {links && (
            <p className="student-card__links">
              {links.charlotte && (
                <a href={links.charlotte} target="_blank" rel="noreferrer">
                  Charlotte page
                </a>
              )}
              {links.github && (
                <a href={links.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              )}
              {links.githubio && (
                <a href={links.githubio} target="_blank" rel="noreferrer">
                  GitHub Pages
                </a>
              )}
              {links.linkedin && (
                <a href={links.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              )}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ClassIntroductions() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [mode, setMode] = useState("all"); // "all" or "single"
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    document.title = "Sogol Maghzian || ITIS3135 Class Introductions";
  }, []);

  // Fetch data once on mount
  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();

        // sort by last name just to keep it neat
        data.sort((a, b) =>
          a.name.last.localeCompare(b.name.last, "en", { sensitivity: "base" })
        );

        setStudents(data);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  // Filter by search term (name, prefix, mascot)
  const filteredStudents = students.filter((s) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;

    const fullName = `${s.name.first} ${s.name.preferred || ""} ${
      s.name.last
    }`
      .toLowerCase()
      .trim();

    return (
      fullName.includes(term) ||
      s.prefix.toLowerCase().includes(term) ||
      (s.mascot && s.mascot.toLowerCase().includes(term))
    );
  });

  // Reset to first when search or mode changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [searchTerm, mode]);

  const currentStudent =
    filteredStudents.length > 0 ? filteredStudents[currentIndex] : null;

  const handleNext = () => {
    if (filteredStudents.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredStudents.length);
  };

  const handlePrev = () => {
    if (filteredStudents.length === 0) return;
    setCurrentIndex(
      (prev) => (prev - 1 + filteredStudents.length) % filteredStudents.length
    );
  };

  if (loading) {
    return (
      <main className="class-intros">
        <h1>ITIS 3135 – Class Introductions</h1>
        <p>Loading student introductions…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="class-intros">
        <h1>ITIS 3135 – Class Introductions</h1>
        <p style={{ color: "red" }}>Error: {error}</p>
      </main>
    );
  }

  return (
    <main className="class-intros">
      <h1>ITIS 3135 – Class Introductions</h1>
      <p>
        This page pulls live data from the course introduction JSON and shows
        everyone in the class.
      </p>

      {/* Controls: search + mode toggle */}
      <section className="class-intros__controls">
        <label>
          Search by name, prefix, or mascot:{" "}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="e.g. penguin, your prefix, etc."
          />
        </label>

        <div className="class-intros__view-toggle">
          <button
            type="button"
            className={mode === "all" ? "active" : ""}
            onClick={() => setMode("all")}
          >
            Show all
          </button>
          <button
            type="button"
            className={mode === "single" ? "active" : ""}
            onClick={() => setMode("single")}
          >
            One at a time
          </button>
        </div>
      </section>

      {/* Single-student view with forward/backward */}
      {mode === "single" && (
        <section className="class-intros__single">
          {currentStudent ? (
            <>
              <StudentCard student={currentStudent} />
              <div className="class-intros__pager">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={filteredStudents.length <= 1}
                >
                  ← Previous
                </button>
                <span>
                  {filteredStudents.length > 0
                    ? currentIndex + 1
                    : 0}{" "}
                  / {filteredStudents.length}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={filteredStudents.length <= 1}
                >
                  Next →
                </button>
              </div>
            </>
          ) : (
            <p>No students match that search.</p>
          )}
        </section>
      )}

      {/* All-students view */}
      {mode === "all" && (
        <section className="class-intros__grid">
          {filteredStudents.length === 0 && <p>No students match that search.</p>}
          {filteredStudents.map((student) => (
            <StudentCard key={student.prefix} student={student} />
          ))}
        </section>
      )}
    </main>
  );
}
