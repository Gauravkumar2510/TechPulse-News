document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (menu && nav) {
    menu.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", open);
    });
  }

  const cards = [...document.querySelectorAll(".news-card")];
  const search = document.querySelector("#searchInput");
  const filters = [...document.querySelectorAll(".filter")];
  const noResults = document.querySelector("#noResults");

  function filterNews() {
    if (!cards.length) return;
    const query = (search?.value || "").trim().toLowerCase();
    const active = document.querySelector(".filter.active")?.dataset.category || "all";
    let visible = 0;
    cards.forEach(card => {
      const matchesCategory = active === "all" || card.dataset.category === active;
      const matchesSearch = card.dataset.title.toLowerCase().includes(query);
      const show = matchesCategory && matchesSearch;
      card.style.display = show ? "" : "none";
      if (show) visible++;
    });
    if (noResults) noResults.hidden = visible !== 0;
  }

  const params = new URLSearchParams(window.location.search);
  const requestedCategory = params.get("category");
  if (requestedCategory) {
    const matchingFilter = filters.find(btn => btn.dataset.category === requestedCategory);
    if (matchingFilter) {
      filters.forEach(b => b.classList.remove("active"));
      matchingFilter.classList.add("active");
    }
  }
  filters.forEach(btn => btn.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filterNews();
  }));
  search?.addEventListener("input", filterNews);

  const toast = document.querySelector("#toast");
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
  }

  document.querySelector("#newsletterForm")?.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.querySelector("#newsletterEmail");
    if (!email.checkValidity()) { email.focus(); return; }
    showToast("Thanks! You're subscribed to the TechPulse demo.");
    e.target.reset();
  });

  const contactForm = document.querySelector("#contactForm");
  contactForm?.addEventListener("submit", async e => {
    e.preventDefault();
    const form = e.currentTarget;
    const fields = [...form.querySelectorAll("input, textarea")];
    let valid = true;
    fields.forEach(field => {
      field.classList.remove("error");
      if (!field.checkValidity() || (field.type === "text" && !field.value.trim())) {
        field.classList.add("error"); valid = false;
      }
    });
    if (!valid) {
      showToast("Please complete all fields correctly.");
      fields.find(f => f.classList.contains("error"))?.focus();
      return;
    }

    if (form.action.includes("YOUR_FORM_ID")) {
      showToast("Contact form is ready. Connect your Formspree ID first.");
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const oldText = submitButton?.textContent;
    if (submitButton) { submitButton.disabled = true; submitButton.textContent = "Sending..."; }

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      });
      if (!response.ok) throw new Error("Submission failed");
      showToast("Message sent successfully! We'll get back to you soon.");
      form.reset();
    } catch {
      showToast("Couldn't send the message. Please try again.");
    } finally {
      if (submitButton) { submitButton.disabled = false; submitButton.textContent = oldText; }
    }
  });


  const modal = document.querySelector("#articleModal");
  const modalClose = document.querySelector("#modalClose");
  const modalTitle = document.querySelector("#modalTitle");
  const modalCategory = document.querySelector("#modalCategory");
  const modalMeta = document.querySelector("#modalMeta");
  const modalText = document.querySelector("#modalText");

  const articleDetails = {
    "How AI agents are changing everyday work": {
      category: "AI",
      meta: "Sep 2, 2026 · 5 min read",
      text: "AI agents are moving beyond simple chat interfaces. They can help organize research, draft content, summarize information and coordinate routine tasks. The key idea is not replacing every job, but giving people useful digital teammates for repetitive work."
    },
    "The web development stack is getting lighter": {
      category: "WEB",
      meta: "Sep 1, 2026 · 4 min read",
      text: "Modern web development is increasingly focused on simplicity and performance. Lightweight tooling, capable browsers and reusable components can help developers build fast experiences without unnecessary complexity."
    },
    "Five habits that make your online accounts safer": {
      category: "SECURITY",
      meta: "Aug 31, 2026 · 6 min read",
      text: "Strong unique passwords, multi-factor authentication, software updates, careful link checking and regular account reviews are simple habits that can significantly improve everyday online security."
    },
    "What to look for in your next smart device": {
      category: "GADGETS",
      meta: "Aug 29, 2026 · 4 min read",
      text: "A good smart device should solve a real problem, work reliably and fit into your existing setup. Look beyond headline specifications and consider software support, privacy, battery life and long-term usefulness."
    },
    "Why small AI models matter": {
      category: "AI",
      meta: "Aug 28, 2026 · 7 min read",
      text: "Smaller AI models can be faster, cheaper and easier to run on local hardware. This can make intelligent features more practical on phones, laptops and other devices where sending every request to a remote server is not ideal."
    },
    "Designing websites that feel great on mobile": {
      category: "WEB",
      meta: "Aug 26, 2026 · 5 min read",
      text: "Great mobile design starts with readable content, comfortable touch targets, clear navigation and layouts that adapt naturally to small screens. Responsive design is about creating a good experience, not simply shrinking a desktop page."
    }
  };

  function openArticle(card) {
    const title = card.dataset.title;
    const details = articleDetails[title];
    if (!details || !modal) return;
    modalTitle.textContent = title;
    modalCategory.textContent = details.category;
    modalMeta.textContent = details.meta;
    modalText.textContent = details.text;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modalClose?.focus();
  }

  function closeArticle() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  cards.forEach(card => {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.addEventListener("click", () => openArticle(card));
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openArticle(card);
      }
    });
  });

  modalClose?.addEventListener("click", closeArticle);
  modal?.querySelector("[data-close-modal]")?.addEventListener("click", closeArticle);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeArticle();
  });

});
