import {CalendarDays, MapPin, ArrowUpRight, Users} from 'lucide-react';
import {eventTypes, formatEventDate, type PartyEvent} from '../data/events';
interface Props { event: PartyEvent; onOpen: (event:PartyEvent)=>void; }
export default function EventCard({event,onOpen}:Props) {
  const config = eventTypes[event.type];
  return <article className="event-card">
    <div className="card-art" style={{backgroundColor:config.color}}><span className="card-star star-left">✳</span><span className="card-emoji" role="img" aria-label={config.label}>{config.emoji}</span><span className="card-star star-right">✦</span></div>
    <div className="card-body">
      <span className={`status ${event.role === 'attending'?'attending':''}`}>{event.role==='hosting'?'✦ Hosting':'✓ Going'}</span>
      <h3>{event.name}</h3>
      <p className="meta"><CalendarDays size={16}/>{formatEventDate(event.date,event.time)}</p>
      <p className="meta"><MapPin size={16}/>{event.location||'Location TBD'}</p>
      <div className="card-foot"><span className="guest"><Users size={16}/>{event.guests ? `${event.guests} guests`:'Just created'}</span><button className="text-button" onClick={()=>onOpen(event)} type="button">View event <ArrowUpRight size={16}/></button></div>
    </div>
  </article>;
}
