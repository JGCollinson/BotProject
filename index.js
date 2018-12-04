const puppeteer = require('puppeteer');
const CREDS = require('./creds');
const mongoose = require('mongoose');
const User = require('./models/user');

async function run() {
  const browser = await puppeteer.launch({
    headless: false
  });

  const page = await browser.newPage();
  
  // const dashboard = (`https://datastudio.google.com/embed/reporting/1ALpdy0bfeelJWE-88JBxr9XjWuUe29rp/page/${myPages}`);
  // await page.screenshot({ path: 'screenshots/github.png' });
  // const myPages = ['VgD', 'HJCd']
  const now = new Date()
  const dateString = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`
  const myPages = ['VgD', 'HJCd']
  let pagepage = 0
  for(let pageNum of myPages) {
    const dashboard = (`https://datastudio.google.com/embed/reporting/1ALpdy0bfeelJWE-88JBxr9XjWuUe29rp/page/${pageNum}`);
    await page.goto(dashboard);
    pagepage++;
    await page.waitFor(10000);
    await page.screenshot({ path: `screenshots/page_${pagepage}_${dateString}.png` });
  }


  // await page.goto('https://datastudio.google.com/embed/reporting/1ALpdy0bfeelJWE-88JBxr9XjWuUe29rp/page/');


  // dom element selectors
  // const USERNAME_SELECTOR = '#login_field';
  // const PASSWORD_SELECTOR = '#password';
  // const BUTTON_SELECTOR = '#login > form > div.auth-form-body.mt-3 > input.btn.btn-primary.btn-block';

  // await page.click(USERNAME_SELECTOR);
  // await page.keyboard.type(CREDS.username);

  // await page.click(PASSWORD_SELECTOR);
  // await page.keyboard.type(CREDS.password);

  // await page.click(BUTTON_SELECTOR);
  // await page.waitForNavigation();

  // const userToSearch = 'john';
  // const searchUrl = `https://github.com/search?q=${userToSearch}&type=Users&utf8=%E2%9C%93`;
  // // let searchUrl = 'https://github.com/search?utf8=%E2%9C%93&q=bashua&type=Users';

//   await page.goto(searchUrl);
//   await page.waitFor(2 * 1000);

//     // const LIST_USERNAME_SELECTOR = '#user_search_results > div.user-list > div:nth-child(1) > div.d-flex > div > a';
//   const LIST_USERNAME_SELECTOR = '#user_search_results > div.user-list > div:nth-child(INDEX) > div.d-flex > div > a';
//     // const LIST_EMAIL_SELECTOR = '#user_search_results > div.user-list > div:nth-child(1) > div.d-flex > div > ul > li:nth-child(2) > a';
//   const LIST_EMAIL_SELECTOR = '#user_search_results > div.user-list > div:nth-child(INDEX) > div.d-flex > div > ul > li:nth-child(2) > a';
//   const LENGTH_SELECTOR_CLASS = 'user-list-item';
//   const numPages = await getNumPages(page);

//   console.log('Numpages: ', numPages);

//   for (let h = 1; h <= numPages; h++) {
//     let pageUrl = searchUrl + '&p=' + h;
//     await page.goto(pageUrl);

//     let listLength = await page.evaluate((sel) => {
//       return document.getElementsByClassName(sel).length;
//     }, LENGTH_SELECTOR_CLASS);

//     for (let i = 1; i <= listLength; i++) {
//       // change the index to the next child
//       let usernameSelector = LIST_USERNAME_SELECTOR.replace("INDEX", i);
//       let emailSelector = LIST_EMAIL_SELECTOR.replace("INDEX", i);

//       let username = await page.evaluate((sel) => {
//         return document.querySelector(sel).getAttribute('href').replace('/', '');
//       }, usernameSelector);

//       let email = await page.evaluate((sel) => {
//         let element = document.querySelector(sel);
//         return element ? element.innerHTML : null;
//       }, emailSelector);

//       // not all users have emails visible
//       if (!email)
//         continue;

//       console.log(username, ' -> ', email);

//       upsertUser({
//         username: username,
//         email: email,
//         dateCrawled: new Date()
//       });
//     }
//   }

  browser.close();
// }

// async function getNumPages(page) {
//   const NUM_USER_SELECTOR = '#js-pjax-container > div > div.col-12.col-md-9.float-left.px-2.pt-3.pt-md-0.codesearch-results > div > div.d-flex.flex-column.flex-md-row.flex-justify-between.border-bottom.pb-3.position-relative > h3';
//   let inner = await page.evaluate((sel) => {
//     let html = document.querySelector(sel).innerHTML;

//     // format is: "69,803 users"
//     return html.replace(',', '').replace('users', '').trim();
//   }, NUM_USER_SELECTOR);

//   const numUsers = parseInt(inner);

//   console.log('numUsers: ', numUsers);

//   /**
//    * GitHub shows 10 resuls per page, so
//    */
//   return Math.ceil(numUsers / 10);
// }

// function upsertUser(userObj) {
//   const DB_URL = 'mongodb://CH1:dune123@scrapybot1-shard-00-00-haiba.gcp.mongodb.net:27017,scrapybot1-shard-00-01-haiba.gcp.mongodb.net:27017,scrapybot1-shard-00-02-haiba.gcp.mongodb.net:27017/test?ssl=true&replicaSet=ScrapyBot1-shard-0&authSource=admin&retryWrites=true';

//   if (mongoose.connection.readyState == 0) {
//     mongoose.connect(DB_URL);
//   }

//   // if this email exists, update the entry, don't insert
//   const conditions = { email: userObj.email };
//   const options = { upsert: true, new: true, setDefaultsOnInsert: true };

//   User.findOneAndUpdate(conditions, userObj, options, (err, result) => {
//     if (err) {
//       throw err;
//     }
//   });
}


run();
