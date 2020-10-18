import { Element } from '/lecture_website_template/js/components/element.js';
import { CourseResource } from '/lecture_website_template/js/components/courseResource.js';
import { CourseUpdate } from '/lecture_website_template/js/components/courseUpdate.js';
import { CourseModule } from '/lecture_website_template/js/components/courseModule.js';

class Course extends Element
{
	constructor(name, description, code, year, semester, university, department, location_class, syllabus, grade_parts, resources, updates, modules)
	{
		super();
		this.name = name;
		this.description = description;
		this.code = code;
		this.year = year;
		this.semester = semester;
		this.university = university;
		this.department = department;
		this.location_class = location_class;
		this.syllabus = syllabus;
		this.grade_parts = grade_parts;
		this.resources = resources;
		this.updates = updates;
		this.modules = modules;
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
			jsonObj["code"], 
			jsonObj["year"], 
			jsonObj["semester"],
			jsonObj["university"],
			jsonObj["department"],
			jsonObj["location_class"],
			jsonObj["syllabus"],
			jsonObj["grade_parts"],
			CourseResource.createListFromJson(jsonObj["resources"]),
			CourseUpdate.createListFromJson(jsonObj["updates"]),
			CourseModule.createListFromJson(jsonObj["modules"]));

	}
}
export {Course};