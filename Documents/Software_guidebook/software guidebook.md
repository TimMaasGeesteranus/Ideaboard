# **Inleiding**
Dit software guidebook levert een overzicht van de ideeënbord applicatie.
De volgende onderwerpen worden behandeld in dit document:

1. De requirements, constraints en principles achter de applicatie
2. De software architectuur, inclusief high-level architectuur keuzes en structuur van de software
3. De infrastructuur architectuur en hoe de software is gedeployd.
4. Operationele en ondersteunings aspecten van de applicatie. 


# **1. Context:**

De ideeënbord applicatie zorgt voor een manier waarop mensen van Schiphol makkelijk ideeën kunnen delen. De applicatie is bedoeld voor de medewerkers van Schiphol die graag een idee willen delen, maar ook de mogelijkheid willen om op een idee te reageren. Hieronder is een diagram van de context te vinden:
![alt text](https://github.com/HANICA-DWA/feb2019-project-coati/blob/master/Documents/Software_guidebook/screenshots/Context.png "Context")
Figuur 1 Context model

##### De bedoeling van de website:

1. Ideeën delen om verandering aan te brengen op de werkvloer
2. Kunnen stemmen zodat er aangegeven kan worden welke ideeën de moeite waard zijn om in uitvoering te brengen.
3. Kunnen reageren op ideeën zodat de meningen over het idee kunnen worden geuit.
  
##### **Gebruikers:**
De ideeënbord applicatie heeft drie typen gebruikers:

1. Anoniem: Gebruikers die enkel het bord bekijken
2. Qr-code Authenticatie: Gebruikers die via een QR-code op de website zijn geauthenticeerd
3. Geregistreerde gebruikers: Gebruikers die geauthenticeerd zijn via registratie

##### **Externe Systemen**

Er wordt gebruik gemaakt van 2 externe systemen.

- Yammer: Door middel van de share-button is het mogelijk om via het social netwerk Yammer een idee te delen
- React-qr-reader: Door de camera van de telefoon te gebruiken is het mogelijk om de qr-code op de beamer te scannen

# **2.Functional Overview**

Deze sectie bevat een samenvatting van de functionaliteit van de ideeënbord applicatie.

##### **Gebruikers**

Er zijn drie verschillende types van gebruikers

##### Anonieme gebruikers

Anonieme gebruikers zijn de gebruikers die naar het ideeënbord kijken en de top 5 en de 5 nieuwste ideeën kunnen zien.

##### QR-code geauthenticeerde gebruikers

Qr-code geauthenticeerde gebruikers zijn de gebruikers die d.m.v. een QR-code inloggen. Ze hebben de mogelijkheid om ideeën te upvoten maar niet om zelf een idee te plaatsen.

##### Geregistreerde gebruikers

Gebruikers die d.m.v. registreren geauthenticeerd zijn. Zij kunnen op ideeën stemmen, maar ook zelf een idee plaatsen. Verder hebben ze de mogelijkheid om op een idee te reageren.

##### **Content**

De ideeënbord applicatie heeft als content alleen ideeën, waarbij er reacties op gegeven kunnen worden. Ook kan op elke idee gestemd worden. Elke idee is gekoppeld aan een gebruiker.

##### **Ideeënbord beamer**
![alt text](https://github.com/HANICA-DWA/feb2019-project-coati/blob/master/Documents/Software_guidebook/screenshots/ideebord-beamer.png "Ideebord beamer")
Op een beamer worden de top 5 en de 5 nieuwste ideeën getoond van de desbetreffende ideeën bord. Onderaan staat een Qr-code die je kunt scannen via een mobiel. Verder wordt er bovenaan het nieuwste idee getoond.


##### **Ideeënbord cliënt**

![alt text](https://github.com/HANICA-DWA/feb2019-project-coati/blob/master/Documents/Software_guidebook/screenshots/ideabord-client.png "Ideebord client")

Op een mobiele telefoon kan het ideeenbord worden geopend door de QR code op de ideeënbord beamer te scannen. Alle ideeën worden in deze applicatie getoond. Er kunnen reacties worden gegeven op de ideeën, en er kan gestemd worden op de ideeën. Er kan gezocht worden op idee. 

##### **Qr-code**

Onderaan de ideeënboardbeamer staat een qr-code die gescand kan worden, deze leidt naar het desbetreffende board.

##### **Idee**

De geregistreerde gebruikers kunnen een idee plaatsen met een titel en een beschrijving van het idee. De opmaak van het idee kan ook aangepast worden.
![alt text](https://github.com/HANICA-DWA/feb2019-project-coati/blob/master/Documents/Software_guidebook/screenshots/ideabord-client-idee-plaatsen.png "Idee plaatsen")

##### **Upvotes**

Elke idee kan upvotes hebben. Dit houdt in hoeveel gebruikers het idee goed vinden. Een gebruiker kan maar één keer op elk idee stemmen. Door middel van fingerprinting wordt bijgehouden of een gebruiker al gestemd heeft.

##### **Reactie**
![alt text](https://github.com/HANICA-DWA/feb2019-project-coati/blob/master/Documents/Software_guidebook/screenshots/ideabord-client-detailpagina.png "Detailpagina")

Op elke idee kan er een reactie geplaatst worden door een geregistreerde gebruiker. Deze komt vervolgens op de detailpagina onder het idee te staan.

##### **Zoeken**
![alt text](https://github.com/HANICA-DWA/feb2019-project-coati/blob/master/Documents/Software_guidebook/screenshots/ideabord-client-zoeken.png "Zoeken")

Op de detailpagina kan er gezoekt worden naar een idee. De letters die je ingevoerd hebt, worden gehighlight weergegeven.

##### **Profielpagina**
![alt text](https://github.com/HANICA-DWA/feb2019-project-coati/blob/master/Documents/Software_guidebook/screenshots/ideebord-client-profielpagina.png "Profielpagina")

Elke gebruiker heeft een unieke profielpagina met hierop zijn profielgegevens. Ook staan hier de ideeën van deze gebruiker. 
Door op een gebruikersnaam bij een idee of reactie te klikken kan de profielpagina bezocht worden. 

#  **3. Quality Attributes**

Deze sectie bevat informatie over de kwaliteitsattributen van de applicatie.

##### **Performance**

De applicatie moet via Websockets functioneren. Het moet ook de capaciteit van het aantal gebruikers op een werkvloer aankunnen, dus een schatting van 50 actuele gebruikers. Verder zou het moeten laden binnen 10 seconden.

##### **Websockets**

Het moet een near-realtime applicatie zijn. Dit houdt in dat het board meteen gewijzigd wordt, wanneer er geupvoted wordt op de client, indien het idee op het bord staat.
Als er een nieuw idee wordt geplaatst dan krijgt de gebruiker een melding en verschijnt het nieuwe idee ook direct in zijn applicatie en op het board.

##### **Scalability**

De applicatie moet een gemiddelde werkvloer aankunnen dus de volgende data:

-10000 ideeën  
-50000 reacties

##### **Security**

De applicatie kan door verschillende gebruikers gebruikt worden. De door QR-code geauthenticeerde gebruikers zijn beveiligd door een sessie. De geregistreerde gebruikers hebben een wachtwoord en gebruikersnaam. Het wachtwoord is gehasht opgeslagen in de database.

##### **Compatibility**

De applicatie kan gerund worden op de volgende besturingssystemen van de mobiel:

-IOS  
-Android

Verder wordt de applicatie ondersteund door de volgende browsers:

-Safari  
-Chrome  
-Firefox

#  **4. Constraint**

In dit deel van het hoofdstuk zullen de grenzen behandeld worden die van toepassing zijn op dit project. Dit kan gaan over zaken als: tijd, geld, ervaring, software en hardware die wij als projectteam tot onze beschikking hebben, standaarden die wij gaan gebruiken en standaarden/stukken software die verplicht gebruikt moeten worden om aan de vereisten van het project te voldoen.

## Fysieke constraints

Onder dit deel zullen de constraints behandeld worden die gaan over fysieke omstandigheden, zoals: ervaring, tijd, geld en beschikbaarheid van middelen.

De eerste constraint die wij tegen zullen komen in dit project is de tijd. Er zijn drie sprints van twee weken gereserveerd voor dit project. Hierdoor zal het niet mogelijk zijn om een volledig functionele en productieklare applicatie op te leveren.

Als tweede constraint komt toch het geld om de hoek kijken. Het is namelijk noodzakelijk voor dit project om de applicatie op een externe cloud based dienst te draaien (zoals: Azure, AWS en Heroku). Deze diensten kosten vaak echter geld en dat is niet de bedoeling voor een schoolprojet. Hierdoor is de keuze voor een externe server om de applicatie op te draaien beperkt tot Heroku.

De derde constraint die noemenswaardig is, is onze ervaring. Wij hebben nog maar een applicatie gemaakt met behulp van Javascript, NodeJS, Express.js, WebSockets, React en Redux. Hierdoor is de kans dat wij dingen tegenkomen die wij niet snappen en veel tijd kosten om op te lossen dus erg groot. Daardoor zal er in de beschikbare tijd, meer tijd aan relatief simpele taken besteedt moeten worden dan het geval is bij een ervaren team.

## Verplichtende constraints

Dit deel zal met name gaan over de constraints wat betreft de software die gebruikt moet worden en de technologieën die gebruikt moeten worden.

Als eerste constraint is het verplicht om de server te laten draaien op Node.JS.

De tweede constraint is de verplichting om gebruik te maken van MongoDB of Firebase Cloud Firestore.

# **5. Principles**

Dit hoofdstuk zal gaan over de principes die aangehouden gaan worden tijdens dit ontwikkeltraject. Dit kunnen bijvoorbeeld zaken zijn over: naamgeving, technieken die gebruikt gaan worden, patterns die aangehouden worden, software die gebruikt gaat worden of een manier van documentatie die toegepast gaat worden. Het gaat hier dus niet om zaken die de fysieke wereld, de opdrachtgever of een onderwijsinstituut oplegt, maar om zaken die wij onderling als groep afspreken.

## Naamgeving

### Algemeen

Als groep streven wij ernaar om zoveel mogelijk zelf uitleggende variabelenamen te gebruiken. Als voorbeeld is het dan niet de bedoeling om een object wat de response van een 'fetch' methode meekrijgt 'res' of 'r' te noemen, maar gewoon voluit 'response' of 'responseFromServer'. Het is verder de bedoeling om een variabelenaam die uit meerdere woorden bestaat, altijd te scheiden met een camelcase. Het nieuwe woord begint dus met een hoofdletter. Verder dienen alle naamgevingen op de server die buiten een methode gebruikt worden, uniek te zijn.

### Redux

Om de scheiding tussen actions en middleware tussen react en de actions duidelijk te houden, zullen de actions een unieke naam krijgen met daarachter het woord 'Action'. De naamgeving zal dus zijn: '...Action'. Voor de middleware (die bijvoorbeeld gebruikt wordt om een HTTP-request te sturen naar de server) en vervolgens een dispatch uitvoert naar de Action, wordt dezelfde naamgeving als bij de gewone action aangehouden, maar dan als einde van de variabelenaam '...ActionMiddleware'. De middleware en de action die daarbij hoort, zullen dus ook dezelfde naam met uitzondering van het beschreven einde van de naam gebruiken.

## ORM

Voor alle verbindingen met de database zal er niet direct gebruik gemaakt worden van MongoDB, maar zal er ten alle tijden gebruik gemaakt worden van Mongoose.

## WebSockets

Het is de bedoeling dat de client een verbinding maakt met de server via websockets. Verder zal de client alleen berichten ontvangen van de server dat hij iets uit moet voeren. De client gaat zelf dus geen WebSocket-berichten versturen. De client gebruikt een WebSocket-bericht alleen maar om met dispatch een action-middleware aan te roepen om via HTTP een request te doen naar de server.

##### Geautomatiseerde testing

Unit tests: Via kleine snelle tests kleine methodes en classes testen.

# **6. Software Architecture**

Deze sectie bevat een overzicht van de software architectuur van de applicatie.

##### Containers

De volgende container beschrijft de logische containers van het systeem.

Figure 2 Container model

##### NoSql Database:

MongoDB wordt gebruikt als NoSQL database waar alle data wordt opgeslagen.

##### Server:

Bij de server wordt gebruik gemaakt van NODE js, express, mongoose en Websockets.

##### Beamer App:

Op de beamer wordt de top-5 ideeën met de meeste stemmen weergegeven. Ook de 5 nieuwste ideeën zijn te zien. Daarnaast is er een mogelijkheid de QR-code te scannen om op de client applicatie te komen.

##### Client app:

De mobiele app bestaat uit de volledige lijst van de ideeen. Hierbij heeft de gebruiker de mogelijkheid ideeën te upvoten, te reageren op ideeën en zelf ideeën te plaatsen. De gebruiker kan zich registreren en vervolgens met dit account inloggen. Ook kunnen de profielpagina's van gebruikers bezocht worden.

##### Components

#####_Redux:_ 
In de beamer en client applicatie van het ideeënbord maken we beide gebruik van Redux.
Redux is een state management tool die gebruikt kan worden in combinatie van React. Met Redux wordt de state van de applicatie opgeslagen in een store en elke component kan elke state ophalen die het nodig heeft van de store.
In React kan de state alleen doorworden gegeven in één richting via props (namelijk via de parent component naar sibling components).
Op het moment dat je de state moet delen tussen componenten die ver van elkaar liggen is Redux handig om te gebruiken, gezien je de state dan rechtstreeks uit de store kan ophalen.
Er zijn drie bouwblokken van Redux: actions, store en reducers. 
- Actions zijn events, de enige manier waarop je data kan zenden van de applicatie naar de Redux Store. Actions worden verzonden door `store.dispatch()` methode. Actions zijn plain Javascript objecten en hebben een eigenschap die aangeeft welk type van actie er wordt uitgevoerd.
- Reducers zijn pure functies die de huidige staat van een applicatie nemen, een actie uitvoeren en een nieuwe staat returnen. Deze staten worden opgeslagen in objecten en specificeren hoe de staat van een applicatie veranderd in een reactie op een actie die wordt verzonden naar de store.
- De Store in redux bevat de applicatie staat. Er is enkel één Redux applicatie. 

_Voordelen van redux:_
- Redux maakt de staat voorspelbaar
- Redux is strict over hoe de code moet worden georganiseerd en maakt het gemakkelijk voor iemand met kennis van Redux om de structuur te snappen van een Redux applicatie.
Wij hebben daarom bij de structuur van onze applicatie rekening gehouden met een map structuur van actions, reducers en componenten. 
- Redux is makkelijk te testen
- Redux is makkelijk te debuggen door de actions en de state te loggen.

Figure 3 Components - beamer app

De Websockets communicatie is er voor near-realtime connectie tussen de web app en de mobiele app.


![alt text](https://github.com/HANICA-DWA/feb2019-project-coati/blob/master/Documents/Software_guidebook/screenshots/component-beamer.png "Component client")
Components – Beamer app

![alt text](https://github.com/HANICA-DWA/feb2019-project-coati/blob/master/Documents/Software_guidebook/screenshots/component-beamer.png "Component beamer")
Figure 4 Components - Mobiele app

In de homepage en user controller worden de acties van de homepage en user beheerd.

##### Authentication:

Hierin wordt de token gecreëerd waarmee de authenticatie wordt bevestigd. De token wordt opgeslagen in de local storage.

##### Components – Server

![alt text](https://github.com/HANICA-DWA/feb2019-project-coati/blob/master/Documents/Software_guidebook/screenshots/component-server.png "Component server")
Figure 5 Components - Server

##### Content updater:

Dit component pakt de gegevens van Yammer en mongoose. Dit wordt door middel van Websockets doorgegeven aan de client- en beamerapplicatie.

Yammer Connector: Dit component is verantwoordelijk voor het connecten van Yammer om ideeen te delen via Yammer.

Voor het gebruik maken van de MongoDB database wordt Mongoose gebruikt. Dit gebeurt via Wire control op port 27017.

# **7. Infrastructure Architecture**

Deze sectie bevat informatie over infrastructuur architectuur van de applicatie

##### Live environment

Het live environment dat we wilden gebruiken is een Cloud server van Heroku. Hiermee kan je als developer builden, runnen, en operaten volledig in de Cloud.
Het is echter niet gelukt om onze applicatie te deployen op Heroku. 


# **8. Deployment**

Deze sectie bevat de informatie over de overbrugging tussen de software architectuur en de infrastructureel architectuur.

##### Software

De live environment dat wij gebruiken is de Heroku server. Om de applicatie goed te runnen heb je MongoDB 2.2.x nodig en de Heroku CLI.

##### Bouwen van de applicatie

Het versiebeheer van de applicatie wordt gedaan met Git via de host Github. Verder worden de applicaties getest via geautomatiseerde testen door middel van Jest. Via Heroku CLI worden de applicaties als productie build gepusht naar de cloudserver.

##### Deployment:

Dit hoofdstuk levert informatie over de mapping tussen software architectuur en infrastructuur architectuur.  

**Software:**

De volgende software is gebruikt voor de applicatie.

 - ECMAScript 6 (Javascript 6) 
 - React 16.8.6 
 - Redux 4.0.1 
 - Express 4.16.0
 - Mongoose 5.5.3
 - MongoDB 4.0
 - Node.JS 12.2.0

**Building van de ideeënbord applicatie**

`Npm run build` creëert een build directory met een productie build van de applicatie.

Binnen de build/static directory zitten de Javascript en CSS files. Elke bestandsnaam binnen build/static zal een unieke hash van de bestandsinhoud bevatten. De hash in de bestandsnaam staat ‘long terming caching techniques’ toe.

**Statische server**

De applicatie maakt gebruik van Node.  Door serve te installeren kan de statische server gedeployd worden.

    npm install -g serve
    serve – s build

**Andere oplossingen:**

Er is niet noodzakelijk een statische server nodig om de Create React App project in productie te runnen.

Hieronder is een voorbeeld waarbij de build folder met static assets als enige output wordt geproduceerd door de Create React App.

    **const** express = require('express');
    **const** path = require('path');
    **const** app = express();
    
    app.use(express.static(path.join(__dirname, 'build')));
    app.get('/*', **function**(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
    
    app.listen(9000)


# **9. Operation and Support**

Deze sectie bevat informatie over de operationele en support aspecten van de applicatie.

#### Starting MongoDB:

##### Unix gebasseerde systemen

MongoDB is geïnstalleerd als een service en wordt gedraaid door deze service specifiek te starten. Hieronder volgen de commando's die u uitvoert om MongoDB te starten op Unix gebasseerde systemen (bijvoorbeeld Linux, MacOS en FreeBSD).

Als u MongoDB wilt starten gebruikt u het volgende commando:

 - Sudo mongod

Om MongoDB te stoppen, gebruikt u het volgende commando:

 - CTRL + C
 
Het is in Unix systemen echter ook mogelijk om MongoDB als een daemon te starten, maar dit gaan wij niet behandelen, omdat het draaien van de database op een echte server niet binnen de scope van dit project valt.

##### Windows systeem

Disclaimer: Het is noodzakelijk om PowerShell als administrator te starten, omdat het stoppen, starten en herstarten van een service niet mogelijk is zonder administratorrechten. Verder wordt MongoDB bij de standaard configuratie, als alles goed gaat, altijd automatisch opgestart bij het opstarten van Windows.

Op Windows gelden de volgende commando's met Powershell:

In alle gevallen:

 - Open PowerShell als administrator

Controleren of MongoDB al draait:

 - Tik het volgende commando in: ' gsv "mongodb" ' of ' Get-Service "mongodb" '

MongoDB herstarten:

 - Tik het volgende commando in: ' Restart-Service "mongoDB" '

MongoDB stoppen:

 - Tik het volgende commando in: ' spsv "mongodb" ' of ' Stop-Service "mongodb" '

MongoDB starten:

 - Tik het volgende commando in: ' sasv "mongodb" ' of ' Start-Service "mongodb" '

Ook kunt u in Windows de status van services regelen via een grafisch programma genaamd 'services'. Dit kunt u op de volgende manier doen:

1. Voer de toetsencombinatie 'windows + R' in

1. Voer hier 'services.msc' in

1. Druk op 'enter'

1. Zoek in de lijst mongodb en voer de actie uit die u wilt doen met deze service
