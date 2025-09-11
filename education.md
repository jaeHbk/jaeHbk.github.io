---
layout: single
title: Education
permalink: /education/
---

## Education

{% for item in site.data.education %}
### {{ item.institution }}
*{{ item.degree }}*, {{ item.year }}
{% endfor %}
