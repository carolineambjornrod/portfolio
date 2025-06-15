function loadProjectPreviews(){
    projects.forEach((project, index) => {
        const projectPreview = document.createElement("div");
        projectPreview.classList.add("project_preview");
        projectPreview.id = project.title;
        projectPreview.innerHTML = `
            <div class="project_info_container">
                <h2>${project.title}</h2>
                <p>${project.subtitle}</p>
            </div>
            <div class="img_container">
                <img src="${project.cover}" alt="${project.title} main image" class="main_image">
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
            <button class="close_project_details" onclick="closeProjectDetails()">&#10005;</button>
            <div class="project_details_intro">
                <div>
                    <h2>${project.title}</h2>
                    <h3>${project.subtitle}</h3>
                </div>
                <div class="project_details_tags">
                    ${project.tags.map(tag => `<p>${tag}</p>`).join('')}
                </div>
            </div>
            <p class="project_description">${project.description}</p>
            <div class="project_media">
                ${project.media.map(media => `
                    ${media.src.includes('mp4') ? `
                        ${media.hasSound ? `
                            <div class="video_container ${media.width}">
                                <video controls playsinline ${media.poster ? `poster="${media.poster}"` : ''}>
                                    <source src="${media.src}" type="video/mp4">
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        ` : `
                            <div class="video_container ${media.width}">
                                <video onclick="toggleVideoPause(this)" autoplay muted playsinline loop>
                                    <source src="${media.src}" type="video/mp4">
                                    Your browser does not support the video tag.
                                </video>
                                <div class="video_hint">Click to toggle video</div>
                            </div>
                        `}
                    ` : `
                        <img src="${media.src}" alt="${media.alt}" class="project_details_image ${media.width}" loading="lazy">
                    `}
                `).join('')}
            </div>
            <div class="project_btns">
                <button class="back_to_overview" onclick="closeProjectDetails()">Back to projects</button>
                <button class="next_project" onclick="nextProject('${project.title}')">Next project</button>
            </div>
        </div>
    `;
    document.querySelector('#wrapper').appendChild(projectDetailsWrapper);
    setTimeout(() => {
        projectOpen = true;
    }, 300);
}

// function showProject(elem, project) {
//     const projectPreview = elem.closest('.project_preview');
//     projectPreview.classList.add('active');

//     const existingDetails = document.querySelector('.project_details');
//     if (existingDetails) {
//         existingDetails.remove();
//     }

//     document.querySelector('body').classList.add('blackout');

//     // Add loader
//     const loader = document.createElement("div");
//     loader.classList.add("project_loader");
//     loader.innerHTML = `<div class="spinner"></div>`;
//     document.querySelector('#wrapper').appendChild(loader);

//     // Create project details HTML
//     const projectDetailsWrapper = document.createElement("div");
//     projectDetailsWrapper.classList.add("project_details_wrapper");
//     projectDetailsWrapper.style.display = 'none'; // hide until ready

//     projectDetailsWrapper.innerHTML = `
//         <div class="project_details">
//             <button class="close_project_details" onclick="closeProjectDetails()">&#10005;</button>
//             <div class="project_details_intro">
//                 <div>
//                     <h2>${project.title}</h2>
//                     <h3>${project.subtitle}</h3>
//                 </div>
//                 <div class="project_details_tags">
//                     ${project.tags.map(tag => `<p>${tag}</p>`).join('')}
//                 </div>
//             </div>
//             <p class="project_description">${project.description}</p>
//             <div class="project_media">
//                 ${project.media.map(media => `
//                     ${media.src.includes('mp4') ? `
//                         ${media.hasSound ? `
//                             <div class="video_container ${media.width}">
//                                 <video controls playsinline onloadeddata="checkMediaLoaded()">
//                                     <source src="${media.src}" type="video/mp4">
//                                     Your browser does not support the video tag.
//                                 </video>
//                             </div>
//                         ` : `
//                             <div class="video_container ${media.width}">
//                                 <video onclick="toggleVideoPause(this)" autoplay muted playsinline loop onloadeddata="checkMediaLoaded()">
//                                     <source src="${media.src}" type="video/mp4">
//                                     Your browser does not support the video tag.
//                                 </video>
//                                 <div class="video_hint">Click to toggle video</div>
//                             </div>
//                         `}
//                     ` : `
//                         <img src="${media.src}" alt="${media.alt}" class="project_details_image ${media.width}" onload="checkMediaLoaded()">
//                     `}
//                 `).join('')}
//             </div>
//             <div class="project_btns">
//                 <button class="back_to_overview" onclick="closeProjectDetails()">Back to projects</button>
//                 <button class="next_project" onclick="nextProject('${project.title}')">Next project</button>
//             </div>
//         </div>
//     `;

//     document.querySelector('#wrapper').appendChild(projectDetailsWrapper);

//     // Counter to track media loading
//     let mediaCount = project.media.length;
//     window.checkMediaLoaded = function () {
//         console.log('Media loaded, remaining:', mediaCount);
//         mediaCount--;
//         if (mediaCount <= 0) {
//             showDetails();
//         }
//     };

//     // Fallback if media doesn't load
//     setTimeout(showDetails, 2000);

//     function showDetails() {
//         loader.remove();
//         projectDetailsWrapper.style.display = 'block';
//         setTimeout(() => {
//             projectOpen = true;
//         }, 300);
//     }
// }





function toggleVideoPause(video) {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
};
document.querySelector('#wrapper').addEventListener('click', (event) => {
    // Check if project details are open
    if (!checkIfClickIsInsideProjectDetails(event.target) && projectOpen) closeProjectDetails();
}, { passive: true });

function closeProjectDetails() {
    const activePreviews = document.querySelectorAll('.project_preview.active');
    const existingDetails = document.querySelectorAll('.project_details_wrapper');
    if (existingDetails) {
        existingDetails.forEach(details => {
            details.classList.add('remove')
        });
        setTimeout(() => {
            
            existingDetails.forEach(details => {
                details.remove();
            });
            activePreviews.forEach(preview => {
                preview.classList.remove('active');
            });
        }, 200);
    }
    document.querySelector('body').classList.remove('blackout');
    projectOpen = false;

    // Reset the URL to the main page
    if (window.history && window.history.pushState) {
        window.history.pushState({}, '', window.location.pathname);
    }
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
                setTimeout(() => {
                    const targetSection = document.getElementById(target);
                    if (targetSection) {
                        targetSection.classList.add('visible');
                    }
                }, 500);
            }, 800);
        } else {
            document.querySelectorAll('.content_section').forEach(section => {
                section.classList.remove('visible');
            });
            setTimeout(() => {
                const targetSection = document.getElementById(target);
                if (targetSection) {
                    targetSection.classList.add('visible');
                }
            }, 500);
        }
        // Add visible class to target section
    });
});

