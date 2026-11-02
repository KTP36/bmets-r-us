import { timingSafeEqual } from 'node:crypto';
const activities = new Set(['CBET Practice','CBET Harder Practice','CBET Harder Questions','CBET 75-Question Practice Exam']);
export function validate(body) {
 const b=body||{};
 if(typeof b.id!=='string'||!/^[\w-]{8,100}$/.test(b.id))return null;
 if(!activities.has(b.activityName)||!Number.isInteger(b.total)||b.total<1||b.total>200||!Number.isInteger(b.score)||b.score<0||b.score>b.total)return null;
 if(typeof b.username!=='string'||!b.username.trim()||b.username.length>80||typeof b.email!=='string'||b.email.length>254||!/^\S+@\S+\.\S+$/.test(b.email))return null;
 if(b.timeSeconds!==null&&(!Number.isFinite(b.timeSeconds)||b.timeSeconds<=0||b.timeSeconds>86400))return null;
 return {id:b.id,username:b.username.trim(),email:b.email.trim(),activity:b.activityName,score:b.score,total:b.total,percent:Math.round(b.score/b.total*100),time_seconds:b.timeSeconds,verification:'client_reported'};
}
export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');
 const base=process.env.SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!base||!key)return res.status(503).json({error:'Storage is not configured'});
 const headers={apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json'};
 try{
 if(req.method==='POST'){
  if(!process.env.SCORE_ALLOWED_ORIGIN||req.headers.origin!==process.env.SCORE_ALLOWED_ORIGIN)return res.status(403).json({error:'Origin rejected'});
  if(Number(req.headers['content-length']||0)>4096)return res.status(413).json({error:'Request too large'});
  let body;try{body=typeof req.body==='string'?JSON.parse(req.body):req.body;}catch{return res.status(400).json({error:'Invalid JSON'});}
  const row=validate(body);if(!row)return res.status(400).json({error:'Invalid result'});
  const r=await fetch(`${base}/rest/v1/quiz_results?on_conflict=id`,{method:'POST',headers:{...headers,Prefer:'resolution=ignore-duplicates,return=minimal'},body:JSON.stringify(row),signal:AbortSignal.timeout(10000)});
  if(!r.ok)throw Error('database');return res.status(201).json({saved:true});
 }
 if(req.method==='GET'){
  const expected=process.env.RESULTS_ADMIN_TOKEN||'',actual=(req.headers.authorization||'').replace(/^Bearer /,'');
  if(expected.length<32||Buffer.byteLength(actual)!==Buffer.byteLength(expected)||!timingSafeEqual(Buffer.from(actual),Buffer.from(expected)))return res.status(401).json({error:'Unauthorized'});
  const r=await fetch(`${base}/rest/v1/quiz_results?select=id,username,activity,score,total,percent,time_seconds,created_at,verification&order=created_at.desc&limit=200`,{headers,signal:AbortSignal.timeout(10000)});
  if(!r.ok)throw Error('database');return res.status(200).json(await r.json());
 }
 res.setHeader('Allow','GET, POST');return res.status(405).json({error:'Method not allowed'});
 }catch{return res.status(503).json({error:'Results service unavailable'});}
}
