<!DOCTYPE html>
{%html framework="admin:static/js/esl.js" class="expanded"%}
    {%head%}
        <meta charset="utf-8"/>
        <title>{%block name="title"%}{%/block%}</title>
        <!--<link rel="stylesheet" href="../static/font-awesome/css/font-awesome.min.css">-->
        <!--[if IE 7]>
          <link rel="stylesheet" href="../static/font-awesome/css/font-awesome-ie7.min.css">
        <![endif]-->
        {%require name="admin:static/css/lib/base.less"%}
        
        {%block name="static-resource"%}{%/block%}

        <script type="text/javascript">
            window.storeId = '{%$data["storeId"]%}' === '' ? '1' : '{%$data["storeId"]%}';
            window.username = '{%$data["username"]%}';
        </script>
    {%/head%}
    {%body%}
        <div class="wrap">
            <div class="header mala-header-fix mala-header">
                <a class="mala-logo mala-fl" href="/"></a>

                {%widget name="admin:widget/userMenu/userMenu.tpl"%}
                {%script%}
                    require(['/userMenu/userMenu'],function(){});
                {%/script%}

                <div class="clear"></div>
            </div>
        </div>
        <div class="main">
            <!--左侧导航-->
            {%block name="leftNav"%}{%/block%}
            <!--主体内容-->
            {%block name="content"%}{%/block%}
        </div>
        <div class="footer"></div>
        {%require name="admin:static/js/json2.js"%}
        {%require name="admin:page/layout_admin.tpl"%}
    {%/body%}
{%/html%}

