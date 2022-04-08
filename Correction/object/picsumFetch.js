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
    images.forEach(image => {
        let card = new Card(image.download_url, image.author, image.url, image.width, image.height)
        card.createCard();
        let imageUrl = card.resizeImage(card.imageUrl,card.width, card.height);
        card.fillCard(imageUrl, card.imageAuthor, card.imageUnsplashUrl);
        card.appendCard();
    });
});
let article , author, image, originalUrl, main, aside, button;

let sectionSelector = document.querySelector(".all-images");

class Card{
    constructor(imageUrl, imageAuthor, imageUnsplashUrl, imageWidth, imageHeight){
        this.imageUrl = imageUrl,
        this.imageAuthor = imageAuthor,
        this.imageUnsplashUrl = imageUnsplashUrl,
        this.imageWidth = imageWidth,
        this.imageHeight = imageHeight
    }

    resizeImage(image, width, height){
        console.log("avant" + image)
         image = image.replace(width, "600").replace(height, "600");
         console.log("après" + image)
        return image;
    }

    createCard(){
        button = document.createElement("button")
        main = document.createElement("main");
        aside = document.createElement("aside")
        article = document.createElement("article");
        image = document.createElement("img");
        author = document.createElement("p");
        originalUrl = document.createElement("a");
    }

    fillCard(imageUrl, imageAuthor, imageUnsplashUrl){
        image.setAttribute("src", imageUrl);
        author.textContent = imageAuthor;
        originalUrl.setAttribute("href", imageUnsplashUrl);
        button.textContent = "Visit";
    }

    appendCard(){
        sectionSelector.append(article);
        article.append(main)
        article.append(aside);
        aside.append(image);
        main.append(author)
        main.append(originalUrl)
        originalUrl.append(button)
    }
}


