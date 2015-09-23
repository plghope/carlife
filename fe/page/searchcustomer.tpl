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
        <div class="search-customer-condition tabnav-tab">
            <h3>请输入查询条件</h3>
            <form id="search-customer-query">
                <div class="sc-cond-div">
                    <span class="sc-cond-span">车主姓名</span><input type="text" class="form-control content-input sc-cond-input" name="user_name">
                    <span class="sc-cond-span">车主电话</span><input type="text" class="form-control content-input sc-cond-input" name="phone_number">
                    <span class="sc-cond-span">车牌号码</span><input type="text" class="form-control content-input sc-cond-input" name="plate_number">
                </div>
                <input type="submit" value="查询客户" class="btn sc-button">
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
                            <th>车主姓名</th>
                            <th>联系电话</th>
                            <th>驾驶证编号</th>
                            <th>驾驶证到期时间</th>
                            <th>消费记录</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td colspan="100%">空</td></tr>
                    </tbody>
                </table>
                <ul id="pagination"></ul>
            </div>
        </div>
   </div>
</div>

<script id="tpl-s-mod-user" type="text/template">
    <form id="form-mod-user">
        <div class="new-user">
            <div class="content-line-div">
                <div class="content-item-div-left">
                    <input type="hidden" value="<%-p_uid%>" name="user_id">
                    <span class="content-span"><span class="required-star">*</span>车主姓名</span> <input type="text" class="content-input form-control" name="name" value="<%-p_name%>">
                </div>	
                <div class="content-item-div-right">
                    <span class="content-span"><span class="required-star">*</span>联系电话</span> <input type="text" class="content-input form-control" name="phone_num" value="<%-p_phone%>">
                </div>
            </div>
            <div class="content-line-div">
                <div class="content-item-div-left">
                    <span class="content-span">驾驶证编号</span> <input type="text" class="content-input form-control" name="car_license_num" value="<%-p_license%>">
                </div>	
                <div class="content-item-div-right">
                    <span class="content-span">驾驶证到期时间</span> <input type="text" class="content-input form-control" name="car_license_valid_time" id="datepicker-car-licenses-time" value="<%-p_license_valid%>">
                </div>	
            </div>

            <div class="content-line-div">
                <input  type="submit" value="保存" class="btn adc-tc-search-btn">
                <p class="help-block"></p>
            </div>	
        </div>
    </form>
</script>    

<script id="tpl-s-mod-car" type="text/template">
    <form id="form-mod-car">
        <div class="content-line-div">
            <div class="content-item-div-left">
                <span class="content-span"><span class="required-star">*</span>车牌号码</span> <input type="text" class="content-input form-control" name="plate_number" id="custom-plate-number">
            </div>
            <div class="content-item-div-right">
                <span class="content-span"><span class="required-star">*</span>车辆品牌</span>
                <select class="content-select" id="brandSelect" name="brand">
                </select>
                <select class="content-select" id="seriesSelect" name="series_id">
                </select>
            </div>
        </div>
        <div class="content-line-div">
            <div class="content-item-div-left">
                <span class="content-span">车架号码</span> <input type="text" class="content-input form-control" name="frame_number">
            </div>
            <div class="content-item-div-right">
                <span class="content-span">发动机号</span> <input type="text" class="content-input form-control" name="engine_number">
            </div>
        </div>
        <div class="content-line-div">
            <div class="content-item-div-right">
                <span class="content-span">登记日期</span> <input type="text" class="content-input form-control" id="car-dj-date" name="car_license_time">
            </div>
        </div>
        <div class="content-line-div">
            <input type="submit" value="保存" class="btn adc-tc-search-btn">
            <p class="help-block"></p>
        </div>
    </form>
</script>

<script id="tpl-search-result" type="text/template">
    <% _.each(customer, function (ele,index) { %>
        <tr data-userid="<%- ele['p_uid'] || ''%>">
            <td class="s-click-ex c-name"><%-ele['p_name']%></td>
            <td class="s-click-ex c-phone"><%-ele['p_phone']%></td>
            <td class="s-click-ex c-license"><%-ele['p_license'] || '无'%></td>
            <td class="s-click-ex c-valid"><%-ele['p_license_valid'] || '无'%></td>
            <td><a href="javascript:void(0);" class="opr-cost">消费记录</a></td>
            <td><a class="opr-edit" href="javascript:void(0);">修改</a></td>
        </tr>
        <tr class="s-car-info">
            <td colspan="10">
                    <div>
                        <table cellspacing="0" width="80%" style="margin: 10px auto;">
                            <thead>
                                <tr>
                                    <th>车牌号码</th>
                                    <th>车辆品牌</th>
                                    <th>车辆型号</th>
                                    <th>车架号</th>
                                    <th>发动机号</th>
                                    <th>车辆登记时间</th>
                                    <th>门店注册时间</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                        
                                <% _.each(ele['p_cars'], function (car, index){ %>
                                    <tr data-plate="<%-car['p_plate']%>" data-userid="<%- ele['p_uid'] || ''%>">
                                        <td><%-car['p_plate']%></td>
                                        <td><%-car['p_brand']%></td>
                                        <td><%-car['p_series']%></td>
                                        <td><%-car['p_frame']%></td>
                                        <td><%-car['p_engine']%></td>
                                        <td><%-car['p_license']%></td>
                                        <td><%-car['p_reg']%></td>
                                        <td><a class="opr-edit-car">修改</a></td>
                                    </tr>
                                <% }); %>
                            </tbody>
                        </table>
                    </div>
            </td>
        </tr>
    <% }); %>
</script>

{%require name="admin:page/searchcustomer.tpl"%}
{%require name="admin:static/js/custom/search.js"%}

{%/block%}

