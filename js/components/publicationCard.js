import { Element } from '/js/components/element.js';
import { ActionButton } from '/js/components/actionButton.js';

class PublicationCard extends Element
{
	constructor(name, authors, description, fileLinks, year, topic, type, publisher)
	{
		this.name = name;
		this.authors = authors;
		this.description = description;
		this.fileLinks = fileLinks;
		this.year = year;
		this.topic = topic;
		this.type = type;
		this.publisher = publisher;
	}
	
	// convert the object into HTML
	toHtml()
	{
		var answer = '<div class="academic-papers-panel"><h3>' 
		+ this.name + '</h3><p>'
		+ this.description + '</p><ul><li>' 
		+ this.authors + '</li><li>' 
		+ this.publisher + '</li><li>' 
		+ this.year + '</li><li>'
		+ this.type + '</li></ul>';
		
		answer += '<div class="space-between">'
		for (var linkIndex = 0; linkIndex < this.fileLinks.length; linkIndex++)
		{
			answer += ActionButton.
		}
		+ this.link + '">Download Work</a><a class="cite-btn" onclick="'
		+ this.name + '">Cite this publication</a></div></div>';
	}
	
	// build a list of this object from Json object
	static createListFromJson(jsonObj)
	{
		var answer = [];
		for (var publicationIndex = 0; publicationIndex < jsonObj["publications"].length; publicationIndex++)
		{
			answer.push(PublicationCard.createFromJson(jsonObj["publications"][publicationIndex])));
		}
		return answer;
	}
	
	// build a list of this object from Json object
	static createFromJson(jsonObj)
	{
		return new PublicationElement(jsonObj["name"],
		jsonObj["description"], 
		ActionButton.createListFromJson(jsonObj["fileLinks"]), 
		jsonObj["year"], 
		jsonObj["topic"], 
		jsonObj["type"], 
		jsonObj["publisher"]));
	}
	
	// sort according to some property list of this object
	static sortByProperty(ObjList, property)
	{
		return ObjList.sort(function(a, b)
		{
			var x = a[property + ""]; 
			var y = b[property + ""];
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		});
	}
	
	// filter the list according to some property and value
	static filterList(objList, property, filterValue)
	{
		var answer = [];
		for (var objIndex = 0; objIndex < objList.length; objIndex++)
		{
			if (objList[objIndex][property + ""] == filterValue)
			{
				answer.push(objList[objIndex]);
			}
		}
		return answer;
	}
	
	// split list into list of lists according to some property
	static splitByProperty(ObjList, property)
	{
		var answer = {};
		var spliter = ObjList[0][property + ""];
		var subGroup = [ObjList[0]];
		for (var publicationIndex = 1; publicationIndex < ObjList.length; publicationIndex++)
		{
			if (ObjList[publicationIndex][property + ""] != spliter)
			{
				answer[spliter] = [...subGroup];
				spliter = ObjList[publicationIndex][property + ""];
				subGroup = [ObjList[publicationIndex]];
			}
			else
			{
				subGroup.push(ObjList[0]);
			}
		}
		answer[spliter] = [...subGroup];
		return answer;
	}
}
export {PubloationCard};