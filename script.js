const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('.side-nav a')];

const setActive = () => {
  const marker = window.scrollY + window.innerHeight * 0.32;
  let current = sections[0]?.id;

  for (const section of sections) {
    if (section.offsetTop <= marker) current = section.id;
  }

  links.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${current}`;
    link.classList.toggle('active', isActive);
    if (isActive) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
};

window.addEventListener('scroll', setActive, { passive: true });
window.addEventListener('resize', setActive, { passive: true });
window.addEventListener('load', setActive);
