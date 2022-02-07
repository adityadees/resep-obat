<!DOCTYPE html>
<html>
<head>
    <title>Resep</title>
    <style type="text/css">
        .build-table {
            border: solid 1px #DDEEEE;
            border-collapse: collapse;
            border-spacing: 0;
            font: normal 11px Arial, sans-serif;
        }
        .build-table thead th {
            background-color: #DDEFEF;
            border: solid 1px #DDEEEE;
            color: #336B6B;
            padding: 2px;
            text-align: left;
            text-shadow: 1px 1px 1px #fff;
        }
        .build-table tbody td {
            border: solid 1px #DDEEEE;
            color: #333;
            padding: 2px;
            text-shadow: 1px 1px 1px #fff;
        }
    </style>
</head>
<body>

    <table class="build-table">
        <thead>
            <tr>
                <th class="text-center">NO</th>
                <th class="text-center">JENIS</th>
                <th class="text-center">NAMA OBAT/RACIKAN</th>
                <th class="text-center">QTY</th>
                <th class="text-center">SIGNA</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach($resArray as $v => $i) :?>
                <tr>
                    <td class="text-center"><?= ($v+1) ?></td>
                    <td class="text-center"><?= $i['jenis'] ?></td>
                    <td>
                        <ul style="list-style: none;">
                            <li>
                                <?= $i['resep']['resep_nama'] ?>
                                <ul>
                                    <?php foreach($i['detail'] as $x => $j) :?>
                                        <li><?= $j['obatalkes_nama']."<br>" ?></li>
                                    <?php endforeach;?>
                                </ul>
                            </li>
                        </ul>
                    </td>
                    <td>
                        <ul>
                            <li style="list-style: none;">
                                <ul>
                                    <?php foreach($i['detail'] as $x => $j) :?>
                                        <li><?= $j['resep_qty']."<br>" ?></li>
                                    <?php endforeach;?>
                                </ul>
                            </li>
                        </ul>
                    </td>
                    <td class="text-center">
                        <?= $i['resep']['signa_nama'] ?>
                    </td>
                </tr>
            <?php endforeach;?>
        </tbody>
    </table>
</body>
</html>