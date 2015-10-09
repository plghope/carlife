{%extends file="./layout_admin.tpl"%}
{%block name="title"%}
项目管理
{%/block%}
{%block name="static-resource"%}
    {%require name="admin:static/css/dialog.css"%}
    
{%/block%}

{%block name="leftNav"%}
    {%widget name="admin:widget/leftNav/leftNav.tpl"
            control="menu_choice"
            service="leftnav_item_focus"
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
                    {name: '系统控制台'},
                    {name: '项目管理'}
                ]);
            });
        {%/script%}
    </div>
    <div class="container">
        <div class="sia-nav-div">
            <!--sia-nav-cur-->
            <ul class="sia-nav-ul">
                <li><a class="sia-nav-div-li tabnav" href="#addservice">添加服务项目</a></li>
                <li><a class="sia-nav-div-li tabnav" href="#queryservice">查询服务项目</a></li>
            </ul>
            {%script%}
                require(['/tabNav/tabNav'], function (TabNav) {
                    new TabNav('.sia-nav-ul').init();
                });
            {%/script%}
        </div>


        <div class="sia-con-div tabnav-tab" id="addservice">

            <form id="service-form-add">
                <div class="asi-cate-div">
                    <h3>选择项目分类</h3>
                    <div class="asi-line-div">
                        <span class="asi-span i-format"><span class="required-star">*</span>项目父类</span>
                        <select class="asi-select idList" name="sId"></select>
                        <div class="asi-span"><a href="/servicetype/storeId/{%$data['storeId']%}" target="_blank">点此添加项目分类信息</a></div>
                    </div>
                    <div class="asi-line-div">
                        <span class="asi-span i-format"><span class="required-star">*</span>项目类别</span>
                        <select class="asi-select subList" name="superId"></select>
                    </div>
                    <div class="asi-line-div">
                        <span class="asi-span i-format"><span class="required-star">*</span>所属部门</span>
                        <select class="asi-select departmentList" name="departmentId"></select>
                        <div class="asi-span">
                            <a href="javascript:void(0);" id="btn-add-department">没有找到所属部门？点击添加</a>
                        </div>
                    </div>
                </div>
                <div class="asi-item-info-div">
                    <h3>添加项目信息</h3>
                    <div class="asi-line-div">
                        <div class="asi-inline-div">
                            <span class="asi-span i-format"><span class="required-star">*</span>项目名称</span><input type="text" name="serviceName" class="asi-input form-control">
                        </div>
                        <div class="asi-inline-div">

                            <span class="asi-span i-format">计量单位</span>
                            <select class="asi-select" name="unit">
                                <option value="次">次</option>
                                <option value="个">个</option>
                                <option value="对">对</option>
                            </select>
                        </div>
                    </div>
                    <div class="asi-line-div">
                        <div class="asi-inline-div">
                            <span class="asi-span i-format"><span class="required-star">*</span>成本价格</span><input type="text" name="costPrice" class="asi-input form-control" placeholder="/元">
                        </div>
                        <div class="asi-inline-div">
                            <span class="asi-span i-format"><span class="required-star">*</span>参考报价</span><input type="text" name="referencePrice" class="asi-input form-control" placeholder="/元">
                        </div>
                    </div>
                    <div class="asi-line-div">
                        <div class="asi-inline-div">
                            <span class="asi-span i-format">质保时间</span><input type="text" name="guaranteePeriod" class="asi-input form-control" placeholder="/天">
                        </div>
                        <div class="asi-inline-div">
                            <span class="asi-span i-format">回访时间</span><input type="text" name="pilgrimageTime" class="asi-input form-control" placeholder="/天">
                        </div>
                    </div>
                    <div class="asi-line-div asi-btn-div">
                        <input type="submit" value="添加项目" id="add-service-button" class="btn add-custom-button">	
                        <p class="help-block"></p>
                    </div>
                </div>
            </form>
        </div>
        <div class="sia-con-div tabnav-tab" id="queryservice">
            <h3>输入查询条件</h3>

            <form id="service-form-query">
                <div class="ssi-inline-div" style="margin-top: 8px;margin-right:15px;">
                    <div>
                        <div class="ssi-inline-div">
                            <span class="ssi-span i-format"><span class="required-star">*</span>项目父类</span><select id="tab-two-super-select" name="superId" class="ssi-select idList"></select>
                        </div>
                        <div class="ssi-inline-div">
                            <span class="ssi-span i-format"><span class="required-star">*</span>项目类型</span><select name="serviceTypeId" class="ssi-select subList" id="tab-two-type-select"></select>
                        </div>
                    </div>
                    <div style="margin-top: 8px;">
                        <div class="ssi-inline-div">
                            <span class="ssi-span i-format"><span class="required-star">*</span>所属部门</span><select class="ssi-select departmentList" name="departmentId" id="tab-two-department-select">
                            </select>
                        </div>
                        <div class="ssi-inline-div">
                            <span class="ssi-span i-format">项目名称</span><input name="serviceName" type="text" class="ssi-input form-control" style="width:125px;">
                        </div>

                    </div>
                </div>
                <div class="ssi-inline-div">
                    <input type="submit" value="查询" class="btn sia-search-button" id="query-service-button">
                </div>
            </form>
            <h3 class="ssi-rs-ttl">查询结果</h3>
            <table class="ssi-tab" id="service-table-query">
                <thead>
                    <tr>
                        <th>项目编号</th>
                        <th>项目名称</th>
                        <th>项目父类</th>
                        <th>项目类型</th>
                        <th>计量单位</th>
                        <th>参考报价</th>
                        <th>成本价格</th>
                        <th>售后回访时间</th>
                        <th>质保时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                        <tr><td colspan="100%">空</td></tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<script id="tmpl-edit-service" type="text/template">
    <div class="tabnav-tab" style="display: block; padding:0;">
        <form class="service-form-edit">
            <input type="hidden" name="serviceId" value="<%-serviceId%>">
            <div class="asi-cate-div">
                <h3>修改项目分类</h3>
                <div class="asi-line-div">
                    <span class="asi-span">项目父类</span>
                    <select class="asi-select idList" name="sId">
                    </select>
                </div>
                <div class="asi-line-div">
                    <span class="asi-span">项目类别</span>
                    <select class="asi-select subList" name="superId">
                    </select>
                </div>
                <div class="asi-line-div">
                    <span class="asi-span">所属部门</span>
                    <select class="asi-select departmentList" name="departmentId" >
                    </select>
                    <div class="asi-span">
                        <a href="javascript:void(0);" id="btn-add-department">没有找到所属部门？点击添加</a>
                    </div>
                </div>
            </div>
            <div class="asi-item-info-div">
                <h3>修改项目信息</h3>
                <div class="asi-line-div">
                    <div class="asi-inline-div">
                        <span class="asi-span">项目名称</span><input type="text" name="serviceName" class="asi-input form-control" value="<%-name%>">
                    </div>
                    <div class="asi-inline-div">
                        <span class="asi-span">计量单位</span>
                        <select class="asi-select" name="unit">
                            <option value="次">次</option>
                            <option value="个">个</option>
                            <option value="对">对</option>
                        </select>
                    </div>
                </div>
                <div class="asi-line-div">
                    <div class="asi-inline-div">
                        <span class="asi-span">成本价格</span><input type="text" name="costPrice" class="asi-input form-control" value="<%-costPrice%>">
                    </div>
                    <div class="asi-inline-div">
                        <span class="asi-span">参考报价</span><input type="text" name="referencePrice" class="asi-input form-control" value="<%-referencePrice%>">
                    </div>
                </div>
                <div class="asi-line-div">
                    <div class="asi-inline-div">
                        <span class="asi-span">质保时间</span><input type="text" name="guaranteePeriod" class="asi-input form-control" placeholder="/天" value="<%-guaranteePeriod%>">
                    </div>
                    <div class="asi-inline-div">
                        <span class="asi-span">回访时间</span><input type="text" name="pilgrimageTime" class="asi-input form-control" placeholder="/天" value="<%-pilgrimageTime%>">
                    </div>
                </div>
                <div class="asi-line-div asi-btn-div">
                    <input type="submit" value="保存" class="btn sia-search-button edit-service-button">	
                    <p class="help-block"></p>
                </div>
            </div>
        </form>

    </div>
</script>

{%require name="admin:page/service.tpl"%}
{%require name="admin:static/js/controls/service.js"%}
{%/block%}
