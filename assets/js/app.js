
let request = async () => {
    const response = await fetch(`https://picsum.photos/v2/list?page=40&limit=8`);
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
let article, paragraf, box , image, auteur, bouton;

function createElements(){
    article = document.createElement("article");
    paragraf = document.createElement("p");
    auteur = document.createElement("h2");
    image= document.createElement("img");
    bouton = document.createElement("a");
    box = document.createElement("aside")
};

function cardElements(author, imgId, boutonUrl){
    auteur.textContent = author;
    image.src = `https://picsum.photos/id/${imgId}/600/600`;
    bouton.textContent = "Visit";
    bouton.href = boutonUrl;

}

function appendElements(){
    sectionSelect.append(article);
    article.append(paragraf);
    article.append(box);
    paragraf.append(auteur);
    paragraf.append(bouton);
    box.append(image); 


}

function createPic(author, imgId, boutonUrl){
    createElements();
    cardElements(author, imgId, boutonUrl);
    appendElements();

}



