(() => {
  "use strict";

  const root = document.documentElement;
  root.classList.remove("no-js");
  root.classList.add("js");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const header = document.querySelector("[data-header]");
  const progress = document.querySelector("[data-scroll-progress]");

  const updateScrollState = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    header?.classList.toggle("is-scrolled", scrollTop > 16);

    if (progress) {
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = pageHeight > 0 ? Math.min((scrollTop / pageHeight) * 100, 100) : 0;
      progress.style.setProperty("--scroll-progress", `${percentage}%`);
    }
  };

  let scrollFrame = 0;
  const requestScrollUpdate = () => {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(() => {
      updateScrollState();
      scrollFrame = 0;
    });
  };

  window.addEventListener("scroll", requestScrollUpdate, { passive: true });
  window.addEventListener("resize", requestScrollUpdate, { passive: true });
  updateScrollState();

  const menuButton = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const menuLinks = Array.from(document.querySelectorAll("[data-menu-link]"));
  let elementBeforeMenu = null;

  const focusableSelector = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])"
  ].join(",");

  const getMenuFocusableElements = () =>
    mobileMenu ? Array.from(mobileMenu.querySelectorAll(focusableSelector)) : [];

  const closeMenu = ({ restoreFocus = true } = {}) => {
    if (!menuButton || !mobileMenu) return;

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menú");
    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");

    if (restoreFocus && elementBeforeMenu instanceof HTMLElement) {
      elementBeforeMenu.focus();
    }
  };

  const openMenu = () => {
    if (!menuButton || !mobileMenu) return;

    elementBeforeMenu = document.activeElement;
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Cerrar menú");
    mobileMenu.classList.add("is-open");
    mobileMenu.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");

    const focusable = getMenuFocusableElements();
    window.setTimeout(() => focusable[0]?.focus(), reduceMotion.matches ? 0 : 180);
  };

  menuButton?.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    if (isOpen) closeMenu();
    else openMenu();
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => closeMenu({ restoreFocus: false }));
  });

  document.addEventListener("keydown", (event) => {
    if (!mobileMenu?.classList.contains("is-open")) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = getMenuFocusableElements();
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  const desktopBreakpoint = window.matchMedia("(min-width: 1051px)");
  const closeMenuAtDesktop = (event) => {
    if (event.matches) closeMenu({ restoreFocus: false });
  };

  if (typeof desktopBreakpoint.addEventListener === "function") {
    desktopBreakpoint.addEventListener("change", closeMenuAtDesktop);
  } else {
    desktopBreakpoint.addListener(closeMenuAtDesktop);
  }

  const revealElements = Array.from(document.querySelectorAll("[data-reveal]"));

  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10%", threshold: 0.08 }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
  }

  const sectionLinks = Array.from(document.querySelectorAll("[data-nav-link]"));
  const sections = Array.from(document.querySelectorAll("[data-section]"));

  if ("IntersectionObserver" in window && sectionLinks.length && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible?.target.id) return;

        sectionLinks.forEach((link) => {
          const active = link.getAttribute("href") === `#${visible.target.id}`;
          link.classList.toggle("is-active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      },
      { rootMargin: "-20% 0px -65%", threshold: [0.05, 0.2, 0.5] }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  document.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" });
      window.history.replaceState(null, "", targetId);
    });
  });

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  const footer = document.querySelector(".site-footer");
  const floatingContact = document.querySelector(".whatsapp-float");

  if (footer && floatingContact && "IntersectionObserver" in window) {
    const footerObserver = new IntersectionObserver(
      ([entry]) => floatingContact.classList.toggle("is-footer-visible", entry.isIntersecting),
      { threshold: 0.08 }
    );
    footerObserver.observe(footer);
  }
})();
