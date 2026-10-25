// COC97 website settings. Replace contact links with official team accounts.
const TEAM_CONFIG = {
  whatsapp: "https://wa.me/6280000000000",
  instagram: "https://instagram.com/",
  tiktok: "https://tiktok.com/"
};

const DEFAULT_PLAYERS = [
  {number:"01",nickname:"PLAYER ONE",role:"EXP LANER",specialty:"Fighter / Tank",initial:"P1"},
  {number:"02",nickname:"PLAYER TWO",role:"JUNGLER",specialty:"Assassin / Fighter",initial:"P2"},
  {number:"03",nickname:"PLAYER THREE",role:"MID LANER",specialty:"Mage",initial:"P3"},
  {number:"04",nickname:"PLAYER FOUR",role:"GOLD LANER",specialty:"Marksman",initial:"P4"},
  {number:"05",nickname:"PLAYER FIVE",role:"ROAMER",specialty:"Tank / Support",initial:"P5"}
];
const DEFAULT_TOURNAMENTS = [
  {name:"NEXT COMMUNITY CUP",status:"UPCOMING",result:"Target kompetisi berikutnya"},
  {name:"TEAM CHEMISTRY BOOTCAMP",status:"IN PROGRESS",result:"Latihan komunikasi dan strategi"},
  {name:"COC97 JOURNEY BEGINS",status:"COMPLETED",result:"Fondasi tim dan persiapan roster"}
];
const DEFAULT_STANDINGS = [
  {team:"COC97",match:0,win:0,lose:0,points:0},
  {team:"RIVAL SQUAD",match:0,win:0,lose:0,points:0},
  {team:"NEXT OPPONENT",match:0,win:0,lose:0,points:0}
];
const DEFAULT_MATCHES = [
  {day:"01",month:"NOV 2026",type:"SCRIM • BO3",opponent:"OPPONENT TBA",time:"20:00 WIB",status:"PLANNED"},
  {day:"08",month:"NOV 2026",type:"COMMUNITY CUP",opponent:"OPPONENT TBA",time:"19:30 WIB",status:"TBA"}
];
const readStore = (key, fallback) => {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; }
  catch { return fallback; }
};
let players = readStore("coc97_players", DEFAULT_PLAYERS);
let tournaments = readStore("coc97_tournaments", DEFAULT_TOURNAMENTS);
let standings = readStore("coc97_standings", DEFAULT_STANDINGS);
const saveStore = (key, value) => localStorage.setItem(key, JSON.stringify(value));

function renderRoster() {
  const grid = document.getElementById("rosterGrid");
  grid.innerHTML = "";
  players.forEach((p) => {
    const card = document.createElement("article");
    card.className = "player-card";
    const art = document.createElement("div"); art.className = "player-art";
    const num = document.createElement("span"); num.className = "player-num"; num.textContent = p.number;
    const avatar = document.createElement("div"); avatar.className = "avatar"; avatar.textContent = p.initial || p.nickname.slice(0,2).toUpperCase();
    const role = document.createElement("span"); role.className = "role-label"; role.textContent = p.role;
    art.append(num, avatar, role);
    const data = document.createElement("div"); data.className = "player-data";
    const small = document.createElement("small"); small.textContent = "CLASH OF CLASH 97";
    const name = document.createElement("h3"); name.textContent = p.nickname;
    const specialty = document.createElement("p"); specialty.textContent = "Specialty: ";
    const bold = document.createElement("b"); bold.textContent = p.specialty; specialty.appendChild(bold);
    const bar = document.createElement("div"); bar.className = "player-bar"; const fill = document.createElement("span"); bar.appendChild(fill);
    data.append(small,name,specialty,bar); card.append(art,data); grid.appendChild(card);
  });
  fillPlayerSelect();
}
function renderTournaments() {
  const grid = document.getElementById("tournamentGrid"); grid.innerHTML = "";
  tournaments.forEach((t) => {
    const card = document.createElement("article"); card.className = "tournament-card";
    const icon = document.createElement("div"); icon.className = "tournament-icon"; icon.textContent = "✦";
    const status = document.createElement("small"); status.textContent = t.status;
    const name = document.createElement("h3"); name.textContent = t.name;
    const result = document.createElement("p"); result.textContent = t.result;
    const badge = document.createElement("span"); badge.className = "status"; badge.textContent = t.status;
    card.append(icon,status,name,result,badge); grid.appendChild(card);
  });
}
function renderStandings() {
  const body = document.getElementById("standingsBody"); body.innerHTML = "";
  standings.forEach((s,i) => {
    const tr = document.createElement("tr");
    [String(i+1),s.team,String(s.match),String(s.win),String(s.lose),String(s.points)].forEach((value,index) => {
      const td = document.createElement("td");
      if(index===1){const dot=document.createElement("span");dot.className="team-dot";td.append(dot,document.createTextNode(value));}
      else td.textContent=value;
      tr.appendChild(td);
    });
    body.appendChild(tr);
  });
}
function renderMatches() {
  const list = document.getElementById("matchList"); list.innerHTML = "";
  DEFAULT_MATCHES.forEach(m => {
    const row=document.createElement("article");row.className="match-row";
    row.innerHTML=`<div class="match-date"><strong>${m.day}</strong><span>${m.month}</span></div><div class="match-info"><small>${m.type}</small><h3>COC97 <span>VS</span> ${m.opponent}</h3></div><div class="match-time"><span>TIME</span><strong>${m.time}</strong></div><span class="match-status">${m.status}</span>`;
    list.appendChild(row);
  });
}
function fillPlayerSelect() {
  const select = document.getElementById("playerSelect");
  if (!select) return;
  const old = select.value;
  select.innerHTML = "";
  players.forEach((p,i)=>{const o=document.createElement("option");o.value=String(i);o.textContent=`${p.number} — ${p.nickname}`;select.appendChild(o);});
  if(old && Number(old)<players.length)select.value=old;
  loadSelectedPlayer();
}
function loadSelectedPlayer() {
  const index=Number(document.getElementById("playerSelect").value||0), p=players[index];
  if(!p)return;
  document.getElementById("playerNickname").value=p.nickname;
  document.getElementById("playerRole").value=p.role;
  document.getElementById("playerSpecialty").value=p.specialty;
}
function updateLinks() {
  document.getElementById("waLink").href=TEAM_CONFIG.whatsapp;
  document.getElementById("igLink").href=TEAM_CONFIG.instagram;
  document.getElementById("ttLink").href=TEAM_CONFIG.tiktok;
}
document.getElementById("year").textContent=new Date().getFullYear();
renderRoster();renderTournaments();renderStandings();renderMatches();updateLinks();

