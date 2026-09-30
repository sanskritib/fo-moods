// fo moods renderer: three axes in, one blob out.
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;var t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function hash(s){var h=2166136261;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}

// lower certainty = lumpier outline; higher energy = slightly stretched
function blobPath(seed,energy,certainty){
  var rand=rng(seed),n=9,wob=.05+(1-certainty)*.26+energy*.05,pts=[];
  for(var i=0;i<n;i++){
    var a=i/n*Math.PI*2, r=68*(1+(rand()*2-1)*wob);
    pts.push([100+Math.cos(a)*r,100+Math.sin(a)*r*(.94+energy*.12)]);
  }
  var d='M'+pts[0][0].toFixed(1)+' '+pts[0][1].toFixed(1);
  for(var j=0;j<n;j++){
    var p0=pts[(j-1+n)%n],p1=pts[j],p2=pts[(j+1)%n],p3=pts[(j+2)%n];
    var c1=[p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6];
    var c2=[p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6];
    d+='C'+c1[0].toFixed(1)+' '+c1[1].toFixed(1)+','+c2[0].toFixed(1)+' '+c2[1].toFixed(1)+','+p2[0].toFixed(1)+' '+p2[1].toFixed(1);
  }
  return d+'Z';
}

function eyeStyle(m){
  if(m.certainty<.4) return 'dots';
  if(m.energy>.72) return 'alert';
  if(m.energy<.34) return 'lidded';
  if(m.warmth>.64) return 'squint';
  return 'round';
}

function eyes(style,ink){
  var L=78,R=122,y=96;
  function pair(inner){return inner(L)+inner(R)}
  if(style==='dots') return pair(function(x){return '<circle cx="'+x+'" cy="'+y+'" r="4.5" fill="'+ink+'"/>'});
  if(style==='round') return pair(function(x){return '<circle cx="'+x+'" cy="'+y+'" r="8" fill="'+ink+'"/>'});
  if(style==='alert') return pair(function(x){return '<ellipse cx="'+x+'" cy="'+y+'" rx="7" ry="12.5" fill="'+ink+'"/>'});
  if(style==='lidded') return pair(function(x){return '<path d="M'+(x-9)+' '+y+' q9 6 18 0" stroke="'+ink+'" stroke-width="4.5" fill="none" stroke-linecap="round"/>'});
  return pair(function(x){return '<path d="M'+(x-9)+' '+(y+3)+' q9 -11 18 0" stroke="'+ink+'" stroke-width="4.5" fill="none" stroke-linecap="round"/>'});
}

// warmth walks the hue wheel the long way: blue -> violet -> magenta -> amber
function colors(m){
  var hue=Math.round((205+m.warmth*175)%360),
      sat=Math.round(38+m.energy*52),
      lig=Math.round(54+(1-m.energy)*9);
  return {fill:'hsl('+hue+' '+sat+'% '+lig+'%)',
          glow:'hsl('+hue+' '+Math.min(96,sat+8)+'% '+(lig+13)+'%)',
          ink:'hsl('+hue+' 45% 12%)'};
}

function card(m,i){
  var c=colors(m),style=eyeStyle(m),blur=((1-m.certainty)*7).toFixed(1),
      id='b'+i,d=blobPath(hash(m.date+m.name),m.energy,m.certainty);
  var svg='<svg viewBox="0 0 200 200" role="img" aria-label="'+m.name+'">'
    +'<defs><filter id="f'+id+'" x="-30%" y="-30%" width="160%" height="160%">'
    +'<feGaussianBlur stdDeviation="'+blur+'"/></filter>'
    +'<radialGradient id="g'+id+'" cx="38%" cy="32%"><stop offset="0%" stop-color="'+c.glow+'"/>'
    +'<stop offset="100%" stop-color="'+c.fill+'"/></radialGradient></defs>'
    +'<path d="'+d+'" fill="url(#g'+id+')" filter="url(#f'+id+')"/>'
    +eyes(style,c.ink)+'</svg>';
  var ax=[['energy',m.energy],['certainty',m.certainty],['warmth',m.warmth]].map(function(a){
    return '<div class="axis"><span>'+a[0]+'</span><div class="bar"><i style="width:'
      +Math.round(a[1]*100)+'%;background:'+c.fill+'"></i></div></div>'}).join('');
  return '<article class="card">'+svg+'<div class="name">'+m.name+'</div>'
    +'<p class="date">'+m.date+' &middot; '+style+' eyes</p>'
    +(m.note?'<p class="note">'+m.note+'</p>':'')+'<div class="axes">'+ax+'</div></article>';
}

fetch('moods.json?'+Date.now()).then(function(r){return r.json()}).then(function(list){
  list.sort(function(a,b){return a.date<b.date?1:-1});
  document.getElementById('grid').innerHTML=list.map(card).join('');
}).catch(function(e){
  document.getElementById('grid').innerHTML='<p class="note">moods.json did not load: '+e+'</p>';
});
