// Importo il pacchetto dotenv e lo intrappolo in una variabile
require('dotenv').config()

// Importo l'oggetto http
const http = require("http");
const port = process.env.PORT || 8000;
const host = process.env.HOST || 'localhost';
// Importo File System che mi permetterà di accedere 
// ai file presenti sul server per leggerli e scriverli
const fs = require('fs');
// Importo Path che mi permetterà di creare dei percorsi relativi o assoluti per i file
const path = require('path');

// Dichiaro una funzione per leggere i data da un file json e gli passo come argomento il File
const getJsonData = (file) => {
    // Dichiaro una variabile con all'interno il percorso al file
    const filePath = path.join(__dirname, file + '.json');  // join() unisce in un unico path i pezzi di stringa passati come argomento
    // Dichiaro una variabile che conterrà il contenuto del file
    const fileData = fs.readFileSync(filePath, 'utf-8'); // readFileSync() legge il contenuto del file 
    // Se il file è vuoto restituisco un array vuoto
    if(fileData.length === 0) return [];
    // Converto la stringa JSON in un oggetto JS
    return JSON.parse(fileData);
};

// Dichiaro una funzione per scrivere dei data su un file json e gli passo come argomento il File e il Data
const putJsonData = (file, newData) => {
    const filePath = path.join(__dirname, file + '.json');
    // Dichiaro una variabile con all'interno il contenuto del nuovo oggetto
    const string = JSON.stringify(newData) // Converto l'oggetto newData in una stringa JSON
    fs.writeFileSync(filePath, string);
};

// Creo la funzione che definisce cosa avviene quando faccio una richiesta al server 
// (istanzio il server usando la sua proprietà createServer)
const server = http.createServer((req, res) => {
    
    if (req.url === '/favicon.ico') {
        res.writeHead(404);
        res.end();
        return;
    }

    // chiamata API
    fetch('https://api.chucknorris.io/jokes/random')
    .then(response => response.json()) // utilizzo l'oggetto response restituito da 'fetch' e lo converto in un oggetto JS
    .then(data => {
        // Faccio capire alla risposta che tipo di dato sto inviando
        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
        // Dichiaro in una variabile il contenuto del DB json
        const jokes = getJsonData('norrisDb');
        // Pusho all'interno dell'array il risultato della chiamata API
        jokes.push(data.value);
        // Inserisco la risposta dell'API nel DB
        putJsonData('norrisDb', jokes);
        // Passo il risultato della chiamata API al browser
        res.end(data.value);
    });

})

server.listen(port, host, () => {
    console.log(`Server avviato su http://${host}:${port}`);
});


