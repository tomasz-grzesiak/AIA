const request = require("request");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const url = "https://www.mobileshop.eu/android-os/";

let resultList = []
let pageNumber = 1;
while (pageNumber < 10) {
  request(`${url}${pageNumber > 1 ? "strona-"+pageNumber : ""}`, (error, response, body) => {
    if (error) {
      console.log("Error occured: ", error);
      process.exit(1);
    }

    console.log(response.statusCode);

    const document = new JSDOM(body).window.document;
    const names = document.querySelectorAll("div.product-name a");
    const prizes = document.querySelectorAll("div.price div");
    if (names.length !== prizes.length) {
      console.log("Something went wrong, fetched wrong amount of data...");
      process.exit(1);
    }
    for (let i = 0; i < names.length; i++) {
      resultList.push({
        name: names[i].innerHTML,
        RAM: names[i].innerHTML.split(" RAM")[0].split(" ").pop().split("G")[0],
        prize: prizes[i].innerHTML.split("&")[0],
      });
    }
    console.log(resultList);
    console.log(resultList.length);
  });
  pageNumber++;
}