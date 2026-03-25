// 1. Ezeket a változókat a függvényeken KÍVÜL kell létrehozni (a fájl tetején)
let fut = false;
let x = 0;
let lepesek = 0;
let hurokSzamlalo = 0;

// 2. Ez a függvény indul el, amikor megnyomod a gombot
function szamol() {
    if (fut) return; // Ha már fut, ne indítsuk el mégegyszer
    
    // Beolvassuk a számot az inputból
    x = Number(document.getElementById('startNumber').value);
    
    if (isNaN(x) || x < 1) {
        alert("Adj meg egy pozitív számot!");
        return;
    }

    // Alaphelyzetbe állítunk mindent
    fut = true;
    lepesek = 0;
    hurokSzamlalo = 0; 
    document.getElementById('sequence').innerHTML = `<strong>Indulás: ${x}</strong>`;
    document.getElementById('step-count').innerText = "0";
    
    // Elindítjuk a folyamatos számolást
    futtatas(); 
}

// 3. Ez a függvény végzi a tényleges matekot és az ismétlést
function futtatas() {
    if (!fut) return;

    // MATEMATIKA
    if (x % 2 === 0) {
        x = x / 2;
        var szin = "#007bff"; // Kék a párosnak
    } else {
        x = 3 * x + 1;
        var szin = "#dc3545"; // Piros a páratlannak
    }

    // HUROK ELLENŐRZÉSE
    if (x === 1) {
        hurokSzamlalo++;
    }

    // LEÁLLÍTÁS 5 kör után
    if (hurokSzamlalo >= 5) {
        const kijelzo = document.getElementById('sequence');
        kijelzo.innerHTML += ` → <span style="color: #ff9800; font-weight: bold; background: #fff3e0; padding: 5px; border-radius: 5px; display: inline-block; margin-top: 10px;">
            Hoppá! Ez egy végtelen ciklus, keress másik számot! ♾️🌀🤔
        </span>`;
        fut = false;
        return; 
    }

    // MEGJELENÍTÉS
    lepesek++;
    document.getElementById('step-count').innerText = lepesek;
    
    const kijelzo = document.getElementById('sequence');
    kijelzo.innerHTML += ` → <span style="color: ${szin};">${x}</span>`;
    
    // Gördítés az aljára
    kijelzo.scrollTop = kijelzo.scrollHeight;

    // SEBESSÉG ÉS ÚJRAHÍVÁS
    let sebesseg = document.getElementById('speedRange').value;
    setTimeout(futtatas, sebesseg);
}