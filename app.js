/* ============================================================
   Club Manager Pro — GSAP Timeline (100 seconds, Scenes 4-16)
   Mar del Plata Golf Club × WIS Agency
   ============================================================ */

(function () {
  'use strict';

  // === CONSTANTS ===
  const TOTAL_DURATION = 100; // seconds

  // === REFERENCES ===
  const playOverlay = document.getElementById('playOverlay');
  const playBtn = document.getElementById('playBtn');
  const progressBar = document.getElementById('progressBar');
  
  // Grid Hydration for Scene 11
  const grid = document.getElementById('sc11_grid');
  if (grid) {
    const headers = ['HOYO', '1','2','3','4','5','6','7','8','9','T'];
    const pars =    ['PAR',  '4','3','5','4','4','3','5','4','4','36'];
    const scores =  ['SCORE','5','3','6','4','5','4','7','4','5','43'];
    
    // Create elements
    headers.forEach(h => {
      let div = document.createElement('div');
      div.className = 'g-cell g-head';
      div.innerText = h;
      grid.appendChild(div);
    });
    pars.forEach(p => {
      let div = document.createElement('div');
      div.className = 'g-cell';
      div.innerText = p;
      if(p==='PAR') div.classList.add('g-head');
      grid.appendChild(div);
    });
    scores.forEach((s, idx) => {
      let div = document.createElement('div');
      div.className = 'g-cell g-score';
      if(idx === 7) div.id = 'targetScore7'; // Hoyo 7
      if(idx === 10) div.id = 'totalScore';
      div.innerText = s;
      if(s==='SCORE') div.classList.add('g-head');
      grid.appendChild(div);
    });
  }

  // === UTILITY: Animate counter ===
  function animateCounter(element, target, duration, prefix, suffix) {
    prefix = prefix || '';
    suffix = suffix || '';
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: duration || 2,
      ease: 'power2.out',
      onUpdate: function () {
        const v = Math.round(obj.val);
        element.textContent = prefix + v.toLocaleString('es-AR') + suffix;
      }
    });
  }

  // === BUILD MASTER TIMELINE ===
  function buildTimeline() {
    const tl = gsap.timeline({ paused: true });

    // ====== SCENE 4: Pantalla Inicio (0:00 - 0:10) ======
    const sc4 = document.getElementById('sc4');
    const sc4_btnSocio = document.getElementById('sc4_btnSocio');
    
    tl.set(sc4, { visibility: 'visible', opacity: 1 }, 0)
      // Fade in buttons
      .from('.menu-btn', { y: 30, opacity: 0, stagger: 0.2, duration: 1 }, 1)
      // Mano seleccionando
      .to(sc4_btnSocio, { scale: 0.95, borderColor: '#c9a84c', duration: 0.2 }, 7)
      .to(sc4_btnSocio, { scale: 1, duration: 0.2 }, 7.3)
      .to(sc4, { opacity: 0, duration: 1 }, 9);

    // ====== SCENE 5: Ingreso DNI (0:10 - 0:20) ======
    const sc5 = document.getElementById('sc5');
    const dniDisp = document.getElementById('dniDisplay');
    const k2 = document.getElementById('key2');
    const k8 = document.getElementById('key8');
    const k4 = document.getElementById('key4');
    const k1 = document.querySelector('.num-key'); // 1
    const k9 = document.getElementById('key9');
    const k0 = document.getElementById('key0');
    const k3 = document.getElementById('key3');
    const kConfirm = document.getElementById('keyConfirm');

    // DNI sequence: 2 - 8 - 4 - 4 - 1 - 9 - 0 - 3 (spaced every ~0.5s starting at 11s)
    const seq = [
      { key: k2, char: '2', time: 11.0 },
      { key: k8, char: '8', time: 11.6 },
      { key: k4, char: '4', time: 12.2 },
      { key: k4, char: '4', time: 12.7 },
      { key: k1, char: '1', time: 13.3 },
      { key: k9, char: '9', time: 13.9 },
      { key: k0, char: '0', time: 14.5 },
      { key: k3, char: '3', time: 15.1 },
    ];

    tl.set(sc5, { visibility: 'visible' }, 10)
      .to(sc5, { opacity: 1, duration: 0.5 }, 10);
    
    let currentDni = "";
    seq.forEach(s => {
      tl.to(s.key, { background: 'rgba(255,255,255,0.2)', scale: 0.95, duration: 0.1 }, s.time)
        .call(() => { currentDni += s.char; dniDisp.innerText = currentDni; }, null, s.time+0.1)
        .to(s.key, { background: 'transparent', scale: 1, duration: 0.1 }, s.time+0.2);
    });

    tl.to(kConfirm, { background: 'rgba(201,168,76,0.3)', scale: 0.95, duration: 0.1 }, 18)
      .to(kConfirm, { background: 'rgba(255,255,255,0.05)', scale: 1, duration: 0.1 }, 18.2)
      .to(sc5, { opacity: 0, duration: 0.8 }, 19);

    // ====== SCENE 6: Perfil Socio (0:20 - 0:30) ======
    const sc6 = document.getElementById('sc6');
    tl.set(sc6, { visibility: 'visible' }, 20)
      .to(sc6, { opacity: 1, duration: 0.5 }, 20)
      .from('#sc6_profile', { scale: 0.9, opacity: 0, duration: 0.8, ease: 'back.out(1.2)' }, 20.5)
      .to(sc6, { opacity: 0, duration: 0.8 }, 29);

    // ====== SCENE 7: Seleccion Hoyos (0:30 - 0:38) ======
    const sc7 = document.getElementById('sc7');
    const btn18 = document.getElementById('sc7_btn18');
    const pBtn = document.getElementById('sc7_printBtn');

    tl.set(sc7, { visibility: 'visible' }, 30)
      .to(sc7, { opacity: 1, duration: 0.5 }, 30)
      // Seleccionar 18 hoyos
      .to(btn18, { borderColor: '#c9a84c', background: 'rgba(201,168,76,0.1)', duration: 0.3 }, 32)
      // Aparece boton
      .to(pBtn, { opacity: 1, y: -20, duration: 0.5 }, 32.5)
      // Tocar boton
      .to(pBtn, { scale: 0.95, duration: 0.1 }, 35)
      .to(pBtn, { scale: 1, duration: 0.1 }, 35.2)
      .to(sc7, { opacity: 0, duration: 0.8 }, 37);

    // ====== SCENE 8: Impresion (0:38 - 0:45) ======
    const sc8 = document.getElementById('sc8');
    const pCard = document.getElementById('sc8_card');
    const rTxt = document.getElementById('sc8_ready');
    
    tl.set(sc8, { visibility: 'visible' }, 38)
      .to(sc8, { opacity: 1, duration: 0.5 }, 38)
      // Sale tarjeta de la ranura
      .fromTo(pCard, { y: 150, opacity: 0 }, { y: -20, opacity: 1, duration: 1.5, ease: 'power2.out' }, 39)
      .to(rTxt, { opacity: 1, y: -10, duration: 0.5 }, 41)
      .to(sc8, { opacity: 0, duration: 1 }, 44);

    // ====== SCENE 9: Insercion (0:45 - 0:52) ======
    const sc9 = document.getElementById('sc9');
    const iCard = document.getElementById('sc9_card');
    
    tl.set(sc9, { visibility: 'visible' }, 45)
      .to(sc9, { opacity: 1, duration: 0.5 }, 45)
      // Tarjeta es insertada
      .to(iCard, { y: 180, opacity: 0, duration: 1.5, ease: 'power2.in' }, 48)
      // Flash verde de reaccion
      .set('.pulse-glow', { boxShadow: '0 0 60px #5ac46b', borderColor: '#5ac46b' }, 49.5)
      .to('.pulse-glow', { boxShadow: '0 0 20px #5ac46b', duration: 0.5 }, 49.8)
      .to(sc9, { opacity: 0, duration: 0.8 }, 51);

    // ====== SCENE 10: OCR Procesando (0:52 - 0:58) ======
    const sc10 = document.getElementById('sc10');
    const scanLine = document.getElementById('sc10_scanLine');
    const fill = document.getElementById('sc10_fill');
    const pct = document.getElementById('sc10_percent');
    
    tl.set(sc10, { visibility: 'visible' }, 52)
      .to(sc10, { opacity: 1, duration: 0.5 }, 52)
      // Animacion escaneo (arriba a abajo)
      .fromTo(scanLine, { top: '0%' }, { top: '100%', duration: 4, ease: 'none' }, 53)
      // Progreso
      .to(fill, { width: '100%', duration: 4, ease: 'none' }, 53)
      .to({ val: 0 }, {
        val: 100, duration: 4, ease: 'none',
        onUpdate: function() { pct.innerText = Math.round(this.targets()[0].val) + '%'; }
      }, 53)
      .to(sc10, { opacity: 0, duration: 0.8 }, 57.2);

    // ====== SCENE 11: Grilla (0:58 - 1:08) ======
    const sc11 = document.getElementById('sc11');
    const target7 = document.getElementById('targetScore7');
    const tScore = document.getElementById('totalScore');
    const miniNumpad = document.getElementById('sc11_numpad');
    const key6 = document.getElementById('sc11_key6');
    
    tl.set(sc11, { visibility: 'visible' }, 58)
      .to(sc11, { opacity: 1, duration: 0.5 }, 58)
      // Hover/Click on 7
      .to(target7, { backgroundColor: 'rgba(201,100,76,0.8)', duration: 0.2 }, 60)
      .to(miniNumpad, { opacity: 1, duration: 0.3 }, 60.5)
      // Hover/Click on 6
      .to(key6, { backgroundColor: '#c9a84c', color: '#000', duration: 0.2 }, 62)
      // Change to 6
      .call(() => { 
        target7.innerText = '6'; 
        target7.style.backgroundColor = 'rgba(74,138,85,0.6)'; 
        tScore.innerText = '42'; // Total drops 43 -> 42
      }, null, 62.3)
      .to(miniNumpad, { opacity: 0, duration: 0.3 }, 63)
      .to(sc11, { opacity: 0, duration: 1 }, 67);

    // ====== SCENE 12: Confirm & Sync (1:08 - 1:15) ======
    const sc12 = document.getElementById('sc12');
    const cBtn = document.getElementById('sc12_confirmBtn');
    const sScreen = document.getElementById('sc12_success');
    
    tl.set(sc12, { visibility: 'visible' }, 68)
      .to(sc12, { opacity: 1, duration: 0.3 }, 68)
      .to(cBtn, { opacity: 1, y: -20, duration: 0.3 }, 68.3)
      // Click confirm
      .to(cBtn, { scale: 0.95, duration: 0.1 }, 69.5)
      .to(cBtn, { scale: 1, duration: 0.1 }, 69.7)
      // Transition to success checkmark
      .to(cBtn, { opacity: 0, duration: 0.3 }, 70)
      .to(sScreen, { opacity: 1, duration: 0.5 }, 70.3)
      // Expand circle
      .to('.checkmark-circle', { scale: 1, duration: 0.6, ease: 'back.out(1.5)' }, 70.5)
      .to(sc12, { opacity: 0, duration: 0.8 }, 74);

    // ====== SCENE 13: Dashboard (1:15 - 1:22) ======
    const sc13 = document.getElementById('sc13');
    
    tl.set(sc13, { visibility: 'visible' }, 75)
      .to(sc13, { opacity: 1, duration: 0.5 }, 75)
      .from('.d-metric', { y: 50, opacity: 0, stagger: 0.15, duration: 0.8 }, 75.5)
      .call(() => {
        animateCounter(document.getElementById('d-val-check'), 47, 2);
        animateCounter(document.getElementById('d-val-ingr'), 2340000, 2.5, '$');
        animateCounter(document.getElementById('d-val-tarj'), 38, 2);
        animateCounter(document.getElementById('d-val-cuota'), 98, 2, '', '%');
      }, null, 76)
      .to(sc13, { opacity: 0, duration: 1.5 }, 80.5);

    // ====== SCENE 14: Secretario (1:22 - 1:27) ======
    const sc14 = document.getElementById('sc14');
    tl.set(sc14, { visibility: 'visible' }, 82)
      .to(sc14, { opacity: 1, duration: 0.5 }, 82)
      .to('.text-impact-box', { opacity: 1, y: -10, duration: 1 }, 83)
      .to(sc14, { opacity: 0, duration: 1 }, 86);

    // ====== SCENE 15: Dato Impacto (1:27 - 1:32) ======
    const sc15 = document.getElementById('sc15');
    tl.set(sc15, { visibility: 'visible' }, 87)
      .to(sc15, { opacity: 1, duration: 0.5 }, 87)
      .fromTo('#sc15 .text-impact-box', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.5 }, 87.5)
      .to(sc15, { opacity: 0, duration: 1 }, 91);

    // ====== SCENE 16: Cierre Logos (1:32 - 1:40) ======
    const sc16 = document.getElementById('sc16');
    tl.set(sc16, { visibility: 'visible' }, 92)
      .to(sc16, { opacity: 1, duration: 1 }, 92)
      .to('.closers', { opacity: 1, duration: 1.5 }, 93)
      // Fade to black absolute
      .to('.closers', { opacity: 0, duration: 2 }, 98)
      .to(sc16, { opacity: 0, duration: 0.5 }, 99.5);

    return tl;
  }

  // === PROGRESS BAR ===
  function startProgressTracking(tl) {
    const total = tl.duration();
    function update() {
      if (tl.isActive()) {
        const progress = (tl.time() / total) * 100;
        progressBar.style.width = progress + '%';
        requestAnimationFrame(update);
      } else if (tl.time() >= total) {
        progressBar.style.width = '100%';
      }
    }
    update();
  }

  // === INIT ===
  const masterTimeline = buildTimeline();

  playOverlay.addEventListener('click', function () {
    gsap.to(playOverlay, {
      opacity: 0,
      duration: 0.8,
      onComplete: function () {
        playOverlay.style.display = 'none';
        masterTimeline.play();
        startProgressTracking(masterTimeline);
      }
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
      e.preventDefault();
      if (playOverlay.style.display !== 'none') {
        playOverlay.click();
        return;
      }
      if (masterTimeline.isActive()) {
        masterTimeline.pause();
      } else {
        masterTimeline.play();
        startProgressTracking(masterTimeline);
      }
    }
    // Debug keys to scrub
    if(e.code === 'ArrowRight') {
      masterTimeline.seek(masterTimeline.time() + 5);
    }
    if(e.code === 'ArrowLeft') {
      masterTimeline.seek(masterTimeline.time() - 5);
    }
  });

})();
