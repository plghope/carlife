<!DOCTYPE html>
{%html%}
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
                <form action="/logcheck" method="post">
                    <div class="login-div">
                        <div class="account">
                            <span></span>
                            <input type="text" name="username" id="uc-common-account" name="entered_login" autocomplete="off" placeholder="用户名" tabindex="1" maxlength="100">
                        </div>
                        <div class="password">
                            <span></span>
                            <input type="password" name="password" id="uc-common-password" name="entered_password" tabindex="2" autocomplete="off" placeholder="密码">
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
    {%/body%}
{%/html%}

