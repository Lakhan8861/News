import puppeteer from 'puppeteer';
import fs  from "fs";
// const fs = require("fs");
// const { Cluster } = require("puppeteer-cluster");
import {Cluster}  from  'puppeteer-cluster';

const urls = [
  "https://www.amazon.in/s?i=kitchen&bbn=81107432031&rh=n%3A81107432031%2Cp_85%3A10440599031&s=date-desc-rank&ds=v1%3A2ui4H8vZ63UnQWoFNWtiLRjkDaRjTvq1KMId5zGb1Xs&_encoding=UTF8&content-id=amzn1.sym.58c90a12-100b-4a2f-8e15-7c06f1abe2be&pd_rd_r=4b777c15-fb7a-48f0-a163-3e3a34a2f329&pd_rd_w=cfqEr&pd_rd_wg=T9l1p&pf_rd_p=58c90a12-100b-4a2f-8e15-7c06f1abe2be&pf_rd_r=267EATJXA4ZSQ6K8DPJW&qid=1716623923&ref=sr_st_date-desc-rank",
  "https://www.amazon.in/s?i=kitchen&bbn=81107432031&rh=n%3A81107432031%2Cp_85%3A10440599031&_encoding=UTF8&content-id=amzn1.sym.58c90a12-100b-4a2f-8e15-7c06f1abe2be&pd_rd_r=4b777c15-fb7a-48f0-a163-3e3a34a2f329&pd_rd_w=cfqEr&pd_rd_wg=T9l1p&pf_rd_p=58c90a12-100b-4a2f-8e15-7c06f1abe2be&pf_rd_r=267EATJXA4ZSQ6K8DPJW&qid=1716605986&ref=sr_pg_1",
];





(async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: 100,
    monitor: true,
    puppeteerOptions: {
      headless: false,
      defaultViewport: false,
      userDataDir: "./tmp",
    },
  });

  cluster.on("taskerror", (err, data) => {
    console.log(`Error crawling ${data}: ${err.message}`);
  });

  // let data = [];
  // let buffer = fs.readFileSync("./result.json");
  // //   console.log(buffer);
  // //   console.log("after parsing to json it will give the actual data");
  //   let data = JSON.parse(buffer);


  await cluster.task(async ({ page, data: url }) => {
    await page.goto(url);
    let isBtnDisabled = false;
    while (!isBtnDisabled) {
      await page.waitForSelector('.a-size-base.s-underline-text');
      const productsHandles = await page.$$(
        '.sg-col-20-of-24.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16>div>span>div:nth-child(1)>div[data-component-type="s-search-result"]'
      );
       
    for (const producthandle of productsHandles) {
      let  title = "Null";
      let price = "Null";
      // let img = "Null";

      try {
        title = await page.evaluate(
          (el) => el.querySelector('div>div>div>div>span>div>div>div:nth-child(2)>div>h2>a>span').textContent,
          producthandle
        );
      } catch (error) {}

      try {
        price = await page.evaluate(
          (el) => el.querySelector('div>div>div>div>span>div>div>div:nth-child(2)>div:nth-child(3)>div:nth-child(2)>div>a>span>span').textContent,
          producthandle
        );
      } catch (error) {}

      // try {
      //   img = await page.evaluate(
      //     (el) => el.querySelector(".s-image").getAttribute("src"),
      //     producthandle
      //   );
      // } catch (error) {}
      if (title !== "Null") {
        fs.appendFile(
          "r.json",
          `${title.replace(/,/g, ".")},${price},\n`,
          function (err) {
            if (err) throw err;
          }
        );
          // arr.push({ title , price});
          // console.log(arr.length);




      }

      }
    }

    await page.waitForSelector(".s-pagination-item.s-pagination-next.s-pagination-button.s-pagination-separator", { visible: true });
    const is_disabled = (await page.$(".s-pagination-item.s-pagination-next.s-pagination-disabled")) !== null;

    isBtnDisabled = is_disabled;
    if (!is_disabled) {
      await Promise.all([
        page.click(".s-pagination-item.s-pagination-next.s-pagination-button.s-pagination-separator"),
        page.waitForNavigation({ waitUntil: "networkidle2" }),
      ]);
    }






});

for (const url of urls) {
  await cluster.queue(url);
}

  // console.log(arr.length);



// console.log(data);
  // let stringdata = JSON.stringify(data);
  // fs.writeFileSync("./result.json" , stringdata);

  // await cluster.idle();
  // await cluster.close();
})();
