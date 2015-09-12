<!DOCTYPE html>
{%html framework="admin:static/js/esl.js" class="expanded"%}
    {%head%}
        <meta charset="utf-8"/>
        <title>{%block name="title"%}{%/block%}</title>
        <link rel="stylesheet" href="../static/font-awesome/css/font-awesome.min.css">
        {%require name="admin:static/css/lib/base.less"%}
        
    {%/head%}
    {%body%}
        <div class="wrap">
            <div class="header mala-header-fix mala-header">
                <a class="mala-logo mala-fl" href="/"></a>
                <div class="mala-fr">
                    <span class="mala-store-span"></span><span class="mala-user-span">{%$data["username"]%}</span>
                </div>
                <div class="clear"></div>
            </div>
        </div>
        <div class="middle=content">
            <div class="container" style="width: 980px; margin: 10px auto;">
                <div class="sca-nav-div">
                    <ul class="sca-nav-ul">
                        <li> <a class="sca-nav-div-li tabnav" href="#add">添加门店</a></li>
                        <li> <a class="sca-nav-div-li tabnav" href="#list">门店列表</a></li>
                    </ul>
                </div>
                <div class="sia-con-div tabnav-tab" id="add">
                    <form id="store-form-add">
                        <div class="content-line-div">
                            <div class="content-item-div-left">
                                <span class="content-span">门店名称</span> <input type="text" class="content-input form-control" name="store_name">
                            </div>
                            <div class="content-item-div-right">
                                <span class="content-span">联系人员</span> <input type="text" class="content-input form-control" name="name">
                            </div>
                        </div>
                        <div class="content-line-div">
                            <div class="content-item-div-left">
                                <span class="content-span">联系电话</span> <input type="text" class="content-input form-control" name="telphone">
                            </div>
                            <div class="content-item-div-right">
                                <span class="content-span">联系邮箱</span> <input type="text" class="content-input form-control" name="email">
                            </div>
                        </div>
                        <div class="content-line-div">
                            <span class="content-span">门店地址</span> <input type="text" class="content-input form-control" name="address" style="width: 550px;">
                        </div>
                        <div class="content-line-div">
                            <div class="content-item-div-left">
                                <span class="content-span">管理账户</span> <input type="text" class="content-input form-control" name="admin_name">
                            </div>
                            <div class="content-item-div-right">
                                <span class="content-span">初始密码</span> <input type="text" class="content-input form-control" name="password">
                            </div>
                        </div>
                        <input type="submit" value="添加门店" class="btn sia-search-button" style="margin: 30px 43px;">
                      </form>
                </div>
                <div class="sca-con-div tabnav-tab" id="list">
                    <table class="sca-tab">
                        <thead>
                            <tr>
                                <th>门店名称</th>
                                <th>联系人</th>
                                <th>联系电话</th>
                                <th>联系邮箱</th>
                                <th>地址</th>
                                <th>状态</th>
                                <th>管理员账户</th>
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
        <div class="footer"></div>
        {%script%}
            require(['jquery', '/tabNav/tabNav', '/notify/notify','validate'], function ($, TabNav, Notify) {
                var tab = new TabNav('.sca-nav-ul');
                var _api = {
                    submit: '/api/addstore'
                };

                tab.one('add', function () {
                    $('#store-form-add').validate({
                        rules: {
                            store_name: {
                                required: true
                            },
                            name: {
                                required: true
                            },
                            telphone: {
                                required: true
                            },
                            address: {
                                required: true
                            },
                            admin_name: {
                                required: true
                            },
                            password: {
                                required: true
                            }
                        },
                        submitHandler: function (form) {
                           $.ajax({
                                method: 'POST',
                                dataType: 'json',
                                url: _api.submit,
                                data: $(form).serialize()
                            }).done(function (r) {
                                if (r.status === 0) {
                                    new Notify('添加门店成功', 2).showModal();
                                    setTimeout(function () {
                                        location.reload(true);
                                    }, 1500);
                                }
                                
                            });
                            return false;
                       }
                        
                    });
                
                });
                tab.init();
            });
        {%/script%}
        {%require name="admin:page/addstore.tpl"%}
        
    {%/body%}
{%/html%}

