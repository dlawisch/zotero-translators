{
    "translatorID": "e7ba8f76-92b4-405c-882c-991afe4272ea",
    "label": "The Old New Thing",
    "creator": "dlawisch",
    "target": "^https?://devblogs\\.microsoft\\.com/oldnewthing",
    "minVersion": "3.0",
    "maxVersion": "",
    "priority": 100,
    "inRepository": false,
    "translatorType": 5,
    "browserSupport": "gcsibv",
    "lastUpdated": "2024-04-16"
}

/*
    The Old New Thing Zotero Translator
    Copyright (C) 2024 Douglas Lawisch, douglas@lawisch.com.br

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the Affero GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

function detectWeb(doc, url) {
    return "blogPost";
}

function doWeb(doc, url) {
    var resourceType = detectWeb(doc, url);
    var newItem = new Zotero.Item(resourceType);

    newItem.blogTitle = "The Old New Thing";
    newItem.url = url;

    // doc.title includes the blog name at the end, so we grab the title from the article
    doc_title = ZU.xpathText(doc, '/html/body/div[4]/main/div/div/div/div/article/div/div/h1');
    newItem.title  = doc_title;

    var author = "Raymond Chen";
    newItem.creators.push(ZU.cleanAuthor(author, "author", false));

    // date xpath
    var date_raw = ZU.xpathText(doc, '/html/body/div[4]/main/div/div/div/div/article/div/div/div[3]/p');

    // regex for "Month DDth, YYYY"
    re = /[ADFJMNOS][a-z]{2,8} [0-9]{1,2}[stndrdth]{2}, [12][0-9]{3}/
    date_re = date_raw.match(re)

    // Zotero strToISO() doesn't seem to like ordinal indicators, so remove them
    date_clean = date_re[0]; // match() returns an array, we need a string
    date_clean = date_clean.replace("st,", "")
    date_clean = date_clean.replace("nd,", "")
    date_clean = date_clean.replace("rd,", "")
    date_clean = date_clean.replace("th,", "")

    if (date_clean) {
        newItem.date = ZU.strToISO(date_clean);
    }

    newItem.attachments.push({
        title: "Snapshot",
        mimeType: "text/html",
        url: url
    });

    newItem.complete();
}
