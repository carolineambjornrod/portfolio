const projectNav = document.querySelector("#project_nav");
// Loop through the projects and create a link (a tag) for each project
// projects.forEach((project) => {
//     createProjectLink(project);
// });

function createProjectLink(project){
    const projectLink = document.createElement("div");
    projectLink.href = `#${project.title}`;
    projectLink.classList.add("project_nav_btn");
    projectLink.innerText = project.title;
    projectNav.appendChild(projectLink);
}
// const currProj = 0;

function loadProjectPreviews(){
    projects.forEach((project, index) => {
        const projectPreview = document.createElement("a");
        projectPreview.href = ``;
        projectPreview.classList.add("project_preview");
        projectPreview.id = project.title;
        projectPreview.innerHTML = `
            <div class="project_info_container">
                <h2>${project.title}</h2>
            </div>
            <div class="img_container">
                <img src="${project.mainImage}" alt="${project.title} main image" class="main_image">
            </div>
        `;
        document.querySelector('#project_preview_container').appendChild(projectPreview);
        // Add click event to show project details
        projectPreview.addEventListener('click', (event) => {
            event.preventDefault();
            showProject(event.target, project);
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

function showProject(elem, project){
    const projectPreview = elem.closest('.project_preview');
    projectPreview.classList.add('active');
    const existingDetails = document.querySelector('.project_details');
    if (existingDetails) {
        existingDetails.remove();
    }
    document.querySelector('body').classList.add('blackout');
    const projectDetailsWrapper = document.createElement("div");
    projectDetailsWrapper.classList.add("project_details_wrapper");
    projectDetailsWrapper.innerHTML = `
        <div class="project_details">
            <button class="close_project_details" onclick="closeProjectDetails()">Close &#10005;</button>
            <div class="project_details_intro">
                <div>
                    <h2>${project.title}</h2>
                    <h3>${project.subtitle}</h3>
                    <p>${project.description}</p>
                </div>
                <div class="project_details_tags">
                    ${project.tags.map(tag => `<p>${tag}</p>`).join('')}
                </div>
            </div>
            <img src="${project.mainImage}" alt="${project.title} main image" class="main_image">
            <div class="project_media">
            ${project.media.map(media => `
                ${media.src.includes('mp4') ? `
                <video class="project_details_image ${media.width}" autoplay muted playsinline loop>
                    <source src="${media.src}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                ` : `
                <img src="${media.src}" alt="${media.alt}" class="project_details_image ${media.width}" loading="lazy">
                `}
            `).join('')}
            </div>
        </div>
    `;
    document.querySelector('#wrapper').appendChild(projectDetailsWrapper);
}
document.querySelector('#wrapper').addEventListener('click', (event) => {
    if (event.target.id === 'wrapper') closeProjectDetails();
}, { passive: true });

function closeProjectDetails() {
    const activePreviews = document.querySelectorAll('.project_preview.active');
    activePreviews.forEach(preview => {
        preview.classList.remove('active');
    });
    const existingDetails = document.querySelector('.project_details_wrapper');
    if (existingDetails) {
        existingDetails.classList.add('remove')
        setTimeout(() => {
            existingDetails.remove();
        }, 500);
    }
    document.querySelector('body').classList.remove('blackout');
}