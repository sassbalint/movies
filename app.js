d3.csv("dictbibl.csv").then(function (data) {

  PH = '–'

  var form = d3.select("#form")
  form.on("submit", runEnter)

  function runEnter() {
    d3.select("#table-result").html("")
    d3.select("#list-result").html("")

    d3.selectAll("p").classed('noresults', true).html("")

    d3.event.preventDefault()

    var inputElement = d3.select("#user-input")
    var inputValue = inputElement.property("value").toLowerCase().trim()

    noresults = d3.select("p").classed('noresults', true)

    if (inputValue.length < 3) {
      noresults.html("Minimum 3 karaktert adjon meg.")
      return 0
    }

    // ezt hogy lehet szebben? XXX
    var filteredData = data.filter(
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
    )
    length = filteredData.length

    if (length === 0){
      noresults.html("Nincs találat.")
    } else if (length > 0) {
      noresults.html(length + " találat.")
    }

    outputData = _.sortBy(filteredData, 'pubdate')

    format = d3.select('input[name="format"]:checked').property("value")

    if (format === "table") {
      for (var i = 0; i < length; i++) {
        r = outputData[i]
        d3.select("#table-result").insert("tr").html(`
<td>${r['id']}</td>
<td>${r['id2']}</td>
<td>${r['group']}</td>
<td>${r['pubauthor']}</td>
<td>${r['pubeditor']}</td>
<td>${r['pubeditor_type']}</td>
<td>${r['pubdate']}</td>
<td>${r['pubtitle']}</td>
<td>${r['volume']}</td>
<td>${r['pubshort']}</td>
<td>${r['staff']}</td>
<td>${r['publisher']}</td>
<td>${r['pubplace']}</td>
<td>${r['series']}</td>
<td>${r['pp']}</td>
<td>${r['size']}</td>
<td>${r['isbn']}</td>
<td>${r['issn']}</td>
<td>${r['remark']}</td>
        `)
      }
    } else { // format === "list" 
      for (var i = 0; i < length; i++) {
        r = outputData[i]

        AUTHOR = r['pubauthor'] !== PH ? `${r['pubauthor']}` : ""
        EDITOR = r['pubeditor'] !== PH ? `${r['pubeditor']} (szerk.)` : ""
        TITLE = `<strong>${r['pubtitle']}</strong>`
        VOLUME = r['volume'] !== PH ? ` ${r['volume']}` : ""
        SERIES = r['series'] !== PH ? ` (${r['series']})` : ""

        a = [r['publisher'], r['pubplace'], r['pubdate']]
        if (r['pp'] !== PH) { a.push(r['pp']) }
        if (r['size'] !== PH) { a.push(r['size']) }
        if (r['isbn'] !== PH) { a.push(`<code>${r['isbn']}</code>`) }
        if (r['issn'] !== PH) { a.push(`<code>${r['issn']}</code>`) }
        PUBL = a.length > 0 ? `${a.join(', ')}<br/>` : ""

        a = []
        if (r['id'] !== PH) { a.push(`<code>#${r['id']}</code>`) }
        if (r['pubshort'] !== PH) { a.push(`<strong>${r['pubshort']}</strong>`) }
        if (r['id2'] !== PH) { a.push(`<code>${r['id2']}</code>`) }
        if (r['group'] !== PH) { a.push(`<span style="font-size: 66%">${r['group']}</span>`) }
        IDS = a.length > 0 ? `${a.join(' • ')}<br/>` : ""

        STAFF = r['staff'] !== PH ? `<em>közreműködők:</em> ${r['staff']}<br/>` : ""
        REMARK = r['remark'] !== PH ? `<em>megjegyzés:</em> ${r['remark']}<br/>` : ""

        d3.select("#list-result")
          .insert("li")
          .attr("style", "margin-top: 1.5em")
          .html(`
<span>
${AUTHOR}${EDITOR}:
<br/>
${TITLE}${VOLUME}${SERIES}
<br/>
${PUBL}
${STAFF}
${REMARK}
${IDS}
</span>
          `)
      }
    }
  }

  window.resizeTo(screen.width,screen.height)
})
