//A28F9D 74776B 5C574F 48483A 48483A
//https://goalscalling.com/winning-attitude-quotes/
let boxes= document.querySelectorAll(".box")
let page2= document.querySelector(".page2")
let resetbtn= document.querySelector(".resetbtn")
let main= document.querySelector(".main")

const winPattern= [
[0,1,2],
[0,3,6],
[0,4,8],
[1,4,7],
[2,5,8],
[2,4,6],
[3,4,5],
[6,7,8],
]
const quete= [ ` “Winning means being unafraid to lose.”
- Fran Tarkenton`,`“Sooner or later, those who win are those who think they can.”
- Paul Turnier`,`“With ordinary talent and extraordinary perseverance, all things are attainable.”
- Sir Thomas Buxton`,`“Winning doesn’t always mean being first. Winning means you’re doing better than you’ve ever done before.”
- Bonnie Blair`,` “A positive attitude gives you power over your circumstances instead of your circumstances having power over you.”
– Joyce Meyer`

]
let i=0;

console.log(quete[0]);

resetbtn.addEventListener("click", () => {
    boxes.forEach(box => {
        box.textContent = ""; // Clear content
        box.disabled = false; // Re-enable the box
    });
    userX = true; // Reset turn to "X"
});

let userX=true;
boxes.forEach(box => {
    box.addEventListener('click',()=>{
       
        if(userX){
           box.textContent="X"
            
        }else{
            box.textContent="O" 
        }
        box.disabled="true"
        userX=!userX;
       checkWinner();
    })

    
});

const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].textContent;
        let pos2Val = boxes[pattern[1]].textContent;
        let pos3Val = boxes[pattern[2]].textContent;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                // Winning logic
                page2.classList.remove("page2Hide");
                main.classList.add("mainHide");
                i = Math.floor(Math.random() * quete.length);
                page2.innerHTML = `<h1> Congratulation! User "<b> ${pos1Val} </b>" Win</h1>
                <h4>${quete[i]}</h4> <button id="playbtn">New Game</button>`;
                
                // New Game button logic
                let playbtn = document.getElementById("playbtn");
                playbtn.addEventListener('click', () => {
                    main.classList.remove("mainHide");
                    boxes.forEach(box => {
                        box.textContent = ""; // Clear content
                        box.disabled = false; // Re-enable the box
                    });
                    userX = true; // Reset turn to "X"
                    page2.classList.add("page2Hide");
                });
                return; // Exit the function after a win is found
            }
        }
    }

    // Check for draw condition
    if ([...boxes].every(box => box.textContent !== "")) {
        page2.classList.remove("page2Hide");
        main.classList.add("mainHide");
        page2.innerHTML = `<h1>It's a Draw!</h1>
        <h4>Try Again!</h4> <button id="playbtn">New Game</button>`;
        
        // New Game button logic
        let playbtn = document.getElementById("playbtn");
        playbtn.addEventListener('click', () => {
            main.classList.remove("mainHide");
            boxes.forEach(box => {
                box.textContent = ""; // Clear content
                box.disabled = false; // Re-enable the box
            });
            userX = true; // Reset turn to "X"
            page2.classList.add("page2Hide");
        });
    }
};

