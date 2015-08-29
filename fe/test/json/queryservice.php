<?php
$json = array(
    'status'=> 0,
    'data'=> array(
        'total'=> 2,
        'serviceList'=> array(
            array(
                'superName'=> "保养",
                'typeName'=> '小保养',
                'serviceId'=> '100000201',
                'name'=>"更换机油滤格",
                'charge'=> '380',
                'unit'=>'次',
                'costPrice'=> '150',
                'referencePrice'=> '380',
                'guaranteePeriod'=>'60',
                'pilgrimageTime'=>"3"
            ),
            array(
                'superName'=> "保养",
                'typeName'=> '小保养',
                'serviceId'=> '100000201',
                'name'=>"更换机油滤格",
                'charge'=> '380',
                'unit'=>'次',
                'costPrice'=> '150',
                'referencePrice'=> '380',
                'guaranteePeriod'=>'60',
                'pilgrimageTime'=>"3"
            ),
            array(
                'superName'=> "保养",
                'typeName'=> '小保养',
                'serviceId'=> '100000201',
                'name'=>"更换机油滤格",
                'charge'=> '380',
                'unit'=>'次',
                'costPrice'=> '150',
                'referencePrice'=> '380',
                'guaranteePeriod'=>'60',
                'pilgrimageTime'=>"3"
            ),
				
        )
    )
);

echo json_encode($json);

