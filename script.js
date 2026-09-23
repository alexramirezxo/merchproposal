const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('.side-nav a')];

const setActive = () => {
  const y = window.scrollY + window.innerHeight * 0.35;
  let current = sections[0]?.id;
  for (const section of sections) {
    if (section.offsetTop <= y) current = section.id;
  }
  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};

window.addEventListener('scroll', setActive, { passive: true });
window.addEventListener('load', setActive);
