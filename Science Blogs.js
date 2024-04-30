{
	"translatorID": "d384eb36-9fcd-4714-a40c-6755b26ccb07",
	"label": "Science Blogs",
	"creator": "dlawisch",
	"target": "https://www\\.science\\.org/content/blog-post",
	"minVersion": "5.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2024-04-30 17:31:43"
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

	newItem.blogTitle = ZU.xpathText(doc, '/html/body/div[1]/div/div/main/div/main/section/div/div/div/div/nav/div[1]/a[4]');
	newItem.url = url;
	newItem.title  = ZU.xpathText(doc, '/html/body/div[1]/div/div/main/div/main/section/div/div/div/div/div/div/h1');
	
	var author = ZU.xpathText(doc, '/html/body/div[1]/div/div/main/div/main/div/div/div[1]/div/div[2]/div/div[1]/div/div[1]/h4/span');
	newItem.creators.push(ZU.cleanAuthor(author, "author", false));

	var date = ZU.xpathText(doc, '/html/body/div[1]/div/div/main/div/main/section/div/div/div/div/div/ul[2]/li[1]/span');
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
		"url": "https://www.science.org/content/blog-post/things-i-won-t-work-dioxygen-difluoride",
		"items": [
			{
				"itemType": "blogPost",
				"title": "Things I Won't Work With: Dioxygen Difluoride",
				"creators": [
					{
						"firstName": "Derek",
						"lastName": "Lowe",
						"creatorType": "author"
					}
				],
				"date": "2010-02-23",
				"blogTitle": "In the Pipeline",
				"shortTitle": "Things I Won't Work With",
				"url": "https://www.science.org/content/blog-post/things-i-won-t-work-dioxygen-difluoride",
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
