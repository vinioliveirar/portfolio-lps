// Landing Pages Data
const landingPages = [
  {
    id: 1,
    title: "Gym Products",
    category: "ecommerce",
    categories: ["E-commerce", "Fitness"],
    description: "Landing page moderna para produtos de academia com design profissional e foco em conversão.",
    link: "./lps/lp-gym/index.html",
    badge: "Novo",
    color: "#ff6b35",
  },
];

let currentFilter = "all";

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderFilters();
  renderCards();
  setupFilters();
  setupScrollTop();
  setupThemeToggle();
});

// Generate filters dynamically based on LP categories
function renderFilters() {
  const filtersContainer = document.querySelector(".filters");
  if (!filtersContainer) return;

  // Get all unique categories from landing pages
  const allCategories = new Set();
  landingPages.forEach((lp) => {
    if (lp.category) {
      allCategories.add(lp.category);
    }
  });

  // Map category keys to display names
  const categoryNames = {
    all: "Todas",
    business: "Negócios",
    ecommerce: "E-commerce",
    portfolio: "Portfólio",
    saas: "SAAS",
    landing: "Landing",
    onepage: "One-Page",
    creative: "Criativo",
    health: "Saúde",
    food: "Comida",
    travel: "Viagem",
    events: "Eventos",
    fitness: "Fitness",
  };

  // Create filter buttons
  const filterRow = document.createElement("div");
  filterRow.className = "filter-row";

  // Always add "Todas" button
  const allBtn = document.createElement("button");
  allBtn.className = "filter-btn active";
  allBtn.dataset.filter = "all";
  allBtn.textContent = "Todas";
  filterRow.appendChild(allBtn);

  // Add buttons for each category found in LPs
  Array.from(allCategories)
    .sort()
    .forEach((category) => {
      const btn = document.createElement("button");
      btn.className = "filter-btn";
      btn.dataset.filter = category;
      btn.textContent = categoryNames[category] || category;
      filterRow.appendChild(btn);
    });

  // Clear existing filters and add new ones
  filtersContainer.innerHTML = "";
  filtersContainer.appendChild(filterRow);
}

// Render cards
function renderCards() {
  const grid = document.getElementById("cardsGrid");
  const filtered = currentFilter === "all" ? landingPages : landingPages.filter((lp) => lp.category === currentFilter);

  if (filtered.length === 0) {
    grid.innerHTML = '<div class="card-empty">Nenhuma landing page encontrada nesta categoria.</div>';
    return;
  }

  grid.innerHTML = filtered
    .map(
      (lp) => `
    <div class="card" onclick="window.open('${lp.link}', '_blank')">
      <div class="card-preview" style="background: linear-gradient(135deg, ${lp.color} 0%, ${lp.color}dd 100%);">
        <div class="card-preview-placeholder">${lp.title.charAt(0)}</div>
      </div>
      <div class="card-content">
        <div class="card-header">
          <div>
            <div class="card-title">${lp.title}</div>
            <div class="card-categories">${lp.categories.join(", ")}</div>
          </div>
          ${lp.badge ? `<span class="card-badge">${lp.badge}</span>` : ""}
        </div>
        <div class="card-description">${lp.description}</div>
        <div class="card-footer">
          <a href="${lp.link}" class="card-link" onclick="event.stopPropagation();">Ver LP →</a>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

// Setup filters
function setupFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
      btn.classList.add("active");
      // Update current filter
      currentFilter = btn.dataset.filter;
      // Re-render cards
      renderCards();
    });
  });
}

// Setup scroll to top
function setupScrollTop() {
  const scrollTopBtn = document.getElementById("scrollTop");

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Theme management
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else if (prefersDark) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
}

function setupThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
}
