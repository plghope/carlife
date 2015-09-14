{%extends file="./layout_admin.tpl"%}
{%block name="title"%}
项目分类管理
{%/block%}
{%block name="static-resource"%}
{%require name="admin:static/css/dialog.css"%}

{%/block%}
{%block name="leftNav"%}
    {%widget name="admin:widget/leftNav/leftNav.tpl"
            control="menu_choice"
            servicetype="leftnav_item_focus"
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
                    {name: '项目类别管理'}
                ]);
            });
        {%/script%}
    </div>
    <div class="container">
        <div class="sca-nav-div">
            <ul class="sca-nav-ul">
                <li> <a class="sca-nav-div-li tabnav" href="#addservicetype">添加项目类别</a></li>
                <li> <a class="sca-nav-div-li tabnav" href="#queryservicetype">查询项目类别</a></li>
            </ul>
            {%script%}
                require(['/tabNav/tabNav'], function (TabNav) {
                    new TabNav('.sca-nav-ul').init();
                });
            {%/script%}
        </div>
        <div class="sca-con-div tabnav-tab" id="addservicetype">
            <form id="servicetype-form-add">
                <div class="sca-cate-div">
                    <div class="sca-line-div">
                        <span class="sca-span"><span class="required-star">*</span>项目父类：</span>
                        <select name="superId" class="idList sca-select"></select>
                    </div>
                    <div class="note-line-div">
                        <a href="javascript:void(0);" id="sca-add-cate-index">没有找到项目父类？点击添加</a>
                    </div>
                    <div class="sca-line-div">
                        <span class="sca-span"><span class="required-star">*</span>项目类别：</span>
                        <input id="type-input" name="type" type="text" class="sca-input form-control" style="width:225px;">
                    </div>
                    <div class="note-line-div">
                        <p>如需批量添加，项目名称请用逗号分隔开</p>
                    </div>
                    <div class="sca-line-div">
                        <input type="submit" value="添加项目类别" class="btn sca-button" id="add-servicetype-button">	
                        <p class="help-block"></p>
                    </div>
                </div>
            </form>
        </div>
        <div class="sca-con-div tabnav-tab" id="queryservicetype">
            <form id="servicetype-form-query">
                <h3>输入查询条件</h3>
                <div class="ssi-cond">
                    <div class="sca-inline-div">
                        <span class="sca-m-span"><span class="required-star">*</span>项目父类</span>
                        <select class="sca-m-select idList" name="superId"></select>
                    </div>
                    <div class="sca-inline-div">
                        <span class="sca-m-span"><span class="required-star">*</span>所属部门</span>
                        <select class="sca-m-select departmentList" name="departmentId"></select>
                    </div>
                    <div class="sca-inline-div">
                        <input type="submit" value="查询" class="sca-search-button" id="query-service-button">
                    </div>
                </div>
                <h3 class="sca-rs-ttl">查询结果</h3>
                <table class="sca-tab" id="servicetype-table-query">
                    <thead>
                        <tr>
                            <th>项目类别</th>
                            <th>项目父类</th>
                            <th>所属部门</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td colspan="100%">空</td></tr>
                    </tbody>
                </table>
            </form>
        </div>
    </div>
</div>
{%require name="admin:page/servicetype.tpl"%}
{%require name="admin:static/js/controls/servicetype.js"%}

{%/block%}
