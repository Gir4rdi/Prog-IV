/* ═══════════════════════════════════════════════════════════════════════════
   SUPERNATURAL WIKI — PREMIUM PORTFOLIO JAVASCRIPT
   Smooth interactions, animations, and immersive experience
   ═══════════════════════════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════════════════

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Debounce function for performance
const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

// ═══════════════════════════════════════════════════════════════════════════
// CUSTOM CURSOR
// ═══════════════════════════════════════════════════════════════════════════

const cursor = $('#cursor');
const cursorTrail = $('#cursorTrail');
let cursorX = 0, cursorY = 0;
let trailX = 0, trailY = 0;

if (window.matchMedia('(pointer: fine)').matches && cursor && cursorTrail) {
  document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
  });

  // Smooth cursor animation
  function animateCursor() {
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    trailX += (cursorX - trailX) * 0.15;
    trailY += (cursorY - trailY) * 0.15;
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top = trailY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effect on interactive elements
  const interactiveElements = $$('a, button, .character-card, .thumb');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// HEADER SCROLL EFFECT
// ═══════════════════════════════════════════════════════════════════════════

const header = $('#header');

const handleScroll = debounce(() => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, 10);

window.addEventListener('scroll', handleScroll, { passive: true });

// ═══════════════════════════════════════════════════════════════════════════
// MOBILE MENU
// ═══════════════════════════════════════════════════════════════════════════

const menuToggle = $('#menuToggle');
const mobileMenu = $('#mobileMenu');
const mobileLinks = $$('.mobile-link');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// THEME TOGGLE
// ═══════════════════════════════════════════════════════════════════════════

const themeToggle = $('#themeToggle');
const savedTheme = localStorage.getItem('supernaturalTheme');

if (savedTheme === 'light') {
  document.body.classList.add('light-mode');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('supernaturalTheme', isLight ? 'light' : 'dark');
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// HERO TYPING EFFECT
// ═══════════════════════════════════════════════════════════════════════════

const titleLine1 = $('#titleLine1');
const titleLine2 = $('#titleLine2');
const line1Text = 'A Jornada dos';
const line2Text = 'Winchester';

let line1Index = 0;
let line2Index = 0;

function typeLine1() {
  if (line1Index <= line1Text.length) {
    titleLine1.textContent = line1Text.slice(0, line1Index);
    line1Index++;
    setTimeout(typeLine1, 60);
  } else {
    setTimeout(typeLine2, 200);
  }
}

function typeLine2() {
  if (line2Index <= line2Text.length) {
    titleLine2.textContent = line2Text.slice(0, line2Index);
    line2Index++;
    setTimeout(typeLine2, 80);
  }
}

// Start typing after a short delay
setTimeout(typeLine1, 500);

// ═══════════════════════════════════════════════════════════════════════════
// COUNTER ANIMATION
// ═══════════════════════════════════════════════════════════════════════════

const statNumbers = $$('.stat-number');

function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (ease-out)
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (target - start) * easeOut);
    
    element.textContent = current;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target;
    }
  }
  
  requestAnimationFrame(update);
}

// Observe stats for animation trigger
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.count);
      animateCounter(entry.target, target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statsObserver.observe(stat));

// ═══════════════════════════════════════════════════════════════════════════
// SECTION REVEAL ANIMATION
// ═══════════════════════════════════════════════════════════════════════════

const sections = $$('.section');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '-50px' });

sections.forEach(section => sectionObserver.observe(section));

// ═══════════════════════════════════════════════════════════════════════════
// STORY MODE
// ═══════════════════════════════════════════════════════════════════════════

const storyData = {
  1: {
    chapter: 'Capitulo 1',
    title: 'Infancia dos Irmaos',
    text: 'Em 2 de novembro de 1983, a vida dos Winchester mudou para sempre. Mary Winchester foi morta por um demonio de olhos amarelos, deixando John com dois filhos pequenos: Dean, de 4 anos, e Sam, apenas um bebe. Naquela noite, John viu algo impossivel — e jurou vinganca. Ele criou os meninos na estrada, ensinando-os a cacar monstros enquanto procurava o responsavel pela morte de Mary.'
  },
  2: {
    chapter: 'Capitulo 2',
    title: 'A Caca aos Monstros',
    text: 'Anos depois, os irmaos Winchester percorrem os Estados Unidos em seu Impala 1967, investigando casos sobrenaturais. Fantasmas, vampiros, wendigos, demonios — nada escapa da mira dos cacadores. Dean vive para a cacada, enquanto Sam e arrastado de volta apos a morte de sua namorada Jessica. Juntos, eles seguem as coordenadas deixadas pelo pai desaparecido.'
  },
  3: {
    chapter: 'Capitulo 3',
    title: 'O Apocalipse',
    text: 'A guerra entre o Ceu e o Inferno finalmente eclode. Lucifer esta livre e precisa de um recipiente — Sam Winchester. Miguel, o arcanjo, escolheu Dean. Os irmaos sao as duas pecas-chave do Apocalipse, destinados a lutar um contra o outro. Com a ajuda de Castiel, um anjo que desafiou o Ceu por eles, Sam e Dean tentam o impossivel: impedir o fim do mundo.'
  },
  4: {
    chapter: 'Capitulo 4',
    title: 'Jack, o Nephilim',
    text: 'Jack Kline nao e uma crianca comum — ele e filho de Lucifer e Kelly Kline, um Nephilim com poderes que rivalizam com os de Deus. Nascido adulto, Jack busca entender seu lugar no mundo. Seria ele a arma definitiva contra as trevas, ou a maior ameaca que a existencia ja conheceu? A familia expandida dos Winchester enfrenta ameacas cosmicas e a luta para definir o que significa ser bom.'
  }
};

const storyTabs = $$('.story-tab');
const storyChapter = $('#storyChapter');
const storyTitle = $('#storyTitle');
const storyText = $('#storyText');
const progressFill = $('#progressFill');
const progressLabel = $('#progressLabel');

let currentAct = 1;
let isTyping = false;

function updateStory(act) {
  if (isTyping || act === currentAct) return;
  
  currentAct = act;
  const data = storyData[act];
  
  // Update tabs
  storyTabs.forEach(tab => {
    tab.classList.toggle('active', parseInt(tab.dataset.act) === act);
  });
  
  // Update progress
  progressFill.style.width = `${act * 25}%`;
  progressLabel.textContent = `${act}/4`;
  
  // Fade out and type new content
  storyText.style.opacity = '0';
  
  setTimeout(() => {
    storyChapter.textContent = data.chapter;
    storyTitle.textContent = data.title;
    storyText.textContent = '';
    storyText.style.opacity = '1';
    typeStoryText(data.text);
  }, 300);
}

function typeStoryText(text) {
  isTyping = true;
  let index = 0;
  
  function type() {
    if (index < text.length) {
      storyText.textContent += text[index];
      index++;
      setTimeout(type, 12);
    } else {
      isTyping = false;
    }
  }
  
  type();
}

storyTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    updateStory(parseInt(tab.dataset.act));
  });
});

// Initialize story
setTimeout(() => typeStoryText(storyData[1].text), 1000);

// ═══════════════════════════════════════════════════════════════════════════
// NEPHILIM POWER REVEAL
// ═══════════════════════════════════════════════════════════════════════════

const revealPowerBtn = $('#revealPower');
const nephilimShowcase = $('#nephilimShowcase');
const nephilimPowers = $('#nephilimPowers');

let powersRevealed = false;

if (revealPowerBtn) {
  revealPowerBtn.addEventListener('click', () => {
    powersRevealed = !powersRevealed;
    
    if (powersRevealed) {
      nephilimShowcase.classList.add('powered');
      nephilimPowers.classList.remove('hidden');
      revealPowerBtn.querySelector('span').textContent = 'Ocultar Poderes';
      playPowerSound();
    } else {
      nephilimShowcase.classList.remove('powered');
      nephilimPowers.classList.add('hidden');
      revealPowerBtn.querySelector('span').textContent = 'Revelar Poderes';
    }
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// IMPALA GALLERY
// ═══════════════════════════════════════════════════════════════════════════

const galleryMain = $('#galleryMain');
const thumbs = $$('.thumb');
const carSound = $('#carSound');

thumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    const imgUrl = thumb.dataset.img;
    
    galleryMain.style.opacity = '0';
    galleryMain.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
      galleryMain.src = imgUrl;
      galleryMain.style.opacity = '1';
      galleryMain.style.transform = 'scale(1)';
      
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    }, 300);
  });
});

if (carSound) {
  carSound.addEventListener('click', () => {
    playEngineSound();
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// BESTIARY
// ═══════════════════════════════════════════════════════════════════════════

const monsters = [
  'Shapeshifter', 'Djinn', 'Leviata', 'Anjos', 'Cavaleiros do Inferno',
  'Bruxa', 'Poltergeist', 'Croatoan', 'Reaper', 'Hellhound',
  'Rugaru', 'Shtriga', 'Changeling', 'Skinwalker', 'Kitsune'
];

const tagsCloud = $('#tagsCloud');
const addMonsterBtn = $('#addMonster');
const usedMonsters = new Set(['Demonios', 'Fantasmas', 'Wendigo', 'Vampiros', 'Lobisomens']);

if (addMonsterBtn) {
  addMonsterBtn.addEventListener('click', () => {
    const available = monsters.filter(m => !usedMonsters.has(m));
    
    if (!available.length) {
      addMonsterBtn.querySelector('span').textContent = 'Bestiario Completo';
      addMonsterBtn.disabled = true;
      addMonsterBtn.style.opacity = '0.5';
      return;
    }
    
    const monster = available[Math.floor(Math.random() * available.length)];
    usedMonsters.add(monster);
    
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = monster;
    tagsCloud.appendChild(tag);
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// QUOTE GENERATOR
// ═══════════════════════════════════════════════════════════════════════════

const quotes = [
  'Saving people, hunting things. The family business.',
  'Driver picks the music. Shotgun shuts his cakehole.',
  'Family dont end with blood.',
  'Im the one who gripped you tight and raised you from perdition.',
  'Pudding!',
  'You dont know my life!',
  'Id rather have you, cursed or not.',
  'Assbutt!',
  'Carry on my wayward son.',
  'What do you say we kill some evil sons of bitches and raise a little hell?',
  'People dont just disappear, Dean. Other people just stop looking for them.',
  'Even when I thought I hated you, I still loved you.'
];

const quoteDisplay = $('#quoteDisplay');
const newQuoteBtn = $('#newQuote');
let lastQuoteIndex = -1;

if (newQuoteBtn) {
  newQuoteBtn.addEventListener('click', () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * quotes.length);
    } while (newIndex === lastQuoteIndex && quotes.length > 1);
    
    lastQuoteIndex = newIndex;
    
    quoteDisplay.style.opacity = '0';
    
    setTimeout(() => {
      quoteDisplay.textContent = quotes[newIndex];
      quoteDisplay.style.opacity = '1';
    }, 200);
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SMOOTH SCROLL
// ═══════════════════════════════════════════════════════════════════════════

$$('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = $(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const headerHeight = header.offsetHeight;
      const targetPosition = target.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// AUDIO SYSTEM
// ═══════════════════════════════════════════════════════════════════════════

let audioContext = null;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

function playEngineSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    osc.type = 'sawtooth';
    filter.type = 'lowpass';
    filter.frequency.value = 150;
    
    osc.frequency.setValueAtTime(40, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.3);
    osc.frequency.setValueAtTime(70, ctx.currentTime + 1);
    osc.frequency.linearRampToValueAtTime(30, ctx.currentTime + 1.5);
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.1, ctx.currentTime + 1);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1.5);
  } catch (e) {
    // Silently ignore audio errors
  }
}

function playPowerSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.2);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.5);
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch (e) {
    // Silently ignore audio errors
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════════════════

console.log(
  '%cSupernatural Wiki',
  'font-family: Georgia, serif; font-size: 24px; font-weight: bold; color: #dc2626;'
);
console.log(
  '%cSaving people. Hunting things. The family business.',
  'font-style: italic; color: #a1a1aa;'
);
