// Typewriter effect for profile title
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = 'Luke Woods';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    let typeSpeed = 300;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

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

document.addEventListener('DOMContentLoaded', (event) => {
  fetchWeatherData('5392171'); // Replace 'London' with your preferred city
});

function init() {
  const txtElement = document.querySelector('.dynamic-text');
  // Check if the element exists before proceeding
  if (txtElement) {
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    new TypeWriter(txtElement, words, wait);
  } else {
    console.error('Dynamic text element not found');
  }
}
// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Add image carousel for projects
const projectsSection = document.querySelector('.projects');
const projectsContainer = document.createElement('div');
projectsContainer.classList.add('projects-container');

const projects = [
  {
    title: '1',
    description: '1.',
    image: 'GJ_rXAWXAAEv3dr.jpg'
  },
  {
    title: '2',
    description: '2.',
    image: 'GJ_rXAYWEAAOKum.jpg'
  },
  {
    title: '3',
    description: '3.',
    image: 'GJ_rXAcXoAAkHbO.jpg'
  },
  {
    title: '4',
    description: '4.',
    image: 'GJ_rXAWXAAEv3dr.jpg'
  },
  {
    title: '5',
    description: '5.',
    image: 'GJ_rXAYWEAAOKum.jpg'
  },
  {
    title: '6',
    description: '6.',
    image: 'GJ_rXAcXoAAkHbO.jpg'
  }
];

projects.forEach(project => {
  const projectCard = document.createElement('div');
  projectCard.classList.add('project-card');

  const projectImage = document.createElement('img');
  projectImage.src = project.image;
  projectImage.alt = project.title;

  const projectDetails = document.createElement('div');
  projectDetails.classList.add('project-details');

  const projectTitle = document.createElement('h3');
  projectTitle.textContent = project.title;

  const projectDescription = document.createElement('p');
  projectDescription.textContent = project.description;

  projectDetails.appendChild(projectTitle);
  projectDetails.appendChild(projectDescription);

  projectCard.appendChild(projectImage);
  projectCard.appendChild(projectDetails);

  projectsContainer.appendChild(projectCard);
});

projectsSection.appendChild(projectsContainer);

// Add skill bars
const skillsSection = document.querySelector('.skills');
const skillsContainer = document.createElement('div');
skillsContainer.classList.add('skills-container');

const skills = [
  {
    name: '1',
    level: 90
  },
  {
    name: '2',
    level: 60
  },
  {
    name: '3',
    level: 45
  },
  {
    name: '4',
    level: 35
  },
  {
    name: '5',
    level: 10
  }
];

skills.forEach(skill => {
  const skillBar = document.createElement('div');
  skillBar.classList.add('skill-bar');

  const skillName = document.createElement('div');
  skillName.classList.add('skill-name');
  skillName.textContent = skill.name;

  const skillLevel = document.createElement('div');
  skillLevel.classList.add('skill-level');
  skillLevel.style.width = `${skill.level}%`;

  skillBar.appendChild(skillName);
  skillBar.appendChild(skillLevel);

  skillsContainer.appendChild(skillBar);
});

skillsSection.appendChild(skillsContainer);

// Add this to your existing main.js file
const blogPosts = document.querySelectorAll('.blog-post');
const journalEntries = document.querySelectorAll('.journal-entry');

function setMaxHeight(elements, maxHeight) {
    elements.forEach(element => {
        element.style.maxHeight = maxHeight;
        element.style.overflow = "hidden";
    });
}

function addReadMoreButton(elements, label) {
    elements.forEach(element => {
        const button = document.createElement('button');
        button.textContent = label;
        button.addEventListener('click', () => {
        if (element.style.maxHeight) {
             element.style.maxHeight = null; // Show full text
             button.textContent = "Read Less";
        } else {
             element.style.maxHeight = "100px"; // Example initial height
             button.textContent = "Read More";
        }
        });
        element.appendChild(button);
    });
}

// Initial setup
setMaxHeight(blogPosts, "100px"); 
addReadMoreButton(blogPosts, "Read More");
setMaxHeight(journalEntries, "100px"); 
addReadMoreButton(journalEntries, "Read More");

const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});
function fetchWeatherData(cityId) {
  const apiKey = 'f5b2726eeb1ad855e8c50e07f6b9eff5'; // Replace with your API key
  const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data); // You can now use this data to display weather information
      // Update your HTML here
      updateWeatherUI(data)
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      const weatherContainer = document.getElementById('weather-container');
      weatherContainer.innerHTML = `<p class="weather-error">Error fetching weather data: ${error.message}</p>`;
    });
    
}

// Call this function with the city you want to display weather for
fetchWeatherData('5392171');

function updateWeatherUI(data) {
  const tempElement = document.getElementById('weather-temp');
  const descElement = document.getElementById('weather-description');
  const cityElement = document.getElementById('weather-city');
  const windElement = document.getElementById('weather-wind');
  const humidityElement = document.getElementById('weather-humidity');
  const sunriseElement = document.getElementById('weather-sunrise');
  const sunsetElement = document.getElementById('weather-sunset');

  if (data.main && data.weather && data.name) {
      tempElement.textContent = `Temperature: ${kelvinToCelsius(data.main.temp)} °C (${kelvinToFahrenheit(data.main.temp)} °F)`;
      descElement.textContent = `Weather: ${data.weather[0].description}`;
      cityElement.textContent = `City: ${data.name}`;
  } else {
      console.error('Invalid weather data:', data);
      // Update the UI to inform the user that weather data is not available
  }
  tempElement.classList.add('weather-temp');
  descElement.classList.add('weather-desc');
  cityElement.classList.add('weather-city');
  windElement.textContent = `Wind: ${data.wind.speed} m/s, ${data.wind.deg} degrees`;
  humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
  sunriseElement.textContent = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
  sunsetElement.textContent = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;

  const iconElement = document.getElementById('weather-icon');
  iconElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" />`;
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