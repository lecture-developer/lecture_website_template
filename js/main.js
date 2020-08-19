// add header and footer to each page

// init all the objects needed //
let client;
let thisPage = location.href.split("/").slice(-1)[0];
if (thisPage == "")
{
	thisPage = "index";
}
// end - init all the objects needed //

onPageLoad();

function onPageLoad()
{
	// code for IE7+, Firefox, Chrome, Opera, Safari
	if (window.XMLHttpRequest)
	{
		client = new XMLHttpRequest();
	}
	else // code for IE6, IE5
	{
		client = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	// perform all the preparation actions needed 
	loadHeader();
	loadFooter();
	loadSEO();
	activeMenuLink();
	loadNotificationPanel();
}

// load the HTML of the header from the right file and put in the right location
function loadHeader()
{	
	client.onreadystatechange  = HeaderHandler;
	client.open("GET", "/lecture_website_template/components/header.html", false);
	client.send();
}

function HeaderHandler() 
{
	if (this.readyState == 4 && this.status == 200 && this.responseText != null)
	{
		document.getElementById("header").innerHTML = this.responseText;
	}
}

// load the HTML of the header from the right file and put in the right location
function loadFooter()
{		
	client.onreadystatechange  = FooterHandler;
	client.open("GET", "/lecture_website_template/components/footer.html", false);
	client.send();
}

function FooterHandler() 
{
	if (this.readyState == 4 && this.status == 200 && this.responseText != null)
	{
		document.getElementById("footer").innerHTML = this.responseText;
	}
}

// load the SEO data from JSON file and insert in the right locations
function loadSEO()
{		
	client.onreadystatechange  = seoHandler;
	client.open("GET", "/data/jsons/seo/" + thisPage + ".json", false);
	client.send();
}

function seoHandler() 
{
	if (this.readyState == 4 && this.status == 200 && this.responseText != null)
	{
		var seoJsonObj = JSON.parse(this.responseText);
		// run over all the keys
		for (var key in seoJsonObj)
		{
			var content = "";
			if (Array.isArray(seoJsonObj[key])) // if list
			{
				for (var key2 in seoJsonObj[key])
				{
					content += seoJsonObj[key][key2] + ",";
				}
				content = content.substring(0, content.length - 1);
			}
			else if (typeof seoJsonObj[key] == 'string') // if string
			{
				content = seoJsonObj[key];
			}
			else  // if different object
			{
				content = JSON.stringify(seoJsonObj[key]);
			}
			
			// try to add it to the page
			try
			{
				document.querySelector('meta[name="' + key + '"]').setAttribute("content", content);
			}
			catch (error)
			{
				try
				{
					document.getElementById(key).innerHTML = content;	
				}
				catch (error)
				{
					console.log("Error in 'seoHandler' while trying to add key = '" + key + "', because: " + error);
				}
			}
		}
	}
}

// mark the right menu link as active
function activeMenuLink()
{
	$('.menu a').each(function() 
	{
		if ($(this).attr('id') == thisPage)
		{
			$(this).addClass('active'); 
		}
	});
}


/* notification panel on mian pages */
function loadNotificationPanel()
{	
	// check if needed 
	if (document.getElementById("notification-panel") == null)
	{
		return;
	}
	
	client.onreadystatechange  = notificationHandler;
	client.open("GET", "/notifications.txt", false);
	client.send();
}

function notificationHandler() 
{
	if (this.readyState == 4)
	{
		if(this.status == 200 && this.responseText != null )
		{
			buildNotificationUI(this.responseText.split("\n"), true);
		} 
		else 
		{
			buildNotificationUI(this.status, false);
		}
	}
}

function buildNotificationUI(notifications, is_ok)
{
	var notfi_panel = document.getElementById("notification-panel");
	var notfi_html = '<div class="notification-panel">';
	// set notifications or error message
	if (is_ok)
	{
		// build the panel
		for (var i = 0; i < notifications.length; i++)
		{
			notfi_html += '<div class="notification"><p>' + notifications[i].trim().replace("script", "") + '</p></div>'; // the replace is to avoid JS injection in the original file
		}
	}
	else
	{
		notfi_html += "<p> Error with status " + notifications + " while trying to retrive notifications - please inform the owner of the site regarding this error... </p>";
	}
	// set the content into the panel
	notfi_html += '</div>';
	notfi_panel.innerHTML = notfi_html;
}
/* end - notification panel on mian pages */

/* help functions */

function loadJSON(callback) 
{   
	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', 'my_data.json', true); // Replace 'my_data' with the path to your file
	xobj.onreadystatechange = function () 
	{
		if (xobj.readyState == 4 && xobj.status == "200") 
		{
			// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
			callback(xobj.responseText);
		}
	};
	xobj.send(null);  
}

function setCookie(cname, cvalue, exdays)
{
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 8640000)); // 24 * 60 * 60 * 1000 = 8640000
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname)
{
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) 
	{
		var c = ca[i];
		while (c.charAt(0) == ' ') 
		{
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) 
		{
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

/* end - help functions */