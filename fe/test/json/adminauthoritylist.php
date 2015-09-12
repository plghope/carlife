<?php
$json = array(
  'status'=>0,
  'data'=> array(
        'adminList'=>array(
            array(
                'username'=>'sdds',
                'date'=>'yyyy-mm-dd',  //开户日期
                'authorities'=> array(   // 拥有的权限列表
                    array(
                        'permissionId'=>'1001',
                        'name'=> '添加客户',
                        'detail'=> '可以向系统添加客户资料'
                    ),

                    array(
                        'permissionId'=>'1002',
                        'name'=> '查询客户',
                        'detail'=> '可以向系统添加客户资料'
                    ),

                    array(
                        'permissionId'=>'1003',
                        'name'=> '修改客户',
                        'detail'=> '可以向系统添加客户资料'
                    ),
                    array(
                        'permissionId'=>'3002',
                        'name'=> '项目管理',
                        'detail'=> '可以向系统添加客户资料'
                    ),

                    array(
                        'permissionId'=>'3003',
                        'name'=> '消息推送',
                        'detail'=> '可以向系统添加客户资料'
                    ),
                )
            ),
            array(
                'username'=>'sdda',
                'date'=>'yyyy-mm-dd',  //开户日期
                'authorities'=> array(   // 拥有的权限列表
                    array(
                        'permissionId'=>'2001',
                        'name'=> '添加服务单',
                        'detail'=> '可以向系统添加客户资料'
                    ),

                    array(
                        'permissionId'=>'2002',
                        'name'=> '查询服务单',
                        'detail'=> '可以向系统添加客户资料'
                    ),

                    array(
                        'permissionId'=>'2003',
                        'name'=> '修改服务单',
                        'detail'=> '可以向系统添加客户资料'
                    ),
                )
            ),
    )
    )
);

echo json_encode($json);

