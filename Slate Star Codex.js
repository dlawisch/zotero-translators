{
	"translatorID": "9e7f2e6c-f4d1-4a2b-8a37-023cbd20ba09",
	"label": "Slate Star Codex",
	"creator": "dlawisch",
	"target": "https://slatestarcodex\\.com",
	"minVersion": "5.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2024-04-30 17:37:32"
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

	newItem.blogTitle = "Slate Star Codex";
	newItem.url = url;
	newItem.title  = ZU.xpathText(doc, '/html/body/div/div[2]/div[2]/div/div[1]/h1');
	
	var author = "Scott Alexander";
	newItem.creators.push(ZU.cleanAuthor(author, "author", false));

	var date = ZU.xpathText(doc, '/html/body/div/div[2]/div[2]/div/div[1]/div[1]/a/span');
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
		"url": "https://slatestarcodex.com/2014/07/30/meditations-on-moloch/",
		"items": [
			{
				"itemType": "blogPost",
				"title": "Meditations On Moloch",
				"creators": [
					{
						"firstName": "Scott",
						"lastName": "Alexander",
						"creatorType": "author"
					}
				],
				"date": "2014-07-30",
				"blogTitle": "Slate Star Codex",
				"url": "https://slatestarcodex.com/2014/07/30/meditations-on-moloch/",
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
