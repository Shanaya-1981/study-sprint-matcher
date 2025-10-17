import { quotes } from "./quotes.js";

const API_URL = 'https://study-sprint-matcher.onrender.com';

// ==================== AUTH CHECK ====================
const username = localStorage.getItem("username");

if (username) {
  document.querySelectorAll(".auth-link").forEach((link) => {
    link.parentElement.style.display = "none";
  });

  const userWelcome = document.getElementById("user-welcome");
  if (userWelcome) {
    userWelcome.innerHTML = `
      <div class="dropdown">
        <span id="username-click">Welcome, ${username} ▼</span>
        <div class="dropdown-menu" id="dropdown-menu">
          <button id="logout-btn" type="button">Logout</button>
        </div>
      </div>
    `;
    userWelcome.style.display = "list-item";

    setTimeout(() => {
      document
        .getElementById("username-click")
        ?.addEventListener("click", (e) => {
          e.stopPropagation();
          document.getElementById("dropdown-menu").classList.toggle("show");
        });

      document.getElementById("logout-btn")?.addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "index.html";
      });

      document.addEventListener("click", () => {
        document.getElementById("dropdown-menu")?.classList.remove("show");
      });
    }, 0);
  }
}

const showWelcome = localStorage.getItem("showWelcome");
if (showWelcome && username) {
  const banner = document.createElement("div");
  banner.textContent = `Welcome to Study Sprint Matcher, ${username}!`;
  banner.style.cssText =
    "position: fixed; top: 80px; left: 50%; transform: translateX(-50%); background: var(--warm-brown); color: white; padding: 1rem 2rem; border-radius: 8px; z-index: 1000;";
  document.body.appendChild(banner);
  localStorage.removeItem("showWelcome");
  setTimeout(() => banner.remove(), 5000);
}

function requireLogin(action) {
  if (!username) {
    alert("Please login first to " + action);
    window.location.href = "login.html";
    return false;
  }
  return true;
}

document.querySelectorAll('input[name="location"]').forEach((radio) => {
  radio.addEventListener("change", (e) => {
    const locationDetails = document.getElementById("location-details");
    if (locationDetails) {
      locationDetails.style.display =
        e.target.value === "offline" ? "block" : "none";
    }
  });
});

const now = new Date();
const weekdayName = now.toLocaleDateString("en-US", { weekday: "long" });
const monthName = now.toLocaleDateString("en-US", { month: "long" });
const day = now.getDate();
const year = now.getFullYear();
const timeStr = now.toLocaleTimeString("en-US", { hour12: false });
const hours = now.getHours();

let greeting;
if (hours < 12) greeting = "Good morning!";
else if (hours < 18) greeting = "Good afternoon!";
else greeting = "Good evening!";

const greetingElement = document.querySelector(".greeting h2");
if (greetingElement) greetingElement.textContent = greeting;

const dayElement = document.querySelector(".date-time .week");
if (dayElement) dayElement.textContent = weekdayName;

const current_date = document.querySelector(".date-time .date");
if (current_date) current_date.textContent = `${day} ${monthName}, ${year}`;

const current_time = document.querySelector(".date-time .time");
if (current_time) current_time.textContent = `Time: ${timeStr}`;

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
const quoteElement = document.querySelector(".quote-text");
if (quoteElement) quoteElement.textContent = randomQuote;

const sprintForm = document.getElementById("sprint-form");
if (sprintForm) {
  sprintForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!requireLogin("create a sprint")) return;

    const subject = document.querySelector('input[name="subject"]').value;
    const location = document.querySelector(
      'input[name="location"]:checked',
    ).value;
    const locationDetails =
      document.querySelector('input[name="locationDetails"]').value || "";
    const hours =
      parseInt(document.querySelector('input[name="hours"]').value) || 0;
    const mins =
      parseInt(document.querySelector('input[name="mins"]').value) || 0;
    const secs =
      parseInt(document.querySelector('input[name="secs"]').value) || 0;
    const totalMinutes = hours * 60 + mins + Math.floor(secs / 60);

    if (totalMinutes === 0) {
      alert("Please enter a duration!");
      return;
    }

    const sprint = {
      username,
      subject,
      location,
      locationDetails,
      duration: totalMinutes,
      createdAt: new Date(),
      participants: 1,
    };

    await fetch(`${API_URL}/api/sprints`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sprint),
    });

    showAlert("Sprint Created!");
    setTimeout(() => window.location.reload(), 2000);
  });
}

