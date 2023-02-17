d3.csv("dictbibl.csv").then(function (data) {
  // console.log(data);

  var movies = data;
  var button = d3.select("#button");
  var form = d3.select("#form");

  button.on("click", runEnter);
  form.on("submit", runEnter);

  function runEnter() {
    d3.select("tbody").html("")
    d3.selectAll("p").classed('noresults', true).html("")
    d3.event.preventDefault();

    var inputElement = d3.select("#user-input");
    var inputValue = inputElement.property("value").toLowerCase().trim();

    noresults = d3.select("p").classed('noresults', true)

    if (inputValue.length < 3){
      noresults.html("Minimum 3 karaktert adjon meg.")
      return 0;
    }

    // ezt hogy lehet szebben? XXX
    var filteredData = movies.filter(
      movie =>
      movie.id.toLowerCase().trim().includes(inputValue) ||
      movie.id2.toLowerCase().trim().includes(inputValue) ||
      movie.group.toLowerCase().trim().includes(inputValue) ||
      movie.pubauthor.toLowerCase().trim().includes(inputValue) ||
      movie.pubeditor.toLowerCase().trim().includes(inputValue) ||
      movie.pubeditor_type.toLowerCase().trim().includes(inputValue) ||
      movie.pubdate.toLowerCase().trim().includes(inputValue) ||
      movie.pubtitle.toLowerCase().trim().includes(inputValue) ||
      movie.volume.toLowerCase().trim().includes(inputValue) ||
      movie.pubshort.toLowerCase().trim().includes(inputValue) ||
      movie.staff.toLowerCase().trim().includes(inputValue) ||
      movie.publisher.toLowerCase().trim().includes(inputValue) ||
      movie.pubplace.toLowerCase().trim().includes(inputValue) ||
      movie.series.toLowerCase().trim().includes(inputValue) ||
      movie.pp.toLowerCase().trim().includes(inputValue) ||
      movie.size.toLowerCase().trim().includes(inputValue) ||
      movie.isbn.toLowerCase().trim().includes(inputValue) ||
      movie.issn.toLowerCase().trim().includes(inputValue) ||
      movie.remark.toLowerCase().trim().includes(inputValue)
    );
    length = filteredData.length

    if (length === 0){
      noresults.html("Nincs találat.")
    } else if (length > 0) {
      noresults.html(length + " találat.")
    }

    output = _.sortBy(filteredData, 'pubdate')
    //output = filteredData

    for (var i = 0; i < length; i++) {
      d3.select("tbody").insert("tr").html(
        "<td>" + (output[i]['id']) + "</td>" +
        "<td>" + (output[i]['id2']) + "</td>" +
        "<td>" + (output[i]['group']) + "</td>" +
        "<td>" + (output[i]['pubauthor']) + "</td>" +
        "<td>" + (output[i]['pubeditor']) + "</td>" +
        "<td>" + (output[i]['pubeditor_type']) + "</td>" +
        "<td>" + (output[i]['pubdate']) + "</td>" +
        "<td>" + (output[i]['pubtitle']) + "</td>" +
        "<td>" + (output[i]['volume']) + "</td>" +
        "<td>" + (output[i]['pubshort']) + "</td>" +
        "<td>" + (output[i]['staff']) + "</td>" +
        "<td>" + (output[i]['publisher']) + "</td>" +
        "<td>" + (output[i]['pubplace']) + "</td>" +
        "<td>" + (output[i]['series']) + "</td>" +
        "<td>" + (output[i]['pp']) + "</td>" +
        "<td>" + (output[i]['size']) + "</td>" +
        "<td>" + (output[i]['isbn']) + "</td>" +
        "<td>" + (output[i]['issn']) + "</td>" +
        "<td>" + (output[i]['remark']) + "</td>"
      )
    }
  };

  window.resizeTo(screen.width,screen.height)
});
