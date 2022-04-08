// Variable qui contient l'url de notre requetes
let url = "https://picsum.photos/v2/list?limit=4";
let urlL10 = "https://picsum.photos/v2/list?limit=10";
let urlL50 = "https://picsum.photos/v2/list?limit=50";


/**
 * FETCH ET LES PROMESSE
 * lorsque l'on souhaite interoger une API pour récuperer des données on utilis fetch
 * fetch démarre le chargement d'une ressource sur le réseaux et retourne une promesse
 * 
 * Si en faisant des essaie vous avez des erreur cors et que plus rien ne fonctionne 
 * Relancer votre navigateur il peut s'agir d'un bug de celui-ci
 * 
 */

//initialisation de notre fetch qui est dans une fonction
let getImages = async () => {
    //On affecte la reponse du fetch à une variable
   let response = await fetch(`${urlL10}`);
   
    //Si la réponse est ok alors on la transforme en JSON
    if(response.ok){
        response = response.json();
        console.log(response);
        //On retourne notre réponse 
        return Promise.resolve(response);
    }else{
        //Si la réponse n'est pas bonne alors on retourne 
        //une erreur
        return Promise.reject("La requete n'a pas aboutie")
    }
}


//On lance notre fetch et then on la traite
getImages().then( (response) =>{
    var images = response;
    console.table(images);
    images.forEach(image => {

        //conversion de la taille de mon image, on cherche le width et height dans la String
        // et on la remplace par 600
            imageUrl = image.download_url;
            imageUrl = image.download_url.replace(image.width, "600").replace(image.height, "600");
            console.log(imageUrl)
            createCard();
            fillCard(imageUrl, image.author, image.url)
            appendCard();
    });
});

//selection de notre section
let sectionSelector = document.querySelector(".all-images")
let article , author, image, originalUrl, main, aside, button;

function createCard(){
    button = document.createElement("button")
    main = document.createElement("main");
    aside = document.createElement("aside")
    article = document.createElement("article");
    image = document.createElement("img");
    author = document.createElement("p");
    originalUrl = document.createElement("a");
}

function fillCard(imageUrlApi, authorNameApi, originalUrlApi){
    image.setAttribute("src", imageUrlApi);
    author.textContent = authorNameApi;
    originalUrl.setAttribute("href", originalUrlApi);
    button.textContent = "Visit";
}

function appendCard(){
    sectionSelector.append(article);
    article.append(main)
    article.append(aside);
    aside.append(image);
    main.append(author)
    main.append(originalUrl)
    originalUrl.append(button)

}