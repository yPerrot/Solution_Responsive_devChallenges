import {arrayRemove} from './utils.js'
import {loadProjects, removeProject} from './projects.js'

window.onload = function () {
    setUpProjectTags();
    loadProjects();
}

function setUpProjectTags() {
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
}