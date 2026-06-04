"use client";

import { useEffect } from "react";

/** Ports the booking calendar + multi-step flow for the /book page. */
export default function BookingScript() {
  useEffect(() => {
    const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const SLOTS = ["09:00","09:30","10:00","10:30","11:00","13:00","13:30","14:00","14:30","15:00","15:30","16:00"];
    const state = { year: 2026, month: 4, day: null as number | null, slot: null as string | null };

    const $month = document.getElementById("calMonth");
    const $days = document.getElementById("calDays");
    const $slots = document.getElementById("slots");
    const $slotsWrap = document.getElementById("slotsWrap");
    const $continue = document.getElementById("continueBtn") as HTMLButtonElement | null;
    if (!$month || !$days || !$slots || !$slotsWrap || !$continue) return;

    function renderSlots() {
      if (!state.day) {
        $slotsWrap!.style.display = "none";
        $continue!.disabled = true;
        $continue!.textContent = "Select a time to continue";
        return;
      }
      $slotsWrap!.style.display = "block";
      $slots!.innerHTML = "";
      SLOTS.forEach((s) => {
        const b = document.createElement("button");
        b.className = "slot" + (state.slot === s ? " selected" : "");
        b.textContent = s;
        b.addEventListener("click", () => {
          state.slot = s;
          renderSlots();
        });
        $slots!.appendChild(b);
      });
      if (state.slot) {
        $continue!.disabled = false;
        $continue!.innerHTML = "Continue with " + state.slot + ", " + MONTHS[state.month].slice(0, 3) + " " + state.day + ' <span class="arrow">→</span>';
      } else {
        $continue!.disabled = true;
        $continue!.textContent = "Pick a time slot";
      }
    }

    function render() {
      $month!.textContent = MONTHS[state.month] + " " + state.year;
      $days!.innerHTML = "";
      const firstDay = new Date(state.year, state.month, 1);
      const dow = (firstDay.getDay() + 6) % 7;
      const daysInMonth = new Date(state.year, state.month + 1, 0).getDate();
      const prevMonthDays = new Date(state.year, state.month, 0).getDate();
      for (let i = dow - 1; i >= 0; i--) {
        const d = document.createElement("div");
        d.className = "cal-day muted";
        d.textContent = String(prevMonthDays - i);
        $days!.appendChild(d);
      }
      const today = new Date("2026-05-23");
      for (let i = 1; i <= daysInMonth; i++) {
        const btn = document.createElement("button");
        const date = new Date(state.year, state.month, i);
        btn.className = "cal-day";
        btn.textContent = String(i);
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        const isPast = date < today;
        if (isWeekend || isPast) btn.disabled = true;
        if (i === state.day) btn.classList.add("selected");
        if (date.toDateString() === today.toDateString()) btn.classList.add("today");
        btn.addEventListener("click", () => {
          state.day = i;
          state.slot = null;
          render();
        });
        $days!.appendChild(btn);
      }
      const total = $days!.children.length;
      const remainder = (7 - (total % 7)) % 7;
      for (let i = 1; i <= remainder; i++) {
        const d = document.createElement("div");
        d.className = "cal-day muted";
        d.textContent = String(i);
        $days!.appendChild(d);
      }
      renderSlots();
    }

    const prev = document.getElementById("prevMonth");
    const next = document.getElementById("nextMonth");
    const onPrev = () => {
      if (state.month === 0) { state.month = 11; state.year--; } else state.month--;
      state.day = null; state.slot = null; render();
    };
    const onNext = () => {
      if (state.month === 11) { state.month = 0; state.year++; } else state.month++;
      state.day = null; state.slot = null; render();
    };
    prev?.addEventListener("click", onPrev);
    next?.addEventListener("click", onNext);

    const onContinue = () => {
      if (!state.slot) return;
      const summary = state.slot + " · " + MONTHS[state.month] + " " + state.day + ", " + state.year;
      const st = document.getElementById("summaryText");
      if (st) st.textContent = summary;
      const bf = document.getElementById("bookFlow");
      const ds = document.getElementById("detailsStep");
      if (bf) bf.style.display = "none";
      if (ds) ds.style.display = "block";
      window.scrollTo({ top: 200, behavior: "smooth" });
    };
    $continue.addEventListener("click", onContinue);

    const back = document.getElementById("backToCal");
    const onBack = () => {
      const ds = document.getElementById("detailsStep");
      const bf = document.getElementById("bookFlow");
      if (ds) ds.style.display = "none";
      if (bf) bf.style.display = "grid";
    };
    back?.addEventListener("click", onBack);

    const bookForm = document.getElementById("bookForm") as HTMLFormElement | null;
    const onBookSubmit = (e: Event) => {
      e.preventDefault();
      let valid = true;
      bookForm!.querySelectorAll("[data-validate]").forEach((f) => {
        const field = f as HTMLInputElement;
        const wrap = field.closest(".field");
        const rule = (field as HTMLElement).dataset.validate || "";
        let ok = true;
        if (rule.includes("required") && !field.value.trim()) ok = false;
        if (rule.includes("email") && field.value && !/^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(field.value)) ok = false;
        wrap?.classList.toggle("error", !ok);
        if (!ok) valid = false;
      });
      if (!valid) return;
      const btn = bookForm!.querySelector(".form-submit") as HTMLButtonElement;
      btn.innerHTML = '<span class="spinner"></span> Confirming...';
      btn.disabled = true;
      setTimeout(() => {
        const cw = document.getElementById("confirmWhen");
        if (cw) cw.textContent = state.slot + " · " + MONTHS[state.month] + " " + state.day + ", " + state.year;
        const ds = document.getElementById("detailsStep");
        const cs = document.getElementById("confirmStep");
        if (ds) ds.style.display = "none";
        if (cs) cs.style.display = "block";
        window.scrollTo({ top: 100, behavior: "smooth" });
      }, 1000);
    };
    bookForm?.addEventListener("submit", onBookSubmit);

    render();

    return () => {
      prev?.removeEventListener("click", onPrev);
      next?.removeEventListener("click", onNext);
      $continue?.removeEventListener("click", onContinue);
      back?.removeEventListener("click", onBack);
      bookForm?.removeEventListener("submit", onBookSubmit);
    };
  }, []);

  return null;
}
