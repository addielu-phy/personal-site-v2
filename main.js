document.getElementById('theme').onclick=()=>{const t=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=t;try{localStorage.setItem('theme',t)}catch(e){}};
// field lines around two charges
(()=>{const g=document.getElementById('lines');let s='';const q=[[860,250,1],[1080,400,-1]];
for(let i=0;i<22;i++){const a=i/22*Math.PI*2;let x=q[0][0]+14*Math.cos(a),y=q[0][1]+14*Math.sin(a),d=`M${x.toFixed(1)} ${y.toFixed(1)}`;
for(let k=0;k<400;k++){let ex=0,ey=0;for(const[cx,cy,c]of q){const dx=x-cx,dy=y-cy,r=Math.hypot(dx,dy)+1e-3;ex+=c*dx/r**3;ey+=c*dy/r**3}const m=Math.hypot(ex,ey);x+=6*ex/m;y+=6*ey/m;d+=` L${x.toFixed(1)} ${y.toFixed(1)}`;if(Math.hypot(x-q[1][0],y-q[1][1])<10||x<-50||x>1300||y<-50||y>650)break}
s+=`<path d="${d}"/>`}s+=q.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5"/>`).join('');g.innerHTML=s})();
const W=window.WORKS,C=['全部',...window.CATS],f=document.getElementById('filters'),grid=document.getElementById('grid');
document.getElementById('count').textContent=W.length;
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function render(cat){grid.innerHTML=W.filter(w=>cat==='全部'||w.cat===cat).sort((a,b)=>b.featured-a.featured||b.date.localeCompare(a.date)).map(w=>`<a class="card work" href="${w.url}" target="_blank" rel="noopener"><div class="meta mono"><span>${esc(w.cat)}</span><span>${w.featured?'<span class="star" title="精選">★</span> ':''}${w.date}</span></div><h3>${esc(w.title)}</h3><p>${esc(w.desc)}</p></a>`).join('');
[...f.children].forEach(b=>b.setAttribute('aria-pressed',b.dataset.c===cat))}
f.innerHTML=C.map(c=>`<button data-c="${c}">${c}<small>${c==='全部'?W.length:W.filter(w=>w.cat===c).length}</small></button>`).join('');
f.onclick=e=>{const b=e.target.closest('button');if(b)render(b.dataset.c)};render('全部');
