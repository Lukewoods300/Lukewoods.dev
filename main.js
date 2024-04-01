class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];
    this.txt = this.isDeleting ? fullTxt.substring(0, this.txt.length - 1) : fullTxt.substring(0, this.txt.length + 1);
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    let typeSpeed = this.isDeleting ? 150 : 300;
    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }
    setTimeout(() => this.type(), typeSpeed);
  }
}

// Initialization and event listener setup
document.addEventListener('DOMContentLoaded', () => {
  initTypeWriter();
  initSmoothScroll();
  fetchWeatherData('5392171');
  loadProjects();
  loadSkills();
});

function initTypeWriter() {
  const txtElement = document.querySelector('.dynamic-text');
  if (txtElement) {
    const words = JSON.parse(txtElement.getAttribute('data-words') || '[]');
    const wait = txtElement.getAttribute('data-wait');
    new TypeWriter(txtElement, words, wait);
  }
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function loadProjects() {
  const projectsSection = document.querySelector('.projects');
  const projectsContainer = document.createElement('div');
  projectsContainer.className = 'projects-container';
  // Assuming project data is static; consider fetching this data from a server if dynamic.
  const projects = [/* Project data */];

  projects.forEach(project => createProjectCard(project, projectsContainer));
  projectsSection.appendChild(projectsContainer);
}

function createProjectCard(project, container) {
  const projectCard = document.createElement('div');
  projectCard.className = 'project-card';
  projectCard.innerHTML = `
    <img src="${project.image}" alt="${project.title}" class="project-image">
    <div class="project-details">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
    </div>`;
  container.appendChild(projectCard);
}

function loadSkills() {
  const skillsSection = document.querySelector('.skills');
  const skillsContainer = document.createElement('div');
  skillsContainer.className = 'skills-container';
  // Similarly, consider dynamic loading for skills data.
  const skills = [/* Skills data */];

  skills.forEach(skill => createSkillBar(skill, skillsContainer));
  skillsSection.appendChild(skillsContainer);
}

function createSkillBar(skill, container) {
  const skillBar = document.createElement('div');
  skillBar.className = 'skill-bar';
  skillBar.innerHTML = `
    <div class="skill-name">${skill.name}</div>
    <div class="skill-level" style="width: ${skill.level}%"></div>`;
  container.appendChild(skillBar);
}

// Simplified weather data fetching and UI update
function fetchWeatherData(cityId) {
  const apiKey = 'f5b2726eeb1ad855e8c50e07f6b9eff5';
  const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}`;
  fetch(url)
    .then(response => response.ok ? response.json() : Promise.reject('Failed to fetch'))
    .then(updateWeatherUI)
    .catch(error => {
      console.error('Fetch error:', error);
      document.getElementById('weather-container').innerHTML = `<p class="weather-error">Error fetching weather data</p>`;
    });
}

function updateWeatherUI(data) {
  // Assumes existence of these elements; consider checks for robustness.
  document.getElementById('weather-temp').textContent = `Temperature: ${kelvinToCelsius(data.main.temp)} °C`;
  document.getElementById('weather-description').textContent = `Weather: ${data.weather[0].description}`;
  // Additional updates as necessary...
}

function kelvinToCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(2);
}

function kelvinToFahrenheit(kelvin) {
  return ((kelvin - 273.15) * 9/5 + 32).toFixed(2);
}

function refreshWeatherData() {
  // Re-fetch the weather data
  fetchWeatherData('5392171');
}