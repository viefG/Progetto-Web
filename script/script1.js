
function dest() {
    var targa1 = document.getElementById('targa').value;
    const destinazione = 'index2.html'; // Specifica il nome del file di destinazione
    window.location.href = destinazione + '?targa=' + encodeURIComponent(targa1);
}

function back(){
    const destinazione2 = 'index.html';
    window.location.href = destinazione2;
}
