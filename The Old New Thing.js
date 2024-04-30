{
	"translatorID": "42a54492-c333-404e-a53b-8eddf1690bfb",
	"label": "The Old New Thing",
	"creator": "dlawisch",
	"target": "^https?://devblogs\\.microsoft\\.com/oldnewthing",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 5,
	"browserSupport": "gcsibv",
	"lastUpdated": "2024-04-30 17:22:37"
}

/*
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
/** BEGIN TEST CASES **/
var testCases = [
	{
		"type": "web",
		"url": "https://devblogs.microsoft.com/oldnewthing/20230725-00/?p=108482",
		"items": [
			{
				"itemType": "blogPost",
				"title": "Before you try to do something, make sure you can do nothing",
				"creators": [
					{
						"firstName": "Raymond",
						"lastName": "Chen",
						"creatorType": "author"
					}
				],
				"date": "2023-07-25",
				"blogTitle": "The Old New Thing",
				"url": "https://devblogs.microsoft.com/oldnewthing/20230725-00/?p=108482",
				"attachments": [
					{
						"title": "Snapshot",
						"mimeType": "text/html"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://devblogs.microsoft.com/oldnewthing/20051101-54/?p=33533",
		"items": [
			{
				"itemType": "blogPost",
				"title": "The COM interface contract rules exist for a reason",
				"creators": [
					{
						"firstName": "Raymond",
						"lastName": "Chen",
						"creatorType": "author"
					}
				],
				"date": "2005-11-01",
				"blogTitle": "The Old New Thing",
				"url": "https://devblogs.microsoft.com/oldnewthing/20051101-54/?p=33533",
				"attachments": [
					{
						"title": "Snapshot",
						"mimeType": "text/html"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	}
]
/** END TEST CASES **/
