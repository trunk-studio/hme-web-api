
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Test Email API</title>

    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">

  </head>

  <body>

    <!-- Begin page content -->
    <div class="container">
      <div class="page-header">
        <h1>HME Cloud API for Email Service</h1>
      </div>

      <p>API URL Endpoint:</p>
      <pre>http://www.aquariumlightings.com/cloud/api</pre>

      <hr class="soften" />

      <form action="http://www.aquariumlightings.com/cloud/api" method="get">

        <p><strong>action=</strong><br/>SendEmail</p>
        <input type="hidden" name="action" value="SendEmail" />

        <p><strong>key=</strong><br/>d3d84e39646bfe257e1334b7d99cb2ce</p>
        <input type="hidden" name="key" value="d3d84e39646bfe257e1334b7d99cb2ce" />

        <div class="form-group">
          <label for="from">from=</label>
          <input type="email" class="form-control" id="from" name="from" placeholder="From Email">
        </div>
        <div class="form-group">
          <label for="to">to=</label>
          <input type="email" class="form-control" id="to" name="to" placeholder="To Email">
        </div>
        <div class="form-group">
          <label for="subject">subject=</label>
          <input type="text" class="form-control" id="subject" name="subject" placeholder="Subject">
        </div>
        <div class="form-group">
          <label for="body">body=</label>
          <textarea class="form-control" id="body" name="body" placeholder="Body Text"></textarea>
        </div>

        <button type="submit" class="btn btn-default">Submit</button>
      </form>

    </div>

    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
  </body>
</html>
