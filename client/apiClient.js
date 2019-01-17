const API_ADDRESS = "http://localhost/api/operations/";

function getRecordsFromServer() {
    return fetch(API_ADDRESS+"read.php")
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

function showHistory() {
    const recordsField = document.getElementById("records");
    const recordsTableField = document.createElement('table');
    recordsField.appendChild(recordsTableField);

    getRecordsFromServer().then((records) => {
        for (let i = 0; i < records.length; i++) {
            console.log(records[i]);
            const row = recordsTableField.insertRow(i);
            insertValuesToRow(row, records[i]);

            // recordsField.innerHTML += '<div "><h3 class="h5">' + "#" + records[i].date + " " + records[i].temperature + " " + records[i].pressure + '</div>';
        }
    });


}