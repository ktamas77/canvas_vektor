<?php

/*
 * This CLI Util will convert the ASCII data of a 3D Studio V4.0 exported
 * object into a Javascript Array
 *
 * @author Tamas Kalman <ktamas77@gmail.com>
 */

$text = file_get_contents('torus.asc');
$vertexPattern = sprintf('/Vertex\ %1$s:\ *X:\ %1$s\ *Y:\ %1$s\ *Z:\ %1$s/', '([-0-9\.]*)');
$facePattern = sprintf('/Face %1$s:\ *A:%1$s\ B:%1$s\ C:%1$s\ AB:%2$s BC:%2$s CA:%2$s/', '([0-9]*)', '([01]+)');
preg_match_all($vertexPattern, $text, $vertex, PREG_SET_ORDER);
preg_match_all($facePattern, $text, $face, PREG_SET_ORDER);
foreach ($vertex as &$v) {
    unset($v[0]);
}
foreach ($face as &$f) {
    unset($f[0]);
}
printf("var vertex = %s;\n", json_encode($vertex));
printf("var face = %s;\n", json_encode($face));