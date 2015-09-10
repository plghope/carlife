<!DOCTYPE html>
{%html framework="admin:static/js/esl.js" class="expanded"%}
    {%head%}
        <meta charset="utf-8"/>
        <title>云云车-登陆</title>
        {%require name="admin:static/css/lib/base.less"%}
        {%require name="admin:static/css/lib/login.less"%}
    {%/head%}
    {%body%}
        <div class="wrap">
            <div id="web_bg" class="login-background"><img class="background-img" src="../static/img/bg-pic.jpg" /> 
            </div>
            <div class="login-header mala-header-fix mala-header">
                <a class="mala-logo mala-fl login-logo" href="login.html"></a>
                <div class="login-fr">
                    <span><a href="#">产品介绍</a></span>
                    <span><a href="#">联系我们</a></span>
                </div>
                <div class="clear"></div>
            </div>
            <div class="main">
                <div class="left-side">
                </div>
                <form action="/logcheck" method="post" id="loginForm">
                    <div class="login-div">
                        <div class="control-box">
                            <div class="account">
                                <span></span>
                                <input type="text" name="username" id="uc-common-account" name="entered_login" autocomplete="off" placeholder="用户名" tabindex="1" maxlength="100">
                            </div>
                        </div>
                        <div class="control-box">
                            <div class="password">
                                <span></span>
                                <input type="password" name="password" id="uc-common-password" name="entered_password" tabindex="2" autocomplete="off" placeholder="密码">
                            </div>
                        </div>
                        <div class="login-btn">
                            <button type="submit" id="some_name">登录</button>
                        </div>
                        <div class="forget-pwd">
                            <a href="#">忘记密码</a>
                        </div>
                        <div class="clear"></div>
                    </div>
                </form>
            </div>
            <div class="footer">
            </div>
        </div>
        {%script%}
            require(['jquery', 'dialog','validate'], function ($, dialog) {
                var HOME_URL = '/addcustomer/storeId/';
                $('#loginForm').validate({
                    rules: {
                        username: {
                            required: true,
                        },
                        password: {
                            required: true,
                        }
                    },
                    messages: {
                        username: "用户名不能为空",
                        password: "密码不能为空"
                    },
                    submitHandler: function (form) {
                        $.ajax({
                            url: '/logcheck',
                            method: 'POST',
                            data: $(form).serialize(),
                            dataType: 'json',
                        }).done(function (r) {
                            if (r.status === 0) {
                                var data = r.data;
                                var storeIdList = data.storeIdList;

                                if (!storeIdList){
                                    return;
                                }

                                if (storeIdList.length === 1) {
                                    window.location.assign(HOME_URL + storeIdList[0]);
                                }else{
                                    //todo 门店列表
                                }
                            }else{
                                alert('登陆出错，请重试!');
                            }
                    
                        });
                        return false;
                    }
                
                });
            });
            
        {%/script%}
        {%require name="admin:page/login.tpl"%}
        
    {%/body%}
{%/html%}

