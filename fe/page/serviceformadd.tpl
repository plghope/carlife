{%extends file="./layout_admin.tpl"%}
{%block name="title"%}
服务单管理
{%/block%}
{%block name="static-resource"%}
{%/block%}

{%block name="leftNav"%}
    {%widget name="admin:widget/leftNav/leftNav.tpl"
            serviceForm="menu_choice"
            serviceFormAdd="leftnav_item_focus"
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
                    {name: '添加服务单'}
                ]);
            });
        {%/script%}
    </div>
    <div class="content">
        <div class="add-total-div tabnav-tab">
            <h3 class="sc-cond-title">选择车辆</h3>
            <div class="asf-additem-div">
                <div class="asf-car-div">
                    <span class="asf-span"><span class="required-star">*</span>车牌号码</span>
                    <input type="text" name="carno" class="content-input asf-input form-control" id="carno">
                    <p class="help-block"></p>
                </div>	
            </div>
        </div>
        <div class="asf-outer">
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
                                    <input type="text" name="price" class="content-input asf-input form-control">
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
        </div>
    </div>
</div>
{%require name="admin:page/serviceformadd.tpl"%}
{%require name="admin:static/js/serviceform/add.js"%}
{%/block%}

