// imports 
import { PageRender, retrivedData } from '/js/pageRender.js';

// Data file paths
let UPDATES_TEXT = "/data/notifications.txt"
let LECTURE_INFO_JSON = "/data/jsons/lecturer.json";
let INDEX_JSON = "/data/jsons/index.json";

/*
	Single instance class to build Index page with dynamic content from JSONS from the server
*/
class Index  extends PageRender
{
	constructor()
	{
		
	}
	
	// just gather all the build of all the sections in the page - one per call to the server side
	static build()
	{
		Index.buildeNotifications();
		Index.buildePersonalPanel();
		Index.buildePageContent();
	}
	
	/* build section functions */
	
	static buildeNotifications()
	{
		var container_id = "update-container";
		try
		{
			Index.loadFileFromServer(UPDATES_TEXT);
			var txtObj = retrivedData;
			var notificationLines = txtObj.split("\n");
			
			var notificationHtml = "";
			if (notificationLines.length > 0)
			{
				for (var notificationIndex = 0; notificationIndex < notificationLines.length; notificationIndex++)
				{
					notificationHtml += '<div class="carousel-cell"><div class="update-panel"><div class="update-text">' + notificationLines[notificationIndex] + '</div></div></div>';
				}
				document.getElementById("updates-panel").innerHTML = notificationHtml;
			}
			else
			{
				document.getElementById(container_id).style.display = "none";
			}
		}
		catch (error)
		{
			console.log("Error at Index.buildeNotifications saying: " + error);
			document.getElementById("update-container").style.display = "none";
		}
	}
	
	static buildePersonalPanel()
	{
		var container_id = "personal_container";
		try
		{
			Index.loadFileFromServer(LECTURE_INFO_JSON, true);
			var jsonObj = retrivedData;
			document.getElementById("lecture_position").innerHTML = jsonObj["position"];
			var addressesHtml = "";
			for (var locIndex = 0; locIndex < jsonObj["addresses"].length; locIndex++)
			{
				 addressesHtml += "<p> " + jsonObj["addresses"][locIndex] + "</p>";
			}
			document.getElementById("lecture_address").innerHTML += addressesHtml;
			document.getElementById("lecture_phone").innerHTML += jsonObj["phone"];
			document.getElementById("lecture_email").innerHTML += jsonObj["email"];
			// TODO: add links to the academic social buttons
			
			// TODO: as list not single string
			// document.getElementById("research_intrests").innerHTML = jsonObj["field"];
		}
		catch (error)
		{
			console.log("Error at Index.buildePersonalPanel saying: " + error);
			document.getElementById(container_id).style.display = "none";
		}
	}
	
