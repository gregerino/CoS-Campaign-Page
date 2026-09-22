// ── Helpers shared by page scripts ──

// Renders one S1…Sn filter button per session in campaign.json
function renderSessionFilters(searchBar, dataAttr) {
  searchBar.querySelectorAll('.filter-btn').forEach(b => b.remove());
  (CAMPAIGN.sessions || []).forEach(s => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.setAttribute(dataAttr, s.id);
    btn.textContent = `S${s.id}`;
    searchBar.appendChild(btn);
  });
}

// Placeholder shown while a collection in campaign.json is still empty
function emptyState(key) {
  return `<div class="empty-state" data-i18n="${key}">${t(key)}</div>`;
}

document.addEventListener('DOMContentLoaded', () => {

  // ── Nav toggle (mobile) ──
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => links.classList.remove('open'))
    );
  }

  // ── Active nav link ──
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ── Scroll to top ──
  const scrollBtn = document.querySelector('.scroll-top');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('visible', window.scrollY > 400);
    });
    scrollBtn.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
  }

  // Session accordions are handled in sessions.html's renderSessions()

  // ── Search/Filter NPCs ──
  const npcSearch = document.getElementById('npc-search');
  if (npcSearch) {
    npcSearch.addEventListener('input', () => filterNPCs());
  }

  // Filter buttons are rendered from campaign.json, so listen via delegation
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-filter-session]');
    if (!btn) return;
    const wasActive = btn.classList.contains('active');
    document.querySelectorAll('[data-filter-session]').forEach(b => b.classList.remove('active'));
    if (!wasActive) btn.classList.add('active');
    filterNPCs();
  });

  function filterNPCs() {
    const query = (npcSearch?.value || '').toLowerCase();
    const activeFilter = document.querySelector('[data-filter-session].active');
    const sessionFilter = activeFilter ? parseInt(activeFilter.dataset.filterSession) : null;

    document.querySelectorAll('.npc-card').forEach(card => {
      const name = (card.dataset.name || '').toLowerCase();
      const location = (card.dataset.locations || '').toLowerCase();
      const sessions = (card.dataset.sessions || '').split(',').map(s => parseInt(s));

      const matchesQuery = !query || name.includes(query) || location.includes(query);
      const matchesSession = !sessionFilter || sessions.includes(sessionFilter);

      card.style.display = matchesQuery && matchesSession ? '' : 'none';
    });
  }

  // ── Search Sessions ──
  const sessionSearch = document.getElementById('session-search');
  if (sessionSearch) {
    sessionSearch.addEventListener('input', () => {
      const query = sessionSearch.value.toLowerCase();
      document.querySelectorAll('.session-entry').forEach(entry => {
        const text = entry.textContent.toLowerCase();
        entry.style.display = !query || text.includes(query) ? '' : 'none';
      });
    });
  }

  // ── Search & Filter Locations ──
  const locSearch = document.getElementById('location-search');
  if (locSearch) {
    locSearch.addEventListener('input', () => filterLocations());
  }

  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-filter-loc-session]');
    if (!btn) return;
    const wasActive = btn.classList.contains('active');
    document.querySelectorAll('[data-filter-loc-session]').forEach(b => b.classList.remove('active'));
    if (!wasActive) btn.classList.add('active');
    filterLocations();
  });

  function filterLocations() {
    const query = (locSearch?.value || '').toLowerCase();
    const activeFilter = document.querySelector('[data-filter-loc-session].active');
    const sessionFilter = activeFilter ? activeFilter.dataset.filterLocSession : null;

    document.querySelectorAll('.location-card').forEach(card => {
      const text = card.textContent.toLowerCase();
      const sessions = (card.dataset.sessions || '').split(',');

      const matchesQuery = !query || text.includes(query);
      const matchesSession = !sessionFilter || sessions.includes(sessionFilter);

      card.style.display = matchesQuery && matchesSession ? '' : 'none';
    });
  }

  // ── Intersection Observer for fade-in ──
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.observe-fade').forEach(el => observer.observe(el));
});
