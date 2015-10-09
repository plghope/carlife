{%extends file="./layout_admin.tpl"%}
{%block name="title"%}
客户反馈管理
{%/block%}
{%block name="static-resource"%}
{%/block%}

{%block name="leftNav"%}
    {%widget name="admin:widget/leftNav/leftNav.tpl"
            custom="menu_choice"
            customFeedback="leftnav_item_focus"
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
                    {name: '客户反馈管理'}
                ]);
            });
        {%/script%}
    </div>
    <div class="content">
    </div>
</div>

<script id="feedback-table" type="text/template">
    <div>
        <p>在最近一个月内，收到用户反馈共计&nbsp;<span class="fd-total"><%- stat[0] %></span>&nbsp;次，其中好评&nbsp;<span class="fd-good"><%- stat[1] %></span>&nbsp;次，差评&nbsp;<span class="fd-bad"><%- stat[2] %></span>&nbsp;次</p>
    </div>
    <h3 class="fd-rs-ttl">客户反馈详情</h3>
    <table class="fd-table">
        <thead>
            <tr>
                <th>反馈时间</th>
                <th>车主姓名</th>
                <th>联系电话</th>
                <th>服务项目</th>
                <th>服务时间</th>
                <th>反馈内容</th>
            </tr>
        </thead>
        <tbody>
            <% if (feedback.length === 0) { %>
                <tr><td colspan="100%">暂无</td></tr>
            <% } else{ %>
                <% _.each(feedback, function(ele, index){ %>
                    <tr>
                        <td><%-ele['f_time']%></td>
                        <td><%-ele['f_name']%></td>
                        <td><%-ele['f_phone']%></td>
                        <td><%-ele['f_item']%></td>
                        <td><%-ele['f_s_time']%></td>
                        <td><%-ele['f_rate']%></td>
                    </tr>
                <% }); %>
            <% } %>
        </tbody>
    </table>
</script>


{%script%}
require(['jquery', 'underscore', '/api/api'], function ($, underscore, api) {
    var _tpl = _.template($('#feedback-table').html());

    var _api = {
        feedback: '/api/feedback'
    };

    api._(_api);

    $.ajax({
        url: _api.feedback,
        method: 'POST',
        dataType: 'json'
    }).done(function (r){
        if (r.status === 0) {
            var data = r. data;
            $('.content').html(_tpl(data));
        }else{
            alert(r.info);
        }

    });

    
});
{%/script%}
{%require name="admin:page/feedback.tpl"%}

{%/block%}

