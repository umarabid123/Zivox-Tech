"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { PATH_TO_NAV } from "@/lib/nav";

const THEME_KEY = "nexvora-theme";

function applyTheme(theme: string) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
}

function toast(message: string, type: "success" | "error" = "success") {
  const t = document.createElement("div");
  t.className = "toast " + type;
  t.innerHTML = `<span class="ic">${type === "success" ? "✓" : "ⓘ"}</span><span>${message}</span>`;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add("show"));
  setTimeout(() => {
    t.classList.remove("show");
    setTimeout(() => t.remove(), 400);
  }, 3200);
}

/**
 * All non-React DOM behaviour from the original site, ported 1:1.
 * Global/delegated handlers are attached once; page-scoped behaviours
 * re-run on every route change (and are idempotent via dataset guards).
 */
export default function SiteInteractions() {
  const pathname = usePathname();

  // ---- mount-once: global + delegated handlers ----
  useEffect(() => {
    // Scroll progress bar
    if (!document.querySelector(".scroll-progress")) {
      const wrap = document.createElement("div");
      wrap.className = "scroll-progress";
      wrap.innerHTML = '<div class="bar"></div>';
      document.body.appendChild(wrap);
      const bar = wrap.querySelector(".bar") as HTMLElement;
      const update = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const pct = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        bar.style.transform = "scaleX(" + pct + ")";
      };
      window.addEventListener("scroll", update, { passive: true });
      update();
    }

    // Navbar shrink on scroll
    const nav = document.querySelector(".nav");
    const onScroll = () => {
      if (window.scrollY > 12) nav?.classList.add("scrolled");
      else nav?.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Spinner CSS injection
    if (!document.getElementById("__nx_spinner")) {
      const sp = document.createElement("style");
      sp.id = "__nx_spinner";
      sp.textContent =
        ".spinner{display:inline-block;width:14px;height:14px;border:2px solid rgba(255,255,255,0.3);border-top-color:white;border-radius:50%;animation:spin 0.7s linear infinite;vertical-align:middle}@keyframes spin{to{transform:rotate(360deg)}}";
      document.head.appendChild(sp);
    }

    // Theme toggle (delegated)
    const onThemeClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest(".theme-toggle");
      if (!btn) return;
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      applyTheme(current === "dark" ? "light" : "dark");
    };
    document.addEventListener("click", onThemeClick);

    // Back to top (delegated)
    const onTopClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest(".back-to-top");
      if (!btn) return;
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    document.addEventListener("click", onTopClick);

    // Mobile drawer toggle
    const hamburger = document.querySelector(".hamburger");
    const drawer = document.querySelector(".mobile-drawer");
    const onHam = () => {
      hamburger?.classList.toggle("open");
      drawer?.classList.toggle("open");
      document.body.style.overflow = drawer?.classList.contains("open") ? "hidden" : "";
    };
    hamburger?.addEventListener("click", onHam);
    const onDrawerLink = (e: Event) => {
      const a = (e.target as HTMLElement).closest("a");
      if (!a || !drawer?.contains(a)) return;
      hamburger?.classList.remove("open");
      drawer?.classList.remove("open");
      document.body.style.overflow = "";
    };
    drawer?.addEventListener("click", onDrawerLink);

    // Newsletter
    const newsletter = document.querySelector(".newsletter");
    const onNewsletter = (e: Event) => {
      e.preventDefault();
      const input = (e.target as HTMLElement).querySelector("input") as HTMLInputElement;
      if (!input.value || !/^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(input.value)) {
        toast("Please enter a valid email", "error");
        return;
      }
      toast("Subscribed — check your inbox.");
      input.value = "";
    };
    newsletter?.addEventListener("submit", onNewsletter);

    // ---- Chatbot (Nova) ----
    const chatBtn = document.querySelector(".chatbot-btn");
    const chatPanel = document.querySelector(".chat-panel");
    const chatClose = document.querySelector(".chat-close");
    const chatBody = document.querySelector(".chat-body") as HTMLElement | null;
    const chatForm = document.querySelector(".chat-input-row") as HTMLFormElement | null;
    const chatInput = chatForm?.querySelector("input") as HTMLInputElement | undefined;

    const onChatBtn = () => chatPanel?.classList.toggle("open");
    const onChatClose = () => chatPanel?.classList.remove("open");
    chatBtn?.addEventListener("click", onChatBtn);
    chatClose?.addEventListener("click", onChatClose);

    const replies: Record<string, { text: string; chips: string[] }> = {
      pricing: {
        text: "Our projects typically range based on scope:<br>• <b>Web sites:</b> $5k–15k<br>• <b>Dashboards/SaaS:</b> $15k–50k<br>• <b>Mobile apps:</b> $20k–60k<br>• <b>AI / Custom systems:</b> $25k+<br><br>Want a tailored quote?",
        chips: ["Book consultation", "See services", "Contact sales"],
      },
      services: {
        text: "We build four core things:<br>• Web & dashboard solutions<br>• Mobile apps (iOS, Android, React Native, Flutter)<br>• AI chatbots & automation<br>• Custom software (CRM, booking, management)<br><br>Which fits your project?",
        chips: ["Web", "Mobile", "AI", "Custom"],
      },
      timeline: {
        text: "Typical timelines:<br>• <b>Landing site:</b> 2–3 weeks<br>• <b>Dashboard / SaaS:</b> 6–10 weeks<br>• <b>Mobile app MVP:</b> 8–12 weeks<br>• <b>AI integration:</b> 4–8 weeks<br><br>We give a fixed plan after discovery.",
        chips: ["Start discovery", "Pricing"],
      },
      consultation: {
        text: "Happy to set that up. A 30-min consult is free — what's the best email to send a calendar invite to?",
        chips: [],
      },
      contact: {
        text: "You can reach us at <b>hello@nexvora.tech</b> or use the contact form on this page. We respond within 24 hours.",
        chips: ["Open form", "Book consultation"],
      },
      hello: {
        text: "Hi there — I'm Nova, Nexvora's assistant. What can I help with today?",
        chips: ["Pricing", "Services", "Timeline", "Book consultation"],
      },
    };

    function escapeHtml(s: string) {
      return s.replace(/[&<>"']/g, (c) =>
        ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
      );
    }
    function addMsg(text: string, sender = "bot", chips: string[] = []) {
      if (!chatBody) return;
      const m = document.createElement("div");
      m.className = "msg " + sender;
      m.innerHTML = text;
      if (chips.length) {
        const wrap = document.createElement("div");
        wrap.className = "chips";
        chips.forEach((c) => {
          const chip = document.createElement("button");
          chip.className = "chip";
          chip.textContent = c;
          chip.addEventListener("click", () => handleUser(c));
          wrap.appendChild(chip);
        });
        m.appendChild(wrap);
      }
      chatBody.appendChild(m);
      chatBody.scrollTop = chatBody.scrollHeight;
    }
    function addTyping() {
      const t = document.createElement("div");
      t.className = "chat-typing";
      t.innerHTML = "<span></span><span></span><span></span>";
      chatBody?.appendChild(t);
      if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
      return t;
    }
    function findIntent(text: string): string | null {
      const t = text.toLowerCase();
      if (/(hi|hello|hey|yo)\b/.test(t)) return "hello";
      if (/(price|cost|pricing|budget|how much)/.test(t)) return "pricing";
      if (/(service|what.+do|offer)/.test(t)) return "services";
      if (/(time|long|deadline|when|timeline|how long)/.test(t)) return "timeline";
      if (/(consult|book|call|schedule|meeting)/.test(t)) return "consultation";
      if (/(contact|email|reach|phone)/.test(t)) return "contact";
      if (/^(web|mobile|ai|custom)$/.test(t)) return "services";
      return null;
    }
    let awaitingEmail = false;
    function handleUser(text: string) {
      addMsg(escapeHtml(text), "user");
      if (awaitingEmail) {
        awaitingEmail = false;
        const isEmail = /^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(text);
        if (isEmail) {
          const t = addTyping();
          setTimeout(() => {
            t.remove();
            addMsg("Perfect — invite sent. A team member will reach out within an hour to confirm. Anything else?", "bot", ["Pricing", "Services"]);
          }, 700);
        } else {
          addMsg("That doesn't look like an email — try again? (e.g. you@company.com)", "bot");
          awaitingEmail = true;
        }
        return;
      }
      const intent = findIntent(text);
      const t = addTyping();
      setTimeout(() => {
        t.remove();
        if (intent && replies[intent]) {
          addMsg(replies[intent].text, "bot", replies[intent].chips);
          if (intent === "consultation") awaitingEmail = true;
        } else {
          addMsg("I'd love to connect you with the right person. Could you share what you're looking to build? Or pick one:", "bot", ["Pricing", "Services", "Timeline", "Book consultation"]);
        }
      }, 700 + Math.random() * 400);
    }
    const onChatSubmit = (e: Event) => {
      e.preventDefault();
      const v = chatInput?.value.trim();
      if (!v) return;
      if (chatInput) chatInput.value = "";
      handleUser(v);
    };
    chatForm?.addEventListener("submit", onChatSubmit);
    const chatInit = setTimeout(() => {
      if (chatBody && !chatBody.children.length) {
        addMsg("👋 Hi — I'm <b>Nova</b>, Nexvora's AI assistant. What brings you here today?", "bot", ["Pricing", "Services", "Book consultation"]);
      }
    }, 200);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onThemeClick);
      document.removeEventListener("click", onTopClick);
      hamburger?.removeEventListener("click", onHam);
      drawer?.removeEventListener("click", onDrawerLink);
      newsletter?.removeEventListener("submit", onNewsletter);
      chatBtn?.removeEventListener("click", onChatBtn);
      chatClose?.removeEventListener("click", onChatClose);
      chatForm?.removeEventListener("submit", onChatSubmit);
      clearTimeout(chatInit);
    };
  }, []);

  // ---- per-route: page-scoped behaviours + nav active state ----
  useEffect(() => {
    // Active nav + body data-page
    const navKey = PATH_TO_NAV[pathname] ?? null;
    document.querySelectorAll("[data-nav]").forEach((a) => {
      a.classList.toggle("active", (a as HTMLElement).dataset.nav === navKey);
    });
    document.body.dataset.page = navKey || "home";

    // Reveal-on-scroll
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => {
      const r = el.getBoundingClientRect();
      const inView = r.top < window.innerHeight && r.bottom > 0;
      if (inView) return;
      if (el.classList.contains("reveal")) el.classList.add("js-reveal");
      if (el.classList.contains("reveal-stagger")) el.classList.add("js-reveal-stagger");
      io.observe(el);
    });
    const revealSafety = setTimeout(() => {
      document
        .querySelectorAll(".js-reveal:not(.in), .js-reveal-stagger:not(.in)")
        .forEach((el) => el.classList.add("in"));
    }, 2000);

    // Service card glow
    const glowHandlers: Array<[Element, (e: Event) => void]> = [];
    document.querySelectorAll(".service-card").forEach((card) => {
      const h = (e: Event) => {
        const ev = e as MouseEvent;
        const r = (card as HTMLElement).getBoundingClientRect();
        (card as HTMLElement).style.setProperty("--mx", ((ev.clientX - r.left) / r.width) * 100 + "%");
        (card as HTMLElement).style.setProperty("--my", ((ev.clientY - r.top) / r.height) * 100 + "%");
      };
      card.addEventListener("mousemove", h);
      glowHandlers.push([card, h]);
    });

    // Hero mouse spotlight
    const spotHandlers: Array<[Element, (e: Event) => void]> = [];
    document.querySelectorAll(".hero").forEach((hero) => {
      const h = (e: Event) => {
        const ev = e as MouseEvent;
        const r = (hero as HTMLElement).getBoundingClientRect();
        (hero as HTMLElement).style.setProperty("--spot-x", ((ev.clientX - r.left) / r.width) * 100 + "%");
        (hero as HTMLElement).style.setProperty("--spot-y", ((ev.clientY - r.top) / r.height) * 100 + "%");
      };
      hero.addEventListener("mousemove", h);
      spotHandlers.push([hero, h]);
    });

    // Magnetic buttons (guard against double-binding persistent nav button)
    document.querySelectorAll(".btn.magnetic").forEach((btn) => {
      const el = btn as HTMLElement;
      if (el.dataset.magnetic === "1") return;
      el.dataset.magnetic = "1";
      el.addEventListener("mousemove", (e) => {
        const ev = e as MouseEvent;
        const r = el.getBoundingClientRect();
        const x = ev.clientX - r.left - r.width / 2;
        const y = ev.clientY - r.top - r.height / 2;
        el.style.setProperty("--pull-x", x * 0.18 + "px");
        el.style.setProperty("--pull-y", y * 0.18 + "px");
      });
      el.addEventListener("mouseleave", () => {
        el.style.setProperty("--pull-x", "0px");
        el.style.setProperty("--pull-y", "0px");
      });
    });

    // Portfolio filter
    const filterBtns = Array.from(document.querySelectorAll(".filter-btn"));
    const onFilter = (btn: Element) => () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = (btn as HTMLElement).dataset.cat;
      document.querySelectorAll(".portfolio-card").forEach((card) => {
        const tags = (card as HTMLElement).dataset.cats?.split(",") || [];
        (card as HTMLElement).style.display = cat === "all" || tags.includes(cat!) ? "" : "none";
      });
    };
    const filterCleanup: Array<() => void> = [];
    filterBtns.forEach((btn) => {
      const fn = onFilter(btn);
      btn.addEventListener("click", fn);
      filterCleanup.push(() => btn.removeEventListener("click", fn));
    });

    // FAQ accordion
    const faqCleanup: Array<() => void> = [];
    document.querySelectorAll(".faq-item").forEach((item) => {
      const q = item.querySelector(".faq-q");
      const a = item.querySelector(".faq-a") as HTMLElement | null;
      const fn = () => {
        const isOpen = item.classList.contains("open");
        document.querySelectorAll(".faq-item.open").forEach((other) => {
          if (other !== item) {
            other.classList.remove("open");
            (other.querySelector(".faq-a") as HTMLElement).style.maxHeight = "0";
          }
        });
        if (isOpen) {
          item.classList.remove("open");
          if (a) a.style.maxHeight = "0";
        } else {
          item.classList.add("open");
          if (a) a.style.maxHeight = a.scrollHeight + "px";
        }
      };
      q?.addEventListener("click", fn);
      faqCleanup.push(() => q?.removeEventListener("click", fn));
    });

    // Counters
    const animateCounter = (el: HTMLElement) => {
      const target = parseFloat(el.dataset.counter || "");
      if (isNaN(target)) return;
      const decimals = (el.dataset.counter!.split(".")[1] || "").length;
      const duration = 1400;
      const start = performance.now();
      if (el.dataset.counted === "true") return;
      el.dataset.counted = "true";
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const v = target * eased;
        el.textContent = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString();
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = decimals > 0 ? target.toFixed(decimals) : Math.round(target).toLocaleString();
      };
      requestAnimationFrame(tick);
    };
    const counterIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCounter(e.target as HTMLElement);
            counterIO.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    document.querySelectorAll("[data-counter]").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) animateCounter(el as HTMLElement);
      else counterIO.observe(el);
    });

    // Hero chart line animation
    const chartLine = document.querySelector(".chart-line") as SVGPathElement | null;
    if (chartLine && typeof chartLine.getTotalLength === "function") {
      const len = chartLine.getTotalLength();
      chartLine.style.strokeDasharray = String(len);
      chartLine.style.strokeDashoffset = String(len);
      setTimeout(() => {
        chartLine.style.transition = "stroke-dashoffset 2.2s cubic-bezier(0.22,1,0.36,1)";
        chartLine.style.strokeDashoffset = "0";
      }, 200);
    }

    // Contact form
    const form = document.getElementById("contactForm") as HTMLFormElement | null;
    const validateField = (f: HTMLInputElement | HTMLTextAreaElement) => {
      const wrap = f.closest(".field");
      const rule = (f as HTMLElement).dataset.validate || "";
      let ok = true;
      if (rule.includes("required") && !f.value.trim()) ok = false;
      if (rule.includes("email") && f.value && !/^[\w.+-]+@[\w-]+\.[\w.-]+$/i.test(f.value)) ok = false;
      if (rule.includes("min:20") && f.value.trim().length < 20) ok = false;
      wrap?.classList.toggle("error", !ok);
      return ok;
    };
    const onSubmit = (e: Event) => {
      e.preventDefault();
      let valid = true;
      form!.querySelectorAll("[data-validate]").forEach((f) => {
        if (!validateField(f as HTMLInputElement)) valid = false;
      });
      if (!valid) return;
      const btn = form!.querySelector(".form-submit") as HTMLButtonElement;
      const original = btn.innerHTML;
      btn.innerHTML = '<span class="spinner"></span> Sending...';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = original;
        btn.disabled = false;
        form!.reset();
        const ok = document.querySelector(".form-success");
        ok?.classList.add("show");
        setTimeout(() => ok?.classList.remove("show"), 5000);
        toast("Thanks — we'll be in touch within 24 hours.");
      }, 1100);
    };
    const blurFns: Array<[Element, string, EventListener]> = [];
    if (form) {
      form.addEventListener("submit", onSubmit);
      form.querySelectorAll("[data-validate]").forEach((f) => {
        const onBlur = () => validateField(f as HTMLInputElement);
        const onInput = () => {
          const wrap = (f as HTMLElement).closest(".field");
          if (wrap?.classList.contains("error")) wrap.classList.remove("error");
        };
        f.addEventListener("blur", onBlur);
        f.addEventListener("input", onInput);
        blurFns.push([f, "blur", onBlur], [f, "input", onInput]);
      });
    }

    return () => {
      io.disconnect();
      counterIO.disconnect();
      clearTimeout(revealSafety);
      glowHandlers.forEach(([el, h]) => el.removeEventListener("mousemove", h));
      spotHandlers.forEach(([el, h]) => el.removeEventListener("mousemove", h));
      filterCleanup.forEach((fn) => fn());
      faqCleanup.forEach((fn) => fn());
      if (form) form.removeEventListener("submit", onSubmit);
      blurFns.forEach(([el, ev, fn]) => el.removeEventListener(ev, fn));
    };
  }, [pathname]);

  return null;
}
