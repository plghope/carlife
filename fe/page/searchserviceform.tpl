{%extends file="./layout_admin.tpl"%}
{%block name="title"%}
查询服务单
{%/block%}
{%block name="static-resource"%}
{%/block%}

{%block name="leftNav"%}
    {%widget name="admin:widget/leftNav/leftNav.tpl"
            serviceForm="menu_choice"
            serviceFormSearch="leftnav_item_focus"
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
                    {name: '服务单管理'},
                    {name: '查询服务单'}
                ]);
            });
        {%/script%}
    </div>
    <div class="content tabnav-tab">
        <h3>输入查询条件</h3>
        <form id="service-search">
            <div class="ssf-cond-div">
                <div class="ssf-inline-div">
                    <span class="ssf-span">车牌号码:</span>
                    <input type="text" class="ssf-input form-control" name="car_no" id="service_car_no">
                </div>
                <div class="ssf-inline-div">
                    <span class="ssf-span">服务时间:</span>
                    <span class="ssf-span">从</span>
                    <input type="text" class="ssf-input form-control" id="service-start" name="time_start">
                    <span class="ssf-span">&nbsp;到</span>
                    <input type="text" class="ssf-input form-control" id="service-finish" name="time_end">
                </div>
                <div class="ssf-inline-div">
                    <input type="submit" value="查询" class="ssfc-button">
                    <p class="help-block"></p>
                </div>

                <div class="sc-cond-notes-div">
                    <span>说明: 输入任一条件即可进行查询</span>
                </div>
            </div>
        </form>
        <h3>查询结果</h3>
        <div class="d-s-r">
        
        </div>
    </div>

</div>

<script id="service-search-result" type="text/template">

    <%_.each(services, function(service, index){ %>
        <div class="ssf-rs-div">
            <div class="ssf-rs-item-div service-info" data-id="<%-service['maintenance_id']%>">
                <div class="ssf-rs-item-left-div">
                    <div class="ssf-inline-div">
                        <span>服务单号:</span> <span class="data-service-id"><%-service['maintenance_id']%></span>
                    </div>
                    <div class="ssf-inline-div">
                        <span>车牌号码:</span> <span class="data-plate-number"><%-service['plate_number']%></span>
                    </div>
                    <div class="ssf-inline-div">
                        <span>时间：</span> <span class="data-date"><%-service['date']%></span>
                    </div>
                    <div class="ssf-inline-div">
                        <span>实收金额:</span> <span class="data-all-charge"><%-service['all_charge']%></span>
                    </div>	
                    <div class="ssf-inline-div">
                        <span>收银人员:</span> <span class="data-cashier"><%-service['cashier']%></span>
                    </div>
                    <p>备注说明</p>	 <span class="data-cashier"><%-service['remark']%></span>
                    <div class="ssf-itemlist-div">
                        <table class="ssf-tab">
                            <thead>
                                <tr>
                                    <th>项目父类</th>
                                    <th>项目类别</th>
                                    <th>项目名称</th>
                                    <th>应收金额</th>
                                    <th>操作员</th>
                                    <th>备注</th>
                                </tr>
                            </thead>
                            <tbody>
                                <%_.each(service.project, function(project, index){ %>
                                    <tr class="data-service-item">
                                        <td class="data-base"><%-project.base%></td>
                                        <td class="data-category"><%-project.category%></td>
                                        <td class="data-name"><%-project.name%></td>
                                        <td class="data-price"><%-project.price%></td>
                                        <td class="data-operator"><%-project.operator%></td>
                                        <td class="data-remark"><%-project.remark%></td>
                                    </tr>
                                <% });%>
                            
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="ssf-rs-item-right-div">
                    <input type="submit" value="修改" class="ssfc-button opr-edit">
                </div>
                <div class="clear"></div>
            </div>
        </div>
    <% });%>
    <ul id="pagnition"></ul>
        
</script>
<script id="service-modified-popup" type='text/template'>
    <div class="asf-additem-div tabnav-tab">
                <h3>添加服务项目</h3>
                <form id="add-service">
                    <div class="asf-add-content-div">
                        <div class="asf-add-conl-div">
                            <div class="asf-sel-item">
                                <div class="asf-inline">
                                    <span class="asf-span">项目父类</span>
                                    <select class="asf-select" name="base" id="idList">
                                    </select>
                                </div>
                                <div class="asf-inline">
                                    <span class="asf-span">项目类别</span>
                                    <select class="asf-select" name="category" id="subList">
                                    </select>
                                </div>
                                <div class="asf-inline">
                                    <span class="asf-span">项目名称</span>
                                    <select class="asf-select" name="name" id="itemList">
                                    </select>
                                </div>
                            </div>
                            <div class="asf-sel-item">
                                <div class="asf-inline">
                                    <span class="asf-span"><span class="required-star">*</span>应收金额</span>
                                    <input type="text" name="price" class="content-input asf-input form-control" id="service-reference-price">
                                </div>
                                <div class="asf-inline">
                                    <span class="asf-span">备注说明</span>
                                    <input type="text" name="remark" class="content-input asf-input form-control">
                                </div>
                                <div class="asf-inline">
                                    <span class="asf-span">操作人员</span>
                                    <input type="text" name="operator" class="content-input asf-input form-control">
                                </div>
                            </div>
                        </div>
                        <div class="asf-add-button-div">
                            <input type="submit" value="添加" class="btn sc-button">
                        </div>
                        <div class="clear"></div>
                    </div>
                </form>
                <div class="sep-line"></div>
                <div class="asf-item-list-div">
                    <p class="asf-list-ttl">服务项目明细</p>
                    <table class="asf-tab">
                        <thead>
                            <tr>
                                <th>项目父类</th>
                                <th>项目类别</th>
                                <th>项目名称</th>
                                <th>应收金额</th>
                                <th>操作员</th>
                                <th>备注</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <%=serviceInfo%>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="sep-line"></div>
            <form id="submit-service-all">
                <div class="asf-rcount-div">
                    <span class="asf-span"><span class="required-star">*</span>实收金额</span>
                    <input type="text" name="charge" class="content-input asf-input form-control" id="all-charge">
                    <span class="asf-span">备注说明</span>
                    <input type="text" name="info" class="content-input asf-input form-control" id="remark">
                    <span class="asf-span">收银人员</span>
                    <input type="text" name="engineer" class="content-input asf-input form-control" id="cashier">
                </div>
                <div class="asf-submit-div">
                    <input type="submit" value="确认无误，提交" class="btn sc-button" id="add-service-form">
                    <p class="help-block"></p>
                </div>
            </form>
</script>
{%require name="admin:static/js/serviceform/search.js"%}
{%require name="admin:page/searchserviceform.tpl"%}
{%/block%}

