{%extends file="./layout_admin.tpl"%}
{%block name="title"%}
查询客户
{%/block%}
{%block name="static-resource"%}
    {%require name="admin:static/css/dialog.css"%}
    
{%/block%}

{%block name="leftNav"%}
    {%widget name="admin:widget/leftNav/leftNav.tpl"
            custom="menu_choice"
            customSearch="leftnav_item_focus"
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
                    {name: '查询'}
                ]);
            });
        {%/script%}
    </div>
    <div class="content">
        <div class="search-customer-condition">
            <h3>请输入查询条件</h3>
            <form id="search-customer-query">
                <div class="sc-cond-div">
                    <span class="sc-cond-span">车主姓名</span><input type="text" class="form-control content-input sc-cond-input" name="user_name">
                    <span class="sc-cond-span">车主电话</span><input type="text" class="form-control content-input sc-cond-input" name="phone_number">
                    <span class="sc-cond-span">车牌号码</span><input type="text" class="form-control content-input sc-cond-input" name="plate_number">
                    <input type="submit" value="查询客户" class="sc-button">
                </div>
                <div class="sc-cond-notes-div">
                    <span>说明: 输入任一条件即可进行查询</span>
                </div>
            </form>
        </div>
        <div class="sc-rs-div">
            <h3> 查询结果</h3>
            <div class="sc-rs-tab-div">
                <table class="sc-rs-tab" id="query-table">
                    <thead>
                        <tr>
                            <th>车牌号码</th>
                            <th>车主姓名</th>
                            <th>联系电话</th>
                            <th>车辆品牌</th>
                            <th>车辆型号</th>
                            <th>车架号</th>
                            <th>发动机号</th>
                            <th>车辆登记时间</th>
                            <th>门店注册时间</th>
                            <th>消费记录</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
        
   </div>
</div>

<script id="tpl-search-result" type="text/template">
    <% _.each(customer, function (ele,index) { %>
        <tr data-userid="<%- ele['p_user_id'] || ''%>">
            <td><%-ele['p_plate']%></td>
            <td><%-ele['p_name']%></td>
            <td><%-ele['p_phone']%></td>
            <td><%-ele['p_brand']%></td>
            <td><%-ele['p_series']%></td>
            <td><%-ele['p_frame']%></td>
            <td><%-ele['p_engine']%></td>
            <td><%-ele['p_license'] || '无'%></td>
            <td><%-ele['p_reg'] || '无'%></td>
            <td><a href="javascript:void(0);">消费记录</a></td>
            <td><a class="opr-edit" href="javascript:void(0);">修改</a></td>
        </tr>
    <% }); %>
</script>

{%require name="admin:page/searchcustomer.tpl"%}
{%require name="admin:static/js/custom/search.js"%}

{%/block%}

