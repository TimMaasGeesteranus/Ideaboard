# Onderzoeksverslag Offline First ♛

Offline functionaliteit wordt steeds belangrijker bij applicaties.
Om een app offline first te maken moet je 2 dingen doen

- Bestanden moeten lokaal opgeslagen worden (kan gedaan worden met progressive web apps en service workers)
- Lokale opslag moet als primaire gegevensbron dienen. Deze moet voortdurend gesynchroniseerd worden met een externe database. (Zie voorbeeld lokale PouchDB en externe CouchDb)

React app met RxDB (reactive, client side, offline first) database. Deze synced met serverside CouchDb.

Benodigdheden

- Node
- Npm
- React
- RxDB
- CouchDb

Dependencies

- concurrently
- moment
- pouchdb-adapter-http
- pouchdb-adapter-idb
- pouchdb-server
- react-toastify
- rxdb
- rxjs
- serve

RxDB is een NoSQL document database
Schema defineren voor hoe de data eruit gaat zien.
Per collectie een schema

In Schema.js

- Versie nummer is 0, als hoger is moet er een data migration strategy gegeven worden.
- id is primaire sleutel
- message is required

data migration strategy zorgt ervoor dat data van oude schema's getransformeerd worden naar de nieuwe schema's
