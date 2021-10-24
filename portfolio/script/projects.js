import { readJsonFile } from './utils.js'

export async function loadProjects(selectedTechno = []) {

    const data = await readJsonFile('../assets/data.json');

    data.projects.forEach(e => {
        const doPrint = selectedTechno.every( tag => {
            return e.tags.includes(tag);
        })

        if ( !doPrint) return;

        appendProject(e);
    })

    const nbProject = document.querySelector('#nb-project');
    nbProject.innerHTML = document.querySelectorAll('.project').length;
}

export function removeProject() {
    const main = document.querySelector('main');
    const projects = document.querySelectorAll('.project');

    projects.forEach( project => {
        main.removeChild(project);
    })
}

function appendProject(project) {

    const main = document.querySelector('main');
    
    const article = document.createElement("article"); 
    article.classList.add("project")
    article.classList.add("card")
    
    const img = document.createElement("img"); 
    img.src = project.picture;
    article.appendChild(img);
    
    const content = document.createElement("div"); 
    content.classList.add("project__content")
    
    const tags = document.createElement("div"); 
    tags.classList.add("project__content__tags");

    project.tags.forEach( e => {
        article.dataset[e] = "true";
        
        const t = document.createElement("span"); 
        t.classList.add("project-tag")
        t.innerHTML = "#" + e;

        tags.appendChild(t);
    });

    content.appendChild(tags);

    const name = document.createElement("p"); 
    name.classList.add("project__content__name");
    name.innerHTML = project.name;

    content.appendChild(name);

    const description = document.createElement("p"); 
    description.classList.add("project__content__description");
    description.innerHTML = project.description;

    content.appendChild(description);

    const btns = document.createElement("div"); 
    btns.classList.add("project__content__btns");
    
    const demo = document.createElement("button"); 
    demo.classList.add("project-btn-demo");
    demo.innerHTML = `<a href="${project.demo}">Demo</a>`;

    btns.appendChild(demo);
    
    const code = document.createElement("button"); 
    code.classList.add("project-btn-code");
    code.innerHTML = `<a href="${project.code}">Code</a>`;

    btns.appendChild(code);

    content.appendChild(btns)

    article.appendChild(content);

    main.appendChild(article);

}