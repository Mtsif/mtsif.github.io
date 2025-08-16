// Render publications from JSON into <ol id="pub-list">
(async function () {
  const TARGET = document.getElementById('pub-list');
  if (!TARGET) return;

  try {
    const res = await fetch('assets/data/pubs.json', { cache: 'no-store' });
    const data = await res.json();

    const me = /Tsifintaris\s*M/i; // bold your name in author lists
    const pubs = (data.publications || []).slice()
      .sort((a, b) => (b.year || 0) - (a.year || 0));

    const frag = document.createDocumentFragment();

    pubs.forEach((p) => {
      const li = document.createElement('li');

      const title = document.createElement('div');
      title.className = 'pub-title';
      title.textContent = p.title;
      // if (p.url) {
      //   const a = document.createElement('a');
      //   a.href = p.url;
      //   a.target = '_blank';
      //   a.rel = 'noopener';
      //   a.textContent = p.title;
      //   title.appendChild(a);
      // } else {
      //   title.textContent = p.title;
      // }

      const meta = document.createElement('div');
      meta.className = 'pub-meta';
      const authors = (p.authors || '').replace(me, '<strong>$&</strong>');
      const volIssue = [p.volume, p.issue ? `(${p.issue})` : ''].join('');
      const pages = p.pages ? `:${p.pages}` : '';
      const journalLine = `<em>${p.journal}</em>. ${p.year}${volIssue ? ';' + volIssue : ''}${pages}`;

      const quartileBadge = p.quartile
        ? ` <span class="badge rounded-pill ${p.quartile === 'Q1' ? 'bg-accent' : 'bg-accent-2'}">${p.quartile}</span>`
        : '';

      const doiLink = p.doi
      ? ` <a href="https://doi.org/${p.doi}" target="_blank" rel="noopener" class="doi-button">DOI</a>`
      : '';

      meta.innerHTML = `${authors}. ${journalLine}.${quartileBadge}${doiLink}`;

      li.appendChild(title);
      li.appendChild(meta);
      frag.appendChild(li);
    });

    TARGET.innerHTML = '';
    TARGET.appendChild(frag);
  } catch (err) {
    TARGET.innerHTML = `<li class="text-muted">Couldn’t load publications. Please check <code>assets/data/pubs.json</code>.</li>`;
    console.error('Publications load error:', err);
  }
})();

