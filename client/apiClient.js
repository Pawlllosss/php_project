const API_ADDRESS = "http://localhost/api/operations/";
function getRecordsFromServer() {

    return fetch(API_ADDRESS +"read_weather.php")
        .then(response => response.json())
        .then(json => {

            return json["records"]
        })

}
function addCellToRow(row, index, text) {
    var cell = row.insertCell(index);
    cell.innerHTML = text;

}
function insertValuesToRow(row, record) {
    addCellToRow(row, 0, record.id);
    addCellToRow(row, 1, record.measure_date);
    addCellToRow(row, 2, record.city);
    addCellToRow(row, 3, record.temperature);
    addCellToRow(row, 4, record.humidity);

}
function removeChildNodes(node) {

    let fc = node.firstChild;
    while(fc) {
        node.removeChild(fc);
        fc = node.firstChild;
    }

}

function appendLegend(recordsTableField) {
    var header = recordsTableField.createTHead();
    var row = header.insertRow(0);
    row.insertCell(0)
    addCellToRow(row, 0, "Id");
    addCellToRow(row, 1, "Data");
    addCellToRow(row, 2, "Miasto");
    addCellToRow(row, 3, "Temperatura");
    addCellToRow(row, 4, "Wilgotność");

}

function showHistory() {
    const recordsField = document.getElementById("records");

    const recordsTableField = document.createElement('table');
    recordsTableField.className = "table";

    removeChildNodes(recordsField);
    appendLegend(recordsTableField);

    recordsField.appendChild(recordsTableField);
    getRecordsFromServer().then((records) => {
        for (let i = 0; i < records.length; i++) {
            console.log(records[i]);
            const row = recordsTableField.insertRow(i);

            insertValuesToRow(row, records[i]);
        }
    });

}

$(document).ready(function() {
    pseudoAuthorization();

    $('#weather-send-form').submit(function(event) {

        event.preventDefault();

        const formData = {
            "city": $('input[name=city]').val(),
            "temperature": parseFloat($('input[name=temperature]').val()),
            "humidity": parseFloat($('input[name=humidity]').val())
        };

        console.log(JSON.stringify(formData));

        $.ajax({
            type        : 'POST',
            url         : API_ADDRESS + 'create_weather.php',
            data        : JSON.stringify(formData),
            dataType    : 'json',
            encode       : true
        });

    });

});

function pseudoAuthorization(){

    var jwt = getCookie('jwt');
    $.post(API_ADDRESS + "validate_token.php", JSON.stringify({ jwt:jwt })).done(function(result) {
    }).fail(function(result) {
        window.location.href = "index.html";
    })
}

function getCookie(cname){
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' '){
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
