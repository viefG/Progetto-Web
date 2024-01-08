function rivela_targa() {
    const params = new URLSearchParams(window.location.search);
    const targaInserita = params.get('targa');
    console.log(targaInserita);
    var targa_da_inserire = document.getElementById("targa2");
    targa_da_inserire.textContent = "Targa: " + targaInserita;
    var kilometri2 = document.getElementById('kilometri');
    let controllo=0;
    var tempoRimanente = 5; // secondi

    let link = 'https://www.ilportaledellautomobilista.it/interrogazionistoricorevisioni/api/v1/storicorevisioni/A/';

    fetch(
        "https://www.ilportaledellautomobilista.it/interrogazionistoricorevisioni/noauth/captcha/verify",
        {
            mode: "cors",
            method: "POST",
            body: '{ "id": "48967587645265250212", "text": "nmApup5i" }',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        }
    )
        .then((response) => response.json())
        .then((data) => {
            fetch(
                link + targaInserita,
                {
                    mode: "cors",
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        guid: data['guid'],
                    },
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    if (data.codice=='499'){
                        kilometri2.textContent='Errore, auto non trovata';
                        var intervallo = setInterval(function() {
                            document.getElementById("messaggio").innerText = "Verrai riportato nella schermata principale tra " + tempoRimanente + " secondi";
                            tempoRimanente--;

                            if (tempoRimanente < 0) {
                                clearInterval(intervallo);
                                window.location.href = 'index.html';
                            }
                        }, 1000); // Aggiorna ogni secondo
                    }
                    kilometri1  = data.informations[0].numKmiPcsRvs;
                    console.log(data);
                    kilometri2.textContent='La macchina ha percorso km: ' +kilometri1;
                    console.log(kilometri1);
                });
        });

}


