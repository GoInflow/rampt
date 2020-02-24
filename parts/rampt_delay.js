/*
Delay the loading of stylesheets and script tags.

If the script is required as soon as the page is loaded use the async attribute
Example:

<script src="file.js" async></script>

If the stylesheet is required as soon as the page is loaded rename the href attribute to data-rampt-href
Example:

<link data-rampt-href="file.css" rel="stylesheet"></link>

If the script is not required as soon as the page is loaded rename the src attribute to data-rampt-delay-src
Example:

<script data-rampt-delay-src="file.js" async></script>

If the stylesheet is not required as soon as the page is loaded rename the href attribute to data-rampt-delay-href
Example:

<link data-rampt-delay-href="file.css" rel="stylesheet"></link>
*/

// execute rampt_delay_load on window onload event
window.addEventListener("load", rampt_delay_load, false);

// in case that onload event doesn't trigger sooner, wait 4 seconds to execute rampt_delay_load
setTimeout(rampt_delay_load, 4000);

function rampt_delay_load()
{
	// window.rampt_delayed_resources_loaded flag checks if the function has been executed so that it doesn't apply changes twice
	if(typeof(window.rampt_delayed_resources_loaded) == "undefined")
	{
		// search all <link> tags that have the data-rampt-href attribute and set the href attribute
		var rampt_delayed_resources = document.querySelectorAll("link[data-rampt-href]");

		for(var rampt_delayed_resource_index = 0; rampt_delayed_resource_index < rampt_delayed_resources.length; rampt_delayed_resource_index++)
		{
			var rampt_delayed_resource = rampt_delayed_resources[rampt_delayed_resource_index];

			rampt_delayed_resource.href = rampt_delayed_resource.getAttribute("data-rampt-href");
		}

		// checks if device is iPhone, iPod or android to delay the execution of rampt_delayed_scripts 4 seconds
		if(/(Android|iPhone|iPod)/.test(navigator.userAgent))
		{
			setTimeout(rampt_delayed_scripts, 4000);
		}
		else
		{
			rampt_delayed_scripts();
		}

		// sets window.rampt_delayed_resources_loaded flag to prevent that we apply changes again
		window.rampt_delayed_resources_loaded = "yes";
	}
}
function rampt_delayed_scripts()
{
	// search all <link> and <script> tags that have the data-rampt-delay-href or data-rampt-delay-src attribute and set the href or src attributes
	var rampt_delayed_resources = document.querySelectorAll("script[data-rampt-delay-src], link[data-rampt-delay-href]");

	for(var rampt_delayed_resource_index = 0; rampt_delayed_resource_index < rampt_delayed_resources.length; rampt_delayed_resource_index++)
	{
		var rampt_delayed_resource = rampt_delayed_resources[rampt_delayed_resource_index];

		if(rampt_delayed_resource.tagName.toLowerCase() == "script")
		{
			rampt_delayed_resource.src = rampt_delayed_resource.getAttribute("data-rampt-delay-src");
		}
		else
		{
			rampt_delayed_resource.href = rampt_delayed_resource.getAttribute("data-rampt-delay-href");
		}
	}
}
