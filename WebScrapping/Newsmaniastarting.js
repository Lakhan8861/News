import puppeteer from 'puppeteer';
import fs from "fs";
// const fs = require("fs");
// const { Cluster } = require("puppeteer-cluster");
import { Cluster } from 'puppeteer-cluster';
const urls = [
    "https://www.asianage.com",
    "https://www.hindustantimes.com/",

    " https://www.asianage.com/business",

    "https://indianexpress.com/section/business/",
      "https://www.asianage.com/sports",
    "https://indianexpress.com/section/sports/",
    "https://www.asianage.com/technology",
    "https://indianexpress.com/section/technology/",
    "https://www.hindustantimes.com/real-estate",

    "https://www.asianage.com/world",
    "https://indianexpress.com/section/political-pulse/"




    
   
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
        // await page.waitForNavigation({ waitUntil: "networkidle2" });



         // asian age sports 

        if (url.includes('https://www.asianage.com/sports')) { 
            // Task for URLs containing 'page=1'
           var   temp = "https://www.asianage.com"
            const productHandles = await page.$$(".col-lg-9.col-md-8.noPadding.leftCol>.sixnews>div");
            for (const product of productHandles) {
                let title = "NULL";
                let image = "NULL";
                let gotourl  = "NULL";
                try {
                    title = await page.evaluate(el => el.querySelector("h3>a").textContent, product);
                } catch (error) {
                    console.error(error);
                }
                try {
                    gotourl = await page.evaluate(el => el.querySelector("a").getAttribute("href"), product);
                } catch (error) {
                    console.error(error);
                }
                try {
                    image = await page.evaluate(el => el.querySelector("a>img").getAttribute("data-src"), product);
                } catch (error) {
                    console.error(error);
                }
                
                // `${title.replace(/,/g, ".")},${price.replace(/,/g,".")}\n`,
                fs.appendFile("sports.csv", `${title.replace(/,/g , " " )},${  temp + gotourl} , ${image }\n`, function (err) {
                    if (err) throw err;
                });
                 
            }
        }




         else  if (url.includes('https://www.asianage.com/technology')) { 
            // Task for URLs containing 'page=1'
           var   temp = "https://www.asianage.com"
            const productHandles = await page.$$(".col-lg-9.col-md-8.noPadding.leftCol>.sixnews>div");
            for (const product of productHandles) {
                let title = "NULL";
                let image = "NULL";
                let gotourl  = "NULL";
                try {
                    title = await page.evaluate(el => el.querySelector("h3>a").textContent, product);
                } catch (error) {
                    console.error(error);
                }
                try {
                    gotourl = await page.evaluate(el => el.querySelector("a").getAttribute("href"), product);
                } catch (error) {
                    console.error(error);
                }
                try {
                    image = await page.evaluate(el => el.querySelector("a>img").getAttribute("data-src"), product);
                } catch (error) {
                    console.error(error);
                }
                
                // `${title.replace(/,/g, ".")},${price.replace(/,/g,".")}\n`,
                fs.appendFile("tech.csv", `${title.replace(/,/g , " " )},${  temp + gotourl} , ${image }\n`, function (err) {
                    if (err) throw err;
                });
                 
            }
        }




        else  if (url.includes('https://www.asianage.com/world')) { 
            // Task for URLs containing 'page=1'
           var   temp = "https://www.asianage.com"
            const productHandles = await page.$$(".sixnews>div");
            for (const product of productHandles) {
                let title = "NULL";
                let image = "NULL";
                let gotourl  = "NULL";
                try {
                    title = await page.evaluate(el => el.querySelector("h3>a").textContent, product);
                } catch (error) {
                    console.error(error);
                }
                try {
                    gotourl = await page.evaluate(el => el.querySelector("a").getAttribute("href"), product);
                } catch (error) {
                    console.error(error);
                }
                try {
                    image = await page.evaluate(el => el.querySelector("a>img").getAttribute("data-src"), product);
                } catch (error) {
                    console.error(error);
                }
                
                // `${title.replace(/,/g, ".")},${price.replace(/,/g,".")}\n`,
                fs.appendFile("world.csv", `${title.replace(/,/g , " " )},${  temp + gotourl} , ${image }\n`, function (err) {
                    if (err) throw err;
                });
                 
            }
        }



// image nhi aa rhai hain  check kro phir se 


        
        else  if (url.includes('https://indianexpress.com/section/business/')) { 
            // Task for URLs containing 'page=1'
            const productHandles = await page.$$(".leftpanel>.nation>.articles");
            for (const product of productHandles) {
                let title = "NULL";
                let image = "NULL";
                let gotourl  = "NULL";
                try {
                    title = await page.evaluate(el => el.querySelector("div:nth-child(2)>p").textContent, product);
                } catch (error) {
                    console.error(error);
                }
                try {
                    gotourl = await page.evaluate(el => el.querySelector("div:nth-child(1)>a").getAttribute("href"), product);
                } catch (error) {
                    console.error(error);
                }
                try {
                    image = await page.evaluate(el => el.querySelector("div:nth-child(1)>a>img").getAttribute("src"), product);
                } catch (error) {
                    console.error(error);
                }
                
                // `${title.replace(/,/g, ".")},${price.replace(/,/g,".")}\n`,
                fs.appendFile("business.csv", `${title.replace(/,/g , " " )},${gotourl} , ${image }\n`, function (err) {
                    if (err) throw err;
                });
                 
            }
        }

         // indian express ka politics ka world me dal diye  hain 

        else  if (url.includes('https://indianexpress.com/section/political-pulse/')) { 
            // Task for URLs containing 'page=1'
            const productHandles = await page.$$(".archive.tax-ie_section.term-political-pulse.term-635437367.ie_country_IN>#wrapper>#section>.container>div>.leftpanel>.nation>.articles");
            for (const product of productHandles) {
                let title = "NULL";
                let image = "NULL";
                let gotourl  = "NULL";
                try {
                    title = await page.evaluate(el => el.querySelector(".articles>div:nth-child(2)>h2>a").textContent, product);
                } catch (error) {
                    console.error(error);
                }
                try {
                    gotourl = await page.evaluate(el => el.querySelector(".articles>div:nth-child(1)>a").getAttribute("href"), product);
                } catch (error) {
                    console.error(error);
                }
                try {
                    image = await page.evaluate(el => el.querySelector(".articles>div:nth-child(1)>a>img").getAttribute("src"), product);
                } catch (error) {
                    console.error(error);
                }
                
                // `${title.replace(/,/g, ".")},${price.replace(/,/g,".")}\n`,
                fs.appendFile("world.csv", `${title.replace(/,/g , " " )},${gotourl} , ${image }\n`, function (err) {
                    if (err) throw err;
                });
                 
            }
        }
        else  if (url.includes('https://indianexpress.com/section/technology/')) { 
            // Task for URLs containing 'page=1'
            const productHandles = await page.$$(".top-article>ul>li");
            for (const product of productHandles) {
                let title = "NULL";
                let image = "NULL";
                let gotourl  = "NULL";
                try {
                    title = await page.evaluate(el => el.querySelector("h3").textContent, product);
                } catch (error) {
                    console.error(error);
                }
                try {
                    gotourl = await page.evaluate(el => el.querySelector("h3>a").getAttribute("href"), product);
                } catch (error) {
                    console.error(error);
                }
                try {
                    image = await page.evaluate(el => el.querySelector("figure>a>img").getAttribute("src"), product);
                } catch (error) {
                    console.error(error);
                }
                
                // `${title.replace(/,/g, ".")},${price.replace(/,/g,".")}\n`,
                fs.appendFile("tech.csv", `${title.replace(/,/g , " " )},${gotourl} , ${image }\n`, function (err) {
                    if (err) throw err;
                });
                 
            }
        }






      else    if (url.includes('https://indianexpress.com/section/sports/')) { 
            // Task for URLs containing 'page=1'
            const productHandles = await page.$$(".leftpanel>.nation>.articles");
            for (const product of productHandles) {
                let title = "NULL";
                let image = "NULL";
                let gotourl  = "NULL";
                try {
                    title = await page.evaluate(el => el.querySelector("div:nth-child(2)>p").textContent, product);
                } catch (error) {
                    console.error(error);
                }
                try {
                    gotourl = await page.evaluate(el => el.querySelector("div:nth-child(1)>a").getAttribute("href"), product);
                } catch (error) {
                    console.error(error);
                }
                try {
                    image = await page.evaluate(el => el.querySelector("div:nth-child(1)>a>img").getAttribute("src"), product);
                } catch (error) {
                    console.error(error);
                }
                
                // `${title.replace(/,/g, ".")},${price.replace(/,/g,".")}\n`,
                fs.appendFile("sports.csv", `${title.replace(/,/g , " " )},${gotourl} , ${image }\n`, function (err) {
                    if (err) throw err;
                });
                 
            }
        }




         else if (url.includes('https://www.asianage.com/business')) { 
            // Task for URLs containing 'page=1'
            const productHandles = await page.$$(".sixnews>div");
            for (const product of productHandles) {
                let title = "NULL";
                let image = "NULL";
                let gotourl  = "NULL";
                try {
                    title = await page.evaluate(el => el.querySelector("h3>a").textContent, product);
                } catch (error) {
                    console.error(error);
                }
                try {
                    gotourl = await page.evaluate(el => el.querySelector("a").getAttribute("href"), product);
                } catch (error) {
                    console.error(error);
                }
                try {
                    image = await page.evaluate(el => el.querySelector("a>img").getAttribute("data-src"), product);
                } catch (error) {
                    console.error(error);
                }
                
                // `${title.replace(/,/g, ".")},${price.replace(/,/g,".")}\n`,
                fs.appendFile("business.csv", `${title.replace(/,/g , " " )},${url + gotourl} , ${image }\n`, function (err) {
                    if (err) throw err;
                });
                 
            }
        }

        else  if (url.includes('asianage')) { 
            // Task for URLs containing 'page=1'
            const productHandles = await page.$$(".top-stories.floatleft>div:nth-child(2)>div");
            for (const product of productHandles) {
                let title = "NULL";
                let image = "NULL";
                let gotourl  = "NULL";
                try {
                    title = await page.evaluate(el => el.querySelector("h3>a").textContent, product);
                } catch (error) {
                    console.error(error);
                }
                try {
                    gotourl = await page.evaluate(el => el.querySelector("a").getAttribute("href"), product);
                } catch (error) {
                    console.error(error);
                }
                try {
                    image = await page.evaluate(el => el.querySelector("a>img").getAttribute("data-src"), product);
                } catch (error) {
                    console.error(error);
                }
                
                // `${title.replace(/,/g, ".")},${price.replace(/,/g,".")}\n`,
                fs.appendFile("home.csv", `${title.replace(/,/g , " " )},${url + gotourl} , ${image }\n`, function (err) {
                    if (err) throw err;
                });
                 
            }
        }
        
//         // else  
//          else  if (url.includes('hindustantimes')) { 
//             // Task for URLs containing 'page=1'
//             const productHandles = await page.$$("#topnews>section>div:nth-child(2)>.cartHolder.listView.track.timeAgo.articleClick");
//             for (const product of productHandles) {
//                 let title = "NULL";
//                 let image = "NULL";
//                 let gotourl  = "NULL";
//                 try {
//                     title = await page.evaluate(el => el.querySelector(".cartHolder.listView.track.timeAgo.articleClick>h3").textContent, product);
//                 } catch (error) {
//                     console.error(error);
//                 }
//                 try {
//                     gotourl = await page.evaluate(el => el.querySelector(".cartHolder.listView.track.timeAgo.articleClick>figure>span>a").getAttribute("href"), product);
//                 } catch (error) {
//                     console.error(error);
//                 }
//                 try {
//                     image = await page.evaluate(el => el.querySelector(".cartHolder.listView.track.timeAgo.articleClick>figure>span>a>img").getAttribute("data-src"), product);
//                 } catch (error) {
//                     console.error(error);
//                 }
                
//                 // `${title.replace(/,/g, ".")},${price.replace(/,/g,".")}\n`,
//                 fs.appendFile("home.csv", `${title.replace(/,/g , " " )},${url + gotourl} , ${image }\n`, function (err) {
//                     if (err) throw err;
//                 });
                 
//             }
//         }



        // hindustan times balo ko dhekna hain abhi bache hue 4 kaise hoge nome bale referance lekr 
        //  if (url.includes('https://www.hindustantimes.com/real-estate')) { 
        //     // Task for URLs containing 'page=1'
        //     const productHandles = await page.$$(".home.bgImg.scrollB>.container>.mainContainer>#dataHolder>.cartHolder.track.timeAgo.articleClick");


        //     // .home.bgImg.scrollB>.container>.mainContainer>#dataHolder>.cartHolder.track.timeAgo.articleClick


        //   //  #dataHolder>.cartHolder


        //  //   .home.scrollB.bgImg>.container>section>section>.cartHolder

        //   //  .home.scrollB.bgImg>.container>section>section>.cartHolder
        //     for (const product of productHandles) {
        //         let title = "NULL";
        //         let image = "NULL";
        //         let gotourl  = "NULL";
        //         try {
        //             title = await page.evaluate(el => el.querySelector(".cartHolder.track.timeAgo.articleClick>h2>a").textContent, product);
        //         } catch (error) {
        //             console.error(error);
        //         }
        //         try {
        //             gotourl = await page.evaluate(el => el.querySelector(".cartHolder.track.timeAgo.articleClick>h2>a").getAttribute("href"), product);
        //         } catch (error) {
        //             console.error(error);
        //         }
        //         try {
        //             image = await page.evaluate(el => el.querySelector(".cartHolder.track.timeAgo.articleClick>figure>span>a>img").getAttribute("src"), product);
        //         } catch (error) {
        //             console.error(error);
        //         }
                
        //         // `${title.replace(/,/g, ".")},${price.replace(/,/g,".")}\n`,
        //         fs.appendFile("business.csv", `${title.replace(/,/g , " " )},${url + gotourl} , ${image }\n`, function (err) {
        //             if (err) throw err;
        //         });
                 
        //     }
        // }
    
        
        //  else 



         //  uncomment krna 

    //    else    if(url.includes('asianage')) 
    //         {
                
           

    //         // const productHandles = await page.$$('.contentwrapper.clearfix>div:nth-child(3)>div:nth-child(4)>div:nth-child(4)>div:nth-child(1)>div');
    //         const productHandles = await page.$$('.top-stories.floatleft>div:nth-child(2)>div');
    //         for (const product of productHandles) {
    //             let title = "NULL";
    //             let image = "NULL";
    //             let gotourl  = "NULL";
    //             try {
    //                 title = await page.evaluate(el => el.querySelector("h3>a").textContent, product);
    //             } catch (error) {
    //                 console.error(error);
    //             }
    //             try {
    //                 gotourl = await page.evaluate(el => el.querySelector("a").getAttribute("href"), product);
    //             } catch (error) {
    //                 console.error(error);
    //             }
    //             try {
    //                 // await page.waitForSelector(".other-article>div:nth-child(1)>a>img")
    //                 image = await page.evaluate(el => el.querySelector("a>img").getAttribute("src"), product);
    //             } catch (error) {
    //                 console.error(error);
    //             }
                
    //             // `${title.replace(/,/g, ".")},${price.replace(/,/g,".")}\n`,
    //             fs.appendFile("home.csv", `${title.replace(/,/g , " " )},${ url +  gotourl} , ${image}\n`, function (err) {
    //                 if (err) throw err;
    //             });
                 
    //         }


    //     }

       

        //  else if(url.includes('page=2') ) {
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