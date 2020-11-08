# Project Coati
Dit document bevat een korte uitleg om de applicatie op te starten zowel als overige informatie omtrent dit project.

## Table of Contents

- [Installatie](#installatie)
- [Tests](#tests)
- [Usages](#usages)
- [Built with](#built-with)
- [Contributing](#contributing)
- [Team](#team)
- [Support](#support)
- [License](#license)

## Installatie

### Clone

- Clone deze repo op je lokale machine door gebruik te maken van `https://github.com/HANICA-DWA/feb2019-project-coati.git`

### Setup

#### Opstarten mongodb voor Unix systemen 
> Start mongodb op het Unix systeem
```shell
$ sudo mongod
```

#### Opstarten van de server
##### Stap 1:
> Navigeer naar de repo op je lokale machine en navigeer naar de server
```shell
$ cd c://repo-location/Coati/ideaboard-server
```
##### Stap 2:
> Installeer de node packages voor de server
```shell
$ npm install
```
##### Stap 3:
> Stop de seed in de database
```shell
$ node seed
```
##### Stap 4:
> Sluit de seed file
```shell
$ ctrl + c
```

##### Stap 5:
> Start de server
```shell
$ nodemon app
```

#### Opstarten van de beamer en client
##### Stap 1:
> Navigeer naar de repo op je lokale machine en navigeer naar de beamer en client
```shell
$ cd c://repo-location/Coati/ideaboard-beamer
$ cd c://repo-location/Coati/ideaboard-client
```

##### Stap 2:
> Installeer de node packages voor de beamer en client

```shell
$ npm install
```

##### Stap 3:
> Start de beamer en client

```shell
$ npm start
```

---

## Tests 

Voor het succesvol uitvoeren van de tests moeten de server, client en beamer opgestart zijn.

### End to end testing

##### Stap 1:
> Navigeer naar de client in de repo op je lokale machine
```shell

$ cd c://repo-location/Coati/ideaboard-client
```

##### Stap 2:
> Installeer de node packages voor de client

```shell
$ npm install
```

##### Stap 3:
> Navigeer via een JavaScript IDE naar src/components/UIComponents/ContentUI/Content.js  
> Zet this.checkContent in de render in commentaar  
> Zet this.workAroundForTest in de render uit commentaar  


##### Stap 5:
> Test de end to end file
```shell
$ npm test main
```
---

#### Testen van de beamer en client

##### Stap 1:
> Navigeer naar de beamer en client in de repo op je lokale machine
```shell
$ cd c://repo-location/Coati/ideaboard-beamer
$ cd c://repo-location/Coati/ideaboard-client
```

##### Stap 2:
> Installeer de node packages voor de beamer en client

```shell
$ npm install
```

##### Stap 3:
> Start de tests

```shell
$ npm test reducers
```
---

#### Testen van de server

##### Stap 1:
> Navigeer naar de server in de repo op je lokale machine
```shell
$ cd c://repo-location/Coati/ideaboard-server
```

##### Stap 2:
> Installeer de node packages voor de server
```shell
$ npm install
```

##### Stap 3:
> Starts de tests

```shell
$ npm test 
```

## Usages
Voor het gebruik van de applicatie verwijzen we u naar het [Software Guidebook](https://github.com/HANICA-DWA/feb2019-project-coati/blob/master/Documents/Software_guidebook/software%20guidebook.md)

## Built with
- Webstorm
- Node package manager
- Github desktop

## Contributing
Mocht u bij willen dragen aan ons project, verwijzen wij u graag naar ons [contributing](CONTRIBUTING.MD "Project Coati") bestand waar het proces wordt uitgelegd voor pull requests naar ons. 

---

## Team
| <a href="https://github.com/BotanAb" target="_blank">**Botan Abak**</a> | <a href="https://github.com/DaanBardoel" target="_blank">**Daan Bardoel**</a> | <a href="https://github.com/Hees1989" target="_blank">**Jaimy Heezen**</a> | <a href="https://github.com/TimMaasGeesteranus" target="_blank">**Tim Maas Geesteranus**</a> | <a href="https://github.com/LotusterHaar" target="_blank">**Lotus ter Haar**</a> |
| :---: |:---:| :---:| :---:| :---:|
| [![Botan Abak](https://avatars1.githubusercontent.com/u/33269031?s=100&v=4)](https://github.com/BotanAb)    | [![Daan Bardoel](https://avatars2.githubusercontent.com/u/37547348?s=100&v=4)](https://github.com/DaanBardoel) | [![Jaimy Heezen](https://avatars0.githubusercontent.com/u/10946051?s=100&v=4)](https://github.com/Hees1989)  |  [![Tim Maasgeesteranus](https://avatars1.githubusercontent.com/u/38353198?s=100&v=4)](https://github.com/TimMaasGeesteranus)  |  [![Lotus ter haar](https://avatars3.githubusercontent.com/u/25623480?s=100&v=4)](https://github.com/LotusterHaar)  |
| <a href="https://github.com/BotanAb" target="_blank">`https://github.com/BotanAb`</a> | <a href="https://github.com/DaanBardoel" target="_blank">`https://github.com/DaanBardoel`</a> | <a href="https://github.com/Hees1989" target="_blank">`https://github.com/Hees1989`</a> |<a href="https://github.com/TimMaasGeesteranus" target="_blank">`https://github.com/TimMaasGeesteranus`</a> |<a href="https://github.com/LotusterHaar" target="_blank">`https://github.com/LotusterHaar`</a> |

---

## Support

Voor vragen en op- of aanmerkingen kunt u ons bereiken via onderstaande mail:
- Email ons op <a href="dwa-project-1819-coati@outlook.com" target="_blank">`dwa-project-1819-coati@outlook.com`</a>
---

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2019 © <a href="https://github.com/HANICA-DWA/feb2019-project-coati" target="_blank">Project coati</a>.
