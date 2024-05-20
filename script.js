function hoverzoomout(card) {
    card.classList.add('active');
}
function hoverzoom(card) {
    card.classList.remove('active');
}
//eztype
const text_typing = document.getElementById("type_text");
const typed_text_element = document.getElementById("typed_text");
const crnt_txt = document.getElementById("current_text");

let typed_text = "";
let iswrongchartypedtwotimes = 0;
let text = text_typing.textContent;

let nextChar = "";

document.addEventListener("keydown", function (event) {
    if (text.length > 1) {
        nextChar = text[0];

        if (event.key === "Shift" || event.key === "Alt" || event.key === "Tab" || event.key === "F5") {
            return;
        }
        else if (event.key === nextChar) {
            typed_text += nextChar
            text_typing.textContent = text.slice(1);
            text = text.slice(1);
            typed_text_element.textContent = typed_text;
            iswrongchartypedtwotimes = 0;
            crnt_txt.textContent = "";

        }
        else if (iswrongchartypedtwotimes == 0) {
            console.log("Wrong detected !");
            crnt_txt.textContent = text[0];
            text_typing.textContent = text.slice(1);
            crnt_txt.classList.add('active');
            iswrongchartypedtwotimes = 1;
            return;
        }
    }
    else {
        text_typed.textContent = "Тест окончен!";
    }
});