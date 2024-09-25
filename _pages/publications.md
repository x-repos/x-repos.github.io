---
layout: archive
title: "Publications"
permalink: https://scholar.google.com/citations?user=-f-uRoYAAAAJ&hl=en
author_profile: true
---

{% if site.author.googlescholar %}
  <div class="wordwrap"><a href="{{site.author.googlescholar}}"><strong>Google Scholar profile</strong></a>.</div>
{% endif %}

{% include base_path %}

{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}
