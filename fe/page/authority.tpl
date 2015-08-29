{%extends file="./layout_admin.tpl"%}
{%block name="title"%}
权限管理
{%/block%}
{%block name="static-resource"%}
{%/block%}

{%block name="leftNav"%}
    {%widget name="admin:widget/leftNav/leftNav.tpl"
            control="menu_choice"
            authority="leftnav_item_focus"
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
                    {name: '权限管理'}
                ]);
            });
        {%/script%}
    </div>
    <div class="container">
        <div class="sia-nav-div">
            <!--sia-nav-cur-->
            <ul class="sia-nav-ul">
                <li><a class="sia-nav-div-li tabnav" href="#addadmin">添加管理员</a></li>
                <li><a class="sia-nav-div-li tabnav" href="#authoritymanange">权限管理</a></li>
            </ul>
            {%script%}
                require(['/tabNav/tabNav'], function (TabNav) {
                    new TabNav('.sia-nav-ul');
                });
            {%/script%}
        </div>

        <div class="sia-con-div tabnav-tab" id="addadmin">
            <h3>添加管理员</h3>
            <div class="auth-line-div">
                <div class="auth-inline-div">
                    <label for="username" class="auth-span">账户名称</label>
                    <input type="text" id="username" class="form-control auth-input">
                </div>
                <div class="auth-inline-div">
                    <label for="password" class="auth-span">初始密码</label>
                    <input type="text" id="password" class="form-control auth-input">
                </div>
                <div class="auth-inline-div">
                    <input type="button" value="添加该账户" class="auth-button" id="btn-addadmin">
                    <p class="help-block"></p>
                </div>
            </div>

            <h3>选择管理权限</h3>
            {%foreach $data['authorityList'] as $category%}
                <div class="auth-line-div">
                    {%foreach $category as $authority%}
                        <div class="auth-inline-div auth-m-div">
                            <label><input data-name="{%$authority['name']%}" data-detail="{%$authority['detail']%} " type="checkbox" value="{%$authority['permissionId']%}" class="auth-checkbox">{%$authority['name']%}</label>
                        </div>
                    {%/foreach%}
                    
                </div>
                
            {%/foreach%}
            <div class="auth-line-div">
                <p>已选择权限列表</p>
            </div>
            <table class="auth-table" id="auth-add-table">
                <thead>
                    <tr>
                        <th>权限编号</th>
                        <th>权限名称</th>
                        <th>权限说明</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <div class="auth-line-div">
                <input id="btn-addauthority" type="button" value="添加所选权限" class="auth-button">
                <p class="help-block"></p>
            </div>
        </div>
        <div class="sia-con-div tabnav-tab" id="authoritymanange">
            <div class="auth-line-div">
                <p>系统中管理员账户列表</p>
            </div>
            <table class="auth-table m-auth-table">
                <tr>
                    <th class="auth-table-name-w">账户名</th>
                    <th class="auth-table-date-w">开户日期</th>
                    <th class="auth-table-list-w">所拥有权限</th>
                    <th class="auth-table-op-w">操作</th>
                </tr>
                <tr>
                    <td class="auth-table-name-w">小明</td>
                    <td class="auth-table-date-w">2015-07-21</td>
                    <td class="auth-table-list-w">添加客户,添加客户,添加客户,添加客户,添加客户,添加客户,添加客户,添加客户,添加客户,添加客户,添加客户,添加客户</td>
                    <td class="auth-table-op-w">删除账户&nbsp;修改权限</td>
                </tr>
            </table>
        </div>
    </div>
</div>
{%require name="admin:static/js/aes.js"%}
{%require name="admin:static/js/pad-zeropadding.js"%}
{%require name="admin:static/js/controls/authority.js"%}
{%require name="admin:page/authority.tpl"%}

{%/block%}