import puppeteer from 'puppeteer';
import fs from "fs";
// const fs = require("fs");
const { Cluster } = require("puppeteer-cluster");
import { Cluster } from 'puppeteer-cluster';
const urls = [
    "https://www.hindustantimes.com/"
   
];
(async () => {
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_PAGE,
        maxConcurrency: 1,
        // monitor: true,
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
    await cluster.task(async ({ page, data: url }) => {
        await page.goto(url);
        if (url.includes('page=1')) { 
            // Task for URLs containing 'page=1'
            const productHandles = await page.$$(".cPHDOP>div>div>._1sdMkc");
            for (const product of productHandles) {
                let title = "NULL";
                let image = "NULL";
                try {
                    title = await page.evaluate(el => el.querySelector("div>.WKTcLC").textContent, product);
                } catch (error) {
                    console.error(error);
                }
                try {
                    image = await page.evaluate(el => el.querySelector("a").getAttribute("href"), product);
                } catch (error) {
                    console.error(error);
                }
                fs.appendFile("results_page1.csv", `${title},${image}\n`, function (err) {
                    if (err) throw err;
                });
            }
        }
        //  else if(url.includes('page=2') ) {d
        //     const productHandles = await page.$$(".cPHDOP>div>div>._1sdMkc");
        //     for (const product of productHandles) {
        //         let title = "NULL";
        //         let image = "NULL";
        //         try {
        //             title = await page.evaluate(el => el.querySelector("div>.WKTcLC").textContent, product);
        //         } catch (error) {
        //             console.error(error);
        //         }
        //         try {
        //             image = await page.evaluate(el => el.querySelector("a").getAttribute("href"), product);
        //         } catch (error) {
        //             console.error(error);
        //         }
        //         fs.appendFile("results_page1.csv", `${title},${image}\n`, function (err) {
        //             if (err) throw err;
        //         });
        //     }
        // }  else if(url.includes('page=3')) {
        //     const productHandles = await page.$$(".cPHDOP>div>div>._1sdMkc");
        //     for (const product of productHandles) {
        //         let title = "NULL";
        //         let image = "NULL";
        //         try {
        //             title = await page.evaluate(el => el.querySelector("div>.WKTcLC").textContent, product);
        //         } catch (error) {
        //             console.error(error);
        //         }
        //         try {
        //             image = await page.evaluate(el => el.querySelector("a").getAttribute("href"), product);
        //         } catch (error) {
        //             console.error(error);
        //         }
        //         fs.appendFile("results_page1.csv", `${title},${image}\n`, function (err) {
        //             if (err) throw err;
        //         });
        //     }
        // }
        // const productHandles = await page.$$(".cPHDOP>div>div>._1sdMkc");
        // .cPHDOP.col-12-12>._75nlfW.LYgYA3>div>div>div
        // .cPHDOP>div>div>._1sdMkc
        //   .rPDeLR
        // // loop thru all handles
        // let buffer = fs.readFileSync("./result.json");
        // //   console.log(buffer);
        // //   console.log("after parsing to json it will give the actual data");
        //   let data = JSON.parse(buffer);
        // for (const product of productHandles) {
        //     let title = "NULL";
        //     let image = "NULL";
        //     // pass the single handle below
        //     try {
        //         title = await page.evaluate(el => el.querySelector("div>.WKTcLC").textContent, product);
        //         // console.log(title);
        //     }
        //     catch (error) {
        //         console.error;
        //     }
        //     try {
        //         image = await page.evaluate(el => el.querySelector("a").getAttribute("href"), product);
        //         // console.log(image);
        //     }
        //     catch (error) {
        //         console.error;
        //     }
        //     //yaha likte hain results.csv      `${title.replace(/,/g, ".")},${price.replace(/,/g,".")}\n`,
        //     fs.appendFile(
        //         "finalworking123.csv",
        //         `${title.replace(/,/g,"."  )},${image.replace(/,/g , ".")}\n`,
        //         function (err) {
        //             if (err) throw err;
        //         }
        //     );
        //     // do whatever you want with the data
        // }
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
    // //   console.log(buffer);
    // //   console.log("after parsing to json it will give the actual data");
    // const page = await browser.newPage();
    //   let data = JSON.parse(buffer);
        //     await page.goto(url);
        //     let isBtnDisabled = false;
        //   while (!isBtnDisabled) {
        //     await page.waitForSelector('.a-size-base.s-underline-text');
        //     const productsHandles = await page.$$(
        //       '.sg-col-20-of-24.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16>div>span>div:nth-child(1)>div[data-component-type="s-search-result"]'
        //     );
        //     for (const producthandle of productsHandles) {
        //       let title = "Null";
        //       let price = "Null";
        //       // let img = "Null";
        //       try {
        //         title = await page.evaluate(
        //           (el) => el.querySelector('div>div>div>div>span>div>div>div:nth-child(2)>div>h2>a>span').textContent,
        //           producthandle
        //         );
        //       } catch (error) {}
        //       try {
        //         price = await page.evaluate(
        //           (el) => el.querySelector('div>div>div>div>span>div>div>div:nth-child(2)>div:nth-child(3)>div:nth-child(2)>div>a>span>span').textContent,
        //           producthandle
        //         );
        //       } catch (error) {}
        //       // try {
        //       //   img = await page.evaluate(
        //       //     (el) => el.querySelector(".s-image").getAttribute("src"),
        //       //     producthandle
        //       //   );
        //       // } catch (error) {}
        //       if (title !== "Null") {
        //         fs.appendFile(
        //           "results.csv",
        //           `${title.replace(/,/g, ".")},${price.replace(/,/g,".")}\n`,
        //           function (err) {
        //             if (err) throw err;
        //           }
        //         );
        //       }
        //     }
        //     await page.waitForSelector(".s-pagination-item.s-pagination-next.s-pagination-button.s-pagination-separator", { visible: true });
        //     const is_disabled = (await page.$(".s-pagination-item.s-pagination-next.s-pagination-disabled")) !== null;
        //     isBtnDisabled = is_disabled;
        //     if (!is_disabled) {
        //       await Promise.all([
        //         page.click(".s-pagination-item.s-pagination-next.s-pagination-button.s-pagination-separator"),
        //         page.waitForNavigation({ waitUntil: "networkidle2" }),
        //       ]);
        //     }
        //   }
        //     await page.waitForSelector(".s-pagination-item.s-pagination-next.s-pagination-button.s-pagination-separator", { visible: true });
        //     const is_disabled = (await page.$(".s-pagination-item.s-pagination-next.s-pagination-disabled")) !== null;
        //     isBtnDisabled = is_disabled;
        //     if (!is_disabled) {
        //       await Promise.all([
        //         page.click(".s-pagination-item.s-pagination-next.s-pagination-button.s-pagination-separator"),
        //         page.waitForNavigation({ waitUntil: "networkidle2" }),
        //       ]);
        //     }
