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
                        'permissioinId'=>11,
                        'name'=> '添加用户',  // 权限名称
                        'detail'=> 'xxx',  //  权限说明
                    ), 
                    array(
                        'permissioinId'=>11,
                        'name'=> '添加用户',  // 权限名称
                        'detail'=> 'xxx',  //  权限说明
                    ), 
                )
            ),
            array(
                'username'=>'sdds',
                'date'=>'yyyy-mm-dd',  //开户日期
                'authorities'=> array(   // 拥有的权限列表
                    array(
                        'permissioinId'=>11,
                        'name'=> '添加用户',  // 权限名称
                        'detail'=> 'xxx',  //  权限说明
                    ), 
                    array(
                        'permissioinId'=>11,
                        'name'=> '添加用户',  // 权限名称
                        'detail'=> 'xxx',  //  权限说明
                    ), 
                )
            ),
    )
    )
);

echo json_encode($json);

