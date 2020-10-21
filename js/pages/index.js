// imports 
import { PageRender, retrivedData } from '/lecture_website_template/js/pageRender.js';
import { PublicationCard } from '/lecture_website_template/js/components/publicationCard.js';
import { ProjectPanel } from '/lecture_website_template/js/components/projectPanel.js';

// Data file paths
let UPDATES_TEXT = "/lecture_website_template/data/notifications.txt"
let LECTURE_INFO_JSON = "/lecture_website_template/data/jsons/lecturer.json";
let INDEX_JSON = "/lecture_website_template/data/jsons/index.json";

let INFO_ICON = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.0055 8.66707C12.672 8.66707 13.2143 8.12545 13.2143 7.45974C13.2143 6.79162 12.672 6.24805 12.0055 6.24805C11.3389 6.24805 10.7966 6.79162 10.7966 7.45974C10.7966 8.12545 11.3388 8.66707 12.0055 8.66707Z" fill="#4F4F4F"/><path d="M14.1509 16.643H12.8655V11.8246C12.8655 11.3496 12.4805 10.9645 12.0054 10.9645H9.86009C9.38509 10.9645 9 11.3496 9 11.8246C9 12.2996 9.38509 12.6847 9.86009 12.6847H11.1454V17.503C11.1454 17.978 11.5305 18.3631 12.0055 18.3631H14.151C14.6261 18.3631 15.0111 17.978 15.0111 17.503C15.011 17.028 14.626 16.643 14.1509 16.643Z" fill="#4F4F4F"/><path d="M12.0001 0C5.38312 0 0 5.38312 0 11.9998C0 18.6165 5.38312 23.9998 12.0001 23.9998C18.6169 23.9998 24 18.6167 24 11.9998C24 5.383 18.6168 0 12.0001 0ZM12.0001 22.2796C6.33162 22.2796 1.72018 17.6681 1.72018 11.9998C1.72018 6.33151 6.33162 1.72006 12.0001 1.72006C17.6685 1.72006 22.2798 6.33151 22.2798 11.9998C22.2798 17.6681 17.6684 22.2796 12.0001 22.2796Z" fill="#4F4F4F"/></svg>';

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
					// extract the date from the line
					var splitNotificationLine = notificationLines[notificationIndex].split(" ");
					var date = splitNotificationLine[0];
					// join the rest of the line
					var line = splitNotificationLine.slice(1).join(" ");
					if(line.length > 200) {
						line = line.slice(0, 200);
						line += '...\t <a id="update-link">Read More</a> '
					}
					// notificationHtml += '<div class="carousel-cell"><div class="update-panel"><div class="update-text">' + notificationLines[notificationIndex] + '</div></div></div>';
					notificationHtml += '<div class="carousel-cell"><div class="update-panel"><div class="update-text"><span class="update-date"> update ' + date + '</span><br> ' + line + '</div></div></div>';
				}
				document.getElementById("updates-panel").innerHTML = notificationHtml;
				
				if (notificationLines.length == 1)
				{
					setTimeout(function() 
					{
						  var flickity_button = document.getElementsByClassName("flickity-button");
						  for (var i = 0; i < flickity_button.length; i++) 
						  {
							  flickity_button[i].style.display = "none";
						  }
						  var flickity_dots = document.getElementsByClassName("flickity-page-dots");
						  for (var i = 0; i < flickity_dots.length; i++) 
						  {
							  flickity_dots[i].style.display = "none";
						  }
					}, 10);
				}
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
				if (locIndex == 0)
				{
					addressesHtml += "<p><span>" + INFO_ICON + "</span> " + jsonObj["addresses"][locIndex] + "</p>";
				}
				else
				{
					addressesHtml += "<p> " + jsonObj["addresses"][locIndex] + "</p>";					
				}
			}
			document.getElementById("lecture_address").innerHTML += addressesHtml;
			document.getElementById("lecture_phone").innerHTML += jsonObj["phone"];
			document.getElementById("lecture_email").innerHTML += jsonObj["email"];
			
			
			document.getElementById("social-linkedin").href = jsonObj["linkedin_link"];
			document.getElementById("social-google-scholar").href = jsonObj["google_scholar_link"];
			
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
			var researchInterestsHtml = "";
			for (var intrestIndex = 0; intrestIndex < jsonObj["researchInterests"].length; intrestIndex++)
			{
				researchInterestsHtml += '<div class="intrest-item"><svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 10H0V12H6V10ZM8.17 6.76L6.05 4.64L4.64 6.05L6.76 8.17L8.17 6.76ZM12 0H10V6H12V0ZM17.36 6.05L15.95 4.64L13.83 6.76L15.24 8.17L17.36 6.05ZM16 10V12H22V10H16ZM11 8C9.34 8 8 9.34 8 11C8 12.66 9.34 14 11 14C12.66 14 14 12.66 14 11C14 9.34 12.66 8 11 8ZM13.83 15.24L15.95 17.36L17.36 15.95L15.24 13.83L13.83 15.24ZM4.64 15.95L6.05 17.36L8.17 15.24L6.76 13.83L4.64 15.95ZM10 22H12V16H10V22Z" fill="#323232"/></svg>' + jsonObj["researchInterests"][intrestIndex] + '</div>';
			}
			document.getElementById("research_intrests").innerHTML = researchInterestsHtml;
			
			// Featured Publications
			var featuredPublicationsHtml = "";
			for (var pubIndex = 0; pubIndex < jsonObj["featuredPublications"].length; pubIndex++)
			{
				featuredPublicationsHtml += PublicationCard.createFromJson(jsonObj["featuredPublications"][pubIndex]).toHtml();
			}
			document.getElementById("featured_publications").innerHTML = featuredPublicationsHtml;
			
			// Current Projects
			var currentProjectsHtml = "";
			for (var projIndex = 0; projIndex < jsonObj["currentProjects"].length; projIndex++)
			{
				currentProjectsHtml += ProjectPanel.createFromJson(jsonObj["currentProjects"][projIndex]).toHtml();
			}
			document.getElementById("current_projects").innerHTML = currentProjectsHtml;
			
			// egde case - no data, remove sections
			if (jsonObj["researchInterests"].length == 0)
			{
				document.getElementById("research_intrests").style.display = "none";
				document.getElementById("research_intrests_header").style.display = "none";
			}
			if (jsonObj["featuredPublications"].length == 0)
			{
				document.getElementById("featured_publications_header").style.display = "none";
			}
			if (jsonObj["current_projects_header"].length == 0)
			{
				document.getElementById("featured_publications_header").style.display = "none";
			}
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

export { Index };