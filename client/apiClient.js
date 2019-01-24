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
    addCellToRow(row, 0, record.city);
    addCellToRow(row, 1, record.temperature);
    addCellToRow(row, 2, record.humidity);
    addCellToRow(row, 3, record.measure_date);
}

function removeChildNodes(node) {
    let fc = node.firstChild;

    while(fc) {
        node.removeChild(fc);
        fc = node.firstChild;
    }
}

function showHistory() {
    const recordsField = document.getElementById("records");
    const recordsTableField = document.createElement('table');

    removeChildNodes(recordsField);
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

    console.log("ready");

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