	static buildePageContent()
	{
		try
		{
			Index.loadFileFromServer(INDEX_JSON, true);
			var jsonObj = retrivedData;
			
			// Biography
			document.getElementById("biography").innerHTML = jsonObj["biography"];
			
			// Featured Publications
			var featuredPublicationsHtml = "";
			for (var pubIndex = 0; pubIndex < jsonObj["featuredPublications"].length; pubIndex++)
			{
				var pubObj = jsonObj["featuredPublications"][pubIndex];
				featuredPublicationsHtml += '<div class="featured-publications-panel"><h3>' + pubObj["name"] + '</h3><p>' + pubObj["description"] + '<p>';
				if (pubObj["type"] == "download")
				{
					featuredPublicationsHtml += '<a class="download-btn" href="' + pubObj["link"] + '"> Download  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14.8571 10.2857C14.5415 10.2857 14.2857 10.5415 14.2857 10.8571V14.2857C14.2857 14.6013 14.0298 14.8572 13.7142 14.8572H2.28573C1.97013 14.8572 1.71429 14.6013 1.71429 14.2857V10.8571C1.71429 10.5415 1.45845 10.2857 1.14285 10.2857C0.827248 10.2857 0.571411 10.5415 0.571411 10.8571V14.2857C0.571411 15.2325 1.33892 16 2.2857 16H13.7143C14.6611 16 15.4286 15.2325 15.4286 14.2857V10.8571C15.4286 10.5415 15.1727 10.2857 14.8571 10.2857Z" fill="white"/> <path d="M11.2482 9.88171C11.0268 9.66786 10.6757 9.66786 10.4543 9.88171L8.57145 11.7634V0.571439C8.57145 0.255837 8.31561 0 8.00001 0C7.6844 0 7.42857 0.255837 7.42857 0.571439V11.7634L5.54683 9.88171C5.31983 9.66247 4.95808 9.66877 4.73884 9.89574C4.52496 10.1172 4.52496 10.4683 4.73884 10.6897L7.59598 13.5468C7.81887 13.7703 8.18068 13.7707 8.4041 13.5479C8.40444 13.5475 8.40477 13.5472 8.40514 13.5468L11.2623 10.6897C11.4815 10.4627 11.4753 10.101 11.2482 9.88171Z" fill="white"/></svg></a>';
				}
				else // (pubObj["type"] == "view")
				{
					featuredPublicationsHtml += '<a class="download-btn" href="' + pubObj["link"] + '"> Download  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14.8571 10.2857C14.5415 10.2857 14.2857 10.5415 14.2857 10.8571V14.2857C14.2857 14.6013 14.0298 14.8572 13.7142 14.8572H2.28573C1.97013 14.8572 1.71429 14.6013 1.71429 14.2857V10.8571C1.71429 10.5415 1.45845 10.2857 1.14285 10.2857C0.827248 10.2857 0.571411 10.5415 0.571411 10.8571V14.2857C0.571411 15.2325 1.33892 16 2.2857 16H13.7143C14.6611 16 15.4286 15.2325 15.4286 14.2857V10.8571C15.4286 10.5415 15.1727 10.2857 14.8571 10.2857Z" fill="white"/> <path d="M11.2482 9.88171C11.0268 9.66786 10.6757 9.66786 10.4543 9.88171L8.57145 11.7634V0.571439C8.57145 0.255837 8.31561 0 8.00001 0C7.6844 0 7.42857 0.255837 7.42857 0.571439V11.7634L5.54683 9.88171C5.31983 9.66247 4.95808 9.66877 4.73884 9.89574C4.52496 10.1172 4.52496 10.4683 4.73884 10.6897L7.59598 13.5468C7.81887 13.7703 8.18068 13.7707 8.4041 13.5479C8.40444 13.5475 8.40477 13.5472 8.40514 13.5468L11.2623 10.6897C11.4815 10.4627 11.4753 10.101 11.2482 9.88171Z" fill="white"/></svg></a>';
				}
				featuredPublicationsHtml += '</div>';
			}
			document.getElementById("featured_publications").innerHTML = featuredPublicationsHtml;
			
			// Current Projects
			var currentProjectsHtml = "";
			for (var projIndex = 0; projIndex < jsonObj["currentProjects"].length; projIndex++)
			{
				var projObj = jsonObj["currentProjects"][projIndex];
				currentProjectsHtml += '<div class="current-projects-panel"><h4>' + projObj["name"] + '</h4><p>' + projObj["description"] + '<p><a class="link-btn" href="' + projObj["link"] + '> <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0)"><path d="M3.75803 11.5732C3.88566 11.7008 4.05305 11.7646 4.22035 11.7646C4.38765 11.7646 4.55503 11.7008 4.68266 11.5732L10.904 5.35177C11.1594 5.09633 11.1594 4.6824 10.904 4.42704C10.6486 4.17178 10.2347 4.17178 9.97932 4.42704L3.75803 10.6484C3.50268 10.9038 3.50268 11.3177 3.75803 11.5732Z" fill="white"/><path d="M14.6953 1.31634C13.8465 0.467463 12.718 0 11.5175 0C10.3171 8.71806e-05 9.18868 0.46755 8.33989 1.31634L6.1915 3.46465C5.93615 3.72009 5.93615 4.13402 6.1915 4.38946C6.44676 4.64464 6.86078 4.64481 7.11614 4.38946L9.26462 2.24098C9.86642 1.63926 10.6665 1.30771 11.5176 1.30771C12.3687 1.30771 13.1687 1.63917 13.7705 2.24098C14.3724 2.8427 14.7038 3.64293 14.7038 4.49399C14.7038 5.34505 14.3724 6.1451 13.7705 6.74691L11.6222 8.8953C11.3668 9.15074 11.3668 9.56467 11.6222 9.82003C11.7499 9.94766 11.9173 10.0115 12.0846 10.0115C12.2519 10.0115 12.4192 9.94766 12.547 9.82003L14.6953 7.67163C15.5441 6.82284 16.0116 5.69429 16.0116 4.49399C16.0115 3.2936 15.5442 2.16504 14.6953 1.31634Z" fill="white"/><path d="M8.89315 11.622L6.74476 13.7706C6.14295 14.3723 5.34281 14.7038 4.49184 14.7038C3.64078 14.7038 2.84072 14.3724 2.23891 13.7706C0.99659 12.5283 0.99659 10.5069 2.23891 9.26457L4.38731 7.11617C4.64266 6.86073 4.64266 6.4468 4.38731 6.19145C4.13195 5.93618 3.71793 5.93618 3.46258 6.19145L1.3141 8.33984C-0.438054 10.0921 -0.438054 12.9431 1.3141 14.6952C2.16289 15.5439 3.29136 16.0115 4.49175 16.0114C5.69214 16.0114 6.82061 15.5439 7.6694 14.6951L9.81796 12.5467C10.0733 12.2912 10.0733 11.8773 9.81796 11.6219C9.56252 11.3668 9.14859 11.3667 8.89315 11.622Z" fill="white"/></g><defs><clipPath id="clip0"><rect width="16" height="16" fill="white"/></clipPath></defs></svg>View project </a></div>';
			}
			document.getElementById("current_projects").innerHTML = currentProjectsHtml;
		}
		catch (error)
		{
			console.log("Error at Index.buildePageContent saying: " + error);
		}
	}
	
	/* end -  build sections functions */
}

// run the class build on page load
Index.build();