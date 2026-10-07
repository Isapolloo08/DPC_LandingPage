import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Clock, Mail, MapPin, Users, X } from "lucide-react";
import { useDialogAccessibility } from "../ui/useDialogAccessibility";
import { CHURCH_INFO } from "../../data/churchInfo";
import { MINISTRIES_DATA } from "../../data/ministriesData";
import { responsiveImage } from "../../lib/responsiveImages";
import familyPhoto from "../../assets/Kinder Ministry/516368798_4004060663255125_3940156298598136062_n.webp";

interface PlanVisitModalProps { isOpen: boolean; onClose: () => void; }
type Party = "Just me" | "With friends" | "With family";
const steps = ["Your visit", "Children", "Directions", "Your guide"];
const ageOptions = ["Under 3", "Ages 3–5", "Ages 6–12"];
const childMinistries = MINISTRIES_DATA.filter(m => /kinder|elementary/i.test(m.ageBracket));
const worship = CHURCH_INFO.services.find(service => service.isMainWorship)!;
const address = `${CHURCH_INFO.address.street}, ${CHURCH_INFO.address.barangay}, ${CHURCH_INFO.address.municipality}, ${CHURCH_INFO.address.province}`;

export const PlanVisitModal = ({ isOpen, onClose }: PlanVisitModalProps) => {
  const [step, setStep] = useState(0);
  const [party, setParty] = useState<Party>("Just me");
  const [visitDate, setVisitDate] = useState("This coming Sunday");
  const [children, setChildren] = useState(false);
  const [ages, setAges] = useState<string[]>([]);
  const [directions, setDirections] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);
  const [contact, setContact] = useState({ fullName: "", email: "", phone: "", notes: "" });
  const reducedMotion = useReducedMotion();
  const dialogRef = useDialogAccessibility(isOpen, onClose);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    contentRef.current?.scrollTo({ top: 0, behavior: "instant" });
    headingRef.current?.focus({ preventScroll: true });
  }, [step, isOpen]);

  const relevantMinistries = childMinistries.filter(m => ages.length === 0 ||
    (ages.includes("Ages 3–5") && /kinder/i.test(m.ageBracket)) ||
    (ages.includes("Ages 6–12") && /elementary/i.test(m.ageBracket)));
  const plan = `${visitDate}\n${party}${children ? `, bringing children${ages.length ? ` (${ages.join(", ")})` : ""}` : ""}\n${worship.name}: ${worship.time}\nSuggested arrival: 9:30 AM\n${address}`;
  const mailBody = `Hello DPC,\n\nI'd like to ask about my first visit.\n\n${plan}\n\nName: ${contact.fullName}\nEmail: ${contact.email}\nPhone: ${contact.phone}\nQuestions or accessibility needs: ${contact.notes}\n`;
  const mailHref = `mailto:${CHURCH_INFO.contact.email}?subject=${encodeURIComponent("My first Sunday at DPC")}&body=${encodeURIComponent(mailBody)}`;
  if (!isOpen) return null;

  return (
    <div className="visit-planner-overlay" onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="visit-planner-title" tabIndex={-1} className="modal-surface visit-planner">
        <header className="visit-planner-header">
          <p className="eyebrow">YOUR FIRST SUNDAY</p>
          <h2 id="visit-planner-title">A little less unknown.</h2>
          <p>A Sunday guide, made for you. No registration needed.</p>
          <button type="button" className="visit-planner-close" onClick={onClose} aria-label="Close visit planner"><X size={20} /></button>
          <ol className="visit-planner-progress" aria-label="Visit planner progress">
            {steps.map((label, index) => <li key={label} className={index <= step ? "is-current" : ""} aria-current={index === step ? "step" : undefined}>
              <span aria-hidden="true">{index < step ? <Check size={13} /> : index + 1}</span><small>{label}</small>
            </li>)}
          </ol>
        </header>
        <div ref={contentRef} className="visit-planner-content">
          <motion.div key={step} initial={reducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.2 }}>
            <h3 ref={headingRef} tabIndex={-1} className="visit-planner-step-title">{["Who’s coming with you?", "Bringing little ones?", "Let’s help you find us.", "Your Sunday at DPC"][step]}</h3>
            {step === 0 && <>
              <p className="visit-planner-intro">Come on your own or bring someone along. There’s a seat for you.</p>
              <fieldset className="visit-planner-choices"><legend className="sr-only">Who is coming?</legend>
                {(["Just me", "With friends", "With family"] as Party[]).map(choice => <label key={choice} className={`visit-planner-choice${party === choice ? " is-selected" : ""}`}>
                  <input type="radio" name="visit-party" value={choice} checked={party === choice} onChange={() => setParty(choice)} />
                  <Users size={20} aria-hidden="true" /><span>{choice}</span>
                </label>)}
              </fieldset>
              <label className="visit-planner-field">When would you like to visit?
                <select value={visitDate} onChange={event => setVisitDate(event.target.value)}><option>This coming Sunday</option><option>Next Sunday</option></select>
              </label>
              <p className="visit-planner-note"><Clock size={16} aria-hidden="true" />Sunday worship · {worship.time}</p>
            </>}
            {step === 1 && <>
              <img className="visit-planner-photo" {...responsiveImage(familyPhoto, "(max-width: 640px) calc(100vw - 64px), 520px")} alt="Kinder Ministry children and their teachers gathered together" />
              <fieldset className="visit-planner-choices visit-planner-choices-inline"><legend className="sr-only">Are you bringing children?</legend>
                {[false, true].map(value => <label key={String(value)} className={`visit-planner-choice${children === value ? " is-selected" : ""}`}>
                  <input type="radio" name="visit-children" checked={children === value} onChange={() => setChildren(value)} /><span>{value ? "Yes, bringing children" : "No children this visit"}</span>
                </label>)}
              </fieldset>
              {children ? <>
                <fieldset className="visit-planner-ages"><legend>Their ages <span>(optional · select all that apply)</span></legend>
                  {ageOptions.map(age => <label key={age}><input type="checkbox" checked={ages.includes(age)} onChange={event => setAges(current => event.target.checked ? [...current, age] : current.filter(item => item !== age))} />{age}</label>)}
                </fieldset>
                <div className="visit-planner-guidance"><h4>A place to learn and grow</h4>
                  {relevantMinistries.map(m => <p key={m.id}><strong>{m.name}</strong> · {m.ageRange}</p>)}
                  {(ages.length === 0 || ages.some(age => age !== "Under 3")) && <p>Bible stories, songs, and crafts from 8:00–9:30 AM, followed by supervised activities during main worship. Ask our teachers for help with check-in when you arrive.</p>}
                  {ages.includes("Under 3") && <p>For children under 3, ask our greeters about available arrangements.</p>}
                </div>
              </> : <p className="visit-planner-intro">We’ll keep your guide focused on the main Sunday worship.</p>}
            </>}
            {step === 2 && <>
              <img className="visit-planner-photo" {...responsiveImage("/images/church-building.webp", "(max-width: 640px) calc(100vw - 64px), 520px")} alt="Daet Presbyterian Church building in Cobangbang" />
              <p className="visit-planner-address"><MapPin size={20} aria-hidden="true" /><span><strong>{CHURCH_INFO.name}</strong>{address}</span></p>
              <p className="visit-planner-intro">{CHURCH_INFO.address.landmark}. On-site parking is available.</p>
              <fieldset className="visit-planner-choices visit-planner-choices-inline"><legend>Would directions help?</legend>
                {[true, false].map(value => <label key={String(value)} className={`visit-planner-choice${directions === value ? " is-selected" : ""}`}>
                  <input type="radio" name="visit-directions" checked={directions === value} onChange={() => setDirections(value)} /><span>{value ? "Yes, show directions" : "I know the way"}</span>
                </label>)}
              </fieldset>
            </>}
            {step === 3 && <>
              <p className="visit-planner-intro">{visitDate} · {party}{children ? " · Bringing children" : ""}</p>
              <dl className="visit-planner-summary">
                <div><dt>Arrive around 9:30 AM</dt><dd>Our greeters will help you find your way and settle in.</dd></div>
                <div><dt>Sunday worship · {worship.time}</dt><dd>Christ-centered praise, prayer, and preaching from Scripture.</dd></div>
                {children && <div><dt>For your children{ages.length ? ` · ${ages.join(", ")}` : ""}</dt><dd>
                  {relevantMinistries.length > 0 && <>{relevantMinistries.map(m => `${m.name} (${m.ageRange})`).join("; ")}. Sunday school begins at 8:00 AM, with supervised activities after 9:30 AM. Teachers can help with check-in.</>}
                  {ages.includes("Under 3") && <> Ask our greeters about arrangements for children under 3.</>}
                </dd></div>}
                <div><dt>Come as you are</dt><dd>There is no strict dress code. Wear what helps you feel comfortable.</dd></div>
                <div><dt>Find us in Cobangbang</dt><dd>{address}</dd></div>
              </dl>
              {!directions && <a className="text-link" href={CHURCH_INFO.address.mapCoordinates.googleMapsUrl} target="_blank" rel="noopener noreferrer">Open directions <ArrowRight size={16} /></a>}
              <div className="visit-planner-contact">
                <button type="button" className="text-link" aria-expanded={contactOpen} aria-controls="visit-planner-contact" onClick={() => setContactOpen(!contactOpen)}><Mail size={16} />Questions before you visit?</button>
                {contactOpen && <div id="visit-planner-contact">
                  <p>Add details if you’d like, then review and send the draft in your email app. Your guide works without contacting us.</p>
                  <div className="visit-planner-contact-fields">
                    <label className="visit-planner-field">Your name (optional)<input autoComplete="name" value={contact.fullName} onChange={e => setContact({ ...contact, fullName: e.target.value })} /></label>
                    <label className="visit-planner-field">Email (optional)<input type="email" autoComplete="email" value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} /></label>
                    <label className="visit-planner-field">Phone (optional)<input type="tel" autoComplete="tel" value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })} /></label>
                  </div>
                  <label className="visit-planner-field">Questions or accessibility needs<textarea rows={3} value={contact.notes} onChange={e => setContact({ ...contact, notes: e.target.value })} /></label>
                  <a className="button button-outline" href={mailHref}>Open email draft <Mail size={16} /></a>
                  <p className="visit-planner-email">Or email <a href={`mailto:${CHURCH_INFO.contact.email}`}>{CHURCH_INFO.contact.email}</a>.</p>
                </div>}
              </div>
            </>}
          </motion.div>
        </div>
        <footer className="visit-planner-actions">
          {step > 0 ? <button type="button" className="button button-outline" onClick={() => setStep(step - 1)}><ArrowLeft size={16} />Back</button> : <span className="visit-planner-footer-note">Your choices stay on this page.</span>}
          {step < 3 ? <button type="button" className="button button-navy" onClick={() => setStep(step + 1)}>{step === 2 ? "See my Sunday guide" : "Continue"}<ArrowRight size={16} /></button> : directions ? <a className="button button-navy" href={CHURCH_INFO.address.mapCoordinates.googleMapsUrl} target="_blank" rel="noopener noreferrer">Open directions <ArrowRight size={16} /></a> : <button type="button" className="button button-navy" onClick={onClose}>Done <Check size={16} /></button>}
        </footer>
      </div>
    </div>
  );
};
