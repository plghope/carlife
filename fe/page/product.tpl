<!DOCTYPE html>
{%html framework="admin:static/js/esl.js" class="expanded"%}
    {%head%}
        <meta charset="utf-8"/>
        <title>云云车-产品介绍</title>
        {%require name="admin:static/css/lib/base.less"%}
    {%/head%}
    {%body%}
        <div class="main">
            <div class="login-header mala-header-fix mala-header">
                <a class="mala-logo mala-fl login-logo" href="/login"></a>
                <div class="login-fr">
                    <span><a href="/product">产品介绍</a></span>
                    <span><a href="/contact">联系我们</a></span>
                </div>
                <div class="clear"></div>
            </div>
            <div class="main tabnav-tab">
                <div class="middle-content static-width">
                    <div class="content-path">
                        <span>	当前位置: 首页 | 产品介绍</span>
                    </div>
                    <div class="content">
                        <div class="product-div">
                            <h3>产品介绍</h3>
                            <p>云云车是一个面向汽车后市场的企业服务平台，立足大数据分析，提供企业所需的整体解决方案，旨在帮助企业提高内部工作效率，增加企业营收。</p>
                        </div>
                        <h3>产品优势</h3>
                        <div class="product-div">
                            <p class="product-ttl">智能分析的客户关系管理</p>
                            <p>立足大数据分析技术，帮助企业做好客户关系管理。云云车提供了高价值客户、流失风险客户自动分析，客户违章、保险、年审、保养信息全面跟踪，汽修项目个性化推荐等服务，力争做到做到比客户还了解他们的爱车，比企业还了解他们的客户。</p>
                        </div>
                        <div class="product-div">
                            <p class="product-ttl">安全方便的云服务平台</p>
                            <p>云云车一套企业级的云端解决方案，客户管理管理、库存管理、订单管理、员工管理等多个功能，只需要一个账号即可完成！省去了企业主自己购买服务器、系统运维关系等一系列复杂繁琐的功能</p>
                        </div>
                        <div class="product-div">
                            <p class="product-ttl">多端同步操作</p>
                            <p>云云车提供了PC端、手机端、微信等多个平台接口，方便用户能在不同环境、多种手段接入使用。</p>
                        </div>
                    </div>

                </div>
			</div>

            <div class="footer">
            </div>
        </div>
        {%require name="admin:page/product.tpl"%}
        
    {%/body%}
{%/html%}
