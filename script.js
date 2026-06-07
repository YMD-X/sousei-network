(() => {
  'use strict';

  const souseiServices = [
    { key: 'web', label: 'WEB', color: 'var(--sousei-web)', icon: 'web' },
    { key: 'youtube', label: 'YouTube', color: 'var(--sousei-youtube)', icon: 'youtube' },
    { key: 'instagram', label: 'Instagram', color: 'var(--sousei-instagram)', icon: 'instagram' },
    { key: 'x', label: 'X', color: 'var(--sousei-x)', icon: 'x' },
    { key: 'facebook', label: 'Facebook', color: 'var(--sousei-facebook)', icon: 'facebook' },
  ];

  const souseiGroups = [
    {
      name: '秋田県曹洞宗青年会',
      imageTheme: 'woodwork',
      urls: {
        web: 'https://example.com/akita/',
        youtube: 'https://www.youtube.com/@akita-sousei',
        facebook: 'https://www.facebook.com/akita.sousei',
      },
    },
    {
      name: '青森県曹洞宗青年会',
      imageTheme: 'ceremony',
      urls: {
        web: 'https://example.com/aomori/',
        youtube: 'https://www.youtube.com/@aomori-sousei',
        x: 'https://x.com/aomori_sousei',
      },
    },
    {
      name: '宮城県曹洞宗青年会',
      imageTheme: 'zazen',
      urls: {
        web: 'https://example.com/miyagi/',
        youtube: 'https://www.youtube.com/@miyagi-sousei',
        instagram: 'https://www.instagram.com/miyagi_sousei/',
        x: 'https://x.com/miyagi_sousei',
        facebook: 'https://www.facebook.com/miyagi.sousei',
      },
    },
    {
      name: '山形県曹洞宗青年会',
      imageTheme: 'temple',
      urls: {
        web: 'https://example.com/yamagata/',
        instagram: 'https://www.instagram.com/yamagata_sousei/',
        facebook: 'https://www.facebook.com/yamagata.sousei',
      },
    },
    {
      name: '岩手県曹洞宗青年会',
      imageTheme: 'sutra',
      urls: {
        web: 'https://example.com/iwate/',
        youtube: 'https://www.youtube.com/@iwate-sousei',
      },
    },
    {
      name: '福島県曹洞宗青年会',
      imageTheme: 'meeting',
      urls: {
        web: 'https://example.com/fukushima/',
        x: 'https://x.com/fukushima_sousei',
        facebook: 'https://www.facebook.com/fukushima.sousei',
      },
    },
    {
      name: '東京都曹洞宗青年会',
      imageTheme: 'city',
      urls: {
        web: 'https://example.com/tokyo/',
        youtube: 'https://www.youtube.com/@tokyo-sousei',
        instagram: 'https://www.instagram.com/tokyo_sousei/',
        x: 'https://x.com/tokyo_sousei',
      },
    },
    {
      name: '長野県曹洞宗青年会',
      imageTheme: 'mountain',
      urls: {
        web: 'https://example.com/nagano/',
        instagram: 'https://www.instagram.com/nagano_sousei/',
      },
    },
    {
      name: '全国曹洞宗青年会',
      imageTheme: 'network',
      urls: {
        web: 'https://example.com/zenkoku/',
        youtube: 'https://www.youtube.com/@zenkoku-sousei',
        instagram: 'https://www.instagram.com/zenkoku_sousei/',
        x: 'https://x.com/zenkoku_sousei',
        facebook: 'https://www.facebook.com/zenkoku.sousei',
      },
    },
  ];

  const souseiIconPaths = {
    web: '<circle cx="12" cy="12" r="9" fill="none" stroke-width="1.8"/><path d="M3.6 12h16.8M12 3.2c2.7 2.6 4 5.5 4 8.8s-1.3 6.2-4 8.8c-2.7-2.6-4-5.5-4-8.8s1.3-6.2 4-8.8Z" fill="none" stroke-width="1.8"/>',
    youtube: '<rect x="2.8" y="6.4" width="18.4" height="11.2" rx="3" stroke="none"/><path d="m10.2 9.1 5.3 2.9-5.3 2.9Z" fill="#fff" stroke="none"/>',
    instagram: '<rect x="4.1" y="4.1" width="15.8" height="15.8" rx="4.3" fill="none" stroke-width="2"/><circle cx="12" cy="12" r="3.7" fill="none" stroke-width="2"/><circle cx="16.8" cy="7.2" r="1.2" stroke="none"/>',
    x: '<path d="M4 4h3.9l4.8 6.1L17.8 4H20l-6.2 7.4L20.7 20h-4l-5.2-6.6L6 20H3.8l6.6-7.9L4 4Zm3 1.7 10.4 12.6h1.2L8.2 5.7H7Z" stroke="none"/>',
    facebook: '<path d="M20.5 12a8.5 8.5 0 1 0-9.8 8.4v-5.9H8.6V12h2.1v-1.9c0-2.1 1.2-3.2 3.1-3.2.9 0 1.9.2 1.9.2v2.1h-1.1c-1 0-1.4.7-1.4 1.3V12h2.4l-.4 2.5h-2v5.9A8.5 8.5 0 0 0 20.5 12Z" stroke="none"/>',
  };

  let souseiActiveService = souseiServices[0].key;

  const souseiTabs = document.getElementById('sousei-tabs');
  const souseiGrid = document.getElementById('sousei-card-grid');
  const souseiCount = document.getElementById('sousei-count');

  const souseiCreateIcon = (serviceKey, extraClass = '') => {
    const service = souseiServices.find((item) => item.key === serviceKey);
    const span = document.createElement('span');
    span.className = `sousei-icon ${extraClass}`.trim();
    span.dataset.service = serviceKey;
    span.setAttribute('aria-label', service ? service.label : serviceKey);
    span.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${souseiIconPaths[serviceKey]}</svg>`;
    return span;
  };


  const souseiCreateIconLink = (service, url, groupName) => {
    const link = document.createElement('a');
    link.className = 'sousei-card__icon-link';
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', `${groupName} の ${service.label} を開く`);
    link.appendChild(souseiCreateIcon(service.key));
    return link;
  };

  const souseiThumb = (theme, name) => {
    const palettes = {
      woodwork: ['#8f7141', '#d8c076', '#f5edcc', '#40291a'],
      ceremony: ['#402262', '#d8b640', '#c7a05a', '#231916'],
      zazen: ['#92745a', '#d8c495', '#526f43', '#f2ede1'],
      temple: ['#6f352a', '#c9a35a', '#e7dec6', '#2c3d34'],
      sutra: ['#bfa76a', '#eee1bc', '#6c5230', '#2a211d'],
      meeting: ['#72563d', '#c8b58e', '#ffffff', '#2f4d65'],
      city: ['#5d6470', '#d9d1bd', '#8f3d2f', '#26364a'],
      mountain: ['#536f47', '#c5b36f', '#dfe7ef', '#333b2e'],
      network: ['#d6b855', '#fff4cc', '#594230', '#2f7c56'],
    };
    const [a, b, c, d] = palettes[theme] || palettes.temple;
    const label = name.replace('曹洞宗青年会', '');
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360">
        <defs>
          <linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="${c}"/><stop offset=".62" stop-color="${b}"/><stop offset="1" stop-color="${a}"/></linearGradient>
          <filter id="s" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="8" stdDeviation="9" flood-opacity=".24"/></filter>
        </defs>
        <rect width="640" height="360" fill="url(#g)"/>
        <path d="M0 258 C115 210 185 301 311 247 C442 190 505 244 640 202 L640 360 L0 360Z" fill="${a}" opacity=".34"/>
        <g filter="url(#s)">
          <rect x="70" y="60" width="500" height="210" rx="8" fill="${c}" opacity=".38"/>
          <path d="M104 254h432v-94H104Zm42-111h348L320 68Z" fill="${d}" opacity=".78"/>
          <rect x="165" y="160" width="54" height="94" fill="${b}"/><rect x="293" y="160" width="54" height="94" fill="${b}"/><rect x="421" y="160" width="54" height="94" fill="${b}"/>
        </g>
        <g opacity=".9">
          <circle cx="176" cy="286" r="20" fill="${d}"/><circle cx="248" cy="286" r="20" fill="${d}"/><circle cx="392" cy="286" r="20" fill="${d}"/><circle cx="464" cy="286" r="20" fill="${d}"/>
          <rect x="158" y="306" width="36" height="30" fill="${d}"/><rect x="230" y="306" width="36" height="30" fill="${d}"/><rect x="374" y="306" width="36" height="30" fill="${d}"/><rect x="446" y="306" width="36" height="30" fill="${d}"/>
        </g>
        <text x="320" y="326" text-anchor="middle" font-family="Noto Sans JP, sans-serif" font-size="28" font-weight="800" fill="#fff" opacity=".88">${label}</text>
      </svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  };

  const souseiRenderTabs = () => {
    souseiTabs.innerHTML = '';
    souseiServices.forEach((service) => {
      const tab = document.createElement('button');
      const isActive = service.key === souseiActiveService;
      tab.type = 'button';
      tab.className = `sousei-tab${isActive ? ' is-active' : ''}`;
      tab.dataset.service = service.key;
      tab.style.setProperty('--sousei-service-color', service.color);
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', String(isActive));
      tab.innerHTML = `<span>${service.label}</span>`;
      tab.appendChild(souseiCreateIcon(service.key, 'sousei-tab__icon'));
      tab.addEventListener('click', () => {
        souseiActiveService = service.key;
        souseiRender();
      });
      souseiTabs.appendChild(tab);
    });
  };

  const souseiRenderCards = () => {
    const activeService = souseiServices.find((item) => item.key === souseiActiveService);
    const filteredGroups = souseiGroups.filter((group) => Boolean(group.urls[souseiActiveService]));
    souseiGrid.innerHTML = '';
    souseiCount.textContent = `${activeService.label} URLあり：${filteredGroups.length}件`;

    if (!filteredGroups.length) {
      const empty = document.createElement('p');
      empty.className = 'sousei-empty';
      empty.textContent = 'このサービスURLを持つ青年会はまだありません。';
      souseiGrid.appendChild(empty);
      return;
    }

    filteredGroups.forEach((group) => {
      const card = document.createElement('article');
      card.className = 'sousei-card';
      card.style.setProperty('--sousei-active-color', activeService.color);

      const thumbLink = document.createElement('a');
      thumbLink.className = 'sousei-card__media';
      thumbLink.href = group.urls[souseiActiveService];
      thumbLink.target = '_blank';
      thumbLink.rel = 'noopener noreferrer';
      thumbLink.setAttribute('aria-label', `${group.name} の ${activeService.label} を開く`);
      thumbLink.innerHTML = `<img src="${souseiThumb(group.imageTheme, group.name)}" alt="${group.name}のサムネイル" loading="lazy">`;

      const body = document.createElement('div');
      body.className = 'sousei-card__body';

      const title = document.createElement('h2');
      title.className = 'sousei-card__title';
      title.textContent = group.name;

      const iconList = document.createElement('div');
      iconList.className = 'sousei-card__icons';
      souseiServices
        .filter((service) => Boolean(group.urls[service.key]))
        .forEach((service) => {
          iconList.appendChild(souseiCreateIconLink(service, group.urls[service.key], group.name));
        });

      body.append(title, iconList);
      card.append(thumbLink, body);
      souseiGrid.appendChild(card);
    });
  };

  const souseiRender = () => {
    souseiRenderTabs();
    souseiRenderCards();
  };

  souseiRender();
})();
