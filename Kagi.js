{
	"translatorID": "6cce84c5-f24e-4818-bba3-9a0665f3b866",
	"label": "Kagi",
	"creator": "dlawisch",
	"target": "https://blog.kagi.com/",
	"minVersion": "5.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2024-04-30 17:42:51"
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

	newItem.blogTitle = "Tales from Kagi";
	newItem.url = url;
	newItem.title  = ZU.xpathText(doc, '/html/body/main/h1');
	
	var author = "Vladimir Prelovac";
	newItem.creators.push(ZU.cleanAuthor(author, "author", false));

	var date = ZU.xpathText(doc, '/html/body/main/p');
	if (date) {
		newItem.date = ZU.strToISO(date);
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
		"url": "https://blog.kagi.com/last-mile-for-web-search",
		"items": [
			{
				"itemType": "blogPost",
				"title": "Taking web search through the last mile",
				"creators": [
					{
						"firstName": "Vladimir",
						"lastName": "Prelovac",
						"creatorType": "author"
					}
				],
				"date": "2019-12-01",
				"blogTitle": "Tales from Kagi",
				"url": "https://blog.kagi.com/last-mile-for-web-search",
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
		"url": "https://blog.kagi.com/kagi-wolfram",
		"items": [
			{
				"itemType": "blogPost",
				"title": "Kagi + Wolfram",
				"creators": [
					{
						"firstName": "Vladimir",
						"lastName": "Prelovac",
						"creatorType": "author"
					}
				],
				"date": "2024-03-04",
				"blogTitle": "Tales from Kagi",
				"url": "https://blog.kagi.com/kagi-wolfram",
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
