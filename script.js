const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('.side-nav a')];
const sideNav = document.querySelector('.side-nav');
const mobileNav = window.matchMedia('(max-width: 760px)');

let lastActiveId = null;

const keepActiveMenuItemVisible = (activeLink) => {
  if (!mobileNav.matches || !sideNav || !activeLink) return;

  const navRect = sideNav.getBoundingClientRect();
  const linkRect = activeLink.getBoundingClientRect();
  const currentLeft = sideNav.scrollLeft;

  // Move only the horizontal menu. The active section stays near the center,
  // so the neighboring options remain visible and make the menu feel scrollable.
  const targetLeft = currentLeft
    + (linkRect.left - navRect.left)
    - (navRect.width - linkRect.width) / 2;

  const maxScroll = Math.max(0, sideNav.scrollWidth - sideNav.clientWidth);
  const clampedLeft = Math.max(0, Math.min(targetLeft, maxScroll));

  sideNav.scrollTo({
    left: clampedLeft,
    behavior: 'smooth'
  });
};

const setActive = () => {
  const marker = window.scrollY + window.innerHeight * 0.32;
  let current = sections[0]?.id;

  for (const section of sections) {
    if (section.offsetTop <= marker) current = section.id;
  }

  let activeLink = null;

  links.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${current}`;
    link.classList.toggle('active', isActive);

    if (isActive) {
      link.setAttribute('aria-current', 'page');
      activeLink = link;
    } else {
      link.removeAttribute('aria-current');
    }
  });

  if (current && current !== lastActiveId) {
    keepActiveMenuItemVisible(activeLink);
    lastActiveId = current;
  }
};

const resetMobileMenuPosition = () => {
  if (!mobileNav.matches && sideNav) sideNav.scrollLeft = 0;
  lastActiveId = null;
  setActive();
};

window.addEventListener('scroll', setActive, { passive: true });
window.addEventListener('resize', setActive, { passive: true });
window.addEventListener('load', setActive);

if (mobileNav.addEventListener) {
  mobileNav.addEventListener('change', resetMobileMenuPosition);
} else if (mobileNav.addListener) {
  mobileNav.addListener(resetMobileMenuPosition);
}
