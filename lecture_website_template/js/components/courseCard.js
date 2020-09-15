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
	static sortByProperty(ObjList, propertyA,propertyB)
	{
		return ObjList.sort(function(a, b)
		{
			var x = a[propertyA + ""]; 
			var y = b[propertyA + ""];
		
			if (x === y) {
				// propertyB is only important when propertyA are the same
				return a[propertyB+ ""]-b[propertyB + ""];
			 }
			 return x > y ? -1 : 1;
		
		
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
	
	//create list of the name of the buttons 
	static listFilterButtons(objList,property)
	{
        var answer=[];
        for (var objIndex=0;objIndex < objList.length; objIndex++)
        {
            if (!answer.includes(objList[objIndex][property+""]))
            {
                answer.push(objList[objIndex][property+""]);
            }
		}
        return answer;
    }
}
export {CourseCard};
	