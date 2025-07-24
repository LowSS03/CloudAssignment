<?php
require 'vendor/autoload.php'; // after installing via Composer

use Aws\Ssm\SsmClient;

$region = 'us-east-1';

$ssm_client = new SsmClient([
    'version' => 'latest',
    'region'  => $region
]);

try {
    $result = $ssm_client->getParametersByPath([
        'Path' => '/example/',
        'WithDecryption' => true
    ]);

    foreach ($result['Parameters'] as $p) {
        $values[$p['Name']] = $p['Value'];
    }

    $ep = $values['/example/endpoint'];
    $un = $values['/example/username'];
    $pw = $values['/example/password'];
    $db = $values['/example/database'];
} catch (Exception $e) {
    $ep = $un = $pw = $db = '';
    error_log('SSM retrieval failed: ' . $e->getMessage());
}
?>
