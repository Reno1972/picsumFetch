let request = async () => {
    const response = await fetch(`https://picsum.photos/v2/list?page=40&limit=4`);
    if (response.ok) {
        let json = response.json();
        return Promise.resolve(json);
    } else {
        return Promise.reject("La requete n'a pas fonctionné");
    }
};

request().then(response => {
    console.table(response);

    var pictures = response;
    console.table(pictures);
    pictures.forEach(picture => {
        createPic(picture.author, picture.id, picture.url)
    });
})

let sectionSelect = document.querySelector("section");
let article , image, auteur, bouton;

function createElements(){
    article = document.createElement("article");
    auteur = document.createElement("h1");
    image= document.createElement("img");
    bouton = document.createElement("a");
};

function cardElements(author, imgId, boutonUrl){
    auteur.textContent = author;
    image.src = `https://picsum.photos/id/${imgId}/600/600`;
    bouton.textContent = "Voir original";
    bouton.href = boutonUrl;

}

function appendElements(){
    sectionSelect.append(article);
    article.append(image); 
    article.append(auteur);
    article.append(bouton);
}

function createPic(author, imgId, boutonUrl){
    createElements();
    cardElements(author, imgId, boutonUrl);
    appendElements();

}



