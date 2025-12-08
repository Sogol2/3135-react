import { useEffect, useState } from "react";

const API_URL = "https://dvonb.xyz/api/2025-fall/itis-3135/students?full=1";

function StudentCard({ student, visibleFields }) {
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
    classes,
  } = student;

  const displayName = `${name.preferred || name.first} ${name.last}`;

  return (
    <article className="student-card">
      <header className="student-card__header">
        {visibleFields.name && (
          <>
            <h2>{displayName}</h2>
            <p className="student-card__prefix">Email prefix: {prefix}</p>
          </>
        )}
        {visibleFields.mascot && mascot && (
          <p className="student-card__mascot">{mascot}</p>
        )}
      </header>

      <div className="student-card__body">
        {visibleFields.image && media?.hasImage && (
          <figure className="student-card__media">
            <img
              src={`https://dvonb.xyz${media.src}`}
              alt={media.caption || displayName}
            />
            {media.caption && <figcaption>{media.caption}</figcaption>}
          </figure>
        )}

        <div className="student-card__content">
          {visibleFields.extra && (
            <>
              {platform && (
                <p className="student-card__platform">
                  <strong>Computer:</strong> {platform.device} ({platform.os})
                </p>
              )}

              {funFact && (
                <p>
                  <strong>Fun fact:</strong> {funFact}
                </p>
              )}
            </>
          )}

          {visibleFields.backgrounds && backgrounds && (
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

          {visibleFields.classes && Array.isArray(classes) && classes.length > 0 && (
            <>
              <h3>Classes</h3>
              <p>{classes.join(", ")}</p>
            </>
          )}

          {visibleFields.personalStatement && personalStatement && (
            <>
              <h3>Personal Statement</h3>
              <p>{personalStatement}</p>
            </>
          )}

          {visibleFields.quote && quote?.text && (
            <blockquote className="student-card__quote">
              <p>{quote.text}</p>
              {quote.author && <footer>— {quote.author}</footer>}
            </blockquote>
          )}

          {visibleFields.links && links && (
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

  // "all" = list, "single" = slideshow / one at a time
  const [mode, setMode] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);

  // checkbox state
  const [visibleFields, setVisibleFields] = useState({
    name: true,
    mascot: true,
    image: true,
    personalStatement: true,
    backgrounds: true,
    classes: true,
    extra: true, // computer, fun fact, etc.
    quote: true,
    links: true,
  });

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

    const fullName = `${s.name.first} ${s.name.preferred || ""} ${s.name.last}`
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

  const handleFieldToggle = (field) => {
    setVisibleFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
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

      {/* Controls: search + checkboxes + mode toggle */}
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

        {/* counter of how many we found */}
        <p className="class-intros__count">
          Found <strong>{filteredStudents.length}</strong>{" "}
          introduction{filteredStudents.length === 1 ? "" : "s"}.
        </p>

        {/* checkboxes for which fields to show */}
        <div className="class-intros__checkboxes">
          <label>
            <input
              type="checkbox"
              checked={visibleFields.name}
              onChange={() => handleFieldToggle("name")}
            />
            Name
          </label>
          <label>
            <input
              type="checkbox"
              checked={visibleFields.mascot}
              onChange={() => handleFieldToggle("mascot")}
            />
            Mascot
          </label>
          <label>
            <input
              type="checkbox"
              checked={visibleFields.image}
              onChange={() => handleFieldToggle("image")}
            />
            Image
          </label>
          <label>
            <input
              type="checkbox"
              checked={visibleFields.personalStatement}
              onChange={() => handleFieldToggle("personalStatement")}
            />
            Personal Statement
          </label>
          <label>
            <input
              type="checkbox"
              checked={visibleFields.backgrounds}
              onChange={() => handleFieldToggle("backgrounds")}
            />
            Backgrounds
          </label>
          <label>
            <input
              type="checkbox"
              checked={visibleFields.classes}
              onChange={() => handleFieldToggle("classes")}
            />
            Classes
          </label>
          <label>
            <input
              type="checkbox"
              checked={visibleFields.extra}
              onChange={() => handleFieldToggle("extra")}
            />
            Extra Info (Computer, Fun Fact)
          </label>
          <label>
            <input
              type="checkbox"
              checked={visibleFields.quote}
              onChange={() => handleFieldToggle("quote")}
            />
            Quote
          </label>
          <label>
            <input
              type="checkbox"
              checked={visibleFields.links}
              onChange={() => handleFieldToggle("links")}
            />
            Links
          </label>
        </div>

        {/* list vs slideshow toggle */}
        <div className="class-intros__view-toggle">
          <button
            type="button"
            className={mode === "all" ? "active" : ""}
            onClick={() => setMode("all")}
          >
            Show List
          </button>
          <button
            type="button"
            className={mode === "single" ? "active" : ""}
            onClick={() => setMode("single")}
            disabled={filteredStudents.length === 0}
          >
            Show Slideshow
          </button>
        </div>
      </section>

      {/* Slideshow view (one at a time + prev/next buttons) */}
      {mode === "single" && (
        <section className="class-intros__single">
          {currentStudent ? (
            <>
              <StudentCard
                student={currentStudent}
                visibleFields={visibleFields}
              />
              <div className="class-intros__pager">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={filteredStudents.length <= 1}
                >
                  ← Previous
                </button>
                <span>
                  {filteredStudents.length > 0 ? currentIndex + 1 : 0} /{" "}
                  {filteredStudents.length}
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

      {/* All-students list view */}
      {mode === "all" && (
        <section className="class-intros__grid">
          {filteredStudents.length === 0 && (
            <p>No students match that search.</p>
          )}
          {filteredStudents.map((student) => (
            <StudentCard
              key={student.prefix}
              student={student}
              visibleFields={visibleFields}
            />
          ))}
        </section>
      )}
    </main>
  );
}
