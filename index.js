const axios = require('axios')
const fs = require('fs');
const cheerio = require('cheerio')
var logger = fs.createWriteStream('log.txt', {
    flags: 'a' 
})
function getBotIds(num) {
    axios.get(`https://top.gg/list/top?page=${num}`).then(e => {
        fs.writeFile('./test.txt', e.data, err => {
            if (err) {
                console.error(err);
            }
            const $ = cheerio.load(e.data);
            $("button").each((i, elem) => {
                {
                    if (elem.attribs.class === 'chakra-button css-98vs04') {
                        if (elem.parent.attribs.href.includes('invite')) return;
                        if (!elem.parent.attribs.href.includes('vote')) return;
                        logger.write(elem.parent.attribs.href.split('/')[2] + '\n')
                    }
                }
            })
        });
    })

}
getBotIds(1) //  page to scrape