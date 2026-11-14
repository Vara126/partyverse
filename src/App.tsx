import {useCallback, useEffect, useMemo, useState} from 'react';
import {PartyPopper, Plus, Mail, PartyPopper as ConfettiIcon} from 'lucide-react';
import EventCard from './components/EventCard';
import CreateEventModal from './components/CreateEventModal';
import EventDetailsModal from './components/EventDetailsModal';
import {demoEvents,type PartyEvent} from './data/events';
const STORAGE_KEY='partyverse-react-events-v1';
function loadEvents():PartyEvent[]{try{const parsed=JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');return Array.isArray(parsed)?parsed.filter((e):e is PartyEvent=>e&&typeof e.id==='string'&&typeof e.name==='string'&&e.role==='hosting'):[];}catch{return [];}}
const confettiColors=['#fa78a0','#835fd9','#ffcd59','#73d2c1','#84b7f5'];
function confettiPieces(){let seed=17;const random=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646};return Array.from({length:65},(_,i)=>({id:i,left:`${random()*100}%`,top:`${random()*100}%`,width:`${4+random()*8}px`,height:`${5+random()*10}px`,rotate:`${random()*180}deg`,color:confettiColors[Math.floor(random()*confettiColors.length)]}));}
const pieces=confettiPieces();
function App(){
 const [created,setCreated]=useState<PartyEvent[]>(loadEvents);
 const [creating,setCreating]=useState(false);
 const [selected,setSelected]=useState<PartyEvent|null>(null);
 const [toast,setToast]=useState('');
 const closeCreate=useCallback(()=>setCreating(false),[]);
 const closeDetails=useCallback(()=>setSelected(null),[]);
 useEffect(()=>{try{localStorage.setItem(STORAGE_KEY,JSON.stringify(created))}catch{}},[created]);
 useEffect(()=>{if(!toast)return;const t=window.setTimeout(()=>setToast(''),3000);return()=>clearTimeout(t)},[toast]);
 const events=useMemo(()=>[...created,...demoEvents],[created]);
 const hosting=events.filter(e=>e.role==='hosting');
 const attending=events.filter(e=>e.role==='attending');
 const onCreate=(event:PartyEvent)=>{setCreated(prev=>[event,...prev]);setCreating(false);setToast('🎊 Your event is created!')};
 return <div className="shell">
  <header className="topbar"><a className="logo" href="/" aria-label="PartyVerse home"><span className="logo-mark">✳</span><span>partyverse<span className="logo-dot">.</span></span></a><div className="top-right"><button className="primary-button create" onClick={()=>setCreating(true)}><Plus size={19}/> <span>Create new event</span></button><div className="profile" aria-label="Demo profile">👩🏽</div></div></header>
  <main>
    <section className="hero" aria-labelledby="hero-title"><div className="confetti" aria-hidden="true">{pieces.map(piece=><i key={piece.id} style={{left:piece.left,top:piece.top,width:piece.width,height:piece.height,transform:`rotate(${piece.rotate})`,backgroundColor:piece.color}}/>)}</div><div className="hero-copy"><span className="eyebrow">✦ THE GOOD TIMES START HERE ✦</span><h1 id="hero-title">Let's <span>Party!</span></h1><p>All your celebrations, your favorite people, and a whole lot of confetti. In one happy place. 🎉</p></div><div className="hero-art" aria-hidden="true"><span className="spark one">✳</span><span className="balloon b1"/><span className="balloon b2"/><span className="balloon b3"/><span className="spark two">✦</span></div></section>
    <section aria-labelledby="hosting-title"><div className="section-head"><div className="section-title"><span className="pill-icon pink"><PartyPopper size={22}/></span><h2 id="hosting-title">You're hosting</h2></div><span className="count">{hosting.length} {hosting.length===1?'event':'events'}</span></div><div className="cards">{hosting.length?hosting.map(e=><EventCard key={e.id} event={e} onOpen={setSelected}/>):<div className="empty"><h3>Ready to throw a party?</h3><p>Start planning your first unforgettable event.</p><button onClick={()=>setCreating(true)}>Create an event</button></div>}</div></section>
    <section aria-labelledby="attending-title"><div className="section-head"><div className="section-title"><span className="pill-icon green"><Mail size={22}/></span><h2 id="attending-title">You're attending</h2></div><span className="count">{attending.length} {attending.length===1?'event':'events'}</span></div><div className="cards">{attending.length?attending.map(e=><EventCard key={e.id} event={e} onOpen={setSelected}/>):<div className="empty"><h3>Your invitations will show up here</h3><p>When you accept an invite, you'll see it here!</p></div>}</div></section>
  </main><footer className="footer"><ConfettiIcon size={15}/> Made for the memories, the chaos &amp; the confetti. <ConfettiIcon size={15}/></footer>
  {creating&&<CreateEventModal onClose={closeCreate} onCreate={onCreate}/>}
  {selected&&<EventDetailsModal event={selected} onClose={closeDetails}/>}
  {toast&&<div className="toast" role="status">{toast}</div>}
 </div>;
}
export default App;
