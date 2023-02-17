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
      noresults.html("Légyszi minimum 3 karaktert.")
      return 0;
    }

    // ezt hogy lehet szebben? XXX
    var filteredData = movies.filter(
      movie =>
      movie.isbn.toLowerCase().trim().includes(inputValue) ||
      movie.pubtitle.toLowerCase().trim().includes(inputValue) ||
      movie.pubshort.toLowerCase().trim().includes(inputValue) ||
      movie.publisher.toLowerCase().trim().includes(inputValue) ||
      movie.pubplace.toLowerCase().trim().includes(inputValue) ||
      movie.pubdate.toLowerCase().trim().includes(inputValue)
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
        "<td>" + [i+1] + "</td>" +
        "<td>" + (output[i]['isbn']) + "</td>" +
        "<td>" + (output[i]['pubtitle']) + "</td>" +
        "<td>" + (output[i]['pubshort']) + "</td>" +
        "<td>" + (output[i]['publisher']) + "</td>" +
        "<td>" + (output[i]['pubplace']) + "</td>" +
        "<td>" + (output[i]['pubdate']) + "</td>"
      )
    }
  };

  window.resizeTo(screen.width,screen.height)
});
