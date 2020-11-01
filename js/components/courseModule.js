import { Element } from '/lecture_website_template/js/components/element.js';
import { CourseResource } from '/lecture_website_template/js/components/courseResource.js';

class CourseModule extends Element
{
	constructor(title, explanation, resources)
	{
		super();
		this.title = title;
		this.explanation = explanation;
		this.resources = resources;
	}
	
	// convert the object into HTML
	toHtml()
	{
		let html = '<div class="module"><h3 class="content-title">' + this.title + '</h3><hr>';


		let required = this.is_requried ? 'Required' : 'Optinal'; 
	}
	
	// build a list of this object from Json object
	static createListFromJson(jsonObj)
	{
		var listStudent = [];
		for (var publicationIndex = 0; publicationIndex < jsonObj.length; publicationIndex++)
		{
			listStudent.push(CourseModule.createFromJson(jsonObj[publicationIndex]));
		}
		return listStudent;
	}
	
	// build a list of this object from Json object
	static createFromJson(jsonObj)
	{
		return new CourseModule(jsonObj["title"],
		jsonObj["explanation"], 
		CourseResource.createListFromJson(jsonObj["resources"]));
	}
}
export {CourseModule};