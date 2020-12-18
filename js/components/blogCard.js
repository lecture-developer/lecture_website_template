import { Element } from '/js/components/element.js';
import { ActionButton } from '/js/components/actionButton.js';

let CITE_SYMBOL = '<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.9796 10.4249C12.221 10.36 12.446 10.2505 12.6272 10.0615C12.8071 9.87389 12.9067 9.64659 12.9654 9.41093C13.0705 8.98875 13.0704 8.40647 13.0703 7.70001C13.0703 7.67591 13.0703 7.65167 13.0703 7.62729L13.0703 7.42695C13.0703 6.59853 12.3987 5.92695 11.5703 5.92695L9.56874 5.92695C9.2926 5.92695 9.06874 5.70309 9.06874 5.42695L9.06874 1.14181C9.06874 0.865667 9.2926 0.641809 9.56874 0.641809L15 0.641809C15.2761 0.641809 15.5 0.865667 15.5 1.14181L15.5 6.42695C15.5 8.56894 15.2613 10.2046 14.6801 11.3435C14.1211 12.4388 13.2304 13.106 11.7876 13.3002C11.5873 13.3272 11.356 13.158 11.356 12.8588L11.356 11.0286C11.356 10.7975 11.5567 10.5386 11.9796 10.4249Z" fill="white" stroke="#1A202C"/><path d="M4.49845 7.42695C4.49845 6.59853 3.82688 5.92695 2.99845 5.92695L0.999994 5.92695C0.723852 5.92695 0.499994 5.70309 0.499994 5.42695L0.499994 1.14181C0.499994 0.865668 0.723853 0.641809 0.999995 0.641809L6.42755 0.641809C6.70369 0.641809 6.92755 0.865667 6.92755 1.14181L6.92755 6.42695C6.92755 8.56896 6.68899 10.2046 6.1079 11.3435C5.54904 12.4389 4.65847 13.106 3.21579 13.3002C3.0155 13.3272 2.78421 13.158 2.78421 12.8588L2.78421 11.0286C2.78421 10.7975 2.98491 10.5386 3.4078 10.4249C3.64917 10.36 3.87418 10.2505 4.05538 10.0615C4.23531 9.87389 4.33492 9.64659 4.39358 9.41093C4.49868 8.98875 4.49858 8.40647 4.49846 7.7C4.49846 7.67591 4.49845 7.65167 4.49845 7.62729L4.49845 7.42695Z" fill="white" stroke="#1A202C"/></svg>';

class BlogCard extends Element
{
	constructor(title, description, year, fileLinks, order)
	{
		super();
		this.title = title;
		this.description = description;
		this.year = year;
		this.fileLinks = fileLinks;
		this.order = order;
	}
	
	// convert the object into HTML
	toHtml()
	{
		//TODO: change it to the relevant HTML
		
		var answer = '<div class="academic-papers-panel"><h3 class="blog-title">' 
		+ this.title + '</h3><p>'
		+ this.description + '</p><div class="personal-row space-between align-items-center mobile-row-breaker"><div class="w-100"><span class="blog-data">'
		+ this.year + '</span></div><div class="w-100 flex-end align-items-center mobile-row-spacer"><a href="/blog-post.html?post='
		+ this.fileLinks[0]["link"] + '" class="download-btn">Read More</a></div></div></div>';
		return answer;
	}
	
	// build a list of this object from Json object
	static createListFromJson(jsonObj)
	{
		var answer = [];
		for (var publicationIndex = 0; publicationIndex < jsonObj.length; publicationIndex++)
		{
			answer.push(BlogCard.createFromJson(jsonObj[publicationIndex]));
		}
		return answer;
	}
	
	// build a list of this object from Json object
	static createFromJson(jsonObj)
	{
		return new BlogCard(jsonObj["title"],
		jsonObj["description"], 
		jsonObj["year"], 
		jsonObj["fileLinks"],
		jsonObj["order"]);
	}
	
	// sort according to some property list of this object
	static sortByProperty(ObjList, property)
	{
		return ObjList.sort(function(a, b)
		{
			var x = a[property + ""]; 
			var y = b[property + ""];
			return ((x < y) ? 1 : ((x > y) ? -1 : 0));
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
	
	// split list into list of lists according to some property
	static splitByProperty(ObjList, property)
	{
		var answer = {};
		var spliter = ObjList[0][property + ""];
		var subGroup = [ObjList[0]];
		for (var publicationIndex = 1; publicationIndex < ObjList.length; publicationIndex++)
		{
			if (ObjList[publicationIndex][property + ""] != spliter)
			{
				answer[spliter] = [...subGroup];
				spliter = ObjList[publicationIndex][property + ""];
				subGroup = [ObjList[publicationIndex]];
			}
			else
			{
				subGroup.push(ObjList[0]);
			}
		}
		answer[spliter] = [...subGroup];
		return answer;
	}
}
export {BlogCard};