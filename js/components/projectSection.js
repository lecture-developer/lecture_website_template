import { Element } from '/lecture_website_template/js/components/element.js';
import { ActionButton } from '/lecture_website_template/js/components/actionButton.js';

class ProjectSection extends Element
{
	constructor(name, description, btn)
	{
		super();
		this.name = name;
		this.description = description;
		this.btn = btn;
	}

	// convert the object into HTML
	toHtml()
	{
		// TODO: make this more generic with the following things:
		// 1. dynamic list of action buttons each one with it's design from the class
		// 2.
		var answer = '<div class="project-panel"><h3>'
		+ this.name + '</h3><p>'
		+ this.description + '</p>'
		if (this.btn["link"] != "")
		{
			answer += '<div class="personal-row space-up-20"><div class="space-around"><a href="' + this.btn["link"] + '" class="download-btn"> Explore project </a></div>\
			<div class="space-around"><a href="' + this.btn["example"] + '" class="secondary-btn"> See example </a></div></div>';
		}
		answer += '</div>';
		return answer;
	}

	// build a list of this object from Json object
	static createListFromJson(jsonObj)
	{
		var answer = [];
		for (var projectIndex = 0; projectIndex < jsonObj.length; projectIndex++)
		{
			answer.push(ProjectSection.createFromJson(jsonObj[projectIndex]));
		}
		return answer;
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

	// build a list of this object from Json object
	static createFromJson(jsonObj)
	{
		return new ProjectSection(jsonObj["name"],
		jsonObj["description"],
		ActionButton.createFromJson(jsonObj["link"]));
	}
}
export {ProjectSection};
