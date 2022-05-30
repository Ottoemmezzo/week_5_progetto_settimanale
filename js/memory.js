let arrayAnimali = ['🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐰', '🐯', '🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐯', '🐰'];
//libreria per icone
//https://html-css-js.com/html/character-codes/


let arrayComparison = [];
let counter=12,secGioco=0,minGioco=0;
document.body.onload = startGame();

// mi serviranno alcune variabili 1. interval 2. una agganciata alla classe find 
// 3. una agganciata al'id modal 4. una agganciata alla classe timer


//una funzione che serve a mescolare in modo random gli elementi dell'array che viene passato 
// (l'array contiene le icone degli animali)
function shuffle(a) {
    var currentIndex = a.length;
    var temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = a[currentIndex];
        a[currentIndex] = a[randomIndex];
        a[randomIndex] = temporaryValue;
    }
    return a;
}
// una funzione che rimuove la classe active e chiama la funzione startGame()

// la funzione startGame che pulisce il timer, dichiara un array vuoto, mescola casualmente l'array degli animali
// (var arrayShuffle = shuffle(arrayAnimali);), aggancia il contenitore con id griglia, 
// pulisce tutti gli elementi che eventualmente contiene
// poi fa ciclo per creare i 24 div child -> aggiunge la class e l'elemento dell'array in base all'indice progressivo
// chiama la funzione timer e associa a tutti gli elementi (div) di classe icon l'evento click e le due funzioni definit sotto

function startGame()
{
    let  arrayShuffle=[], icone=[];
    console.log("inizio!");
    arrayShuffle=shuffle(arrayAnimali);
    
    /*for(let i=0; i<24; i++)
    {
        grill=document.getElementById('griglia');
        grill.innerHTML+='<div onclick="displayIcon()"><i class="icon">'+arrayShuffle [i]+'</i></div>';
     
    }*/
    let grill=document.querySelector('#griglia');
    console.log(grill);
    for(let i=0; i<24; i++)
    {
        
        icona=document.createElement("div");
        icona.id="card"+i;
        icona.addEventListener("click",displayIcon);
        icona.innerHTML='<i class="icon" >'+arrayShuffle[i]+'</i>';
        

        grill.appendChild(icona);
        
         

    }
    setInterval(aggiornaTimer,1000);

}
function aggiornaTimer()
{
 
 if(++secGioco===60)
 {
     minGioco++;
     secGioco=0;
 }
 document.querySelector(".timer").innerHTML="Tempo: " +minGioco+" min "+secGioco+" sec";
}


function displayIcon() {
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];

    /*
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    è uguale a 
    var icons = document.getElementsByClassName("icon");
    //var icons = [...icon];
    è un operatore che serve per passare un array come argomento:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax 
    https://www.tutorialspoint.com/es6/es6_operators.htm (cerca spread nella pagina)
    */
    console.log('ora:'+this);
    //mette/toglie la classe show
    this.classList.toggle("show");
    let icona=this.firstChild;
    icona.style.opacity="1";
    console.log('i:'+icona);

     //aggiunge l'oggetto su cui ha cliccato all'array del confronto
    arrayComparison.push(this);

    var len = arrayComparison.length;
    console.log(len);
    //se nel confronto ci sono due elementi
    if (len === 2) {
        //se sono uguali aggiunge la classe find
        if (arrayComparison[0].innerText === arrayComparison[1].innerText) {
            arrayComparison[0].classList.add("find", "disabled");
            arrayComparison[1].classList.add("find", "disabled");
            arrayComparison = [];
            if(--counter===0){
                theEnd();
            }
            
        } else {
            //altrimenti (ha sbagliato) aggiunge solo la classe disabled
            icons.forEach(function(item) {
                item.classList.add('disabled');
            });
            // con il timeout rimuove  la classe show per nasconderli
            setTimeout(function() {
                /*arrayComparison[0].classList.remove("show");
                arrayComparison[1].classList.remove("show");*/
                arrayComparison[0].firstChild.style.opacity="0";
                arrayComparison[1].firstChild.style.opacity="0";
                icons.forEach(function(item) {
                    item.classList.remove('disabled');
                    /*for (var i = 0; i < arrayComparison.length; i++) {
                        arrayComparison[i].classList.add("disabled");
                    }*/
                });
                arrayComparison = [];
            }, 700);
        }
    }
}

//una funzione che viene mostrata alla fine quando sono tutte le risposte esatte
function theEnd()
{
    document.querySelector("#modal").classList.toggle("active");
    document.querySelector("#tempoTrascorso").innerHTML+=" "+minGioco+" min"+secGioco+"  sec";
}
function playAgain()
{
    location.reload();
}
// una funzione che nasconde la modale alla fine e riavvia il gioco

// una funzione che calcola il tempo e aggiorna il contenitore sotto
