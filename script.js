const reveals=[...document.querySelectorAll('.reveal')];
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -7% 0px'});
reveals.forEach(el=>io.observe(el));

const progress=document.querySelector('.scrollbar span');
const car=document.querySelector('.moving-car');
const parallaxes=[...document.querySelectorAll('.parallax')];
function onScroll(){
  const max=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=(max?scrollY/max*100:0)+'%';
  parallaxes.forEach(el=>{const r=el.getBoundingClientRect();const p=(innerHeight-r.top)/(innerHeight+r.height);const speed=parseFloat(el.dataset.speed||'.05');el.style.transform=`translate3d(0,${(p-.5)*innerHeight*speed}px,0)`});
  if(car){const section=car.closest('.car-scene').getBoundingClientRect();const total=section.height+innerHeight;const p=Math.max(0,Math.min(1,(innerHeight-section.top)/total));const start=34,end=-4;const x=start+(end-start)*p;car.style.transform=`translate3d(${x}vw,0,0) scale(${.92+p*.08})`;}
}
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);onScroll();

const btn=document.querySelector('.menu'),nav=document.querySelector('.topbar nav');
btn?.addEventListener('click',()=>nav.classList.toggle('open'));
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
