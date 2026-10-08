import { useEffect, useRef, useState } from 'react';
import { API_BASE_URL } from '../../services/api';
import { CHURCH_INFO } from '../../data/churchInfo';

interface VisitReceipt {
  id: string;
  email: string;
  emailStatus: 'queued' | 'sent' | 'failed' | 'not_requested' | 'unavailable';
  followUp: string;
  visitDate: string;
}

interface VisitNotificationFormProps {
  hidden: boolean;
  visitDate: string;
  party: string;
  children: boolean;
  ages: string[];
}
function submissionToken() {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  // Local previews on a phone may use HTTP over the LAN, where randomUUID is unavailable.
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 15) | 64;
  bytes[8] = (bytes[8] & 63) | 128;
  const hex = Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}
export function VisitNotificationForm({ hidden, visitDate, party, children, ages }: VisitNotificationFormProps) {
  const [contact, setContact] = useState({ full_name: '', email: '', phone: '', questions: '', website: '' });
  const [consent, setConsent] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [fields, setFields] = useState<Record<string, string>>({});
  const [receipt, setReceipt] = useState<VisitReceipt | null>(null);
  const confirmationHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (receipt) confirmationHeading.current?.focus();
  }, [receipt]);
  const attempt = useRef({ signature: '', token: '' });
  const busy = useRef(false);
  const update = (key: keyof typeof contact, value: string) => setContact(current => ({ ...current, [key]: value }));
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (busy.current || receipt) return;
    const validation: Record<string, string> = {};
    if (!contact.full_name.trim()) validation.full_name = 'Please enter your name.';
    if (!contact.email.trim() && !contact.phone.trim()) validation.contact = 'Enter an email address or phone number.';
    if (!consent) validation.consent = 'Please agree to be contacted about your visit.';
    setFields(validation); setError('');
    if (Object.keys(validation).length) return;
    const payload = { ...contact, consent, visit_date: visitDate, party, bringing_children: children, child_age_groups: children ? ages : [] };
    const signature = JSON.stringify(payload);
    if (attempt.current.signature !== signature) attempt.current = { signature, token: submissionToken() };
    busy.current = true; setPending(true);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(`${API_BASE_URL}/planned-visits`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...payload, submission_token: attempt.current.token }), signal: controller.signal });
      const result = await response.json().catch(() => null);
      if (!response.ok) {
        setFields(result?.fields || {});
        if (response.status === 409) attempt.current = { signature: '', token: '' };
        if (response.status === 404 || response.status >= 500) {
          throw new Error('The church system is temporarily unavailable. Your plan hasn’t been confirmed. Please try again later. Your Sunday guide and directions are still available.');
        }
        throw new Error(result?.error || 'We couldn’t save your visit plan. Please try again.');
      }
      if (typeof result?.receipt_id !== 'string') throw new Error('We couldn’t confirm your visit plan. Please try again.');
      const emailStatus = ['queued', 'sent', 'failed', 'not_requested'].includes(result.confirmation_email) ? result.confirmation_email as VisitReceipt['emailStatus'] : 'unavailable';
      setReceipt({ id: result.receipt_id, email: contact.email.trim(), emailStatus, followUp: typeof result.follow_up?.message === 'string' ? result.follow_up.message : 'Our welcome team will contact you using the details you provided.', visitDate });
    } catch (failure) {
      setError(failure instanceof Error && failure.name !== 'AbortError' && failure.name !== 'TypeError' ? failure.message : 'We couldn’t reach the church system. Please try again. Your guide is still available.');
    } finally { clearTimeout(timeout); busy.current = false; setPending(false); }
  };
  return <div hidden={hidden} className="visit-notification-form">
    {receipt ? <div role="status" className="visit-planner-guidance visit-confirmation">
      <h4 ref={confirmationHeading} tabIndex={-1}>We’ve received your visit plan.</h4>
      <p>We look forward to welcoming you on <strong>{new Intl.DateTimeFormat('en-PH', { timeZone: 'UTC', weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(`${receipt.visitDate}T00:00:00Z`))}</strong>.</p>
      <p>Sunday worship · {CHURCH_INFO.services.find(service => service.isMainWorship)!.time} (Philippine time). Arrive around 9:30 AM.</p>
      <div className="visit-confirmation-next"><h4>{receipt.email ? 'Your confirmation email' : 'Your visit details'}</h4>
        <p>{receipt.emailStatus === 'sent' ? <>We’ve sent your Sunday visit details to <strong>{receipt.email}</strong>. Please check your inbox and spam folder.</> : receipt.emailStatus === 'queued' ? <>Your confirmation email with your Sunday visit details is waiting to be sent to <strong>{receipt.email}</strong>. Please check your inbox and spam folder shortly.</> : receipt.emailStatus === 'failed' ? 'Your plan is saved, but the confirmation email is delayed. You can keep the visit details shown here.' : receipt.email ? 'Your plan is saved. Email confirmation is currently unavailable; you can keep the visit details shown here.' : 'You provided a phone number, so our welcome team can contact you there. You can keep the visit details shown here.'}</p>
      </div>
      <div className="visit-confirmation-next"><h4>When to expect a follow-up</h4><p>{receipt.followUp}</p></div>
      <p className="visit-planner-note">Reference: {receipt.id}</p>
    </div> : <form onSubmit={submit}>
      <p>Sending your plan is optional. Add your details if you’d like us to expect you or answer a question before your visit.</p>
      <p>Add your email to receive your Sunday visit details. Our welcome team usually follows up with new visitors on the Saturday before their visit.</p>
      <fieldset disabled={pending}>
        <div className="visit-planner-contact-fields">
          {(['full_name', 'email', 'phone'] as const).map(key => <label key={key} className="visit-planner-field">{key === 'full_name' ? 'Your name' : key === 'email' ? 'Email' : 'Phone'}{key !== 'full_name' && ' (email or phone required)'}
            <input required={key === 'full_name'} maxLength={key === 'full_name' ? 120 : key === 'email' ? 254 : 30} type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'} autoComplete={key === 'full_name' ? 'name' : key === 'phone' ? 'tel' : 'email'} value={contact[key]} onChange={event => update(key, event.target.value)} aria-invalid={Boolean(fields[key])} aria-describedby={fields[key] ? `visit-error-${key}` : undefined} />
            {fields[key] && <span id={`visit-error-${key}`} className="visit-form-error">{fields[key]}</span>}
          </label>)}
        </div>
        {fields.contact && <p className="visit-form-error" role="alert">{fields.contact}</p>}
        <label className="visit-planner-field">Questions or accessibility needs (optional)<textarea rows={3} maxLength={2000} value={contact.questions} onChange={event => update('questions', event.target.value)} /></label>
        <div className="visit-honeypot" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={contact.website} onChange={event => update('website', event.target.value)} /></label></div>
        <label className="visit-consent"><input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} aria-invalid={Boolean(fields.consent)} />I agree that DPC may contact me about this visit using the details I provide.</label>
        {fields.consent && <p className="visit-form-error" role="alert">{fields.consent}</p>}
        {Object.entries(fields).filter(([key]) => !['full_name', 'email', 'phone', 'contact', 'consent'].includes(key)).map(([key, message]) => <p key={key} className="visit-form-error" role="alert">{message}</p>)}
        <p className="visit-planner-note">Please share children’s age groups only; names are not needed.</p>
        {error && <p className="visit-form-error" role="alert">{error}</p>}
        <button type="submit" className="button button-navy" disabled={pending}>{pending ? 'Sending your plan…' : 'Let us know you’re coming'}</button>
        <span className="sr-only" role="status">{pending ? 'Sending your visit plan.' : ''}</span>
      </fieldset>
    </form>}
  </div>;
}
