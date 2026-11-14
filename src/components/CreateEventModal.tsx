import {useEffect, useRef, useState, type FormEvent} from 'react';
import {X} from 'lucide-react';
import {eventTypes, type PartyEvent, type EventType} from '../data/events';
interface Props {onClose:()=>void;onCreate:(event:PartyEvent)=>void}
export default function CreateEventModal({onClose,onCreate}:Props) {
  const [name,setName]=useState('');
  const [type,setType]=useState<EventType>('birthday');
  const [date,setDate]=useState('');
  const [time,setTime]=useState('18:00');
  const [location,setLocation]=useState('');
  const [description,setDescription]=useState('');
  const modalRef=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const original=document.body.style.overflow;document.body.style.overflow='hidden';
    const previous=document.activeElement instanceof HTMLElement?document.activeElement:null;
    modalRef.current?.querySelector<HTMLInputElement>('input')?.focus();
    const onKey=(e:KeyboardEvent)=>{
      if(e.key==='Escape')onClose();
      if(e.key!=='Tab'||!modalRef.current)return;
      const els=[...modalRef.current.querySelectorAll<HTMLElement>('button,input,textarea,select')].filter(el=>!el.hasAttribute('disabled'));
      const first=els[0],last=els[els.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
    };
    window.addEventListener('keydown',onKey);
    return ()=>{document.body.style.overflow=original;window.removeEventListener('keydown',onKey);previous?.focus();};
  },[onClose]);
  function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();if(!name.trim())return;
    onCreate({id:crypto.randomUUID(),role:'hosting',name:name.trim(),type,date,time,location:location.trim(),description:description.trim(),guests:0});
  }
  return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}>
    <div className="dialog" ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="create-title">
      <button className="close" type="button" aria-label="Close" onClick={onClose}><X size={19}/></button>
      <h2 id="create-title">Let's make it happen! 🎊</h2><p className="dialog-lede">Every great celebration starts with a plan.</p>
      <form onSubmit={submit}>
        <div className="field"><label htmlFor="event-name">Event name</label><input id="event-name" required maxLength={75} placeholder="e.g. My birthday bash" value={name} onChange={e=>setName(e.target.value)}/></div>
        <div className="field"><label htmlFor="event-type">What's the occasion?</label><select id="event-type" value={type} onChange={e=>setType(e.target.value as EventType)}>{Object.entries(eventTypes).map(([id,c])=><option key={id} value={id}>{c.emoji} {c.label}</option>)}</select></div>
        <div className="two-fields"><div className="field"><label htmlFor="event-date">Date</label><input id="event-date" required type="date" value={date} onChange={e=>setDate(e.target.value)}/></div><div className="field"><label htmlFor="event-time">Time</label><input id="event-time" required type="time" value={time} onChange={e=>setTime(e.target.value)}/></div></div>
        <div className="field"><label htmlFor="event-location">Location</label><input id="event-location" maxLength={100} placeholder="e.g. My backyard" value={location} onChange={e=>setLocation(e.target.value)}/></div>
        <div className="field"><label htmlFor="event-description">A little about the party (optional)</label><textarea id="event-description" maxLength={500} placeholder="What's the vibe?" value={description} onChange={e=>setDescription(e.target.value)}/></div>
        <button type="submit" className="primary-button save">Create my event ✨</button>
      </form><p className="note">Demo mode: events are saved in this browser. Real accounts and invitations are coming later.</p>
    </div>
  </div>;
}
