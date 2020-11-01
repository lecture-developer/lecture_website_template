import { Element } from '/lecture_website_template/js/components/element.js';
import {Course} from '/lecture_website_template/js/components/course.js';

class CourseUpdate extends Element
{
	constructor(title, link, description, date)
	{
		super();
		this.title = title;
		this.link = link;
		this.description = description;
		this.date = date;
	}
	
	// convert the object into HTML
	toHtml()
	{
		let html = '<div class="update-content">';

		html += '<h3 class="content-title">' + this.title + '<hr>';
		html += '<h2 class="content-subtitle">' + this.date + '</h2>';
		html += '<p class="content-text">' + Course.descriptionTrim(this.description) + '</p>';

		html += '</div>';

		return html;
	}
	
	// build a list of this object from Json object
	static createListFromJson(jsonObj)
	{
		var listStudent = [];
		for (var publicationIndex = 0; publicationIndex < jsonObj.length; publicationIndex++)
		{
			listStudent.push(CourseUpdate.createFromJson(jsonObj[publicationIndex]));
		}
		return listStudent;

	}
	
	// build a list of this object from Json object
	static createFromJson(jsonObj)
	{

		return new CourseUpdate(jsonObj["title"],
		jsonObj["link"], 
		jsonObj["description"], 
        jsonObj["date"]);

	}
}
export {CourseUpdate};