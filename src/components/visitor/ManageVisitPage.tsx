import {useEffect,useState} from 'react';
import {API_BASE_URL} from '../../services/api';
import './manageVisit.css';
type Visit={visit_date:string;party:string;visitor_reply:string;revision:string};
export function ManageVisitPage({token}:{token:string}) {
 const [visit,setVisit]=useState<Visit|null>(null),[date,setDate]=useState(''),[busy,setBusy]=useState(false),[error,setError]=useState(''),[message,setMessage]=useState('');
 const request=async(action?:string)=>{
  const response=await fetch(`${API_BASE_URL}/planned-visits/manage`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token,action,expected_revision:visit?.revision,visit_date:date}),signal:AbortSignal.timeout(20000)});
  const result=await response.json();if(!response.ok)throw Error(result.error||'Unable to load your visit.');return result as Visit;
 };
 useEffect(()=>{let alive=true;setBusy(true);request().then(v=>{if(alive){setVisit(v);setDate(v.visit_date);}}).catch(e=>{if(alive)setError(e instanceof Error?e.message:'Your visit is unavailable.');}).finally(()=>{if(alive)setBusy(false);});return()=>{alive=false;};},[token]);
 const update=async(action?:string)=>{
  if(busy)return;setBusy(true);setError('');setMessage('');
  try{const v=await request(action);setVisit(v);setDate(v.visit_date);if(action)setMessage('Your response has been saved. Our welcome team will review your update.');}
  catch(e){setError(e instanceof Error?e.message:'Unable to save. Reload to check your visit before retrying.');}
  finally{setBusy(false);}
 };
 return <div className="landing-page manage-visit"><main className="page-container"><p className="eyebrow">DAET PRESBYTERIAN CHURCH</p><h1>Your Sunday visit</h1><p className="manage-visit-intro">Confirm your plans, choose another Sunday, or let us know you cannot come.</p>
  {busy&&<p role="status">Loading your visit…</p>}{error&&<p role="alert" className="visit-form-error">{error}</p>}{message&&<p role="status">{message}</p>}
  {visit&&<section className="visit-confirmation"><h2>{new Date(visit.visit_date+'T00:00:00Z').toLocaleDateString('en-PH',{timeZone:'UTC',weekday:'long',month:'long',day:'numeric',year:'numeric'})}</h2><p>{visit.party} · {visit.visitor_reply}</p><div style={{display:'flex',flexWrap:'wrap',gap:12,margin:'20px 0'}}><button className="button button-navy" disabled={busy||visit.visitor_reply==='Confirmed'} onClick={()=>void update('confirm')}>Confirm my visit</button><button className="button button-outline" disabled={busy||visit.visitor_reply==='Cancelled'} onClick={()=>void update('cancel')}>Cancel my visit</button></div><form onSubmit={e=>{e.preventDefault();void update('reschedule');}}><label className="visit-planner-field">Choose another Sunday<input type="date" required value={date} disabled={busy} onChange={e=>setDate(e.target.value)}/></label><button className="button button-navy" disabled={busy||!date||date===visit.visit_date}>Reschedule</button></form></section>}
  <p className="visit-planner-note">Keep this link private. Anyone with it can update this visit. Your response does not record actual attendance.</p><button className="button button-outline" disabled={busy} onClick={()=>void update()}>Reload visit</button><p><a href="/">Back to our church website</a></p>
 </main></div>;
}
