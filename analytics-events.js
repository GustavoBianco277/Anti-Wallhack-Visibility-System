function trackEvent(eventName, parameters = {})
{
  if (typeof gtag === "function")
  {
    gtag("event", eventName, parameters);
  }
}

document.addEventListener("DOMContentLoaded", () =>
{
  // Click events
  const trackedLinks = document.querySelectorAll("[data-analytics-event]");

  trackedLinks.forEach((element) =>
  {
    element.addEventListener("click", () =>
    {
      const eventName = element.getAttribute("data-analytics-event");

      trackEvent(eventName, {
        link_text: element.innerText.trim(),
        link_url: element.href || "",
        page_path: window.location.pathname
      });
    });
  });

  // Section view events
  const sectionEvents = [
    {
      selector: "#benchmarks",
      eventName: "view_benchmark"
    },
    {
      selector: "#integration",
      eventName: "view_integration"
    },
    {
      selector: "#faq",
      eventName: "view_faq"
    },
    {
      selector: "#components",
      eventName: "view_components"
    },
    {
      selector: "#howitworks",
      eventName: "view_how_it_works"
    }
  ];

  const viewObserver = new IntersectionObserver((entries, observer) =>
  {
    entries.forEach((entry) =>
    {
      if (entry.isIntersecting)
      {
        const eventName = entry.target.getAttribute("data-view-event");

        if (eventName)
        {
          trackEvent(eventName, {
            section_id: entry.target.id,
            page_path: window.location.pathname
          });

          observer.unobserve(entry.target);
        }
      }
    });
  },
  {
    threshold: 0.45
  });

  sectionEvents.forEach((item) =>
  {
    const section = document.querySelector(item.selector);

    if (section)
    {
      section.setAttribute("data-view-event", item.eventName);
      viewObserver.observe(section);
    }
  });
});