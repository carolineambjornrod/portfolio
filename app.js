const projects = [
    {
        name: "UD2024",
        description: "This is the first project.",
        mainImage: "https://example.com/image1.jpg",
        imgs: [
            'https://picsum.photos/id/237/300/200',
        ]
    },
    {
        name: "UD2023",
        description: "This is the second project.",
        mainImage: "https://example.com/image2.jpg",
        imgs: [
            'https://picsum.photos/id/241/300/200',
        ]
    },
    {
        name: "UD2022",
        description: "This is the third project.",
        mainImage: "https://example.com/image3.jpg",
        imgs: [
            'https://picsum.photos/id/245/300/200',
        ]
    },
    {
        name: "UD2021",
        description: "This is the fourth project.",
        mainImage: "https://example.com/image4.jpg",
        imgs: [
            'https://picsum.photos/id/249/300/200',
        ]
    },
    {
        name: "UD2024",
        description: "This is the first project.",
        mainImage: "https://example.com/image1.jpg",
        imgs: [
            'https://picsum.photos/id/237/300/200',
        ]
    },
    {
        name: "UD2023",
        description: "This is the second project.",
        mainImage: "https://example.com/image2.jpg",
        imgs: [
            'https://picsum.photos/id/241/300/200',
        ]
    },
    {
        name: "UD2022",
        description: "This is the third project.",
        mainImage: "https://example.com/image3.jpg",
        imgs: [
            'https://picsum.photos/id/245/300/200',
        ]
    },
    {
        name: "UD2021",
        description: "This is the fourth project.",
        mainImage: "https://example.com/image4.jpg",
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
            <h2>${project.name}</h2>
            <p>${project.description}</p>
            <img src="${project.mainImage}" alt="${project.name} main image" class="main_image">
        `;
        document.querySelector('#project_preview_container').appendChild(projectPreview);
    });
}

// loadProjectPreviews();