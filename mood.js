const START_DATE = new Date(2017, 0, 1);
const END_DATE = new Date(2017, 11, 31);
const START = START_DATE.getTime();
const END = END_DATE.getTime();
const GREEN = '#009900';
const RED = '#bb0000';
const ALERT_RED = '#770000';
const BLACK = '#000000';
const CHECKCALL_COUNT = 24;
const ALERT_THRESHOLD = 3;

google.charts.load("current", { packages: ["timeline"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    var container = document.getElementById('mood');
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();

    addColumns(dataTable);

    let rows = generateRows();
    addAlertFathers(rows);
    addEdgeValues(rows);

    dataTable.addRows(rows);
    chart.draw(dataTable);
}

function addColumns(dataTable) {
    // NOTE: style must be the third column.
    dataTable.addColumn({ type: 'string', id: 'Category' });
    dataTable.addColumn({ type: 'string', id: 'Value' });
    dataTable.addColumn({ type: 'string', id: 'style', role: 'style' });
    dataTable.addColumn({ type: 'string', id: 'tooltip', role: 'tooltip' })
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });
}

function addAlertFathers(rows) {

    function generateAlertCause(type) {

        function healthCause() {
            let bodyParts = ["Head", "Shoulder", "Knee", "Toe", "Liver", "Heart", "Stomach", "Solar plexus", "Finger", "Brain", "Family jewels"];
            let injuries = ["injured", "broken", "amputated", "operation", "failure", "disloc8ed"];

            return [bodyParts[Math.floor(Math.random() * bodyParts.length)] + " " + injuries[Math.floor(Math.random() * injuries.length)]]
        }

        let moodCauses = ["Depression", "Just sad lor", "Only got A for CS2040", "Called back for reservist", "Lost job", "Was evicted"];
        let mindCauses = ["Intoxicated", "PTSD from field camp", "Lost in life", "Playing mindsweeper", "Midlife crisis", "Became president of USA"];
        
        let actualCauses = type == "Mood" ? moodCauses : type == "Mind" ? mindCauses : type == "Health" ? healthCause() : ["Abducted"];

        return actualCauses[Math.floor(Math.random() * actualCauses.length)];
    }
    
    let consecCount = 0;
    let consecFirst = 0;
    
    for (let i = 0; i < CHECKCALL_COUNT * 3 - 1; i++) {
        if (rows[i][0] == rows[i+1][0] && rows[i][2] == rows[i+1][2] && rows[i][2] == RED) {
            consecCount++;
        }
        else {

            if (consecCount >= ALERT_THRESHOLD) {
                let cause = generateAlertCause(rows[i][0]);
                let alertRow = [rows[i][0] + " Alert", "", ALERT_RED, cause, rows[consecFirst][4], rows[i][5]];
                rows.push(alertRow);
            }

            consecCount = 1;
            consecFirst = i+1;
        }
    }

    rows.sort(rowSorter);
}

function addEdgeValues(rows) {
    rows.push(['Mood', "", BLACK, "Befriendee was registered", START_DATE, START_DATE]);
    rows.push(['Mind', "", BLACK, "Befriendee was registered", START_DATE, START_DATE]);
    rows.push(['Health', "", BLACK, "Befriendee was registered", START_DATE, START_DATE]);
    rows.push(['Mood', "", BLACK, "Current date", END_DATE, END_DATE]);
    rows.push(['Mind', "", BLACK, "Current date", END_DATE, END_DATE]);
    rows.push(['Health', "", BLACK, "Current date", END_DATE, END_DATE]);
}

function generateRows() {

    function tooltip(cat, good, date) {
        let stringDate = date => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

        if (good) return `${stringDate(date)}: ${cat == "Mood" ? "Good" : cat == "Mind" ? "Clear" : "Healthy"}`;
        else return `${stringDate(date)}: ${cat == "Mood" ? "Not good" : cat == "Mind" ? "Confused" : "Unwell"}`;
    }

    let getDate = () => new Date(START + (Math.random() * (END - START)));
    let rv = [];

    for (let i = 0; i < CHECKCALL_COUNT; i++) {

        let currentDate = getDate();

        rv.push(['Mood', Math.random(), null, null, currentDate, currentDate]);
        rv.push(['Mind', Math.random(), null, null, currentDate, currentDate]);
        rv.push(['Health', Math.random(), null, null, currentDate, currentDate]);
    }

    rv.forEach(bar => {
        if (bar[1] < 0.5) {
            bar[2] = GREEN;
            bar[3] = tooltip(bar[0], true, bar[4]);
        }
        else {
            bar[2] = RED;
            bar[3] = tooltip(bar[0], false, bar[4]);
        }

        bar[1] = "";
    });

    rv.sort(rowSorter);
    
    return rv;
}

function rowSorter(x, y) {

    return x[0] > y[0] 
            ? 1 
            : x[0] < y[0] 
                ? -1 
                : x[4].getTime() - y[4].getTime();
}
