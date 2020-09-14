import { Element } from '/lecture_website_template/js/components/element.js';
import { ActionButton } from '/lecture_website_template/js/components/actionButton.js';
class CourseCard extends Element
{
	constructor(name, code, year, semester,university, description)
	{
		super();
		this.name = name;
		this.code = code;
		this.year = year;
        this.semester = semester;
        this.university=university;
		this.description = description;

    }

    // build a list of this object from Json object
	static createListFromJson(jsonObj)
	{
		var listCourse = [];
		for (var publicationIndex = 0; publicationIndex < jsonObj.length; publicationIndex++)
		{
			listCourse.push(CourseCard.createFromJson(jsonObj[publicationIndex]));
		}
		return listCourse;
    }
    // build a list of this object from Json object
	static createFromJson(jsonObj)
	{
		return new CourseCard(jsonObj["name"],
		jsonObj["code"], 
		jsonObj["year"], 
        jsonObj["semester"], 
        jsonObj["university"],
        jsonObj["description"],);
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
    static listByPropery(objList,property){
        var answer=new Set();
        for (var objIndex=0;objIndex < objList.length; objIndex++)
        {
            if (!answer.has(objList[objIndex][property+""]))
            {
                answer.push(objList[objIndex][property+""]);
            }
        }
        return answer;
    }
}
export {CourseCard};
	