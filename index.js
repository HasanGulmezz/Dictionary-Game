function konfetiPatlat() {
    // Canvas öğesini oluştur ve body'ye ekle
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

    let confettis = [];
    const numConfettis = 150; // Konfeti sayısı

    class Confetto {
        constructor(x, y, velocityX, velocityY) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 8 + 2; // 2 ile 10 px arasında rastgele boyut
            this.colors = ["white", "lightpink", "purple"];
            this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
            this.velocityX = velocityX;
            this.velocityY = velocityY;
            this.gravity = 0.1;
            this.drag = 0.95;
            this.opacity = 1; // Yavaşça kaybolma efekti için
        }

        draw() {
            ctx.globalAlpha = this.opacity; // Opaklık uygula
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1; // Geri sıfırla
        }

        update() {
            this.x += this.velocityX;
            this.y += this.velocityY;
            this.velocityY += this.gravity;
            this.velocityX *= this.drag;
            this.velocityY *= this.drag;
            this.opacity -= 0.002; // Yavaşça kaybolma efekti

            // Küçüldüğünde listeden kaldır
            if (this.opacity <= 0) {
                return false;
            }
            return true;
        }
    }

    // Konfetileri oluştur
    for (let i = 0; i < numConfettis; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height * 0.3; // Üst kısımdan başlasın
        let velocityX = (Math.random() - 0.5) * 5;
        let velocityY = Math.random() * 3 + 1;
        confettis.push(new Confetto(x, y, velocityX, velocityY));
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confettis = confettis.filter(confetto => {
            confetto.update();
            confetto.draw();
            return confetto.opacity > 0;
        });

        if (confettis.length > 0) {
            requestAnimationFrame(animate);
        } else {
            document.body.removeChild(canvas);
        }
    }

    animate();
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        if (start_button.style.display !== "none") {
            start_button.click();
        } 
        else if (check_button.style.display !== "none") {
            check_button.click();
        } 
        else if (next_button.style.display !== "none") {
            next_button.click();
        }
        else if (end_button.style.display !== "none") {
            end_button.click();
        }
    }
});


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // Rastgele bir index seç
        [array[i], array[j]] = [array[j], array[i]]; // Swap işlemi (değiştir)
    }
    return array;
}
let dict = {
    "Goverment": "Hükümet",
    "Confident": "Kendinden emin",
    "Behave"   : "Davranış",
    }

let shuffled = shuffleArray(Object.keys(dict));
let counter = 0;
let len = shuffled.length;
let results = [];
results.push("<b>Kelime:   ✔Doğru Cevap   ❌Cevabınız</b>");


const start_text = document.getElementById("start_text");
const start_button = document.getElementById("start_button");
const check_button = document.getElementById("check_button");
const next_button = document.getElementById("next_button");
const end_button = document.getElementById("end_button");
const result_button = document.getElementById("result_button");
const main_block = document.getElementById("main_block");
const word = document.getElementById("word"); 
const user_answer = document.getElementById("answer");
const boolean_text = document.getElementById("boolean_text");
const end_text = document.getElementById("end_text");
const score = document.getElementById("score");
const result_text = document.getElementById("result_text");

function start(){
    start_text.style.display = "none";
    start_button.style.display = "none";
    score.textContent = "Skor: " + counter + "/" + len ;
    main_block.style.display = "block";
    word.textContent = shuffled[0]; 
    check_button.style.display = "block";
    user_answer.focus();
}
function check(){
 if (user_answer.value.trim() === "") {
    user_answer.focus();
}
 else{
    if (user_answer.value.toLowerCase() == dict[shuffled[0]].toLowerCase()) {
        boolean_text.style.display = "block";
        boolean_text.textContent = "Doğru";
        boolean_text.style.color = "green"
        counter += 1;
    } else {
        boolean_text.style.display = "block";   
        boolean_text.textContent = "Yanlış";
        boolean_text.style.color = "red"
        results.push(shuffled[0] + ":   ✔" + dict[shuffled[0]] + "   ❌" + user_answer.value);
    }
    shuffled.shift();
    boolean_text.style.display = "block"
    check_button.style.display = "none";
    score.textContent = "Skor: " + counter + "/" + len ;
    if (shuffled.length === 0) end_button.style.display = "block";
    else next_button.style.display = "block";
}
}
function next(){
    user_answer.value = ""
    word.textContent = shuffled[0]; 
    check_button.style.display = "block";
    next_button.style.display = "none";
    boolean_text.style.display = "none"
    user_answer.focus();
}
function end(){
    main_block.style.display = "none";
    end_text.style.display = "block";
    if (counter == len) {
        konfetiPatlat();
        setTimeout(function() {
            alert("Bravo! Hepsini Doğru Yaptın 🎉");
        }, 1000);
    }
    else{
        setTimeout(function() {
        result_button.style.display = "block";
        }, 400);
    } 
}
function result(){
    end_text.style.display = "none";
    result_button.style.display = "none";
    score.style.fontSize = "3em";
    result_text.innerHTML = results.join("<br><br>");
}