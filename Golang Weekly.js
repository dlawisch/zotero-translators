{
	"translatorID": "192c9131-3af6-425d-8f71-edba108fe327",
	"label": "Golang Weekly",
	"creator": "dlawisch",
	"target": "^https?://golangweekly\\.com/issues",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 5,
	"browserSupport": "gcsibv",
	"lastUpdated": "2024-04-30 17:22:27"
}

/*
	Golang Weekly Zotero Translator
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

	newItem.blogTitle = "Golang Weekly";
	newItem.url = url;
	newItem.title  = doc.title;

	var author = "Peter Cooper";
	newItem.creators.push(ZU.cleanAuthor(author, "author", false));

	// date xpath
	// newsletter has two formats, changed in issue #205
	var date_before_205 = ZU.xpathText(doc, '/html/body/main/section/div[3]/table/tbody/tr/td/div/table[1]/tbody/tr/td[1]/p');
	var date_after_205  = ZU.xpathText(doc, '/html/body/main/section/div[3]/center/table/tbody/tr/td/div[2]');
	
	// regex for "Month DDth, YYYY"
	re = /[ADFJMNOS][a-z]{2,8} [0-9]{1,2}, [12][0-9]{3}/
	
	var date_re = null;
	if (date_after_205) {
		//Zotero.debug(date_after_205.split("— ")[1]);
		date_re = date_after_205.split("— ")[1].match(re)
	}

	// if does not match new format, try with old
	if (date_before_205 && !date_re) {
		//Zotero.debug(date_before_205.split("— ")[1]);
		date_re = date_before_205.split("— ")[1].match(re)
	}

	//Zotero.debug("date_re " + date_re);

 if (date_re) {
	 newItem.date = ZU.strToISO(date_re);
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
		"url": "https://golangweekly.com/issues/205",
		"items": [
			{
				"itemType": "blogPost",
				"title": "Golang Weekly Issue 205: April 5, 2018",
				"creators": [
					{
						"firstName": "Peter",
						"lastName": "Cooper",
						"creatorType": "author"
					}
				],
				"date": "2018-04-05",
				"blogTitle": "Golang Weekly",
				"shortTitle": "Golang Weekly Issue 205",
				"url": "https://golangweekly.com/issues/205",
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
		"url": "https://golangweekly.com/issues/204",
		"items": [
			{
				"itemType": "blogPost",
				"title": "Golang Weekly Issue 204: March 29, 2018",
				"creators": [
					{
						"firstName": "Peter",
						"lastName": "Cooper",
						"creatorType": "author"
					}
				],
				"date": "2018-03-29",
				"blogTitle": "Golang Weekly",
				"shortTitle": "Golang Weekly Issue 204",
				"url": "https://golangweekly.com/issues/204",
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
