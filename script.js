var block = false;
var timer;
var ele = document.getElementById('timer');
var end = false;
var sec = 60;
var startsec= 0;

let text = ''; // Глобальная переменная для текста
let typed_text = '';
let current = '';
let nextChar = '';
let iswrongchartypedtwotimes = 0;
let isover = false;

const text_type = document.getElementById("type_text");
const typed_text_element = document.getElementById("typed_text");
const crnt_txt = document.getElementById("current_text");
const type_mark = document.getElementById("type_mark");

function updateTypeMarkPosition() {
    type_mark.classList.remove('hide');
    const currentTextLeft = crnt_txt.offsetLeft;
    const symbolwidth = crnt_txt.offsetWidth;
    const currentTextTop = crnt_txt.offsetTop;
    type_mark.style.left = `${currentTextLeft + 10}px`;
    type_mark.style.top = `${currentTextTop - 2}px`;
}

function ifover() {
    if (crnt_txt.classList.contains('active') == false) {
        typed_text += current;
        typed_text_element.textContent = typed_text;
    }
    crnt_txt.textContent = '';
    current = '';
    typed_text_element.classList.add("active");
    text_type.textContent = " Тест окончен!";
    isover = true;
    type_mark.classList.add('hide');
    result_of_type.textContent = "Ваш результат :" + typed_text.length*(60/startsec) + "знаков /" + 60 + " сек.!";
}

document.addEventListener("keydown", function (event) {
    if (isover) {
        return; // Если тест окончен, не реагировать на нажатия
    }
    nextChar = text[0];
    if (text.length > 1) {
        if (["Shift", "Alt", "Tab", "F5", "Control"].includes(event.key)) {
            return;
        } else {
            if (!timer) {
                settimer(); // Start the timer when the first key is pressed
            }
        }
        if (startsec==0){
            startsec=sec;
        }
        if (event.key === nextChar) {
            crnt_txt.classList.remove('active');
            if (iswrongchartypedtwotimes == 0) {
                typed_text += current;
                typed_text_element.textContent = typed_text;
            }
            text_type.textContent = text.slice(1);
            text = text.slice(1);
            crnt_txt.textContent = nextChar;
            current = nextChar;
            iswrongchartypedtwotimes = 0;
            updateTypeMarkPosition();
        } else if (iswrongchartypedtwotimes == 0) {
            text_type.textContent = text.slice(1);
            typed_text += current;
            typed_text_element.textContent = typed_text;
            crnt_txt.textContent = nextChar;
            current = nextChar;
            crnt_txt.classList.add('active');
            iswrongchartypedtwotimes = 1;
        }
    } else if (!isover) {
        if (event.key === nextChar) {
            ifover();
        }
    }
});
function timeset() {
    ele.innerHTML = '00:' + (sec < 10 ? '0' + sec : sec);
    if (sec < 0) {
        sec = 0;
        ele.innerHTML = '00:00';
        return false;
    }
    if (sec < 10) {
        ele.innerHTML = '00:0' + sec;
        return true;
    }
    else if (sec>=3600){
        return false;
    }
     else if (sec >= 60) {
        let minutes = Math.floor(sec / 60);
        let seconds = sec - minutes * 60;
        ele.innerHTML = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
        return true;
    } else {
        ele.innerHTML = '00:' + sec;
        return true;
    }
}

function cleantext() {
    typed_text = "";
    current = '';
    nextChar = '';
    iswrongchartypedtwotimes = 0;
    isover = false;
    clearInterval(timer);
    timer = null;
    document.getElementById("typed_text").textContent = '';
    document.getElementById("type_text").textContent = '';
    document.getElementById("current_text").textContent = '';
    document.getElementById("current_text").classList.remove('active');
    document.getElementById("type_mark").classList.add('hide');
    timeset();
}

function initialize_text() {
    result_of_type.textContent = "Ваш результат : __ знаков / 0 сек.!";

    cleantext();
    const numberoftexts = 2; // Задать количество текстов, не включительно
    const number = Math.floor(Math.random() * numberoftexts);
    if (number === 0) {
        text = 'Алтын-Эмель - национальный природный парк, расположенный в долине реки Или на территории Казахстана. Парк был основан 10 апреля 1996 года с целью сохранения уникального природного комплекса, археологических и историко-культурных памятников, редких и исчезающих видов растений и животных. На территории парка общей площадью 520 тыс. га можно встретить различные ландшафты: горный, песчано-пустынный, щебнистые, пустынные.';
    } else if (number === 1) {
        text = 'Достопримечательности Бурабая. Большинство мест курорта овеяно романтическими легендами и мифами. Гостям Бурабая предлагается посетить основные природные достопримечательности. На самой высокой вершине Северной части Казахстана Кокше располагается поляна Абылай-хана, на которой находится гранитная стела. Считается, что посещение этого места поможет улучшить самочувствие и напитать необыкновенной энергией.';
    }
    document.getElementById("type_text").textContent = text;
}

function minus_time() {
    if (timeset() && block==false){
        sec--;
        timeset();
    }
    // refresh_timer();
}

function plus_time() {
    if (timeset() && block==false){
        sec++;
        timeset();
    }
}

function plus_ten_time() {
    if (timeset() && block==false){
        sec+=10;
        timeset();
    }
}

function minus_ten_time() {
    if (timeset() && block==false){
        sec-=10;
        timeset();
    }
}

function settimer() {
    if (!end) {
        block = true;
        timer = setInterval(() => {
           
            if (sec <= 0) {
                clearInterval(timer);
                ele.innerHTML = '00:00';
                isover = true;
                type_mark.classList.add('hide');
                ifover();
            } else {
                timeset();
                sec--;
            }
        }, 1000);
        return;
    }
    else{
        block = false;
    }
}

function reset() {
    clearInterval(timer);
    ele.innerHTML = '00:60';
    sec = 60;
    type_mark.classList.add('hide');
    typed_text_element.classList.remove("active");
    timeset();
    initialize_text();
    block = false;
}

initialize_text();
