{%if $data['storeId']%}
    {%assign var="suffix" value="/storeId/`$data['storeId']`" nocache%}
{%else if%}
    {%assign var="suffix" value="" nocache%}
{%/if%}

<div class="leftnav leftsidebar_box">
    <ul>
        <!--class: leftnav_list_hide-->
        <li class="leftnav_li">
            <div class="leftnav_custom leftnav_title"><span class="leftnav-title-span">客户关系管理</span><span class="arrow icon-chevron-down"></span></div>
            <ul class="leftnav_menu leftnav_list_hide {%$custom%}">
                {%if in_array('/addcustomer', $data['page'])%}
                    <li class="menu_li {%$customAdd%}"><a href="/addcustomer{%$suffix%}">添加客户</a></li>
                {%/if%}
                {%if in_array('/searchcustomer', $data['page'])%}
                    <li class="menu_li {%$customSearch%}"><a href="/searchcustomer{%$suffix%}">查询客户</a></li>
                {%/if%}
                {%if in_array('/discovercustomer', $data['page'])%}
                    <li class="menu_li {%$customDiscover%}"><a href="/discovercustomer{%$suffix%}">默认消息推送</a></li>
                {%/if%}
                {%if in_array('/pushmessage', $data['page'])%}
                    <li class="menu_li {%$pushmessage%}"><a href="/pushmessage{%$suffix%}">主动消息推送</a></li>
                {%/if%}
                {%if in_array('/searchmessage', $data['page'])%}
                    <li class="menu_li {%$searchmessage%}"><a href="/searchmessage{%$suffix%}">查询历史消息</a></li>
                {%/if%}
                {%if in_array('/feedback', $data['page'])%}
                    <li class="menu_li {%$customFeedback%}"><a href="/feedback{%$suffix%}">客户反馈管理</a></li>
                {%/if%}
            </ul>
        </li>
        <li class="leftnav_li">
            <div class="leftnav_service leftnav_title"><span class="leftnav-title-span">服务单管理</span><span class="arrow icon-chevron-down"></span></div>
            <ul class="leftnav_menu leftnav_list_hide {%$serviceForm%}">
                {%if in_array('/serviceformadd', $data['page'])%}
                    <li class="menu_li {%$serviceFormAdd%}"><a href="/serviceformadd{%$suffix%}">添加服务单</a></li>
                {%/if%}
                {%if in_array('/serviceformsearch', $data['page'])%}
                    <li class="menu_li {%$serviceFormSearch%}"><a href="/serviceformsearch{%$suffix%}">查询服务单</a></li>
                {%/if%}
            </ul>
        </li>
        <li class="leftnav_li">
            <div class="leftnav_controli leftnav_title"><span class="leftnav-title-span">系统控制台</span><span class="arrow icon-chevron-down"></span></div>
            <ul class="leftnav_menu leftnav_list_hide {%$control%}">
                {%if in_array('/authority', $data['page'])%}
                    <li class="menu_li {%$authority%}"><a href="/authority{%$suffix%}">权限管理</a></li>
                {%/if%}
                {%if in_array('/service', $data['page'])%}
                    <li class="menu_li {%$service%}"><a href="/service{%$suffix%}">项目管理</a></li>
                {%/if%}
                {%if in_array('/servicetype', $data['page'])%}
                    <li class="menu_li {%$servicetype%}"><a href="/servicetype{%$suffix%}">项目类别管理</a></li>
                {%/if%}
            </ul>
        </li>
    </ul>	
</div>
{%script%}
    require(['/leftNav/leftNav'], function(LeftNav) {
        new LeftNav('.main');
    });
{%/script%}
