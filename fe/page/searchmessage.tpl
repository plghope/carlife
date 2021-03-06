{%extends file="./layout_admin.tpl"%}
{%block name="title"%}
查询历史消息
{%/block%}
{%block name="static-resource"%}
    {%require name="admin:static/css/dialog.css"%}
    
{%/block%}

{%block name="leftNav"%}
    {%widget name="admin:widget/leftNav/leftNav.tpl"
            custom="menu_choice"
            searchmessage="leftnav_item_focus"
    %}
{%/block%}
{%block name="content"%}
<div class="middle-content">
    <div class="content-path">
        {%widget name="admin:widget/breadcrumb/breadcrumb.tpl"%}
        {%script%}
            require(['/breadcrumb/breadcrumb'], function (Breadcrumb) {
                new Breadcrumb('.breadcrumb', [
                    {name: '首页'},
                    {name: '客户关系管理'},
                    {name: '查询历史消息'}
                ]);
            });
        {%/script%}
    </div>
    <div class="content">
        <div class="tabnav-tab">
            <h3>输入查询条件</h3>
            <form id="search-message-query">
                <div class="sms-cond-div">
                    <div class="sms-inline-div msg-inline-div">
                        <span class="sms-span">联系电话:</span><input type="text" class="content-input form-control" name="phone_number">
                    </div>
                    <div class="sms-inline-div msg-inline-div" id="s-start">
                        <span class="sms-span">发送时间:</span><span class="sms-span">从</span><input type="text" class="content-input form-control" name="from_time" id="sms-start">
                    </div>
                    <div class="sms-inline-div msg-inline-div" id="s-end">
                        <span class="sms-span">&nbsp;到</span><input type="text" class="content-input form-control" id="sms-finish" name="to_time">
                    </div>
                    <div class="sms-inline-div">
                        <input type="submit" value="查询" class="btn sms-button">
                    </div>
                </div>
            </form>
            <div class="sms-rs-div">
                <h3>查询结果</h3>
                <div class="sms-rs-tab-div">
                    <table class="sms-tab">
                        <thead>
                            <tr>
                                <td class="sms-tab-name">车主姓名</td>
                                <th class="sms-tab-tel">联系电话</th>
                                <th class="sms-tab-date">发送时间</th>
                                <th class="sms-tab-con">发送内容</th>
                                <th class="sms-tab-type">短信类型</th>
                            </tr>
                        </thead>
                        <tbody>
                        
                        </tbody>
                    </table>
                    <ul id="pagination"></ul>
                </div>
            </div> 
        </div>
        
   </div>
</div>

<script id="tpl-search-result" type="text/template">
    <% _.each(history, function (ele,index) { %>
        <tr>
            <td class="sms-tab-name"><%-ele['name']%></td>
            <td class="sms-tab-tel"><%-ele['phone_num']%></td>
            <td class="sms-tab-date"><%-ele['time']%></td>
            <td class="sms-tab-con"><%-ele['content']%></td>
            <td class="sms-tab-type"><%-ele['type']%></td>
        </tr>
    <% }); %>
</script>
{%require name="admin:static/js/custom/searchmessage.js"%}

{%require name="admin:page/searchmessage.tpl"%}
{%/block%}

