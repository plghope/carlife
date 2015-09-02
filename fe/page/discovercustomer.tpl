{%extends file="./layout_admin.tpl"%}
{%block name="title"%}
客户跟踪管理
{%/block%}
{%block name="static-resource"%}
{%/block%}

{%block name="leftNav"%}
    {%widget name="admin:widget/leftNav/leftNav.tpl"
            custom="menu_choice"
            customDiscover="leftnav_item_focus"
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
                    {name: '客户跟踪管理'}
                ]);
            });
        {%/script%}
    </div>
    <div class="container">
        <div class="dc-nav-div">
            <ul class="dc-nav-ul">
                <li><a class="dc-nav-div-li tabnav" href="#insurance">保险相关</a></li>
                <li><a class="dc-nav-div-li tabnav" href="#uservalid">驾驶证年审相关</a></li>
                <li><a class="dc-nav-div-li tabnav" href="#carvalid">车辆年审相关</a></li>
                <li><a class="dc-nav-div-li tabnav" href="#peccancy">车辆违章相关</a></li>
                <li><a class="dc-nav-div-li tabnav" href="#sale">项目售后相关</a></li>
            </ul>
        </div>
        <!--tab1-->
        <div class="dc-content-div tabnav-tab" id="insurance">
            <div class="dc-rs-ttl-div"><span>保险即将在2个月内到期客户列表</span></div>
            <div class="dc-rs-note-div">
                <p>备注：如尚未向客户发送"定制消息"，系统将在保险到期前45天发送默认消息
                </p>
                <p>
                    您还可以 <a href="#">设置默认推送消息</a>
                </p>
            </div>
            <table class="dc-tab">
                <thead>
                    <tr>
                        <th>车牌号</th>
                        <th>车主姓名</th>
                        <th>联系电话</th>
                        <th>微信号</th>
                        <th>保险到期时间</th>
                        <th>客户提醒</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        <!--tab2-->
        <div class="dc-content-div tabnav-tab" id="uservalid">
            <div class="dc-rs-ttl-div"><span>驾驶证将在2个月内过期的客户列表</span></div>
            <div class="dc-rs-note-div">
                <p>备注：如尚未向客户发送"定制消息"，系统将在保险到期前45天发送默认消息
                </p>
            </div>
            <table class="dc-tab">
                <thead>
                    <tr>
                        <th>车主姓名</th>
                        <th>驾驶证编号</th>
                        <th>联系电话</th>
                        <th>微信号</th>
                        <th>驾驶证过期时间</th>
                        <th>客户提醒</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        <!--tab3-->
        <div class="dc-content-div tabnav-tab" id="carvalid">
            <div class="dc-rs-ttl-div"><span>车辆将在2个月内需要进行年审的客户列表</span></div>
            <div class="dc-rs-note-div">
                <p>备注：如尚未向客户发送"定制消息"，系统将在保险到期前45天发送默认消息</p>
            </div>
            <table class="dc-tab">
                <thead>
                    <tr>
                        <th>车牌号</th>
                        <th>车主姓名</th>
                        <th>联系电话</th>
                        <th>微信号</th>
                        <th>车辆年审时间</th>
                        <th>客户提醒</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <!--tab4-->
        <div class="dc-content-div tabnav-tab" id="peccancy">
            <div class="dc-rs-ttl-div"><span>在7天内有新增违章的车辆列表</span></div>
            <div class="dc-rs-note-div">
                <p>备注：如尚未向客户发送"定制消息"，系统将在保险到期前45天发送默认消息
                </p>
            </div>
            <table class="dc-tab">
                <thead>
                    <tr>
                        <th>车牌号码</th>
                        <th>车主姓名</th>
                        <th>联系电话</th>
                        <th>微信号</th>
                        <th>违章时间</th>
                        <th>违章地点</th>
                        <th>违章行为</th>
                        <th>违章处罚</th>
                        <th>客户提醒</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        <!--tab5-->
        <div class="dc-content-div tabnav-tab" id="sale">
            <div class="dc-rs-ttl-div"><span>服务项目相关消息提醒列表</span></div>
            <div class="dc-rs-note-div">
                <p>备注：如尚未向客户发送"定制消息"，系统将在保险到期前45天发送默认消息 </p>
            </div>
            <table class="dc-tab">
                <thead>
                    <tr>
                        <th>车牌号码</th>
                        <th>车主姓名</th>
                        <th>联系电话</th>
                        <th>微信号</th>
                        <th>服务项目</th>
                        <th>服务时间</th>
                        <th>客户提醒</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
</div>

<script id="tmpl-tab-1" type="text/template">
    <% _.each(insurance_push, function (ele, index){ %>
        <tr data-userid="<%-ele['p_uid']%>">
            <td><%-ele['p_plate']%></td>
            <td><%-ele['p_name']%></td>
            <td><%-ele['p_phone']%></td>
            <td><%- ele['p_wx'] || '-'%></td>
            <td><%-ele['p_time']%></td>
            <td><%-ele['p_status']%></td>
            <td><a class="opr-send" href="javascript:void(0);">发送定制消息</a></td>
        </tr>
    <% }); %>
