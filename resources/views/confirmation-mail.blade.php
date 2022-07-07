<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Vaccination confirmation mail</title>
    <meta name="author" content="Lukas Olivier">
</head>
<body>
<h1>Nieuwe bestelling van {{$booking -> name}}</h1>
<ol>
    <li>Aantal: {{$booking -> vaccine}}</li>
    <li>Vanaf: {{$booking -> from}}</li>
    <li>Tot: {{$booking -> till}}</li>
</ol>
</body>
</html>
