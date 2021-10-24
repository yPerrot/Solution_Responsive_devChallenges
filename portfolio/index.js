window.onload = function () {

    const technos = document.querySelectorAll(".techno");
    let selectedTechno = [];

    technos.forEach( e => {

        const changeState = function () {
            let state = this.dataset.state;
            if (state === 'off') {
                selectedTechno.push(this.dataset.techno);
                this.dataset.state = 'on';
            } else {
                selectedTechno = arrayRemove(selectedTechno, this.dataset.techno);
                this.dataset.state = 'off';
            }

            removeProject();
            loadProjects(selectedTechno);
        }
        changeState.bind(this);

        e.onclick = changeState;
    });


    function arrayRemove(arr, value) {   
        return arr.filter(function(ele){ 
            return ele != value; 
        });
    }

    loadProjects(selectedTechno);
}


// FIXME:
function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;
}

function loadProjects(selectedTechno = []) {
    const main = document.querySelector('main');

    const json_obj = JSON.parse(Get("./projects.json"));

    json_obj.projects.forEach(e => {

        const doPrint = selectedTechno.every( tag => {
            return e.tags.includes(tag);
        })

        if ( !doPrint) return;

        const article = document.createElement("article"); 
        article.classList.add("project")
        article.classList.add("card")
        
            const img = document.createElement("img"); 
            img.src = e.picture;
            article.appendChild(img);
            
            const content = document.createElement("div"); 
            content.classList.add("project__content")
            
            const tags = document.createElement("div"); 
            tags.classList.add("project__content__tags");

            e.tags.forEach( e => {
                article.dataset[e] = "true";
                
                const t = document.createElement("span"); 
                t.classList.add("project-tag")
                t.innerHTML = "#" + e;

                tags.appendChild(t);
            });

            content.appendChild(tags);

            const name = document.createElement("p"); 
            name.classList.add("project__content__name");
            name.innerHTML = e.name;

            content.appendChild(name);

            const description = document.createElement("p"); 
            description.classList.add("project__content__description");
            description.innerHTML = e.description;

            content.appendChild(description);

            const btns = document.createElement("div"); 
            btns.classList.add("project__content__btns");
            
            const demo = document.createElement("button"); 
            demo.classList.add("project-btn-demo");
            demo.innerHTML = `<a href="${e.demo}">Demo</a>`;

            btns.appendChild(demo);
            
            const code = document.createElement("button"); 
            code.classList.add("project-btn-code");
            code.innerHTML = `<a href="${e.code}">Code</a>`;

            btns.appendChild(code);

            content.appendChild(btns)

        article.appendChild(content);

        main.appendChild(article);
    })

    const nbProject = document.querySelector('#nb-project');
    nbProject.innerHTML = document.querySelectorAll('.project').length;
}

function removeProject() {
    const main = document.querySelector('main');
    const projects = document.querySelectorAll('.project');

    projects.forEach( project => {
        main.removeChild(project)
    })
}