// Next project button functionality
function nextProject(currentTitle) {
    const currentIndex = projects.findIndex(project => project.title === currentTitle);
    if (currentIndex !== -1 && currentIndex < projects.length - 1) {
        const nextProject = projects[currentIndex + 1];
        const nextProjectPreview = document.getElementById(nextProject.title);
        if (nextProjectPreview) {
            showProject(nextProjectPreview, nextProject);
            // Update URL history
            window.history.pushState({ title: nextProject.title }, nextProject.title, `#${nextProject.title}`);
        }
    }
}

// Close project details when esc key is pressed
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && projectOpen) {
        closeProjectDetails();
    }
});

// Add case title to url history
if (window.history && window.history.pushState) {
    document.querySelectorAll('.project_preview').forEach(preview => {
        preview.addEventListener('click', (event) => {
            const projectTitle = event.target.closest('.project_preview').id;
            window.history.pushState({ title: projectTitle }, projectTitle, `#${projectTitle}`);
        });
    });
}
// when user goes back in history, check if there is a project title in the url
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.title) {
        const projectTitle = event.state.title;
        const projectPreview = document.getElementById(projectTitle);
        if (projectPreview) {
            showProject(projectPreview, projects.find(p => p.title === projectTitle));

            // Remove active class from all nav_btns
            document.querySelectorAll('.nav_btn').forEach(button => {
                button.classList.remove('active');
            });
            // Add active class to clicked nav_btn
            document.querySelector('#project_btn').classList.add('active');

            document.querySelectorAll('.content_section').forEach(section => {
                section.classList.remove('visible');
            });
            setTimeout(() => {
                const targetSection = document.getElementById('project_preview_container');
                if (targetSection) {
                    targetSection.classList.add('visible');
                }
            }, 500);
        } else {
            closeProjectDetails();
        }
    } else {
        closeProjectDetails();
    }
});

// dont show if user is on mobile
if(isMobile()){
    document.querySelector('.follower').style.display = 'none';
    document.querySelector('.point').style.display = 'none';
}
if(!isMobile()){
    function createMouseTracker(containerSelector, followerSelector, inertia = 10) {
        const $container = document.querySelector(containerSelector);
        const $follower = document.querySelector(followerSelector);
        inertia = inertia > 0 ? inertia : 1;
      
        let maxW, maxH, elemWidth, elemHeight;
        let xPos, yPos, mouseX, mouseY;
      
        function getDims() {
          maxW = $container.clientWidth;
          maxH = $container.clientHeight;
          const rect = $follower.getBoundingClientRect();
          elemWidth = rect.width;
          elemHeight = rect.height;
        }
      
        function onMouse(e) {
          mouseX = e.clientX;
          mouseY = e.clientY;
          document.querySelector('.follower').style.opacity = 1;
        document.querySelector('.point').style.opacity = 1;
        }
      
        function update() {
          const dX = mouseX - xPos - elemWidth / 2;
          const dY = mouseY - yPos - elemHeight / 2;
      
          xPos += dX / inertia;
          yPos += dY / inertia;
      
          $follower.style.transform = `translate3D(${xPos}px, ${yPos}px, 0)`;
      
          requestAnimationFrame(update);
        }
      
        // Initialize
        getDims();
        xPos = maxW / 2;
        yPos = maxH / 2;
        mouseX = maxW / 2;
        mouseY = maxH / 2;
      
        window.addEventListener('resize', getDims);
        $container.addEventListener('mousemove', onMouse);
      
        update();
      }
      
      // Usage:
      createMouseTracker(".container", ".follower", 7);
      createMouseTracker(".container", ".point", 1);
      
}
// Check if user is on mobile
function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
}