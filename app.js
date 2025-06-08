const projects = [
    {
        name: "kanoncaro",
        description: "This is the first project.",
        mainImage: "image.jpg",
        imgs: [
            'https://picsum.photos/id/237/300/200',
        ]
    },
    {
        name: "kanoncaro",
        description: "This is the second project.",
        mainImage: "image.jpg",
        imgs: [
            'https://picsum.photos/id/241/300/200',
        ]
    },
    {
        name: "kanoncaro",
        description: "This is the third project.",
        mainImage: "image.jpg",
        imgs: [
            'https://picsum.photos/id/241/300/200',
        ]
    },
    {
        name: "kanoncaro",
        description: "This is the fourth project.",
        mainImage: "image.jpg",
        imgs: [
            'https://picsum.photos/id/249/300/200',
        ]
    },
    {
        name: "kanoncaro",
        description: "This is the first project.",
        mainImage: "image.jpg",
        imgs: [
            'https://picsum.photos/id/237/300/200',
        ]
    },
    {
        name: "kanoncaro",
        description: "This is the second project.",
        mainImage: "image.jpg",
        imgs: [
            'https://picsum.photos/id/241/300/200',
        ]
    },
    {
        name: "kanoncaro",
        description: "This is the third project.",
        mainImage: "image.jpg",
        imgs: [
            'https://picsum.photos/id/241/300/200',
        ]
    },
    {
        name: "kanoncaro",
        description: "This is the fourth project.",
        mainImage: "image.jpg",
        imgs: [
            'https://picsum.photos/id/249/300/200',
        ]
    },
];

const projectNav = document.querySelector("#project_nav");
// Loop through the projects and create a link (a tag) for each project
// projects.forEach((project) => {
//     createProjectLink(project);
// });

function createProjectLink(project){
    const projectLink = document.createElement("div");
    projectLink.href = `#${project.name}`;
    projectLink.classList.add("project_nav_btn");
    projectLink.innerText = project.name;
    projectNav.appendChild(projectLink);
}
// const currProj = 0;

function loadProjectPreviews(){
    projects.forEach((project, index) => {
        const projectPreview = document.createElement("a");
        projectPreview.href = ``;
        projectPreview.classList.add("project_preview");
        projectPreview.id = project.name;
        projectPreview.innerHTML = `
            <div class="project_info_container">
                <h2>${project.name}</h2>
            </div>
            <div class="img_container">
                <img src="${project.mainImage}" alt="${project.name} main image" class="main_image">
            </div>
        `;
        document.querySelector('#project_preview_container').appendChild(projectPreview);
        // Add click event to show project details
        projectPreview.addEventListener('click', (event) => {
            event.preventDefault();
            showProject(project);
        });
    });
}

loadProjectPreviews();

// convert vertical scroll to horizontal scroll
const projectPreviewContainer = document.querySelector('#project_preview_container');
projectPreviewContainer.addEventListener('wheel', (event) => {
    event.preventDefault();
    projectPreviewContainer.scrollLeft += event.deltaY;
}, { passive: false });

// Add class to project preview if user is scrolling, remove if scrolling stopped
let isScrolling = false;
// let lastScrollLeft = 0;
projectPreviewContainer.addEventListener('scroll', () => {
    // const currentScrollLeft = projectPreviewContainer.scrollLeft;
    // if (currentScrollLeft > lastScrollLeft) {
    //     projectPreviewContainer.classList.remove('scrolling_left');
    //     projectPreviewContainer.classList.add('scrolling_right');
    // } else {
    //     projectPreviewContainer.classList.remove('scrolling_right');
    //     projectPreviewContainer.classList.add('scrolling_left');
    // }
    // lastScrollLeft = currentScrollLeft;

    if (!isScrolling) {
        projectPreviewContainer.classList.add('scrolling');
        isScrolling = true;
    }
    clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        projectPreviewContainer.classList.remove('scrolling');
        isScrolling = false;
    }, 100);
}, { passive: true });

function showProject(project){
    // Clear existing project details
    const existingDetails = document.querySelector('.project_details');
    if (existingDetails) {
        existingDetails.remove();
    }
    document.querySelector('body').classList.add('blackout');
    const projectDetailsWrapper = document.createElement("div");
    projectDetailsWrapper.classList.add("project_details_wrapper");
    projectDetailsWrapper.innerHTML = `
        <div class="project_details">
            <h2>${project.name}</h2>
            <p>${project.description}</p>
            <img src="${project.mainImage}" alt="${project.name} main image" class="main_image">
            <h2>${project.name}</h2>
            <p>${project.description}</p>
            <img src="${project.mainImage}" alt="${project.name} main image" class="main_image">
        </div>
    `;
    document.querySelector('#wrapper').appendChild(projectDetailsWrapper);
}

// Add click event to close project details
document.querySelector('#wrapper').addEventListener('click', (event) => {
    if (event.target.id === 'wrapper') closeProjectDetails();
}, { passive: true });

function closeProjectDetails() {
    const existingDetails = document.querySelector('.project_details_wrapper');
    if (existingDetails) {
        existingDetails.classList.add('remove')
        // Wait for the animation to finish before removing the element
        setTimeout(() => {
            existingDetails.remove();
        }, 500); // Match this duration with the CSS animation duration
    }
    document.querySelector('body').classList.remove('blackout');
}