import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'www.quickmark.co', 'teacher.html');
let html = fs.readFileSync(filePath, 'utf8');

// Animation script using GSAP and ScrollTrigger
const gsapScript = `
  <!-- GSAP & ScrollTrigger -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
      
      gsap.registerPlugin(ScrollTrigger);

      const EASE_PAPER = "power3.out";
      const EASE_PEN = "power1.inOut";
      const EASE_SETTLE = "power2.out";
      const EASE_STICKER = "back.out(1.7)";
      const EASE_SWEEP = "power4.out";

      const isDesktop = window.innerWidth >= 640;

      // 1. TeacherHero Animation
      const heroTimeline = gsap.timeline({ delay: 0.1 });
      
      heroTimeline
        .from('[data-scene="t-h1"]', {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: EASE_SETTLE
        }, 0)
        .from(['[data-scene="t-eyebrow"]', '[data-scene="t-lede"]', '[data-scene="t-cta"]', '[data-scene="t-strip"]'], {
          y: 12,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: EASE_SETTLE
        }, 0.1)
        .from('[data-scene="t-sheet"]', {
          y: 56,
          x: 14,
          rotate: 9,
          opacity: 0,
          duration: 0.8,
          ease: EASE_PAPER
        }, 0.2);

      const rows = document.querySelectorAll('[data-scene="t-row"]');
      if (rows.length) {
        heroTimeline.from(rows, {
          x: -18,
          opacity: 0,
          duration: 0.45,
          stagger: 0.12,
          ease: EASE_SETTLE
        }, 0.6);
      }

      heroTimeline
        .from('[data-scene="t-slip"]', {
          y: -70,
          rotate: -20,
          opacity: 0,
          duration: 0.5,
          ease: EASE_STICKER
        }, 1.15)
        .to('[data-scene="t-sheet"]', {
          x: "+=1",
          duration: 0.04,
          repeat: 3,
          yoyo: true,
          ease: "none"
        }, 1.6);

      gsap.to('[data-scene="t-sheet"]', {
        y: isDesktop ? "-4vh" : "-2vh",
        ease: "none",
        scrollTrigger: {
          trigger: '[data-scene="teacher-hero"]',
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });

      // 2. CodeJourney Animation
      const inkPaths = document.querySelectorAll('[data-scene="ink-path"]');
      inkPaths.forEach(path => {
        const len = path.getTotalLength ? path.getTotalLength() : 1000;
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: '[data-scene="code-journey"]',
            start: "top 65%",
            end: "bottom 75%",
            scrub: 0.8
          }
        });
      });

      document.querySelectorAll('[data-scene="station"]').forEach(station => {
        const stl = gsap.timeline({
          scrollTrigger: {
            trigger: station,
            start: "top 78%",
            toggleActions: "play none none reverse"
          }
        });

        const dot = station.querySelector('[data-scene="station-dot"]');
        if (dot) stl.from(dot, { scale: 0, opacity: 0, duration: 0.35, ease: EASE_STICKER }, 0);

        const copy = station.querySelectorAll('[data-scene="station-copy"] > *');
        if (copy.length) stl.from(copy, { y: 12, opacity: 0, duration: 0.5, stagger: 0.08, ease: EASE_SETTLE }, 0.05);

        const shot = station.querySelector('[data-scene="shot"]');
        if (shot) stl.from(shot, { y: 40, x: 10, rotate: 1.5, opacity: 0, duration: 0.6, ease: EASE_PAPER }, 0.15);

        const pops = station.querySelectorAll('[data-scene="pop"]');
        if (pops.length) stl.from(pops, { y: 12, scale: 0.85, opacity: 0, duration: 0.35, stagger: 0.07, ease: EASE_STICKER }, 0.4);

        const sRows = station.querySelectorAll('[data-scene="row"]');
        if (sRows.length) stl.from(sRows, { x: -16, opacity: 0, duration: 0.4, stagger: 0.09, ease: EASE_SETTLE }, 0.45);
      });

      // 3. ClassSheet Animation
      const csTl = gsap.timeline({
        scrollTrigger: {
          trigger: '[data-scene="cs-sheet"]',
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });

      csTl.from('[data-scene="cs-sheet"]', {
        y: 48,
        x: 12,
        rotate: 8,
        opacity: 0,
        duration: 0.8,
        ease: EASE_PAPER
      }, 0);

      document.querySelectorAll('[data-scene="annotation"]').forEach((annot, i) => {
        const offset = 0.3 + 0.2 * i;
        const doodle = annot.querySelector('[data-scene="annotation-doodle"]');
        if (doodle) {
          csTl.from(doodle, { scale: 0, rotate: -15, opacity: 0, duration: 0.5, ease: EASE_STICKER }, offset);
        }
        const note = annot.querySelector('[data-scene="annotation-note"]');
        if (note) {
          csTl.from(note, { y: 10, opacity: 0, duration: 0.4, ease: EASE_SETTLE }, offset + 0.1);
        }
        const under = annot.querySelector('[data-scene="annotation-underline"] path');
        if (under) {
          const uLen = under.getTotalLength ? under.getTotalLength() : 200;
          gsap.set(under, { strokeDasharray: uLen, strokeDashoffset: uLen });
          csTl.to(under, { strokeDashoffset: 0, duration: 0.35, ease: EASE_PEN }, offset + 0.25);
        }
        const strike = annot.querySelector('[data-scene="annotation-strike"]');
        if (strike) {
          csTl.from(strike, { scaleX: 0, transformOrigin: "left center", duration: 0.5, ease: EASE_PEN }, offset + 0.35);
        }
      });

      // 4. TeacherClosing Animation
      const calloutEl = document.querySelector('[data-scene="callout"]');
      if (calloutEl) {
        const calloutTl = gsap.timeline({
          scrollTrigger: {
            trigger: calloutEl,
            start: "top 78%",
            toggleActions: "play none none reverse"
          }
        });
        calloutTl
          .from('[data-scene="callout-ticket"]', { y: 30, opacity: 0, duration: 0.6, ease: EASE_PAPER }, 0)
          .from('[data-scene="callout-note"] > *', { y: 12, opacity: 0, duration: 0.5, stagger: 0.1, ease: EASE_SETTLE }, 0.15)
          .from('[data-scene="callout-highlight"]', { scaleX: 0, transformOrigin: "left center", duration: 0.5, ease: EASE_SWEEP }, 0.4);

        const arrowPath = document.querySelector('[data-scene="callout-arrow"] path');
        if (arrowPath) {
          const aLen = arrowPath.getTotalLength ? arrowPath.getTotalLength() : 300;
          gsap.set(arrowPath, { strokeDasharray: aLen, strokeDashoffset: aLen });
          calloutTl.to(arrowPath, { strokeDashoffset: 0, duration: 0.7, ease: EASE_PEN }, 0.6);
        }
      }

      const closeSec = document.querySelector('[data-scene="teacher-close"]');
      if (closeSec) {
        const closeTl = gsap.timeline({
          scrollTrigger: {
            trigger: closeSec,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        });
        closeTl
          .from('[data-scene="close-heading"]', { y: 16, opacity: 0, duration: 0.6, ease: EASE_SETTLE }, 0)
          .from('[data-scene="close-body"]', { y: 14, opacity: 0, duration: 0.55, ease: EASE_SETTLE }, 0.12)
          .from('[data-scene="close-cta"]', { y: 18, opacity: 0, duration: 0.5, ease: EASE_SETTLE }, 0.22)
          .from('[data-scene="close-stamp-row"] > *', { y: 10, opacity: 0, duration: 0.4, stagger: 0.06, ease: EASE_SETTLE }, 0.32)
          .from('[data-scene="close-ticket"]', { y: 50, x: 16, rotate: 8, opacity: 0, duration: 0.8, ease: EASE_PAPER }, 0.2)
          .from('[data-scene="close-code"]', { scale: 1.7, opacity: 0, rotate: -8, duration: 0.35, ease: EASE_STICKER }, 0.9)
          .to('[data-scene="close-ticket"]', { x: "+=1", duration: 0.04, repeat: 3, yoyo: true, ease: "none" }, 1);
      }
    });
  </script>
`;

// Insert gsapScript right before </body>
html = html.replace('</body>', `${gsapScript}\n</body>`);

fs.writeFileSync(filePath, html);
fs.writeFileSync(path.join(process.cwd(), 'www.quickmark.co', 'teacher', 'index.html'), html);

console.log('Successfully updated teacher page with all GSAP scroll & hover animations!');
