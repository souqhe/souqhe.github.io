let listeImage = document.querySelectorAll('section.images img').length ;
console.log(listeImage);

let MainImage = 1;

let buttons_slideshow = document.querySelectorAll('.button');
buttons_slideshow.forEach(function (element){
    element.addEventListener('click', function (event) {
        console.log('boutton cliqué');
        let btn = event.target;
        let sens = '';
        if (btn.classList.contains('button-right')) {
            console.log("on se déplace à droite");
            if(MainImage == listeImage -1 ) {
                MainImage = 0 ;
                console.log(MainImage);
                sens = "droite";
            } else {
                MainImage = MainImage + 1 ;
                console.log(MainImage);
                sens = "droite";
            }
        } else {
            console.log("on se déplace à gauche");
            if(MainImage == 0 ) {
                MainImage = listeImage ;
                console.log(MainImage);
                sens = "gauche";
            } else {
                MainImage = MainImage - 1 ;
                console.log(MainImage);
                sens = "gauche";
            }
            };
            decalleImages(MainImage, sens)
        });
    });


function decalleImages(MainImage, sens) {
    let divs= document.querySelectorAll('section.images div');
    animateEl(sens);
    setTimeout(function(){
        for (let i =0; i<divs.length; i++) {
            divs[i].className= '' ;
        }
        let section = document.querySelector('section.images');
        section.innerHTML = '';

        let divGauche = divs[(MainImage + divs.length- 1) % divs.length];
        let mainDiv = divs[(MainImage + divs.length) % divs.length];
        let divDroite = divs[(MainImage + divs.length + 1) % divs.length];

        divGauche.className = "mainleft";
        divDroite.className = "mainright";
        mainDiv.className = "main";

        section.appendChild(divGauche);
        section.appendChild(mainDiv);
        section.appendChild(divDroite);

        divs.forEach(function(item) {
            if (item !== divGauche && item !== divDroite && item !== mainDiv) {
                item.className = "autres";
                section.appendChild(item);
            }
        })
    },500);
}

function animateEl(sens) {
    let divs = document.querySelectorAll(".images div")
    divs.forEach(function (element) {
        let transX;
        if (sens === 'droite') {
            // transX = "translateX(+"+(element.querySelector("img").width)/ 2 +"px)";
            transX = "translateX(+230px)";
        } else {
            transX = "translateX(-230px)";

        }
        element.animate(
            [
                // étapes/keyframes
                { transform: "translateX(0px)" },
                { transform: transX },
            ],
            {
                // temporisation
                duration: 500,
                delay: 0,
                iterations: 1,
                easing: "cubic-bezier(0,0.17,0.17,0.99)",
            },
        );
    })
}