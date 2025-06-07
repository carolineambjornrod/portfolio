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
        const projectPreview = document.createElement("div");
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
    });
}

loadProjectPreviews();

// convert vertical scroll to horizontal scroll
const projectPreviewContainer = document.querySelector('#project_preview_container');
projectPreviewContainer.addEventListener('wheel', (event) => {
    event.preventDefault();
    projectPreviewContainer.scrollLeft += event.deltaY;
}, { passive: false });