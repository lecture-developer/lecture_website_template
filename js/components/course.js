import { Element } from '/lecture_website_template/js/components/element.js';

class Course extends Element
{
	constructor(name, description, projects, year,degree,linked_link,publiction_link,is_alumni)
	{
		super();
		this.name=name;
		this.description=description;
		this.projects=projects;
		this.year=year;
		this.degree=degree;
		this.linked_link=linked_link;
		this.publiction_link=publiction_link;
		this.is_alumni=is_alumni;
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
			listStudent.push(Course.createFromJson(jsonObj[publicationIndex]));
		}
		return listStudent;

	}
	
	// build a list of this object from Json object
	static createFromJson(jsonObj)
	{

		return new Course(jsonObj["name"],
		jsonObj["description"], 
		ProjectStudent.createListFromJson(jsonObj["projects"]), 
		jsonObj["year"], 
        jsonObj["degree"], 
        jsonObj["linked_link"],
		jsonObj["publiction_link"],
		jsonObj["is_alumni"],);

	}
}
export {Course};