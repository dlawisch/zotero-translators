{
	"translatorID": "c308abeb-029e-4bc7-88b8-60d459c43441",
	"label": "Paul Graham",
	"creator": "dlawisch",
	"target": "^https?://paulgraham\\.com",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 5,
	"browserSupport": "gcsibv",
	"lastUpdated": "2024-04-30 16:20:23"
}

/*
	Paul Graham Zotero Translator
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
	var pg = "Paul Graham";
	
	newItem.blogTitle = pg;
	newItem.url = url;
	newItem.title  = doc.title;
	
	// ZU -> Zotero.Utilities
	newItem.creators.push(ZU.cleanAuthor(pg, "author", false));

	// xpath of the essay plus the occasional yc banner or quote
	var text_raw = ZU.xpathText(doc, '/html/body/table/tbody/tr/td[3]/table[1]/tbody/tr/td');
	
	// regex for "Month YYYY"
	re = /[ADFJMNOS][a-z]+ [12][0-9]{3}/ 
	text_re = text_raw.match(re)

	if (text_re) {
		newItem.date = ZU.strToISO(text_re);
	}
	
	newItem.attachments.push({
		title: "Snapshot",
		mimeType: "text/html",
		url: url
	});

	newItem.complete();
}/** BEGIN TEST CASES **/
var testCases = [
]
/** END TEST CASES **/
