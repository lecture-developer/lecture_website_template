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
		// TODO: finish here later
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