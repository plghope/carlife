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
        <div class="main">

            <div class="sia-con-div tabnav-tab" id="addservice">

                <form id="service-form-add">
                    <div class="asi-cate-div">
                        <h3>选择项目分类</h3>
                        <div class="asi-line-div">
                            <span class="asi-span">项目父类</span>
                            <select class="asi-select idList" name="sId">
                            </select>
                            <div class="asi-span"><a href="/servicetype" target="_blank">点此添加项目分类信息</a></div>
                        </div>
                        <div class="asi-line-div">
                            <span class="asi-span">项目类别</span>
                            <select class="asi-select subList" name="superId">
                            </select>
                            <div class="asi-span">
                                <a href="javascript:void(0);" id="btn-add-department">没有找到所属部门？点击添加</a>
                                </div>
                        </div>
                        <div class="asi-line-div">
                            <span class="asi-span">所属部门</span>
                            <select class="asi-select departmentList" name="departmentId" >
                            </select>
                        </div>
                    </div>
            </div>
        </div>
        <div class="footer"></div>
    {%/body%}
{%/html%}

