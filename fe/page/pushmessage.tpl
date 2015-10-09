{%extends file="./layout_admin.tpl"%}
{%block name="title"%}
推送消息
{%/block%}
{%block name="static-resource"%}
{%require name="admin:static/css/dialog.css"%}

{%/block%}
{%block name="leftNav"%}
    {%widget name="admin:widget/leftNav/leftNav.tpl"
            custom="menu_choice"
            pushmessage="leftnav_item_focus"
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
                    {name: '客户关系管理'},
                    {name: '主动消息推送'}
                ]);
            });
        {%/script%}
    </div>
    <div class="container">
        <div class="pd-nav-div">
            <ul class="pd-nav-ul">
                <li><a class="pd-nav-div-li tabnav" href="#series">按车型推送</a></li>
                <li><a class="pd-nav-div-li tabnav" href="#service">按服务项目推送</a></li>
                <li><a class="pd-nav-div-li tabnav" href="#charge">按消费金额推送</a></li>
                <li><a class="pd-nav-div-li tabnav" href="#carnum">按指定车牌推送</a></li>
            </ul>
            {%script%}
                require(['/tabNav/tabNav'], function (TabNav) {
                    new TabNav('.pd-nav-ul').init();
                });
            {%/script%}
        </div>
        <div class="pd-con-div tabnav-tab" id="series">
            <h3>第一步:选择车主</h3>
            <div class="pd-line-div">
                <div class="pd-inline-div">
                    <span class="pd-span">车辆品牌</span>
                    <select id="brandSelect" class="pd-select" name="brandId"></select>
                </div>
                <div class="pd-inline-div">
                    <span class="pd-span">车辆型号</span>
                    <select id="seriesSelect" class="pd-select" name="seriesId"></select>
                </div>
                <div class="pd-inline-div pd-search-btn">
                    <input type="button" value="查询" class="btn pd-button" id="query-by-car-button">
                </div>
            </div>
            <form class="push-message-form">
                <div class="pd-line-div">
                    <p>查询结果</p>
                        <table class="pd-table">
                            <thead>
                                <tr>
                                    <th>操作</th>
                                    <th>车牌号码</th>
                                    <th>车辆品牌</th>
                                    <th>车辆型号</th>
                                    <th>车主姓名</th>
                                    <th>联系电话</th>
                                    <th>微信</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                </div>
                <div class="pd-line-div">
                    <h3>第二步:编辑消息内容</h3>
                </div>
                <div class="pd-line-div data-con-div">
                    <div class="pd-lcon-div">
                        <p>设置短信内容</p>
                        <textarea name="content" class="pd-ta push-message-content null-check form-control"></textarea>	
                        <p class="help-block"></p>
                    </div>
                    <div class="pd-rcon-div">
                        <div class="push-dx-div">
                            <input type="submit" value="发送短信消息" class="btn pd-button dx-button push-message-button">
                            <p class="help-block"></p>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
                <input type="hidden" name="type" value="series">
            </form>
        </div>
        <div class="pd-con-div tabnav-tab" id="service">
            <h3>第一步:选择车主</h3>
            <form id="query-by-service-form">
                <div class="pd-line-div">
                    <div class="pd-inline-div">
                        <span class="pd-span">项目父类</span>
                        <select class="pd-select" name="superId" id="superSelect"></select>
                    </div>
                    <div class="pd-inline-div">
                        <span class="pd-span">项目类别</span>
                        <select class="pd-select" name="serviceTypeId" id="serviceTypeSelect"></select>
                    </div>
                    <div class="pd-inline-div">
                        <span class="pd-span">项目名称</span>
                        <select class="pd-select" name="serviceId" id="serviceSelect"></select>
                    </div>
                </div>
                <div class="pd-line-div">
                    <div class="pd-inline-div">
                        <span class="pd-span">起始时间</span><input type="text" class="pd-c-input form-control" name="startday" id="service-start">
                    </div>
                    <div class="pd-inline-div">
                        <span class="pd-span">结束时间</span><input type="text" class="pd-c-input form-control" name="endday" id="service-finish">
                    </div>	
                    <div class="pd-inline-div">
                        <div class="pd-s-btn-div">
                            <input type="submit" value="查询" class="btn pd-button dx-button">
                        </div>
                    </div>	
                </div>

            </form>
            <form class="push-message-form">
                <div class="pd-line-div">
                    <p>查询结果</p>
                    <table class="pd-table">
                        <thead>
                            <tr>
                                <th>操作</th>
                                <th>车牌号码</th>
                                <th>车主姓名</th>
                                <th>联系电话</th>
                                <th>微信</th>
                                <th>消费项目</th>
                                <th>消费时间</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
                <div class="pd-line-div">
                    <h3>第二步:编辑消息内容</h3>
                </div>
                <div class="pd-line-div data-con-div">
                    <div class="pd-lcon-div">
                        <p>设置短信内容</p>
                        <textarea name="content" class="pd-ta push-message-content null-check form-control"></textarea>
                        <p class="help-block"></p>
                    </div>
                    <div class="pd-rcon-div">
                        <div class="push-dx-div">
                            <input type="submit" value="发送短信消息" class="btn pd-button dx-button push-message-button">
                        <p class="help-block"></p>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
                <input type="hidden" name="type" value="service">
            </form>
        </div>

        <div class="pd-con-div tabnav-tab" id="charge">
            <h3>第一步:选择车主</h3>  
            <form id="query-by-charge-form">
                <div class="pd-line-div pd-inline-outer">
                    <div class="pd-inline-div" id="m-nearby">
                        <span>服务时间:&nbsp;&nbsp;</span><span>从&nbsp;</span>
                        <input type="text" name="startday" class="pd-c-input m-input form-control" id="m-service-start">
                    </div>
                    <div class="pd-inline-div m-inline-div">
                        <span>&nbsp;到&nbsp;</span>
                        <input type="text" name="endday" class="pd-c-input m-input form-control" id="m-service-finish">
                    </div>
                    <div class="pd-inline-div m-inline-div" id="m-symbol">
                        <span>符号:&nbsp;&nbsp;</span>
                        <select name="relation" class="pd-select m-select">
                            <option value="gt">大于</option>
                            <option value="lt">小于</option>
                        </select>
                    </div>
                    <div class="pd-inline-div m-inline-div" id="m-charge">
                        <span>金额:&nbsp;&nbsp;</span>
                        <input type="text" name="charge" class="pd-c-input m-input form-control">
                    </div>
                </div>
                <input type="submit" value="查询" class="btn pd-button dx-button">
            </form>
            <form class="push-message-form">
                <div class="pd-line-div">
                    <p>查询结果</p>
                    <table class="pd-table">
                        <thead>
                            <tr>
                                <th>操作</th>
                                <th>车牌号码</th>
                                <th>车主姓名</th>
                                <th>联系电话</th>
                                <th>微信</th>
                                <th>共计消费金额</th>
                                <th>上次消费时间</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
                <div class="pd-line-div">
                    <h3>第二步:编辑消息内容</h3>
                </div>
                <div class="pd-line-div data-con-div">
                    <div class="pd-lcon-div">
                        <p>设置短信内容</p>
                        <textarea name="content" class="pd-ta push-message-content null-check form-control"></textarea>	
                        <p class="help-block"></p>
                    </div>
                    <div class="pd-rcon-div">
                        <div class="push-dx-div">
                            <input type="submit" value="发送短信消息" class="btn pd-button dx-button push-message-button">
                        <p class="help-block"></p>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
                <input type="hidden" name="type" value="charge">
            </form>
        </div>
        <div class="pd-con-div tabnav-tab" id="carnum">
            <h3>第一步:选择车主</h3>
            <form id="query-by-car-num-form">
                <div class="pd-line-div">
                    <div class="pd-inline-div">
                        <span>请输入车牌号码</span>
                        <input type="text" name="carnum" class="pd-c-input form-control">
                    </div>
                    <div class="pd-inline-div">
                        <input type="submit" value="查询添加" class="btn pd-button dx-button">
                    </div>	
                </div>
            </form>
            <form class="push-message-form">
                <div class="pd-line-div">
                    <p>查询结果</p>
                    <table class="pd-table">
                        <thead>
                            <tr>
                                <th>操作</th>
                                <th>车牌号码</th>
                                <th>车辆品牌</th>
                                <th>车辆系列</th>
                                <th>车主姓名</th>
                                <th>联系电话</th>
                                <th>微信</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
                <div class="pd-line-div">
                    <h3>第二步:编辑消息内容</h3>
                </div>
                <div class="pd-line-div data-con-div">
                    <div class="pd-lcon-div">
                        <p>设置短信内容</p>
                        <textarea name="content" class="pd-ta push-message-content null-check form-control"></textarea>	
                        <p class="help-block"></p>
                    </div>
                    <div class="pd-rcon-div">
                        <div class="push-dx-div">
                            <input type="submit" value="发送短信消息" class="btn pd-button dx-button push-message-button">
                            <p class="help-block"></p>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
                <input type="hidden" name="type" value="carnum">
            </form>
        </div>
    </div>
</div>
{%require name="admin:page/pushmessage.tpl"%}
{%require name="admin:static/js/controls/pushmessage.js"%}
{%/block%}
