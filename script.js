//Para rellenar el HTML
const nav = document.querySelector("nav");
const ul = document.querySelector("ul");

const section1 = document.querySelector("#section-1");
const skills = document.querySelector(".skills");
const projectsDiv = document.querySelector(".projects");

const requestURL = "./data.json";

const request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";

request.onload = function () {
    const portfolio = request.response;
    populateNav(portfolio);
    populateAboutMe(portfolio);
    populateSkills(portfolio)
    populateProjects(portfolio)
}

request.send();

function populateNav(jsonObj){
    const myLogo = jsonObj.logo;
    const aLogoElement = document.createElement("a");
    const imageElement = document.createElement("img");

    imageElement.className = "logo";
    imageElement.src = myLogo;

    aLogoElement.href = "#section-1"
    aLogoElement.appendChild(imageElement);
    nav.appendChild(aLogoElement);

    const buttonMenuHam = document.querySelector(".menu-button");

    const menuHam = document.createElement("img");
    menuHam.className = "menu-ham"
    const menuHamIMG = jsonObj.hamMenu;
    menuHam.src = menuHamIMG;
    buttonMenuHam.appendChild(menuHam);

    const closeMenu = document.createElement("img");
    closeMenu.className = "menu-closed";
    const closeMenuIMG = jsonObj.closeHamMenu;
    closeMenu.src = closeMenuIMG;
    buttonMenuHam.appendChild(closeMenu);
}

function populateAboutMe(jsonObj) {
    const myProfilePicture = document.createElement("img");
    myProfilePicture.src = jsonObj.profilePicture;
    myProfilePicture.className = "profile-picture"
    section1.appendChild(myProfilePicture);

    const myH1 = document.createElement("h1");
    myH1.textContent = jsonObj.name;
    section1.appendChild(myH1);

    const myH3 = document.createElement("h3");
    myH3.textContent = jsonObj.profession;
    section1.appendChild(myH3);

    const myPara = document.createElement("p");
    myPara.textContent = jsonObj.aboutMe;
    section1.appendChild(myPara);

}

function populateSkills(jsonObj) {
    for(i = 0; i < jsonObj.skills.length; i++){
        const skillName = jsonObj.skills[i].language;
        const skillExperience = jsonObj.skills[i].experience;
        const skillPhoto = jsonObj.skills[i].languagePhoto;
        
        const skillsDivElement = document.createElement("div");
        const skillNameElement = document.createElement("h2");
        const skillExperienceElement = document.createElement("p");
        const skillPhotoElement = document.createElement("img");

        skillNameElement.textContent = skillName;
        skillExperienceElement.textContent = skillExperience;
        skillPhotoElement.src = skillPhoto;

        skillPhotoElement.className = `${skillName}`

        skillsDivElement.appendChild(skillPhotoElement);
        skillsDivElement.appendChild(skillNameElement);
        skillsDivElement.appendChild(skillExperienceElement);

        skills.appendChild(skillsDivElement)
    
    }
}

function populateProjects(jsonObj) {
    for(i = 0; i < jsonObj.projects.length; i++){
        const projectIMG = jsonObj.projects[i].projectIMG;
        const projectName = jsonObj.projects[i].projectName;
        const languagesUsed = jsonObj.projects[i].languagesUsed;
        
        const projectDivElement = document.createElement("div");
        const linkElement = document.createElement("a");
        const projectIMGElement = document.createElement("img");
        const projectNameElement = document.createElement("h2");
        const languagesUsedElement = document.createElement("p");

        projectIMGElement.src = projectIMG;
        projectNameElement.textContent = projectName;
        languagesUsedElement.textContent = languagesUsed;
        linkElement.href = jsonObj.projects[i].projectLink;

        linkElement.appendChild(projectIMGElement);

        projectDivElement.appendChild(linkElement);
        projectDivElement.appendChild(projectNameElement);
        projectDivElement.appendChild(languagesUsedElement);

        projectsDiv.appendChild(projectDivElement);
       
    }
}

//Menú hamburguesa
const buttonMenuHam = document.querySelector(".menu-button");

buttonMenuHam.addEventListener('click', hamburguerMenu);

let counter = 0;
let hamOpened = false;

function hamburguerMenu(){
    ul.classList.toggle('activo');

    const menuHam = document.querySelector(".menu-ham");
    menuHam.classList.toggle('activo');

    const closeHamMenu = document.querySelector(".menu-closed")
    closeHamMenu.classList.toggle('activo');

    counter++

    if(counter === 1){
        hamOpened = true;
    }else{
        hamOpened = false;
        counter = 0;
    }
};

addEventListener("resize", hamMenuCheck);

function hamMenuCheck() {
    let width = window.innerWidth;
    
    if(hamOpened){
        if(width >= 1200){
            hamOpened = false;
            counter = 0;

            ul.classList.toggle('activo');

            const menuHam = document.querySelector(".menu-ham");
            menuHam.classList.toggle('activo');

            const closeHamMenu = document.querySelector(".menu-closed")
            closeHamMenu.classList.toggle('activo');
        }
    }
}

//Validación de formulario

let name = document.querySelector('#nombre');
let email = document.querySelector('#email');
let text = document.querySelector('#info');
let warnings = document.querySelector('#form-warnings');
let formSent = document.querySelector('#form-sent');

const form = document.getElementById('form');

const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

form.addEventListener("submit", e=>{
    
    e.preventDefault();
    let warningsText = "";

    if(name.value.length < 4){
        warningsText += 'El nombre no es válido<br>'
    }
    if(!emailRegEx.test(email.value)){
        warningsText += 'El email no es válido<br>'
    }
    if(text.value.length < 20){
        warningsText += 'El texto no es válido'
    }
    warnings.innerHTML = warningsText;

    //Cuando se haya enviado correctamente
    if(warningsText.length === 0){
        formSent.innerHTML = 'Se ha enviado correctamente';
    }else{
        formSent.innerHTML = '';
    }
});


