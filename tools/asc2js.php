<?php

/*
 * This CLI Util will convert the ASCII data of a 3D Studio V4.0 exported
 * object into a Javascript Array
 *
 * @author Tamas Kalman <ktamas77@gmail.com>
 */

$face = array();
$text = file_get_contents('torus.asc');
$vertexPattern = sprintf('/Vertex\ %1$s:\ *X:\ %1$s\ *Y:\ %1$s\ *Z:\ %1$s/', '([-0-9\.]*)');
preg_match_all($vertexPattern, $text, $vertex, PREG_SET_ORDER);
