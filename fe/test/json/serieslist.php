<?php

$json = array(
    'status'=> 0,
    'data'=> array(
        'seriesList'=>array(
            array(
                'seriesId'=> 11,
                'seriesName'=> '奥迪'
            ),
            array(
                'seriesId'=> 12,
                'seriesName'=> '宝马'
            ),
        )
    )
);

echo json_encode($json);

