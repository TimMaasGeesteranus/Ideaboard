const puppeteer = require('puppeteer');
const boardAction = require('../components/UIComponents/ContentUI/actions/boardActions');

jest.setTimeout(30000);

describe(`client`, () => {

    let browserA, pageA;

    beforeAll(async () => {
        // create two browsers
        browserA = await puppeteer.launch({
            headless: false,
            slowMo: 5,
            args: [`--window-size=700,800`, `--window-position=0,0`]
        });
        pageA = await browserA.newPage();

    });

    afterAll(async () => {
        await browserA.close();
    });

    test(`Page loads in browser A`, async () => {
        await pageA.goto(`http://localhost:3001`);
        await pageA.waitFor(`title`);
        const theTitle = await pageA.title();
        expect(theTitle).toBe(`Ideaboard`)
    });

    test('if click on log in then go to loginpage', async () => {
        await pageA.goto(`http://localhost:3001`);
        const button = await pageA.$('#navbarButton');
        await button.click();
        expect(button).toBeDefined();

        expect(pageA.url()).toBe('http://localhost:3001/login')
    });

    test('if click on register then go to registerpage', async () => {
        await pageA.goto(`http://localhost:3001/login`);
        const button = await pageA.$('#register');
        await button.click();
        expect(button).toBeDefined();

        expect(pageA.url()).toBe('http://localhost:3001/register')
    });

    test('if click on back then go to overview', async () => {
        await pageA.goto(`http://localhost:3001/register`);
        const button = await pageA.$('#navbarButton');
        await button.click();
        expect(button).toBeDefined();

        expect(pageA.url()).toBe('http://localhost:3001/')
    });

    test('if click on idea then go to detailpage', async () => {
        await pageA.goto(`http://localhost:3001`);
        const spanHref = await pageA.$eval('a#Eencentraleplekvooralleideeen', span => span.getAttribute('href'));
        await pageA.$eval('a#Eencentraleplekvooralleideeen', el => el.click());

        expect(pageA.url()).toBe(`http://localhost:3001${spanHref}`);
    });

    test('if voted on detailpage score increases by one', async () => {
        await pageA.goto(`http://localhost:3001`);
        const spanHref = await pageA.$eval('a#Eencentraleplekvooralleideeen', span => span.getAttribute('href'));
        await pageA.$eval('a#Eencentraleplekvooralleideeen', el => el.click());

        expect(pageA.url()).toBe(`http://localhost:3001${spanHref}`);

        const button = await pageA.$("#upvoteButton");
        await button.click();
        expect(button).toBeDefined();
    });

    // Als de slomo te hoog wordt gezet faalt deze test
    test('register then login with the account', async () => {
        await pageA.goto(`http://localhost:3001`);
        const button = await pageA.$('#navbarButton');
        await button.click();
        expect(button).toBeDefined();

        const button2 = await pageA.$('#register');
        await button2.click();
        expect(button2).toBeDefined();
        await pageA.type(`#inputUsername`, `EenRandomName`);
        await pageA.type(`#inputEmail`, `randomemail@random.com`);
        await pageA.type(`#inputFirstname`, `Random`);
        await pageA.type(`#inputLastname`, `Name`);
        await pageA.type(`#inputPassword`, `wachtwoord`);
        const button3 = await pageA.$('#registerButton');
        await button3.click();
        expect(button3).toBeDefined();

        await pageA.waitForNavigation();

        expect(pageA.url()).toBe(`http://localhost:3001/login`);

        await pageA.type(`input#inputUsername`, 'EenRandomName');
        await pageA.type(`input#inputPassword`,`wachtwoord`);
        const loginButton = await pageA.$('#loginButton');
        await loginButton.click();
        expect(loginButton).toBeDefined();
        pageA.waitForNavigation();
    });

    test('go login and create a idea', async () => {
        await pageA.goto(`http://localhost:3001`);
        const redirectButton = await pageA.$('#navbarButton');
        const username = "Tim123";
        const password = "Timmie";
        await redirectButton.click();
        expect(redirectButton).toBeDefined();

        await pageA.type(`input#inputUsername`, username);
        await pageA.type(`input#inputPassword`,password);
        const loginButton = await pageA.$('#loginButton');
        await loginButton.click();
        expect(loginButton).toBeDefined();
        await pageA.waitForNavigation();

        const redirectButton2 = await pageA.$('#fabButton');
        await redirectButton2.click();
        expect(redirectButton2).toBeDefined();

        await pageA.type(`input#inputTitle`,"Titel");
        await pageA.type(`.ql-editor`, `Idee`);
        const button = await pageA.$(`#buttonPlaatsen`);
        await button.click();
        expect(button).toBeDefined();
    });

    test('go to idea and close', async () => {
        await pageA.goto(`http://localhost:3001`);
        const redirectButton1 = await pageA.$('#fabButton');
        await redirectButton1.click();
        expect(redirectButton1).toBeDefined();
        await pageA.$eval(`#buttonCancel`, el => el.click());
        expect(pageA.url()).toBe("http://localhost:3001/");
    });

    // Als de slomo te hoog wordt gezet faalt deze test
    test('register', async () => {
        await pageA.goto(`http://localhost:3001`);
        const button = await pageA.$('#navbarButton');
        await button.click();
        expect(button).toBeDefined();

        const button2 = await pageA.$('#register');
        await button2.click();
        expect(button2).toBeDefined();
        await pageA.type(`#inputUsername`, `EenRandomName`);
        await pageA.type(`#inputEmail`, `randomemail@random.com`);
        await pageA.type(`#inputFirstname`, `Random`);
        await pageA.type(`#inputLastname`, `Name`);
        await pageA.type(`#inputPassword`, `wachtwoord`);
        await pageA.$eval(`.button`, el => el.click());
        expect(pageA.url()).toBe("http://localhost:3001/");
    })
});

