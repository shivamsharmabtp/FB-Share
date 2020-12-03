const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const {email, password, groups, post} = require('./data');

const sleep = (seconds) => {
	ms = parseInt(seconds*1000);
	return new Promise(resolve => setTimeout(resolve, ms));
}

puppeteer.use(StealthPlugin());

async function start(){
    const browser = await puppeteer.launch({
        headless : false,
        slowMo : 10
    });
    const context = browser.defaultBrowserContext();
    context.overridePermissions("https://www.facebook.com", ["geolocation", "notifications"]);
    
    let page = await browser.newPage()
    await page.goto('https://www.facebook.com/', {
        waitUntil : 'networkidle0'
    });
    await page.type('#email', email, {
        delay : 50
    });
    await page.type('#pass', password, {
        delay : 50
    });
    await page.click('#u_0_b', {
        delay : 30
    });
    await sleep(3);
    
    for(group of groups){
        await page.goto(group, {
            waitUntil : 'networkidle0'
        });
        await sleep(3);
        await page.waitForSelector('div.m9osqain, a5q79mjw jm1wdb64 k4urcfbm');
        await page.click('div.m9osqain, a5q79mjw jm1wdb64 k4urcfbm', {
            delay : 30
        });
        await page.waitForSelector('[role="textbox"]:not([aria-label="Comment on post"])');
        await page.type('[role="textbox"]:not([aria-label="Comment on post"])', post, {
            delay : 50
        });
        await sleep(2);
        await page.click('[aria-label="Post"]', {
            delay : 30
        });
        await sleep(5);
    }
    console.log('Successfully posted in groups');
    return;
}

start();
