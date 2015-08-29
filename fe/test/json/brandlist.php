<?php

$json = array(
    'status'=> 0,
    'data'=> array(
        'brandList'=>array(
            array(
                'brandId'=> 11,
                'brandName'=> '奥迪'
            ),
            array(
                'brandId'=> 12,
                'brandName'=> '宝马'
            ),
        )
    )
);

echo json_encode($json);

