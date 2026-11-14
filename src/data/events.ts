export type EventType = 'birthday' | 'baby' | 'reveal' | 'get-together' | 'wedding' | 'custom';
export type EventRole = 'hosting' | 'attending';
export interface PartyEvent {
  id: string;
  name: string;
  type: EventType;
  role: EventRole;
  date: string;
  time: string;
  location: string;
  description: string;
  guests: number;
}
export const eventTypes: Record<EventType, {label: string; emoji: string; color: string}> = {
  birthday: {label:'Birthday',emoji:'🎂',color:'#fbd3df'},
  baby: {label:'Baby shower',emoji:'🍼',color:'#d9e9fd'},
  reveal: {label:'Gender reveal',emoji:'🎈',color:'#f6d9fa'},
  'get-together': {label:'Get-together',emoji:'🥳',color:'#ffe4b4'},
  wedding: {label:'Wedding',emoji:'💍',color:'#d7efe8'},
  custom: {label:'Something else',emoji:'✨',color:'#e6d9f9'}
};
export const demoEvents: PartyEvent[] = [
  {id:'sample-1',role:'hosting',name:'My Birthday Bash',type:'birthday',date:'2026-12-12',time:'19:00',location:'Tampa, FL',guests:12,description:'Cake, dancing, and good vibes!'},
  {id:'sample-2',role:'hosting',name:'Friendsgiving Night',type:'get-together',date:'2026-11-21',time:'18:30',location:'My place',guests:8,description:'Bring your appetite!'},
  {id:'sample-3',role:'attending',name:'Mia’s Baby Shower',type:'baby',date:'2026-12-06',time:'14:00',location:'The Garden Room',guests:19,description:'Celebrating Mia and the little one.'},
  {id:'sample-4',role:'attending',name:'Sam & Alex’s Wedding',type:'wedding',date:'2027-03-20',time:'16:00',location:'Orlando, FL',guests:65,description:'A day full of love.'}
];
export function formatEventDate(date:string,time:string) {
  const parsed = new Date(`${date}T${time || '12:00'}:00`);
  return Number.isNaN(parsed.getTime()) ? date : `${parsed.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})} · ${parsed.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'})}`;
}
