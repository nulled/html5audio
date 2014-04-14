/**
     * Loading the tags using XHR.
     */
//sample.mp3 sits on your domain
ID3.loadTags("dancin.mp3", function() {
  showTags("dancin.mp3");
}, {
  tags: ["title","artist","album","picture"]
});

/**
 * Loading the tags using the FileAPI.
 */
function loadFile(input) {
  var file = input.files[0],
    url = file.urn || file.name;

  ID3.loadTags(url, function() {
    showTags(url);
  }, {
    tags: ["title","artist","album","picture"],
    dataReader: FileAPIReader(file)
  });
}

/**
 * Generic function to get the tags after they have been loaded.
 */
function showTags(url) {
  var tags = ID3.getAllTags(url);
  console.log(tags);
  document.getElementById('title').textContent = tags.title || "";
  document.getElementById('artist').textContent = tags.artist || "";
  document.getElementById('album').textContent = tags.album || "";
  var image = tags.picture;
  if (image) {
    var base64String = "";
    for (var i = 0; i < image.data.length; i++) {
        base64String += String.fromCharCode(image.data[i]);
    }
    var base64 = "data:" + image.format + ";base64," +
            window.btoa(base64String);
    document.getElementById('picture').setAttribute('src',base64);
  } else {
    document.getElementById('picture').style.display = "none";
  }
}