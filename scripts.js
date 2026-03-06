const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  reveals.forEach(r => observer.observe(r));

  const root = document.documentElement;
  const banner = document.querySelector('.top-banner');
  const nav = document.querySelector('nav');

  const syncFixedHeaderOffset = () => {
    const bannerHeight = banner ? Math.ceil(banner.getBoundingClientRect().height) : 0;
    root.style.setProperty('--banner-height', `${bannerHeight}px`);

    if (nav) {
      nav.style.top = `${bannerHeight}px`;
      const navHeight = Math.ceil(nav.getBoundingClientRect().height);
      root.style.setProperty('--nav-height', `${navHeight}px`);
      root.style.setProperty('--header-offset', `${bannerHeight + navHeight}px`);
    } else {
      root.style.setProperty('--nav-height', '0px');
      root.style.setProperty('--header-offset', `${bannerHeight}px`);
    }
  };

  syncFixedHeaderOffset();
  window.addEventListener('load', syncFixedHeaderOffset);
  window.addEventListener('resize', syncFixedHeaderOffset);
  window.addEventListener('orientationchange', syncFixedHeaderOffset);

  if (window.ResizeObserver) {
    const headerResizeObserver = new ResizeObserver(syncFixedHeaderOffset);
    if (banner) headerResizeObserver.observe(banner);
    if (nav) headerResizeObserver.observe(nav);
  }