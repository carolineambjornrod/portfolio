function loadProjectPreviews(){
    projects.forEach((project, index) => {
        const projectPreview = document.createElement("a");
        projectPreview.href = ``;
        projectPreview.classList.add("project_preview");
        projectPreview.id = project.title;
        projectPreview.innerHTML = `
            <div class="project_info_container">
                <h2>${project.title}</h2>
                <p>${project.subtitle}</p>
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
projectPreviewContainer.addEventListener('scroll', () => {
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

let projectOpen = false;

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
    setTimeout(() => {
        projectOpen = true;
    }, 300);

}
document.querySelector('#wrapper').addEventListener('click', (event) => {
    // Check if project details are open

    if (!checkIfClickIsInsideProjectDetails(event.target) && projectOpen) closeProjectDetails();
}, { passive: true });

function closeProjectDetails() {
    const activePreviews = document.querySelectorAll('.project_preview.active');
    const existingDetails = document.querySelector('.project_details_wrapper');
    if (existingDetails) {
        existingDetails.classList.add('remove')
        setTimeout(() => {
            existingDetails.remove();
            activePreviews.forEach(preview => {
                preview.classList.remove('active');
            });
        }, 200);
    }
    document.querySelector('body').classList.remove('blackout');
    projectOpen = false;
}

function checkIfClickIsInsideProjectDetails(target) {
    // check if elemnt is or has parent with class project_details
    let currentElement = target;
    while (currentElement) {
        if (currentElement.classList && currentElement.classList.contains('project_details')) {
            return true;
        }
        currentElement = currentElement.parentElement;
    }
    return false;
}

// add clickevent to nav_btns
document.querySelectorAll('.nav_btn').forEach(btn => {
    btn.addEventListener('click', (event) => {
        event.preventDefault();
        // Remove active class from all nav_btns
        document.querySelectorAll('.nav_btn').forEach(button => {
            button.classList.remove('active');
        });
        // Add active class to clicked nav_btn
        event.target.classList.add('active');
        const target = event.target.getAttribute('href');
        // Remove visible class from all content_sections

        if(projectOpen){
            setTimeout(() => {
                document.querySelectorAll('.content_section').forEach(section => {
                    section.classList.remove('visible');
                });    
                const targetSection = document.getElementById(target);
                if (targetSection) {
                    targetSection.classList.add('visible');
                }
            }, 800);
        } else {
            document.querySelectorAll('.content_section').forEach(section => {
                section.classList.remove('visible');
            });
            const targetSection = document.getElementById(target);
            if (targetSection) {
                targetSection.classList.add('visible');
            }
        }
        // Add visible class to target section
    });
});

class MouseTracking {
    constructor(containerSelector, followerSelector, inertia = 10) {
      this.$container = document.querySelector(containerSelector);
      this.$follower = document.querySelector(followerSelector);
      this.inertia = inertia > 0 ? inertia : 1;
  
      this.getDims();
      this.xPos = this.maxW / 2;
      this.yPos = this.maxH / 2;
      this.mouseX = this.maxW / 2;
      this.mouseY = this.maxH / 2;
  
      this.bindEvents();
      this.update();
    }
  
    getDims() {
      this.maxW = this.$container.clientWidth;
      this.maxH = this.$container.clientHeight;
  
      this.elemWidth = this.$follower.getBoundingClientRect().width;
      this.elemHeight = this.$follower.getBoundingClientRect().height;
    }
  
    onMouse(e) {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    }
  
    bindEvents() {
      window.onresize = () => {
        this.getDims();
      };
      this.$container.addEventListener("mousemove", this.onMouse.bind(this));
    }
  
    update() {
      let dX = this.mouseX - this.xPos - this.elemWidth / 2;
      let dY = this.mouseY - this.yPos - this.elemHeight / 2;
  
      this.xPos += dX / this.inertia;
      this.yPos += dY / this.inertia;
  
      this.xPrct = (100 * this.xPos) / this.maxW;
      this.yPrct = (100 * this.yPos) / this.maxH;
  
      this.$follower.style.transform =
        "translate3D(" + this.xPos + "px, " + this.yPos + "px, 0)";
  
      requestAnimationFrame(this.update.bind(this));
    }
  }
  
  new MouseTracking(".container", ".follower", 10);
  new MouseTracking(".container", ".point", 3);
  