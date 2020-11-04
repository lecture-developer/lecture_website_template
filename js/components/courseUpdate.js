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
		this.date = Date.parse(date);
		
		// technical member for flag logic
		this.last_html_flag_show = false;
	}
	
	// convert the object into HTML
	toHtml(lastVisit)
	{
		let html = '<div class="update-content">';
		
		let visitTag = "";
		if (lastVisit.getTime() < this.date)
		{
			visitTag = '<img src="/lecture_website_template/img/flags/label_tag.png" style="float: right;" alt="new resource"/>';
			this.last_html_flag_show = true;
		}

		html += '<h3 class="content-title">' + this.title + visitTag + '</h3><hr>';
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