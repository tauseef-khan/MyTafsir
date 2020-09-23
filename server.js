const express = require('express');

const app = express();

app.use(express.static('./dist/MyTafsir'));

app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'dist/MyTafsir/'}
);
});

app.listen(process.env.PORT || 8080);