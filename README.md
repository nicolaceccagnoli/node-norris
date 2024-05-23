# node-norris

Sfruttando l’api https://api.chucknorris.io/jokes/random creare un applicazione che scarica una battuta random, la aggiunge ad un file json norrisDb.json e la mostra all’utente.
Il file json quindi dovrà contenere la lista di tutte le battute scaricate nell’arco del tempo.
Per evitare che nodemon riavvii il server ogni volta che questo file viene modificato, aggiungete la seguente configurazione nel file package.json:
"nodemonConfig": {
"ignore": ["norrisDb.json"]
}
E ricordate, con Chuck Norris le API non hanno il coraggio di ritornare un errore, per paura che Chuck le punisca.
