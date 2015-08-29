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
                    {name: '查询服务单'}
                ]);
            });
        {%/script%}
    </div>
    <div class="content">
        <div class="add-total-div">
            <h3 class="sc-cond-title">选择车辆</h3>
            <div class="asf-additem-div">
                <div class="asf-car-div">
                    <span class="asf-span">车牌号码</span><input type="text" name="carno" class="content-input asf-input form-control">
                </div>	
            </div>
        </div>
        <div class="asf-additem-div">
            <h3>添加服务项目</h3>
            <div class="asf-add-content-div">
                <div class="asf-add-conl-div">
                    <div class="asf-sel-item">
                        <span class="asf-span">项目父类</span>
                        <select class="asf-select" id="idList">
                        </select>
                        <span class="asf-span">项目类别</span>
                        <select class="asf-select" id="subList">
                        </select>
                        <span class="asf-span">项目名称</span>
                        <select class="asf-select" id="itemList">
                        </select>
                    </div>
                    <div class="asf-sel-item">
                        <span class="asf-span">应收金额</span>
                        <input type="text" class="content-input asf-input form-control">
                        <span class="asf-span">备注说明</span>
                        <input type="text" class="content-input asf-input form-control">
                        <span class="asf-span">操作人员</span>
                        <input type="text" class="content-input asf-input form-control">
                    </div>
                </div>
                <div class="asf-add-button-div">
                    <input type="submit" value="添加" class="sc-button">
                </div>
                <div class="clear"></div>
            </div>
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
                        <tr>
                            <td>机电维修</td>
                            <td>发动机修理</td>
                            <td>发动机保养</td>
                            <td>800</td>
                            <td>小明</td>
                            <td></td>
                            <td>删除</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="sep-line"></div>
            <div class="asf-rcount-div">
                <span class="asf-span">实收金额</span>
                <input type="text" name="charge" class="content-input asf-input form-control">
                <span class="asf-span">备注说明</span>
                <input type="text" name="info" class="content-input asf-input form-control">
                <span class="asf-span">收银人员</span>
                <input type="text" name="engineer" class="content-input asf-input form-control">
            </div>
            <div class="asf-submit-div">
                <input type="submit" value="确认无误，提交" class="sc-button" id="add-service-form">
            </div>
    </div>
</div>

</div>
{%require name="admin:page/serviceformadd.tpl"%}
{%require name="admin:static/js/serviceform/add.js"%}
{%/block%}

