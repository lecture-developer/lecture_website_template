// imports 
import { PageRender, retrivedData } from '/js/pageRender.js';

// Data file paths
let SEO_JSON = "/data/jsons/seo/index.html"
let UPDATES_TEXT = "/data/notifications.txt"
let LECTURE_INFO_JSON = "/data/jsons/lecturer.json";
let INDEX_JSON = "/data/jsons/index.json";

class Index  extends PageRender
{
	constructor()
	{
		
	}
	
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
					notificationHtml += '<div class="update-panel"><div class="update-img"><svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="24" fill="#A3BFFA"/><g clip-path="url(#clip0)"><path d="M35.6077 12.0588H11.8041C11.36 12.0588 11 12.4188 11 12.8629V29.3577C11 29.8018 11.36 30.1618 11.8041 30.1618H17.7536C18.1977 30.1618 18.5577 29.8018 18.5577 29.3577C18.5577 28.9136 18.1977 28.5536 17.7536 28.5536H12.6082V13.667H34.8036V28.5536H25.2549C25.0912 28.5536 24.9313 28.6036 24.7968 28.697L17.2955 33.897C16.9305 34.15 16.8398 34.651 17.0927 35.016C17.2488 35.2413 17.4994 35.3621 17.7543 35.3621C17.9124 35.3621 18.072 35.3157 18.2117 35.2188L25.5063 30.1619H35.6076C36.0516 30.1619 36.4117 29.8019 36.4117 29.3578V12.8629C36.4118 12.4188 36.0517 12.0588 35.6077 12.0588Z" fill="#5A67D8"/><path d="M26.6816 18.4505C27.1257 18.4505 27.4857 18.0905 27.4857 17.6464C27.4857 17.2024 27.1257 16.8423 26.6816 16.8423H20.7306C20.2865 16.8423 19.9265 17.2024 19.9265 17.6464C19.9265 18.0905 20.2865 18.4505 20.7306 18.4505H26.6816Z" fill="#5A67D8"/><path d="M16.9511 21.1104C16.9511 21.5545 17.3111 21.9145 17.7552 21.9145H29.657C30.1011 21.9145 30.4611 21.5545 30.4611 21.1104C30.4611 20.6663 30.1011 20.3063 29.657 20.3063H17.7552C17.3111 20.3063 16.9511 20.6662 16.9511 21.1104Z" fill="#5A67D8"/><path d="M17.7552 25.3782H29.657C30.1011 25.3782 30.4611 25.0181 30.4611 24.5741C30.4611 24.13 30.1011 23.77 29.657 23.77H17.7552C17.3111 23.77 16.9511 24.13 16.9511 24.5741C16.9511 25.0181 17.3111 25.3782 17.7552 25.3782Z" fill="#5A67D8"/></g><defs><clipPath id="clip0"><rect width="25.4118" height="25.4118" fill="white" transform="translate(11 11)"/></clipPath></defs></svg></div><div class="update-text">' + notificationLines[notificationIndex] + '</div></div>';
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
			document.getElementById("lecture_field").innerHTML = jsonObj["field"];
			var addressesHtml = "";
			for (var locIndex = 0; locIndex < jsonObj["addresses"].length; locIndex++)
			{
				 addressesHtml += "<p> " + jsonObj["addresses"][locIndex] + "</p>";
			}
			document.getElementById("lecture_address").innerHTML += addressesHtml;
			document.getElementById("lecture_phone").innerHTML += jsonObj["phone"];
			document.getElementById("lecture_email").innerHTML += jsonObj["email"];
			// TODO: add links to the academic social buttons
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