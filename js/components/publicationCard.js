import { Element } from '/js/components/element.js';
import { ActionButton } from '/js/components/actionButton.js';

let CITE_SYMBOL = '<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5703 7.62723C12.5703 9.68531 12.5703 10.0285 10.856 10.0285L10.856 13.8588C14.8557 13.8588 16 11.1697 16 6.42689L16 0.141748L8.56874 0.141748L8.56874 6.42689L12.5703 6.42689L12.5703 7.62723Z" fill="#2D3748"/><path d="M3.99845 6.42689L3.99845 7.62723C3.99845 9.68531 3.99845 10.0285 2.28421 10.0285L2.28421 13.8588C6.2839 13.8588 7.42755 11.1697 7.42755 6.42689L7.42755 0.141748L-5.47655e-06 0.141748L-6.02601e-06 6.42689L3.99845 6.42689Z" fill="#2D3748"/></svg>';

class PublicationCard extends Element
{
	constructor(name, description, fileLinks, authors, year, topic, type, publisher, publicationStatus)
	{
		super();
		this.name = name;
		this.description = description;
		this.fileLinks = fileLinks;
		this.authors = authors;
		this.year = year;
		this.topic = topic;
		this.type = type;
		this.publisher = publisher;
		this.publicationStatus = publicationStatus;
	}
	
	// convert the object into HTML
	toHtml()
	{
		// TODO: make this more generic with the following things:
		// 1. dynamic list of action buttons each one with it's design from the class 
		// 2. 
		var answer = '<div class="academic-papers-panel"><h3>' 
		+ this.name + '</h3><h4>'
		+ this.authors + "<br>" + this.publisher + '</h4><p>'
		+ this.description + '</p><div class="personal-row space-between"><div class="w-100"><span>'
		+ this.publicationStatus + '</span><span>'
		+ this.year + '</span><span>'
		+ this.type + '</span></div><div class="w-100 flex-end"><a class="cite-btn" href="'
		+ this.fileLinks[0]["link"] + '">' + CITE_SYMBOL + ' Cite this publication</a><a href="'
		+ this.fileLinks[1]["link"] + '" class="download-btn">Download</a></div></div></div>';
		return answer;
	}
	
	// build a list of this object from Json object
	static createListFromJson(jsonObj)
	{
		var answer = [];
		for (var publicationIndex = 0; publicationIndex < jsonObj.length; publicationIndex++)
		{
			answer.push(PublicationCard.createFromJson(jsonObj[publicationIndex]));
		}
		return answer;
	}
	
	// build a list of this object from Json object
	static createFromJson(jsonObj)
	{
		return new PublicationCard(jsonObj["name"],
		jsonObj["description"], 
		ActionButton.createListFromJson(jsonObj["fileLinks"]), 
		jsonObj["authors"], 
		jsonObj["year"], 
		jsonObj["topic"], 
		jsonObj["type"], 
		jsonObj["publisher"],
		jsonObj["publicationStatus"]);
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
export {PublicationCard};