<?php
$json= array(
    'status'=> 0,
    'data'=>array(
        array(
            'userId' => '123231',
            'name'=> 'xiao san ',
            'phoneNum'=> '121221123',
            'wechatNum'=> 'sfadfd',
            'carLicenseNum'=> 'b2321',
            'serviceName'=> '打蜡',
            'createTime'=> '2015-09-01'
        ),
        array(
            'userId' => '123231',
            'name'=> 'xiao san ',
            'phoneNum'=> '121221123',
            'wechatNum'=> 'sfadfd',
            'carLicenseNum'=> 'b2321',
            'serviceName'=> '打蜡',
            'createTime'=> '2015-09-01'
        ),
    )
);

echo json_encode($json);

