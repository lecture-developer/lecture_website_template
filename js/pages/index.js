// Data file paths
SEO_JSON = "/data/jsons/seo/index.html"
UPDATES_TEXT = "/data/notifications.txt"

// run the class build on page load
Index.build();

class Index extends PageRender
{
	constructor()
	{
		
	}
	
	static build()
	{
		buildStracturedData();
		buildeNotifications();
		buildePersonalPanel();
		buildeFeaturedPublications();
		buildeCurrentProjects();
	}
	
	/* build section functions */
	
	static buildeNotifications()
	{
		var txtObj = Index.loadFileFromServer(SEO_JSON);
		var notificationLines = txtObj.split("\n");
		
		var notificationHtml = "";
		for (var notificationIndex = 0; i < notificationLines.length; i++)
		{
			notificationHtml += '<div class="update-panel"><div class="update-img"><svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="24" fill="#A3BFFA"/><g clip-path="url(#clip0)"><path d="M35.6077 12.0588H11.8041C11.36 12.0588 11 12.4188 11 12.8629V29.3577C11 29.8018 11.36 30.1618 11.8041 30.1618H17.7536C18.1977 30.1618 18.5577 29.8018 18.5577 29.3577C18.5577 28.9136 18.1977 28.5536 17.7536 28.5536H12.6082V13.667H34.8036V28.5536H25.2549C25.0912 28.5536 24.9313 28.6036 24.7968 28.697L17.2955 33.897C16.9305 34.15 16.8398 34.651 17.0927 35.016C17.2488 35.2413 17.4994 35.3621 17.7543 35.3621C17.9124 35.3621 18.072 35.3157 18.2117 35.2188L25.5063 30.1619H35.6076C36.0516 30.1619 36.4117 29.8019 36.4117 29.3578V12.8629C36.4118 12.4188 36.0517 12.0588 35.6077 12.0588Z" fill="#5A67D8"/><path d="M26.6816 18.4505C27.1257 18.4505 27.4857 18.0905 27.4857 17.6464C27.4857 17.2024 27.1257 16.8423 26.6816 16.8423H20.7306C20.2865 16.8423 19.9265 17.2024 19.9265 17.6464C19.9265 18.0905 20.2865 18.4505 20.7306 18.4505H26.6816Z" fill="#5A67D8"/><path d="M16.9511 21.1104C16.9511 21.5545 17.3111 21.9145 17.7552 21.9145H29.657C30.1011 21.9145 30.4611 21.5545 30.4611 21.1104C30.4611 20.6663 30.1011 20.3063 29.657 20.3063H17.7552C17.3111 20.3063 16.9511 20.6662 16.9511 21.1104Z" fill="#5A67D8"/><path d="M17.7552 25.3782H29.657C30.1011 25.3782 30.4611 25.0181 30.4611 24.5741C30.4611 24.13 30.1011 23.77 29.657 23.77H17.7552C17.3111 23.77 16.9511 24.13 16.9511 24.5741C16.9511 25.0181 17.3111 25.3782 17.7552 25.3782Z" fill="#5A67D8"/></g><defs><clipPath id="clip0"><rect width="25.4118" height="25.4118" fill="white" transform="translate(11 11)"/></clipPath></defs></svg></div><div class="update-text">' + notificationLines[notificationIndex] + '</div></div>';
		}
		document.getElementById("updates-panel").innerHTML = notificationHtml;
	}
	
	static buildePersonalPanel()
	{
		
	}
	
	static buildeFeaturedPublications()
	{
		
	}
	
	static buildeCurrentProjects()
	{
		
	}
	
	/* end -  build sections functions */
	
	/* GUI functions */
	
	bioReadMore()
	{
		document.getElementById("biography-read-more").style.display = "";
		document.getElementById("biography-read-more-btn").style.display = "none";
		return false;
	}
	
	bioReadLess()
	{
		document.getElementById("biography-read-more").style.display = "none";
		document.getElementById("biography-read-more-btn").style.display = "";
		return false;
	}
	
	/* end - GUI functions */
}