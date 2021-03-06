/* RAMPT */
function rampt_support_webp()
{
	var rampt_desktop_firefox_chrome_regex = /(Linux x86_64|Mac OS|Windows NT).*((Firefox\/(6[5-9]|[7-9][0-9]))|(Chrome\/[3-9][0-9]))/;
	var rampt_microsoft_browsers_regex = /Windows NT.*(Edge\/(1[8-9]|[2-9][0-9]))/;
	var rampt_android_chrome_regex = /Android.*Chrome\/[3-9][0-9].*Mobile Safari/;

	if((rampt_desktop_firefox_chrome_regex.test(navigator.userAgent) || rampt_android_chrome_regex.test(navigator.userAgent)) && navigator.userAgent.indexOf("Edge") == -1 && navigator.userAgent.indexOf("Trident") == -1)
	{
		return true;
	}
	else
	{
		return false;
	}
}
if(window.IntersectionObserver)
{
	var rampt_observer = new IntersectionObserver(function(entries) {
			entries.forEach(function (entry) {
                    		if (entry.intersectionRatio > 0) {
                        		rampt_observer.unobserve(entry.target);
					load_rampt_element(entry.target);
				}
			});
		},
		{
			root: null,
                	rootMargin: "0px",
                	threshold: [0, 0.2, 0.4, 0.6, 0.8, 1]
		}
	);
}
/* setup_rampt_elements prepares all tags with data-rampt-src attribute
   It resizes them so they are ready to load the images
*/
function setup_rampt_elements()
{
	var rampt_imgs = document.querySelectorAll("img[data-rampt-src]:not(.rampt_observed)");

	for(var rampt_img_index = 0; rampt_img_index < rampt_imgs.length; rampt_img_index++)
	{
		var rampt_img = rampt_imgs[rampt_img_index];
		rampt_img.classList.add("rampt_observed");
		if(window.IntersectionObserver)
		{
			if(rampt_is_in_viewport(rampt_img))
			{
				load_rampt_element(rampt_img);
			}
			else
			{
				rampt_observer.observe(rampt_img);
			}
		}
		else
		{
			load_rampt_element(rampt_img);
		}
	}

	var rampt_iframes = document.querySelectorAll("iframe[data-rampt-src]:not(.rampt_observed)");

	for(var rampt_iframe_index = 0; rampt_iframe_index < rampt_iframes.length; rampt_iframe_index++)
	{
		var rampt_iframe = rampt_iframes[rampt_iframe_index];
		rampt_iframe.classList.add("rampt_observed");
		if(window.IntersectionObserver)
		{
			if(rampt_is_in_viewport(rampt_iframe))
			{
				load_rampt_element(rampt_iframe);
			}
			else
			{
				rampt_observer.observe(rampt_iframe);
			}
		}
		else
		{
			load_rampt_element(rampt_iframe);
		}
	}

	var rampt_videos = document.querySelectorAll("video[data-rampt-src]:not(.rampt_observed), video:not(.rampt_observed) > source[data-rampt-src]");

	for(var rampt_video_index = 0; rampt_video_index < rampt_videos.length; rampt_video_index++)
	{
		var rampt_video = rampt_videos[rampt_video_index];

		if(rampt_video.tagName.toLowerCase() == "source")
		{
			rampt_video = rampt_videos[rampt_video_index].parentNode;
		}

		rampt_video.classList.add("rampt_observed");
		if(window.IntersectionObserver)
		{
			if(rampt_is_in_viewport(rampt_video))
			{
				load_rampt_element(rampt_video);
			}
			else
			{
				rampt_observer.observe(rampt_video);
			}
		}
		else
		{
			load_rampt_element(rampt_video);
		}
	}
}
/* checks is an element is visible and inside the viewport 
*/
function rampt_is_in_viewport(rampt_element)
{
	var rampt_element_bounding = rampt_element.getBoundingClientRect();

	if(rampt_element.clientWidth > 0 && rampt_element.clientHeight > 0 && rampt_element_bounding.top >= 0 && rampt_element_bounding.left >= 0 && rampt_element_bounding.right <= document.documentElement.clientWidth && rampt_element_bounding.bottom <= document.documentElement.clientHeight)
	{
		return true;
	}
	else
	{
		return false;
	}
}

/* load_rampt_element adds a loading animation and load the image in 
   the rampt-img tag
*/
function load_rampt_element(rampt_container)
{
	if(rampt_container.tagName.toLowerCase() == "iframe")
	{
		rampt_container.src = rampt_container.getAttribute("data-rampt-src");
	}
	else if(rampt_container.tagName.toLowerCase() == "video")
	{
		rampt_container.outerHTML = rampt_container.outerHTML.replace(/data-rampt-src=/g, 'src=');
	}
	else if(rampt_container.tagName.toLowerCase() == "img")
	{
		if(rampt_container.src == "" || rampt_container.src.indexOf("data:image/gif;base64,") === 0)
		{
			if(rampt_container.dataset.webpsrc && rampt_support_webp())
			{
				rampt_container.src = rampt_container.dataset.webpsrc;
				rampt_container.setAttribute("data-fallbacksrc", rampt_container.getAttribute("data-rampt-src"));
			}
			else
			{
				rampt_container.src = rampt_container.getAttribute("data-rampt-src");
			}

			if(rampt_container.dataset.webpsrcset && rampt_support_webp())
			{
				rampt_container.srcset = rampt_container.dataset.webpsrcset;
				rampt_container.setAttribute("data-fallbacksrcset", rampt_container.dataset.webpsrcset);
			}
			else if(rampt_container.getAttribute("data-rampt-srcset"))
			{
				rampt_container.srcset = rampt_container.getAttribute("data-rampt-srcset");
			}

			rampt_container.setAttribute("onerror", "rampt_fallback(this);");
		}
	}	
}
function rampt_fallback(this_rampt_img)
{
	if(this_rampt_img.dataset.fallbacksrc && this_rampt_img.src != this_rampt_img.dataset.fallbacksrc)
	{
		this_rampt_img.src = this_rampt_img.dataset.fallbacksrc;
	}

	if(this_rampt_img.dataset.fallbacksrcset && this_rampt_img.getAttribute("srcset") != this_rampt_img.dataset.fallbacksrcset)
	{
		this_rampt_img.setAttribute("srcset", this_rampt_img.dataset.fallbacksrcset);
	}

	this_rampt_img.removeAttribute("onerror");
}
