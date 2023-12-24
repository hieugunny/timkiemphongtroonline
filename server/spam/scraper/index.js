import puppeteer from 'puppeteer'; 
import fs from 'fs'
const startBrower = async () => { 
    let browser
    try { 
      browser = await puppeteer.launch({
          headless: false,
          args: ["--disable-setuid-sandbox"],
          'ignoreDefaultArgs': true
      })
    } catch (error) {
      console.log('Khong tao dc browser '+error);
    }
    return browser
}  
const scrapCategory = async (browser, url) => new Promise(async (resolve, reject) => {
    const data = {}
    try {
        let page = await browser.newPage() 
        console.log('>>>> mo tab moi...')
        await page.goto(url)
        console.log('>>>> truy cap vao...' + url);
        await page.waitForSelector('.page_inner')
        console.log('>>>> website da load xong...');  
        const categories = await page.$$eval('.row .sidebar .side_categories ul li ul li', els => { 
            const data = els.map(el => {
                return {
                    link: el.querySelector('a').href,
                    attribute: el.querySelector('a').innerText
                }
            })   
            console.log(data)
            return data
        }) 

        const bookDetail = async (url) => new Promise(async (resolve, reject) => {
            try {
                let page = await browser.newPage()  
                console.log('Mo trang :' +url);
                await page.goto(url) 
                await page.waitForSelector('.page_inner')
                console.log('>>>> website da load xong: '+url)
                const data = await page.$eval('div.page_inner > .content #content_inner article.product_page', els => {
                    return { 
                        "bookTitle": els.querySelector('.row .product_main h1').innerText,
                        "bookPrice":els.querySelectorAll('table.table-striped > tbody tr td')[2].innerText.replace('£',''),
                        "available":els.querySelectorAll('table.table-striped > tbody tr td')[5].innerText.match(/\d+/g)[0],
                        "imageUrl":els.querySelector('.row #product_gallery img').src,
                        "bookDescription":els.querySelector('p').innerText,
                        "upc":els.querySelectorAll('table.table-striped > tbody tr td')[0].innerText,
                    }
                })
                await page.close()
                console.log('>>>>Cao xong trang!');
                resolve(data)
            } catch (error) {
                console.log('loi o bookdetail: '+ error);
                reject()
            }
        })
        const books = async (url) => new Promise(async (resolve, reject) => {
            const data = []
            try { 
                let page = await browser.newPage()  
                await page.goto(url) 
                await page.waitForSelector('.page_inner')
                console.log('>>>> Da load xong: '+ url);
                const links = await page.$$eval('ol.row li > article.product_pod', els => {  
                    return els.map(el => {
                        return el.querySelector('h3 > a').href
                    })  
                })   
                for(let book of links){
                    data.push(await bookDetail(book))
                }
                await page.close()
                resolve(data)
            } catch (error) {
                console.log('loi tu books: '+ error);
                reject()
            }
        }) 
        for(var item of categories){ 
            data[item.attribute] = await books(item.link)
        } 
        await page.close()
        resolve(data)
    } catch (error) {
        reject()
        console.log('loi o scrap category: ' + error);
    }
}) 
const scrap = async () => { 
    const url = 'https://books.toscrape.com/'  
    const url2 = 'https://books.toscrape.com/catalogue/category/books/travel_2/index.html'  
    const url3 = 'https://books.toscrape.com/catalogue/its-only-the-himalayas_981/index.html'  
    try {
        const browser = await startBrower() 
        const data = await scrapCategory(browser,url)
        const data1 = {
            key: "dadasdasd"
        }
        console.log('ghi filw de');                        
        fs.writeFile('dataBooks.json', JSON.stringify(data), (err) => {
            if(err) console.log('Loi khi ghi file: '+ err)
            console.log('Ghi file thanh cong');
        });  
    } catch (error) {
        // if(error.message.includes('Timeout')){
        //     scrap()
        // }
        console.log('loi o controller: '+error);
    }
} 
module.exports = scrap