let indexMainImage = 1;
document.addEventListener('DOMContentLoaded', function(event) {
    let images= document.querySelectorAll('section.images img');
    let compteur= 1 ;
    console.log(images.length);
    images.forEach(function (element, index){
        console.log(element,index);
        element.classList.add('image_' + index);

        let parent = element.parentElement;
        // parent.classList.forEach(function(item){
        //     console.log(item);
        //     if(item == 'main') {
        //         indexMainImage = index ;
        //     }
        // });
    });
});

let buttons_slideshow = document.querySelectorAll('.button');
buttons_slideshow.forEach(function (element){
    element.addEventListener('click', function (event) {
        console.log('boutton cliqué');
        let btn = event.target;
        let nbimage= document.querySelectorAll('section.images img').length ;
        let sens = '';
        if (btn.classList.contains('button-right')) {
            console.log("on se déplace à droite");
            indexMainImage = 2 ;
            console.log(indexMainImage);
            sens = "droite";
        } else {
            console.log("on se déplace à gauche");
            indexMainImage = 0 ;
            sens = "gauche";
        }
        decalleImages(indexMainImage, sens);
     });
})

function decalleImages(newMainImage, sens) {
    let divs= document.querySelectorAll('section.images div');

        // animateEl(mainDiv);
        // animateEl(divGauche);
        // animateEl(divDroite);

     animateEl(sens);

     setTimeout(function(){
         for (let i =0; i<divs.length; i++) {
             divs[i].className= '' ;
         }
         let section = document.querySelector('section.images');
         section.innerHTML = '';

         let divGauche = divs[(newMainImage + divs.length- 1) % divs.length];
         let mainDiv = divs[(newMainImage + divs.length) % divs.length];
         let divDroite = divs[(newMainImage + divs.length + 1) % divs.length];

         divGauche.className = "leftmain";
         divDroite.className = "rightmain";
         mainDiv.className = "main";
         section.appendChild(divGauche);
         section.appendChild(mainDiv);
         section.appendChild(divDroite);

         divs.forEach(function(item) {
             if (item !== divGauche && item !== divDroite && item !== mainDiv) {
                 item.className = "cache";
                 section.appendChild(item);
             }
         })
     },500);
}

 function animateEl(sens)
{

    let divs = document.querySelectorAll(".images div")
    // console.log(el.querySelector("img"));
    // console.log(el.querySelector("img").width);
    divs.forEach(function (element) {
        let transX;
        if (sens === 'droite') {
             transX = "translateX(+"+element.querySelector("img").width+"px)";
        } else {
             transX = "translateX(-"+element.querySelector("img").width+"px)";
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