</script>

<script id="tmpl-tab-2" type="text/template">
    <% _.each(licence_push, function (ele, index){ %>
        <tr data-userid="<%-ele['p_uid']%>">
            <td><%-ele['p_name']%></td>
            <td><%-ele['p_plate']%></td>
            <td><%-ele['p_phone']%></td>
            <td><%- ele['p_wx'] || '-'%></td>
            <td><%-ele['p_time']%></td>
            <td><%-ele['p_status']%></td>
            <td><a class="opr-send" href="javascript:void(0);">发送定制消息</a></td>
        </tr>
    <% }); %>
</script>

<script id="tmpl-tab-3" type="text/template">
<% _.each(verification_push, function (ele, index){ %>
    <tr data-userid="<%-ele['p_uid']%>">
        <td><%-ele['p_plate']%></td>
        <td><%-ele['p_name']%></td>
        <td><%-ele['p_phone']%></td>
        <td><%- ele['p_wx'] || '-'%></td>
        <td><%-ele['p_time']%></td>
        <td><%-ele['p_status']%></td>
        <td><a class="opr-send" href="javascript:void(0);">发送定制消息</a></td>
    </tr>
<% }); %>
</script>

<script id="tmpl-tab-4" type="text/template">
    <% _.each(traffic_peccancy_push, function (ele, index){ %>
        <tr data-userid="<%-ele['p_uid']%>">
            <td><%-ele['p_plate']%></td>
            <td><%-ele['p_name']%></td>
            <td><%-ele['p_phone']%></td>
            <td><%- ele['p_wx'] || '-'%></td>
            <td><%-ele['p_ptime']%></td>
            <td><%-ele['p_paddress']%></td>
            <td><%-ele['p_ptype']%></td>
            <td><%-ele['p_pfine']%></td>
            <td><%-ele['p_status']%></td>
            <td><a class="opr-send" href="javascript:void(0);">发送定制消息</a></td>
        </tr>
    <% }); %>
</script>
<script id="tmpl-tab-5" type="text/template"> 
    <% _.each(after_sale_push, function (ele, index){ %>
        <tr data-userid="<%-ele['p_uid']%>">
            <td><%-ele['p_plate']%></td>
            <td><%-ele['p_name']%></td>
            <td><%-ele['p_phone']%></td>
            <td><%- ele['p_wx'] || '-'%></td>
            <td><%-ele['p_sinfo']%></td>
            <td><%-ele['p_time']%></td>
            <td><%-ele['p_status']%></td>
            <td><a class="opr-send" href="javascript:void(0);">发送定制消息</a></td>
        </tr>
    <% }); %>
</script>
{%script%}
require(['/tabNav/tabNav'], function (TabNav) {
    var tab = new TabNav(".dc-nav-ul");
    var _api = {
        insurance: '/yunyunche_odp/trackinsurance',
        carValid: '/yunyunche_odp/trackcarvalid',
        userValid: '/yunyunche_odp/trackuservalid',
        peccancy: '/yunyunche_odp/trackpeccancy',
        sale: '/yunyunche_odp/tracksale'
    };

    function bindAction(tabObj, attr){
        tabObj.on(attr.tab, function(){
            var $self = $(this);
            $.ajax({
                url: attr.api,
                method: 'POST',
                dataType: 'json'
            }).done(function (r) {
                if (r.status === 0) {
                    var _tmpl = _.template($('#' + attr.template).html());
                    var _d = {}
                    _d[attr.dataKey] = r.data[attr.dataKey];

                    $('tbody', $self).html(_tmpl(_d));
                }else{
                    alert(r.info);
                }
            });
        });

    }

    bindAction(tab, {
        tab: 'insurance',
        api: _api.insurance,
        template: 'tmpl-tab-1',
        dataKey: 'insurance_push'
    });

    bindAction(tab, {
        tab: 'uservalid',
        api: _api.userValid,
        template: 'tmpl-tab-2',
        dataKey: 'licence_push'
    });

    bindAction(tab, {
        tab: 'carvalid',
        api: _api.carValid,
        template: 'tmpl-tab-3',
        dataKey: 'verification_push'
    });

    bindAction(tab, {
        tab: 'peccancy',
        api: _api.peccancy,
        template: 'tmpl-tab-4',
        dataKey: 'traffic_peccancy_push'
    });

    bindAction(tab, {
        tab: 'sale',
        api: _api.sale,
        template: 'tmpl-tab-5',
        dataKey: 'after_sale_push'
    });

    tab.init();

});
{%/script%}
{%require name="admin:page/discovercustomer.tpl"%}
{%/block%}