async function loadHomeSprints() {
  try {
    const response = await fetch(`${API_URL}/api/sprints`);
    const sprints = await response.json();
    const container = document.getElementById("sprint-preview");
    if (!container) return;

    sprints.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    container.innerHTML = "";

    if (sprints.length === 0) {
      container.innerHTML =
        '<p class="text-center">No active sprints yet. Create one above!</p>';
      return;
    }

    const sprint = sprints[0];
    const timeElapsed = Math.floor(
      (Date.now() - new Date(sprint.createdAt)) / 60000,
    );
    const timeLeft = sprint.duration - timeElapsed;
    const isOwner = sprint.username === username;

    container.innerHTML = `
      <div class="col-12">
        <article class="sprint-card" data-id="${sprint._id}">
          <h3>${sprint.username} - ${sprint.subject}</h3>
          <p>${sprint.location === "online" ? "🌐 Online" : "📍 " + sprint.locationDetails}</p>
          <p>${timeLeft > 0 ? `${timeLeft} mins left` : "Sprint Over"}</p>
          <p>${sprint.participants} participants</p>
          <div class="d-flex gap-2">
            ${timeLeft > 0 && !isOwner ? '<button type="button" class="flex-fill">JOIN</button>' : ""}
            ${isOwner ? '<button type="button" class="btn-delete flex-fill" style="background: #8B4513;">DELETE</button>' : ""}
            ${timeLeft <= 0 && !isOwner ? '<button disabled class="flex-fill">ENDED</button>' : ""}
          </div>
        </article>
        <div class="text-center mt-3">
          <a href="sprints.html" style="background: var(--warm-brown); color: white; padding: 0.75rem 2rem; border-radius: 8px; text-decoration: none; display: inline-block;">View All Sprints</a>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Error loading sprints:", error);
  }
}

async function loadMySprints() {
  if (!username) return;

  try {
    const response = await fetch(`${API_URL}/api/sprints`);
    const sprints = await response.json();

    const createdSprints = sprints.filter((s) => s.username === username);
    const joinedSprints = sprints.filter((s) =>
      localStorage.getItem(`joined_${s._id}`),
    );

    const progressBox = document.getElementById("progress-box");
    if (
      progressBox &&
      (createdSprints.length > 0 || joinedSprints.length > 0)
    ) {
      progressBox.style.display = "block";

      const totalHours = Math.round(
        [...createdSprints, ...joinedSprints].reduce(
          (sum, s) => sum + s.duration,
          0,
        ) / 60,
      );
      const totalSprints = createdSprints.length + joinedSprints.length;

      document.getElementById("total-hours").textContent = totalHours;
      document.getElementById("total-sprints").textContent = totalSprints;
      document.getElementById("streak").textContent = Math.min(totalSprints, 7);
    }

    if (createdSprints.length === 0 && joinedSprints.length === 0) return;

    const section = document.getElementById("my-sprints-section");
    const container = document.getElementById("my-sprints-list");

    if (!section || !container) return;

    section.style.display = "block";
    container.innerHTML = "";

    createdSprints.slice(0, 2).forEach((sprint) => {
      const timeLeft =
        sprint.duration -
        Math.floor((Date.now() - new Date(sprint.createdAt)) / 60000);

      container.innerHTML += `
        <div class="col-md-6 mb-3">
          <article class="sprint-card" data-id="${sprint._id}" style="border-left: 4px solid var(--warm-brown);">
            <h4>✏️ You created: ${sprint.subject}</h4>
            <p>${sprint.location === "online" ? "🌐 Online" : "📍 " + sprint.locationDetails}</p>
            <p>${timeLeft > 0 ? `${timeLeft} mins left` : "Completed"}</p>
            <p>${sprint.participants} joined</p>
            ${timeLeft > 0 ? '<button type="button" class="btn-delete" style="background: #8B4513; width: 100%; margin-top: 0.5rem;">DELETE</button>' : ""}
          </article>
        </div>
      `;
    });

    joinedSprints.slice(0, 2).forEach((sprint) => {
      const timeLeft =
        sprint.duration -
        Math.floor((Date.now() - new Date(sprint.createdAt)) / 60000);

      container.innerHTML += `
        <div class="col-md-6 mb-3">
          <article class="sprint-card" data-id="${sprint._id}" style="border-left: 4px solid var(--accent);">
            <h4>🤝 You joined: ${sprint.username}'s ${sprint.subject}</h4>
            <p>${sprint.location === "online" ? "🌐 Online" : "📍 " + sprint.locationDetails}</p>
            <p>${timeLeft > 0 ? `${timeLeft} mins left` : "Completed"}</p>
            <p>${sprint.participants} participants</p>
          </article>
        </div>
      `;
    });
  } catch (error) {
    console.error("Error loading my sprints:", error);
  }
}

async function loadAllSprints() {
  try {
    const response = await fetch(`${API_URL}/api/sprints`);
    const sprints = await response.json();
    displaySprints(sprints.slice(0, 6));
  } catch (error) {
    console.error("Error loading sprints:", error);
  }
}

function displaySprints(sprints) {
  const container = document.getElementById("all-sprints");
  if (!container) return;

  container.innerHTML = "";

  sprints.forEach((sprint) => {
    const timeElapsed = Math.floor(
      (Date.now() - new Date(sprint.createdAt)) / 60000,
    );
    const timeLeft = sprint.duration - timeElapsed;
    const isOwner = sprint.username === username;

    container.innerHTML += `
      <div class="col-lg-4 col-md-6 mb-4">
        <article class="sprint-card" data-id="${sprint._id}">
          <h3>${sprint.username} - ${sprint.subject}</h3>
          <p>${sprint.location === "online" ? "🌐 Online" : "📍 " + sprint.locationDetails}</p>
          <p>${timeLeft > 0 ? `${timeLeft} mins left` : "Sprint Over"}</p>
          <p>${sprint.participants} participants</p>
          <div class="d-flex gap-2">
            ${timeLeft > 0 && !isOwner ? '<button type="button" class="flex-fill">JOIN</button>' : ""}
            ${isOwner ? '<button type="button" class="btn-delete flex-fill" style="background: #8B4513;">DELETE</button>' : ""}
            ${timeLeft <= 0 && !isOwner ? '<button disabled class="flex-fill">ENDED</button>' : ""}
          </div>
        </article>
      </div>
    `;
  });
}

const filterForm = document.querySelector(".filter-form");
if (filterForm) {
  filterForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const subject = document
      .querySelector('input[name="subject-search"]')
      .value.toLowerCase();
    const location = document.querySelector('select[name="location"]').value;

    const response = await fetch(`${API_URL}/api/sprints`);
    const allSprints = await response.json();

    const filtered = allSprints.filter((sprint) => {
      const matchSubject =
        !subject || sprint.subject.toLowerCase().includes(subject);
      const matchLocation = location === "all" || sprint.location === location;
      return matchSubject && matchLocation;
    });

    displaySprints(filtered);
  });
}

document.addEventListener("click", async (e) => {
  if (e.target.tagName === "BUTTON" && e.target.textContent === "JOIN") {
    if (!requireLogin("join a sprint")) return;

    const sprintCard = e.target.closest(".sprint-card");
    const sprintId = sprintCard.dataset.id;

    const joined = localStorage.getItem(`joined_${sprintId}`);
    if (joined) {
      showAlert("You already joined this sprint!");
      return;
    }

    await fetch(`${API_URL}/api/sprints/${sprintId}/join`, {
      method: "POST",
    });

    localStorage.setItem(`joined_${sprintId}`, "true");
    showAlert("Joined Sprint!");
    setTimeout(() => window.location.reload(), 1500);
  }
});

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("btn-delete")) {
    if (!confirm("Delete this sprint?")) return;

    const sprintCard = e.target.closest(".sprint-card");
    const sprintId = sprintCard.dataset.id;

    await fetch(`${API_URL}/api/sprints/${sprintId}`, {
      method: "DELETE",
    });

    showAlert("Sprint Deleted!");
    setTimeout(() => window.location.reload(), 1500);
  }
});

function showAlert(message) {
  const alert = document.createElement("div");
  alert.textContent = message;
  alert.style.cssText =
    "position: fixed; top: 20px; right: 20px; background: var(--warm-brown); color: white; padding: 1rem 2rem; border-radius: 8px; z-index: 1000;";
  document.body.appendChild(alert);
  setTimeout(() => alert.remove(), 2000);
}

if (window.location.pathname.includes("sprints.html")) {
  loadAllSprints();
} else if (
  window.location.pathname.includes("index.html") ||
  window.location.pathname === "/"
) {
  loadHomeSprints();
  loadMySprints();
}