<?php

/**
 * Header:
 *    X-HME-Authorization: serial=hmems0***, key=XXXXXXXXXXX
 *
 * Content:
 *    action=SendEmail
 *    &key=XXXXXXXXXXX
 *    &from=kyle@trunk-studio.com
 *    &to=smlsun@trunk-studio.com,other@trunk-studio
 *    &subject=This is the subject line.
 *    &body=Hello. I hope you are having a good day.
 */

$action = $_REQUEST['action'];
$key = $_REQUEST['key'];

if ($key != 'd3d84e39646bfe257e1334b7d99cb2ce') {
//  die('error access key.');
}


$to = $_REQUEST['to'];
$from = $_REQUEST['from'];
$subject = "[HME] " . $_REQUEST['subject'];
$body = $_REQUEST['body'];

// message
$message = "
<html>
<head>
  <title>{$subject}</title>
</head>
<body>
{$body}

<p><br/><br/>This message was sent from HME Cloud Services.</p>
</body>
</html>
";

// To send HTML mail, the Content-type header must be set
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

$headers .= 'From: ' . $from . "\r\n";

// Additional headers
/* $headers .= 'To: Mary <mary@example.com>, Kelly <kelly@example.com>' . "\r\n";
$headers .= 'Cc: birthdayarchive@example.com' . "\r\n";
$headers .= 'Bcc: birthdaycheck@example.com' . "\r\n"; */

// Mail it
$result = mail($to, $subject, $message, $headers);

//print_r($_REQUEST);

if ($result) {
  echo 'Error = 0; message was sent successfully. ' . time();
}
else {
  echo 'Error = 1; error occurred during sending message. ' . time();
}
