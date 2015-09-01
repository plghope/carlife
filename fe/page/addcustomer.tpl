{%extends file="./layout_admin.tpl"%}
{%block name="title"%}
添加客户
{%/block%}
{%block name="static-resource"%}
    {%require name="admin:static/css/dialog.css"%}
    
{%/block%}

{%block name="leftNav"%}
    {%widget name="admin:widget/leftNav/leftNav.tpl"
            custom="menu_choice"
            customAdd="leftnav_item_focus"
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
                    {name: '添加'}
                ]);
            });
        {%/script%}
    </div>
    <div class="content">
        <form id="add-customer-form">
            <div class="car_info_add tabnav-tab">
                <h3>添加车辆信息</h3>
                <div class="content-line-div">
                    <div class="content-item-div-left">
                        <span class="content-span">车牌号码</span> <input type="text" class="content-input form-control" name="plate_number">
                    </div>
                    <div class="content-item-div-right">
                        <span class="content-span">车辆品牌</span>
                        <select class="content-select" id="brandSelect" name="brand">
                        </select>
                        <select class="content-select" id="seriesSelect" name="series">
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
                    <div class="content-item-div-left">
                        <span class="content-span">车辆颜色</span> <input type="text" class="content-input form-control" name="car_color">
                    </div>
                    <div class="content-item-div-right">
                        <span class="content-span">登记日期</span> <input type="text" class="content-input form-control" id="car-dj-date" name="car_reg_time">
                    </div>
                </div>
            </div>
            <div class="user_info_add tabnav-tab">
                <h3>添加车主信息</h3>
                <div class="content-line-div">
                    <span class="rel-custom"><a href="javascript:void(0)" id="rel-custom-index">点击关联已有车主</a></span>
                <div>
                <div class="exist-user" style="display:none;">
                </div>
                <div class="new-user">
                    <div class="content-line-div">
                        <div class="content-item-div-left">
                            <span class="content-span">车主姓名</span> <input type="text" class="content-input form-control" name="user_name">
                        </div>	
                        <div class="content-item-div-right">
                            <span class="content-span">联系电话</span> <input type="text" class="content-input form-control" name="phone_num">
                        </div>
                    </div>
                    <div class="content-line-div">
                        <div class="content-item-div-left">
                            <span class="content-span">驾驶证编号</span> <input type="text" class="content-input form-control" name="car_license_num">
                        </div>	
                        <div class="content-item-div-right">
                            <span class="content-span">驾驶证到期时间</span> <input type="text" class="content-input form-control" name="car_license_valid_time">
                        </div>	
                    </div>
                    <div class="content-line-div">
                        <span class="content-span">客户地址</span>
                        <select class="content-select" id="provinceSelect" name="addr_province"></select>
                        <select class="content-select" id="citySelect" name="addr_city"></select>
                        <select class="content-select" id="districtSelect" name=add_district></select>
                    </div>
                </div>
                <div class="content-line-div">
                    <input  type="submit" value="添加客户" class="add-custom-button">
                    <p class="help-block"></p>
                </div>	
            </div>

        </form>
   </div>
</div>

<script id="user-display" type="text/template">
    <input type="hidden" value="<%- user_id %>">
    <div class="content-item-div-left">
        <span class="content-span">车主姓名</span><span><%- name %></span> 
    </div>	
    <div class="content-item-div-right">
        <span class="content-span">联系电话</span><span><%- phone_num%></span>
    </div>
</div>
<div class="content-line-div">
    <div class="content-item-div-left">
        <span class="content-span">驾驶证编号</span><span><%- car_license_num %></span>
    </div>	
    <div class="content-item-div-right">
        <span class="content-span">驾驶证到期时间</span><span><%- car_license_valid_time%></span>
    </div>	
</div>
<div class="content-line-div">
    <span class="content-span">客户地址</span>
    <span><%-addr_province%><%-addr_city%><%-addr_district%></span>
</div>

</script>
<script id="tmpl-popup" type="text/template">
	<div class="adc-tc-div">
        <form id="user-form" method="POST">
            <div class="rel_customer_search">
                <div class="adc-tc-inline-div">
                    <span class="adc-tc-span">车主姓名：</span> <input type="text" name="user_name" class="adc-tc-input form-control">
                </div>
                <div class="adc-tc-inline-div">
                    <span class="adc-tc-span">联系电话：</span> <input type="text" name="phone_number" class="adc-tc-input form-control">
                </div>
                <div class="adc-tc-inline-div">
                    <button type="submit" class="adc-tc-search-btn">查询</button>
                </div>
            </div>
        </form>
		<div class="adc-tc-rs-ttl">
			<span>查询结果</span>
		</div>
		<div class="rel_customer_choose">
			<table class="adc-tc-tab user-query-table">
                <thead>
                    <tr>
                        <th>姓名</th>
                        <th>联系电话</th>
                        <th>地址</th>
                        <th>驾驶证编号</th>
                        <th>驾驶证到期时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
			</table>
		</div>
	</div>

</script>
{%require name="admin:page/addcustomer.tpl"%}
{%require name="admin:static/js/custom/add.js"%}
{%/block%}

