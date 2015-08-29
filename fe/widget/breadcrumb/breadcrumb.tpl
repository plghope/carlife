<span>当前位置: </span> 
<div class="breadcrumb"></div>
<script id="tmpl-breadcrumb" type="text/template">
    <% _.each(breads, function (element, index, list) { %>
        <% if (index === 0) { %>
            <span class="breadcrumb-item"><%-element.name%> </span>
        <%}else{ %>
            <span class="breadcrumb-item">| <%-element.name%></span>
        <%}%>
    <% });%>
</script>
