// imports 
import { PageRender, retrivedData } from '/lecture_website_template/js/pageRender.js';
import {CourseCard} from '/lecture_website_template/js/components/courseCard.js';
// Data file paths
let TAECHING_JSON = "/lecture_website_template/data/jsons/teaching.json";

// consts 
let default_filter = "All universities";

/*
	Single instance class to build teaching.html page with dynamic content from JSONS from the server
*/
class Teaching extends PageRender
{
	constructor()
	{
		super();
        Teaching.loadFileFromServer(TAECHING_JSON, true);
        this.cardList = CourseCard.createListFromJson(retrivedData["coureses"]);
        this.filter=default_filter;
        this.property_university='university';
	}
    /* biuld function start */
	// just gather all the build of all the sections in the page - one per call to the server side
	build()
	{
		// get the data from the GET HTTP from the URL and build the page
		var getParms = PageRender.readGetPrams();
		if (getParms.get("filter") != null)
		{
			this.filter = getParms.get("filter");
		}
		else
		{
			this.filter = default_filter;
			console.log("Teaching.build did not find filter, using default");
		}
		
		// build the page itself
        this.buildHeader(this.filter);
		this.buildBody(this.filter);
    }

    buildHeader(filter=default_filter)
	{
        try
		{
            this.createButtons();
			// highlight the sort button which is active
            document.getElementById("filter-btn-" + filter).classList.add("active-sort-button");
        }
        catch (error)
		{
			console.log("Error at Teaching.buildHeader saying: " + error);
		}
    }

    buildBody(filter=default_filter)
	{
        // sort the list
		var buildTeachingList = CourseCard.sortByProperty(this.cardList,"year","semester");
        
        // if filter needed
		if (filter != default_filter)
		{
			// filter the needed list only
			buildTeachingList = CourseCard.filterList(buildTeachingList, filterProperty, filter);
		}
		
		// split into the right sets
		var coursesSets = CourseCard.splitByProperty(buildTeachingList, 'year');
		
		// build the UI //
		try
		{
            if (buildTeachingList.length > 0)
			{
				var ansewrHtml = "";
				for (var spliterKey in coursesSets)
				{
					// add spliter 
					ansewrHtml += "<h3>" + spliterKey + "</h3>";
					// add elements inside the list
					for (var elementIndex = 0; elementIndex < coursesSets[spliterKey].length; elementIndex++)
					{
						ansewrHtml += coursesSets[spliterKey][elementIndex].toHtml();
					}
				}
				document.getElementById("teaching-body").innerHTML = ansewrHtml;
            }
			else // show error message
			{
				document.getElementById("teaching-body").innerHTML = "<h3>Don't have courses from universty " + filter + "</h3>";  // should not happen
			}
		}
		catch (error)
		{
			console.log("Error at Teaching.buildBody saying: " + error);
		}

    }
    /* biuld function end */

    //the function change the filter by the value.
    changeFilter(filter_value)
	{
        var listCard = CourseCard.listFilterButtons(this.cardList, this.property_university);
        for (var b = 0; b < listCard.length; b++){
            var name=listCard[b];
            document.getElementById("filter-btn-"+name).classList.remove("active-sort-button");
        }
		document.getElementById("filter-btn-" + filter_value).classList.add("active-sort-button");
		
		this.buildBody(filter_value, default_filter);
	}
    
    //the function create buttons to the filter header section
    createButtons()
	{
        function changeFilter(filter_value)
		{
            var listCard=CourseCard.listFilterButtons(this.cardList,this.property_university);
            this.filter=filter_value;
            for (var b=0; b<listCard.length;b++)
			{
                var name=listCard[b];
                document.getElementById("filter-btn-" + name).classList.remove("active-sort-button");
            }
            document.getElementById("filter-btn-" + default_filter).classList.remove("active-sort-button");
            document.getElementById("filter-btn-" + filter_value).classList.add("active-sort-button");
            
            //this.buildBody(filter_value, default_filter);
        }
        var Buttons = document.getElementById("Buttons");
        var button = document.createElement("button");
		button.innerHTML = default_filter;
		button.type = "button";
        button.id = "filter-btn-"+default_filter;
        button.addEventListener("click", function(){changeFilter(default_filter)});
        Buttons.appendChild(button);
        
        var listCard=CourseCard.listFilterButtons(this.cardList, this.property_university);
        for (var b = 0; b < listCard.length; b++)
        {
            var button = document.createElement("button");
            var name = listCard[b];
            button.innerHTML = name;
            button.id = "filter-btn-" + name;
            button.addEventListener("click", function(name){ changeFilter(name)});
            Buttons.appendChild(button);
       }
    }   
}

// run the class build on page load
document.teaching = new Teaching();
document.teaching.build();

export { Teaching };