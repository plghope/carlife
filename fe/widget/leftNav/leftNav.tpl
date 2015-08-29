<div class="leftnav leftsidebar_box">
    <ul>
        <!--class: leftnav_list_hide-->
        <li class="leftnav_li">
            <div class="leftnav_custom leftnav_title"><span class="leftnav-title-span">客户关系管理</span><span class="arrow icon-chevron-down"></span></div>
            <ul class="leftnav_menu leftnav_list_hide {%$custom%}">
                <li class="menu_li {%$customAdd%}"><a href="#/addcustomer">添加客户</a></li>
                <li class="menu_li {%$customSearch%}"><a href="#/searchcustomer">查询客户</a></li>
                <li class="menu_li {%$customDiscover%}"><a href="#/discovercustomer">默认消息推送</a></li>
                <li class="menu_li {%$pushmessage%}"><a href="/pushmessage">主动消息推送</a></li>
                <li class="menu_li {%$customFeedback%}"><a href="#/feedback">客户反馈管理</a></li>
            </ul>
        </li>
        <li class="leftnav_li">
            <div class="leftnav_service leftnav_title"><span class="leftnav-title-span">服务单管理</span><span class="arrow icon-chevron-down"></span></div>
            <ul class="leftnav_menu leftnav_list_hide {%$serviceForm%}">
                <li class="menu_li {%$serviceFormAdd%}"><a href="/serviceformadd">添加服务单</a></li>
                <li class="menu_li {%$serviceFormSearch%}"><a href="/searchserviceform">查询服务单</a></li>
            </ul>
        </li>
        <li class="leftnav_li">
            <div class="leftnav_controli leftnav_title"><span class="leftnav-title-span">系统控制台</span><span class="arrow icon-chevron-down"></span></div>
            <ul class="leftnav_menu leftnav_list_hide {%$control%}">
                <li class="menu_li {%$authority%}"><a href="/authority">权限管理</a></li>
                <li class="menu_li {%$service%}"><a href="/service">项目管理</a></li>
                <li class="menu_li {%$servicetype%}"><a href="/servicetype">项目分类管理</a></li>
            </ul>
        </li>
    </ul>	
</div>
{%script%}
    require(['/leftNav/leftNav'], function(LeftNav) {
        new LeftNav('.main');
    });
{%/script%}
