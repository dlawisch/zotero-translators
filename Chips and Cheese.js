{
	"translatorID": "e4c650da-aff6-4a97-89b2-fac43d3dd87e",
	"label": "Chips and Cheese",
	"creator": "dlawisch",
	"target": "^https?://chipsandcheese\\.com/[0-9]{4}/[0-9]{2}/[0-9]{2}",
	"minVersion": "5.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2024-04-30 17:22:24"
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

	newItem.blogTitle = "Chips and Cheese";
	newItem.url = url;
	newItem.title  = ZU.xpathText(doc, '/html/body/div[1]/div[3]/div[1]/main/article/header/div/div/h1');
	
	var author = ZU.xpathText(doc, '/html/body/div[1]/div[3]/div[1]/main/article/div[1]/span[2]');
		newItem.creators.push(ZU.cleanAuthor(author, "author", false));

	var date = ZU.xpathText(doc, '/html/body/div[1]/div[3]/div[1]/main/article/div[1]/span[1]');
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
		"url": "https://chipsandcheese.com/2024/04/29/can-chinas-loongson-catch-western-designs-probably-not/",
		"items": [
			{
				"itemType": "blogPost",
				"title": "Can China’s Loongson Catch Western Designs? Probably Not.",
				"creators": [
					{
						"firstName": "",
						"lastName": "clamchowder",
						"creatorType": "author"
					}
				],
				"date": "2024-04-29",
				"blogTitle": "Chips and Cheese",
				"shortTitle": "Can China’s Loongson Catch Western Designs?",
				"url": "https://chipsandcheese.com/2024/04/29/can-chinas-loongson-catch-western-designs-probably-not/",
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
		"url": "https://chipsandcheese.com/2020/12/27/nvidias-enterprise/",
		"items": [
			{
				"itemType": "blogPost",
				"title": "NVIDIA’s Enterprise",
				"creators": [
					{
						"firstName": "",
						"lastName": "Cheese",
						"creatorType": "author"
					}
				],
				"date": "2020-12-27",
				"blogTitle": "Chips and Cheese",
				"url": "https://chipsandcheese.com/2020/12/27/nvidias-enterprise/",
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
