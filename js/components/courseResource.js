import { Element } from '/lecture_website_template/js/components/element.js';

class CourseResource extends Element
{
	constructor(name, link, description, is_requried)
	{
		super();
		this.name = name;
		this.link = link;
		this.description = description;
		this.is_requried = is_requried;
	}
	
	// convert the object into HTML
	toHtml()
	{
		let required = this.is_requried ? 'Required' : 'Optinal'; 
		let html = '<div class="resource"><ul class="resource-list"><li class="content-subtitle">' + required + '<p>something somthing</p></li></ul></div>';

		return html;
	}
	
	// build a list of this object from Json object
	static createListFromJson(jsonObj)
	{
		var listStudent = [];
		for (var publicationIndex = 0; publicationIndex < jsonObj.length; publicationIndex++)
		{
			listStudent.push(CourseResource.createFromJson(jsonObj[publicationIndex]));
		}
		return listStudent;

	}
	
	// build a list of this object from Json object
	static createFromJson(jsonObj)
	{

		return new CourseResource(jsonObj["name"],
		jsonObj["link"], 
		jsonObj["description"], 
        jsonObj["is_requried"]);

	}
}
export {CourseResource};