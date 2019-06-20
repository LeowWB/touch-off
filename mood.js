const START_DATE = new Date(2017, 0, 1);
const END_DATE = new Date(2017, 11, 31);
const START = START_DATE.getTime();
const END = END_DATE.getTime();
const GREEN = '#009900';
const RED = '#990000';
const BLACK = '#000000';
const DATA_ROWS = 24;

google.charts.load("current", { packages: ["timeline"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    var container = document.getElementById('mood');
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();

    // NOTE: style must be the third column.
    dataTable.addColumn({ type: 'string', id: 'Category' });
    dataTable.addColumn({ type: 'string', id: 'Value' });
    dataTable.addColumn({ type: 'string', id: 'style', role: 'style' });
    dataTable.addColumn({ type: 'string', id: 'tooltip', role: 'tooltip' })
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });

    let rows = generateRows();

    rows.push(['Mood', "", BLACK, "Befriendee was registered", START_DATE, START_DATE]);
    rows.push(['Mind', "", BLACK, "Befriendee was registered", START_DATE, START_DATE]);
    rows.push(['Health', "", BLACK, "Befriendee was registered", START_DATE, START_DATE]);
    rows.push(['Mind', "", BLACK, "Current date", END_DATE, END_DATE]);
    rows.push(['Mood', "", BLACK, "Current date", END_DATE, END_DATE]);
    rows.push(['Health', "", BLACK, "Current date", END_DATE, END_DATE]);

    dataTable.addRows(rows);
    chart.draw(dataTable);
}

function generateRows() {

    function label(cat, good) {
        return "";
    }

    function tooltip(cat, good, date) {
        let stringDate = date => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

        if (good) return `${stringDate(date)}: ${cat == "Mood" ? "Good" : cat == "Mind" ? "Clear" : "Healthy"}`;
        else return `${stringDate(date)}: ${cat == "Mood" ? "Not good" : cat == "Mind" ? "Confused" : "Unwell"}`;
    }

    let getDate = () => new Date(START + (Math.random() * (END - START)));
    let rv = [];

    for (let i = 0; i < DATA_ROWS; i++) {

        let currentDate = getDate();

        rv.push(['Mood', Math.random(), null, null, currentDate, currentDate]);
        rv.push(['Mind', Math.random(), null, null, currentDate, currentDate]);
        rv.push(['Health', Math.random(), null, null, currentDate, currentDate]);
    }

    rv.forEach(bar => {
        if (bar[1] < 0.5) {
            bar[2] = GREEN;
            bar[1] = label(bar[0], true);
            bar[3] = tooltip(bar[0], true, bar[4]);
        }
        else {
            bar[2] = RED;
            bar[1] = label(bar[0], false);
            bar[3] = tooltip(bar[0], false, bar[4]);
        }
    });

    return rv;
}