// Mobile navigation
const menuToggle=document.getElementById("menuToggle"), nav=document.getElementById("nav");
menuToggle.addEventListener("click",()=>{nav.classList.toggle("open");menuToggle.textContent=nav.classList.contains("open")?"✕":"☰";});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuToggle.textContent="☰";}));

// Demo admin only. Client-side credentials are visible in JavaScript and are NOT secure authentication.
const DEMO_USER="admin", DEMO_PASS="coc97demo";
const loginBox=document.getElementById("loginBox"), dashboard=document.getElementById("adminDashboard"), loginMessage=document.getElementById("loginMessage");
document.getElementById("loginForm").addEventListener("submit",(e)=>{
  e.preventDefault();
  const user=document.getElementById("username").value.trim();
  const pass=document.getElementById("password").value;
  if(user===DEMO_USER && pass===DEMO_PASS){
    loginBox.classList.add("hidden");dashboard.classList.remove("hidden");loginMessage.textContent="";
    fillPlayerSelect();
  }else{loginMessage.textContent="Username atau password salah. Coba lagi.";}
});
document.getElementById("logoutButton").addEventListener("click",()=>{dashboard.classList.add("hidden");loginBox.classList.remove("hidden");document.getElementById("loginForm").reset();});
document.getElementById("playerSelect").addEventListener("change",loadSelectedPlayer);
document.getElementById("playerForm").addEventListener("submit",(e)=>{
  e.preventDefault();const i=Number(document.getElementById("playerSelect").value);
  players[i]={...players[i],nickname:document.getElementById("playerNickname").value.trim(),role:document.getElementById("playerRole").value,specialty:document.getElementById("playerSpecialty").value.trim(),initial:document.getElementById("playerNickname").value.trim().slice(0,2).toUpperCase()};
  saveStore("coc97_players",players);renderRoster();fillPlayerSelect();document.getElementById("playerSelect").value=String(i);loadSelectedPlayer();alert("Data pemain tersimpan di browser ini.");
});
document.getElementById("tournamentForm").addEventListener("submit",(e)=>{
  e.preventDefault();tournaments.unshift({name:document.getElementById("tourName").value.trim(),status:document.getElementById("tourStatus").value,result:document.getElementById("tourResult").value.trim()});
  saveStore("coc97_tournaments",tournaments);renderTournaments();e.target.reset();alert("Turnamen ditambahkan di browser ini.");
});
document.getElementById("applyButton").addEventListener("click",(e)=>{
  if(TEAM_CONFIG.whatsapp.includes("6280000000000")){e.preventDefault();alert("Nomor admin belum diatur. Ganti TEAM_CONFIG.whatsapp di script.js.");}
  else{e.preventDefault();window.open(TEAM_CONFIG.whatsapp,"_blank","noopener");}
});
const backTop=document.getElementById("backTop");
window.addEventListener("scroll",()=>backTop.classList.toggle("visible",window.scrollY>450));
backTop.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
