import { FormEvent, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Laptop,
  Mail,
  MapPin,
  Menu,
  X,
} from "lucide-react";

const APPLICATION_EMAIL = "info@btechenergi.com.ng";

const responsibilities = [
  "Keep day-to-day financial records organised and up to date",
  "Support simple reconciliations, invoices, and expense tracking",
  "Prepare clear summaries that help the business make better decisions",
  "Work directly with the founder in a hands-on, practical environment",
];

const idealCandidate = [
  "Studying Accounting, Finance, or a related discipline",
  "Comfortable with spreadsheets and basic accounting principles",
  "Self-directed, dependable, and willing to learn quickly",
  "Able to communicate clearly while working independently",
];

function Logo() {
  return (
    <a href="#top" className="brand-mark" aria-label="Btech Energy home">
      <span className="brand-mark__icon">B</span>
      <span className="brand-mark__name">
        BTECH <em>ENERGY</em>
      </span>
    </a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const phone = String(form.get("phone") || "");
    const note = String(form.get("note") || "");
    const subject = `Application — Intern Accountant — ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nWhy I am interested:\n${note}`;

    window.location.href = `mailto:${APPLICATION_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-[#f4f1e8] text-[#15231f]">
      <div className="site-noise" aria-hidden="true" />
      <header className="site-header">
        <div className="site-shell site-header__inner">
          <Logo />
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <nav className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}>
            <a href="#role" onClick={() => setMenuOpen(false)}>The role</a>
            <a href="#fit" onClick={() => setMenuOpen(false)}>Who we’re looking for</a>
            <a href="#apply" className="nav-apply" onClick={() => setMenuOpen(false)}>
              Apply now <ArrowUpRight size={15} />
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero site-shell">
          <div className="hero__copy">
            <p className="eyebrow hero__eyebrow"><span /> Btech Energy is hiring</p>
            <h1>Bring order to the <span>energy.</span></h1>
            <p className="hero__lede">
              We’re looking for a sharp, dependable intern accountant to help keep a growing Nigerian energy business clear, steady, and ready for what’s next.
            </p>
            <div className="hero__actions">
              <a href="#apply" className="button button--dark">Apply for the role <ArrowDownRight size={17} /></a>
              <a href="#role" className="text-link">See the details <ArrowDownRight size={16} /></a>
            </div>
            <div className="hero__meta">
              <span><MapPin size={16} /> Remote · Nigeria</span>
              <span><Laptop size={16} /> Laptop required</span>
            </div>
          </div>
          <div className="hero__art" aria-label="Abstract illustration of an upward energy graph">
            <div className="hero__circle hero__circle--outer" />
            <div className="hero__circle hero__circle--inner" />
            <div className="hero__sun">25K<span>₦ / month</span></div>
            <div className="hero__graph">
              <span className="graph-line graph-line--one" />
              <span className="graph-line graph-line--two" />
              <span className="graph-line graph-line--three" />
              <span className="graph-dot graph-dot--one" />
              <span className="graph-dot graph-dot--two" />
              <span className="graph-dot graph-dot--three" />
              <ArrowUpRight className="graph-arrow" size={30} />
            </div>
            <p className="hero__art-note">Small team.<br />Real responsibility.</p>
          </div>
        </section>

        <section className="statement-band">
          <div className="site-shell statement-band__inner">
            <p className="eyebrow">The short version</p>
            <p className="statement-band__text">You’ll work closely with us, mostly independently, and get a front-row seat to how a business is actually built.</p>
          </div>
        </section>

        <section id="role" className="section site-shell role-section">
          <div className="section-heading">
            <p className="eyebrow">01 / The role</p>
            <h2>A solid start<br /><i>to something bigger.</i></h2>
          </div>
          <div className="role-grid">
            <div className="role-intro">
              <p>As our Intern Accountant, you’ll bring structure to the numbers behind Btech Energy. This is not a role where you disappear into a big department—you’ll have meaningful ownership from day one.</p>
              <div className="role-tag">Intern Accountant <span>·</span> Remote</div>
            </div>
            <div className="detail-list">
              <div className="detail-item"><span className="detail-item__number">A</span><div><strong>Stipend</strong><p>₦25,000 monthly</p></div></div>
              <div className="detail-item"><span className="detail-item__number">B</span><div><strong>Work style</strong><p>Remote, independent, hands-on</p></div></div>
              <div className="detail-item"><span className="detail-item__number">C</span><div><strong>Start</strong><p>As soon as the right person is found</p></div></div>
            </div>
          </div>
        </section>

        <section id="fit" className="section section--dark">
          <div className="site-shell fit-grid">
            <div>
              <p className="eyebrow eyebrow--light">02 / What you’ll do</p>
              <h2>Make the<br /><span>numbers</span> make sense.</h2>
              <p className="fit-intro">We’re not looking for perfection. We’re looking for care, curiosity, and someone who takes pride in doing the small things properly.</p>
            </div>
            <div className="check-list">
              {responsibilities.map((item) => <div className="check-row" key={item}><span><Check size={15} /></span><p>{item}</p></div>)}
            </div>
          </div>
        </section>

        <section className="section site-shell candidate-section">
          <div className="candidate-card">
            <div>
              <p className="eyebrow">03 / The right fit</p>
              <h2>Could be<br /><i>you.</i></h2>
            </div>
            <div className="candidate-list">
              {idealCandidate.map((item, index) => <div className="candidate-row" key={item}><span>0{index + 1}</span><p>{item}</p></div>)}
            </div>
          </div>
        </section>

        <section id="apply" className="apply-section">
          <div className="site-shell apply-grid">
            <div className="apply-copy">
              <p className="eyebrow eyebrow--light">04 / Your move</p>
              <h2>Ready to<br /><span>get started?</span></h2>
              <p>Tell us a little about yourself. We’ll get back to you at the email address you provide.</p>
              <a className="email-link" href={`mailto:${APPLICATION_EMAIL}`}><Mail size={17} /> {APPLICATION_EMAIL}</a>
            </div>
            <form className="application-form" onSubmit={handleSubmit}>
              <label>Name<input name="name" type="text" placeholder="Your full name" required /></label>
              <label>Email address<input name="email" type="email" placeholder="you@example.com" required /></label>
              <label>Phone number<input name="phone" type="tel" placeholder="0800 000 0000" required /></label>
              <label>Why are you interested?<textarea name="note" rows={4} placeholder="A few lines about you, your experience, and why this role feels right..." required /></label>
              <button className="button button--lime" type="submit">Send application <ArrowUpRight size={17} /></button>
              {submitted && <p className="form-note">Your email app should open with the application addressed to {APPLICATION_EMAIL}. If it doesn’t, email us directly.</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-shell site-footer__inner">
          <Logo />
          <p>© 2026 Btech Energy · Building a brighter, more reliable future.</p>
          <a href="#top" className="back-top">Back to top <ArrowUpRight size={15} /></a>
        </div>
      </footer>
    </div>
  );
}
