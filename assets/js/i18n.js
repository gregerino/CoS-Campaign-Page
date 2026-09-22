const TRANSLATIONS = {
  en: {
    "nav.home": "Home",
    "nav.sessions": "Session Log",
    "nav.npcs": "NPCs",
    "nav.locations": "Locations",
    "nav.quests": "Quests",
    "nav.factions": "Factions",
    "home.subtitle": "",
    "home.title": "Curse of Strahd",
    "home.intro": "The mists have closed behind you. The chronicle of Barovia is yet to be written.",
    "home.objective": "Current Objective",
    "home.objective.text": "—",
    "home.party": "The Party",
    "home.latest": "Latest Entry",
    "home.readmore": "Read Full Session Log",
    "home.footer": "A campaign chronicle from the Domains of Dread, Barovia",
    "sessions.title": "Session Log",
    "sessions.subtitle": "A journal of our days beneath the mists of Barovia",
    "sessions.search": "Search sessions...",
    "cat.where": "Where Did We Go?",
    "cat.who": "Who Did We Meet?",
    "cat.what": "What Did We Do?",
    "cat.learned": "What Did We Find or Learn?",
    "cat.goal": "Next Goal",
    "npcs.title": "NPC Directory",
    "npcs.subtitle": "Souls we have encountered on our journey",
    "npcs.search": "Search by name or location...",
    "npcs.overview": "Appearance",
    "npcs.locations": "Locations",
    "npcs.firstsession": "First appeared: Session",
    "loc.title": "Discovered Locations",
    "loc.subtitle": "Places marked upon our map of Barovia",
    "loc.search": "Search locations...",
    "factions.title": "Factions",
    "factions.subtitle": "Powers that stir in the shadow of Castle Ravenloft",
    "factions.members": "Members",
    "factions.contacts": "Known Contacts",
    "goals.title": "Quest Board",
    "goals.subtitle": "",
    "goals.active": "Active Quests",
    "goals.completed": "Completed Quests",
    "goals.from": "From Session",
    "empty.party": "No souls have yet entered Barovia.",
    "empty.latest": "No entries yet. The first page awaits.",
    "empty.sessions": "No sessions have been recorded yet.",
    "empty.npcs": "No one has been met in the mists yet.",
    "empty.locations": "No places have been discovered yet.",
    "empty.factions": "No factions have revealed themselves yet.",
    "empty.quests": "No quests yet.",
  },
  sv: {
    "nav.home": "Hem",
    "nav.sessions": "Sessionslogg",
    "nav.npcs": "NPCer",
    "nav.locations": "Platser",
    "nav.quests": "Uppdrag",
    "nav.factions": "Organisationer",
    "home.subtitle": "",
    "home.title": "Curse of Strahd",
    "home.intro": "Dimman har slutit sig bakom er. Krönikan om Barovia är ännu oskriven.",
    "home.objective": "Nuvarande mål",
    "home.objective.text": "—",
    "home.party": "Sällskapet",
    "home.latest": "Senaste anteckning",
    "home.readmore": "Läs hela sessionsloggen",
    "home.footer": "En kampanjkrönika från Domains of Dread, Barovia",
    "sessions.title": "Sessionslogg",
    "sessions.subtitle": "En dagbok från våra dagar under Barovias dimmor",
    "sessions.search": "Sök i sessioner...",
    "cat.where": "Vart gick vi?",
    "cat.who": "Vilka träffade vi?",
    "cat.what": "Vad gjorde vi?",
    "cat.learned": "Vad hittade eller lärde vi oss?",
    "cat.goal": "Nästa mål",
    "npcs.title": "NPC-katalog",
    "npcs.subtitle": "Själar vi mött på vår resa",
    "npcs.search": "Sök på namn eller plats...",
    "npcs.overview": "Utseende",
    "npcs.locations": "Platser",
    "npcs.firstsession": "Dök upp första gången: Session",
    "loc.title": "Upptäckta platser",
    "loc.subtitle": "Platser markerade på vår karta över Barovia",
    "loc.search": "Sök platser...",
    "factions.title": "Organisationer",
    "factions.subtitle": "Makter som rör sig i skuggan av Castle Ravenloft",
    "factions.members": "Medlemmar",
    "factions.contacts": "Kända kontakter",
    "goals.title": "Uppdragstavla",
    "goals.subtitle": "",
    "goals.active": "Aktiva uppdrag",
    "goals.completed": "Avklarade uppdrag",
    "goals.from": "Från session",
    "empty.party": "Inga själar har ännu trätt in i Barovia.",
    "empty.latest": "Inga anteckningar ännu. Första sidan väntar.",
    "empty.sessions": "Inga sessioner har skrivits ned ännu.",
    "empty.npcs": "Ingen har mötts i dimman ännu.",
    "empty.locations": "Inga platser har upptäckts ännu.",
    "empty.factions": "Inga organisationer har visat sig ännu.",
    "empty.quests": "Inga uppdrag ännu.",
  }
};

function getNpcAppearance(npcName) {
  const lang = getLang();
  if (lang === 'sv') {
    const npc = (CAMPAIGN.npcs || []).find(n => n.name === npcName);
    if (npc && npc.appearanceSv) return npc.appearanceSv;
  }
  return null;
}

function getLocationEvents(locationName) {
  const lang = getLang();
  if (lang === 'sv') {
    const loc = (CAMPAIGN.locations || []).find(l => l.name === locationName);
    if (loc && loc.eventsSv) return loc.eventsSv;
  }
  return null;
}

function getLang() {
  return localStorage.getItem('campaign-lang') || 'en';
}

function setLang(lang) {
  localStorage.setItem('campaign-lang', lang);
  applyLang(lang);
}

function t(key) {
  const lang = getLang();
  return TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en']?.[key] || key;
}

function getSessionText(sessionId) {
  const lang = getLang();
  const session = (CAMPAIGN.sessions || []).find(s => s.id === sessionId);
  if (!session) return null;
  const recap = lang === 'sv' ? session.recap_sv : session.recap_en;
  return recap ? { recap } : null;
}

function getGoalText(goalId) {
  const lang = getLang();
  if (lang === 'sv') {
    const goal = (CAMPAIGN.goals || []).find(g => g.id === goalId);
    if (goal && goal.textSv) return goal.textSv;
  }
  return null;
}

function applyLang(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const text = TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en']?.[key];
    if (text) el.textContent = text;
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    const text = TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en']?.[key];
    if (text) el.placeholder = text;
  });

  const toggle = document.querySelector('.lang-toggle');
  if (toggle) {
    toggle.textContent = lang === 'en' ? 'SV' : 'EN';
    toggle.title = lang === 'en' ? 'Byt till svenska' : 'Switch to English';
  }

  document.documentElement.lang = lang === 'sv' ? 'sv' : 'en';
  window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

function initI18n() {
  const lang = getLang();
  applyLang(lang);

  document.querySelectorAll('.lang-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = getLang();
      setLang(current === 'en' ? 'sv' : 'en');
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initI18n);
} else {
  initI18n();
}
