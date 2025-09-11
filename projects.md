---
layout: single
title: Projects
permalink: /projects/
---

## Projects

{% for item in site.data.projects %}
### {{ item.title }}

{{ item.description }}

[GitHub]({{ item.github }})
{% endfor %}
