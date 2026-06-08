(() => {
  'use strict';

  const souseiServices = [
    { key: 'web', label: 'WEB', color: 'var(--sousei-web)', icon: 'web' },
    { key: 'youtube', label: 'YouTube', color: 'var(--sousei-youtube)', icon: 'youtube' },
    { key: 'instagram', label: 'Instagram', color: 'var(--sousei-instagram)', icon: 'instagram' },
    { key: 'x', label: 'X', color: 'var(--sousei-x)', icon: 'x' },
    { key: 'facebook', label: 'Facebook', color: 'var(--sousei-facebook)', icon: 'facebook' },
  ];

  const souseiGroupOrderList = [
    '曹洞宗北海道第一宗務所青年会',
    '曹洞宗北海道第二宗務所青年会',
    '曹洞宗北海道第三宗務所青年会',
    '青森県曹洞宗青年会',
    '岩手県曹洞宗青年会',
    '宮城県曹洞宗青年会',
    '秋田県曹洞宗青年会',
    '山形曹洞宗青年会',
    '曹洞宗山形県第三宗務所青年会',
    '曹洞宗福島県青年会',
    '茨城県曹洞宗青年会',
    '曹洞宗埼玉県第二宗務所青年会',
    '千葉県曹洞宗青年会',
    '新潟県曹洞宗青年会',
    '曹洞宗石川県青年会',
    '福井県曹洞宗青年会',
    '曹洞宗山梨県青年会',
    '曹洞宗長野県第一青年会',
    '曹洞宗長野県第二宗務所青年会',
    '曹洞宗岐阜県青年会',
    '曹洞宗静岡県第一宗務所青年会',
    '伊豆曹洞宗青年会',
    '静岡第三同志会',
    '静岡第四曹青・照自会',
    '愛知県第一曹洞宗青年会',
    '東三河曹洞宗青年会',
    '曹洞宗愛知県第三宗務所青年会',
    '三重県曹洞宗青年会',
    '三重県第二曹洞宗青年会',
    '滋賀県曹洞宗青年会',
    '京都曹洞宗青年会',
    '大阪曹洞宗青年会',
    '曹洞宗兵庫県第二宗務所青年会',
    '奈良県曹洞宗青年会',
    '和歌山県曹洞宗青年会',
    '曹洞宗鳥取県青年会',
    '石見曹洞宗青年会',
    'いずも曹洞宗青年会',
    '岡山県曹洞宗青年会',
    '広島県曹洞宗青年会',
    '山口県曹洞宗青年会',
    '四国地区曹洞宗青年会',
    '福岡県曹洞宗青年会',
    '佐賀県曹洞宗青年会',
    '長崎県曹洞宗青年会',
    '熊本県曹洞宗青年会',
    '大分県曹洞宗青年会',
    '宮崎県曹洞宗青年会',
    '鹿児島県曹洞宗青年会',
  ];

  const souseiGroupOrderMap = new Map(
    souseiGroupOrderList.map((name, index) => [name, index]),
  );

  const souseiImageThemes = [
    'woodwork',
    'ceremony',
    'zazen',
    'temple',
    'sutra',
    'meeting',
    'city',
    'mountain',
    'network',
  ];

  const souseiSlug = (name, index) => `group-${String(index + 1).padStart(2, '0')}`;

  const souseiCreateDemoUrls = (name, index) => {
    const slug = souseiSlug(name, index);
    const urls = {
      web: `https://example.com/${slug}/`,
    };

    if (index % 2 === 0) {
      urls.youtube = `https://www.youtube.com/@sousei-${slug}`;
    }

    if (index % 3 === 0) {
      urls.instagram = `https://www.instagram.com/sousei_${slug.replaceAll('-', '_')}/`;
    }

    if (index % 4 === 0) {
      urls.x = `https://x.com/sousei_${slug.replaceAll('-', '_')}`;
    }

    if (index % 5 === 0) {
      urls.facebook = `https://www.facebook.com/sousei.${slug}`;
    }

    return urls;
  };

  const souseiGroups = souseiGroupOrderList.map((name, index) => ({
    name,
    imageTheme: souseiImageThemes[index % souseiImageThemes.length],
    urls: souseiCreateDemoUrls(name, index),
  }));

  const souseiCompareGroupsByFixedOrder = (groupA, groupB) => {
    const fallbackOrder = souseiGroupOrderList.length;
    const orderA = souseiGroupOrderMap.has(groupA.name)
      ? souseiGroupOrderMap.get(groupA.name)
      : fallbackOrder;
    const orderB = souseiGroupOrderMap.has(groupB.name)
      ? souseiGroupOrderMap.get(groupB.name)
      : fallbackOrder;

    if (orderA !== orderB) {
      return orderA - orderB;
    }

    return souseiGroups.indexOf(groupA) - souseiGroups.indexOf(groupB);
  };

  const souseiIconPaths = {
    web: '<circle cx="12" cy="12" r="9" fill="none" stroke-width="1.8"/><path d="M3.6 12h16.8M12 3.2c2.7 2.6 4 5.5 4 8.8s-1.3 6.2-4 8.8c-2.7-2.6-4-5.5-4-8.8s1.3-6.2 4-8.8Z" fill="none" stroke-width="1.8"/>',
    youtube: '<rect x="2.8" y="6.4" width="18.4" height="11.2" rx="3" stroke="none"/><path d="m10.2 9.1 5.3 2.9-5.3 2.9Z" fill="#fff" stroke="none"/>',
    instagram: '<rect x="4.1" y="4.1" width="15.8" height="15.8" rx="4.3" fill="none" stroke-width="2"/><circle cx="12" cy="12" r="3.7" fill="none" stroke-width="2"/><circle cx="16.8" cy="7.2" r="1.2" stroke="none"/>',
    x: '<path d="M4 4h3.9l4.8 6.1L17.8 4H20l-6.2 7.4L20.7 20h-4l-5.2-6.6L6 20H3.8l6.6-7.9L4 4Zm3 1.7 10.4 12.6h1.2L8.2 5.7H7Z" stroke="none"/>',
    facebook: '<path d="M20.5 12a8.5 8.5 0 1 0-9.8 8.4v-5.9H8.6V12h2.1v-1.9c0-2.1 1.2-3.2 3.1-3.2.9 0 1.9.2 1.9.2v2.1h-1.1c-1 0-1.4.7-1.4 1.3V12h2.4l-.4 2.5h-2v5.9A8.5 8.5 0 0 0 20.5 12Z" stroke="none"/>',
  };

  let souseiActiveService = souseiServices[0].key;

  const souseiTabsFrame = document.querySelector('.sousei-tabs');
  const souseiTabs = document.getElementById('sousei-tabs');
  const souseiGrid = document.getElementById('sousei-card-grid');
  const souseiCount = document.getElementById('sousei-count');


  const souseiUpdateTabScrollIndicators = () => {
    if (!souseiTabsFrame) {
      return;
    }

    const maxScrollLeft = souseiTabs.scrollWidth - souseiTabs.clientWidth;
    const canScroll = maxScrollLeft > 1;
    souseiTabsFrame.classList.toggle('has-scroll-left', canScroll && souseiTabs.scrollLeft > 1);
    souseiTabsFrame.classList.toggle(
      'has-scroll-right',
      canScroll && souseiTabs.scrollLeft < maxScrollLeft - 1,
    );
  };

  const souseiCreateIcon = (serviceKey, extraClass = '') => {
    const service = souseiServices.find((item) => item.key === serviceKey);
    const span = document.createElement('span');
    span.className = `sousei-icon ${extraClass}`.trim();
    span.dataset.service = serviceKey;
    span.setAttribute('aria-label', service ? service.label : serviceKey);
    span.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${souseiIconPaths[serviceKey]}</svg>`;
    return span;
  };


  const souseiCreateIconLink = (service, url, groupName, isCurrent = false) => {
    const link = document.createElement('a');
    link.className = `sousei-card__icon-link${isCurrent ? ' is-current' : ''}`;
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', `${groupName} の ${service.label} を開く`);
    link.appendChild(souseiCreateIcon(service.key));
    return link;
  };

  const souseiThumb = (theme, name) => {
    const themeOffset = souseiImageThemes.indexOf(theme) * 23;
    const seed = [...name].reduce(
      (hash, character) => hash + character.codePointAt(0),
      themeOffset,
    );
    const hueA = seed % 360;
    const hueB = (hueA + 48 + (seed % 80)) % 360;
    const hueC = (hueA + 162 + (seed % 44)) % 360;
    const colorA = `hsl(${hueA} 78% 62%)`;
    const colorB = `hsl(${hueB} 72% 56%)`;
    const colorC = `hsl(${hueC} 68% 42%)`;
    const colorD = `hsl(${(hueA + 228) % 360} 70% 72%)`;
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360">
        <defs>
          <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
            <stop stop-color="${colorA}"/>
            <stop offset=".52" stop-color="${colorB}"/>
            <stop offset="1" stop-color="${colorC}"/>
          </linearGradient>
          <radialGradient id="r" cx="26%" cy="22%" r="70%">
            <stop stop-color="${colorD}" stop-opacity=".88"/>
            <stop offset=".55" stop-color="${colorA}" stop-opacity=".25"/>
            <stop offset="1" stop-color="${colorC}" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="640" height="360" fill="url(#g)"/>
        <circle cx="118" cy="72" r="190" fill="url(#r)"/>
        <path d="M0 268 C118 204 208 324 342 246 C468 174 546 236 640 176 L640 360 L0 360Z" fill="#fff" opacity=".18"/>
        <path d="M-34 42 C124 104 210 -26 358 42 C470 94 548 48 674 6" fill="none" stroke="#fff" stroke-width="34" opacity=".14"/>
        <path d="M54 328 C184 274 254 344 376 302 C468 270 548 288 640 238" fill="none" stroke="#231916" stroke-width="42" opacity=".08"/>
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
      tab.id = `sousei-tab-${service.key}`;
      tab.style.setProperty('--sousei-service-color', service.color);
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', 'sousei-results');
      tab.setAttribute('aria-selected', String(isActive));
      tab.innerHTML = `<span>${service.label}</span>`;
      tab.appendChild(souseiCreateIcon(service.key, 'sousei-tab__icon'));
      tab.addEventListener('click', () => {
        souseiActiveService = service.key;
        souseiRender();
      });
      souseiTabs.appendChild(tab);
    });
    requestAnimationFrame(souseiUpdateTabScrollIndicators);
  };

  const souseiRenderCards = () => {
    const activeService = souseiServices.find((item) => item.key === souseiActiveService);
    const filteredGroups = souseiGroups
      .filter((group) => Boolean(group.urls[souseiActiveService]))
      .sort(souseiCompareGroupsByFixedOrder);
    souseiGrid.innerHTML = '';
    souseiCount.textContent = `${activeService.label}：${filteredGroups.length}件`;

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
          iconList.appendChild(souseiCreateIconLink(
            service,
            group.urls[service.key],
            group.name,
            service.key === souseiActiveService,
          ));
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

  souseiTabs.addEventListener('scroll', souseiUpdateTabScrollIndicators, { passive: true });
  window.addEventListener('resize', souseiUpdateTabScrollIndicators);

  souseiRender();
})();
