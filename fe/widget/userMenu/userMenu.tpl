<div class="s_user-top">
    <span class="store_name">{%$data['storename']%}</span>
    <span class="s_user-menu">{%$data["username"]%}<i class="fa fa-caret-down"></i></span>
    <ul id="s_user-menu-popup">
        <li>
            <a id="s_logout" href="/api/logout/storeId/{%$data['storeId']%}">退出</a>
        <li>

        <i class="fa fa-caret-up"></i>
    </ul>
    <div id="s_user-menu-mask"></div>
</div>

