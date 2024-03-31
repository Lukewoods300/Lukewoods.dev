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
    title: 'Project 1',
    description: 'Implemented HL7 interfaces for seamless healthcare data integration.',
    image: 'project1.jpg'
  },
  {
    title: 'Project 2',
    description: 'Developed scripts for automated data transformation.',
    image: 'project2.jpg'
  },
  {
    title: 'Project 3',
    description: 'Led the optimization of PACS deployment on cloud platforms.',
    image: 'project3.jpg'
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
    name: 'Python',
    level: 90
  },
  {
    name: 'Java',
    level: 80
  },
  {
    name: 'PowerShell',
    level: 85
  },
  {
    name: 'AWS',
    level: 75
  },
  {
    name: 'Azure',
    level: 70
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
