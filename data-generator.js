let data = {};
let checkcalls = [];
let alerts = [];

data["bfe"] = getName();
data["checkcalls"] = getCheckcalls();
data["alerts"] = getAlerts();

function getCheckcalls() {
    if (checkcalls.length == 0) {
        for (let i = 0; i < CHECKCALL_COUNT; i++) {
            checkcalls.push({
                date: randomDate(),
                mood: Math.random() < 0.5,
                mind: Math.random() < 0.5,
                health: Math.random() < 0.5
            });
        }

        checkcalls.sort((x,y) => x.date.getTime() - y.date.getTime());
    }

    return checkcalls;
}


function getAlerts() {

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

    function checkForAlertType(type) {

        if (checkcalls[i][type] == checkcalls[i+1][type] && !checkcalls[i][type]) {
            consecCount++;
        }
        else {

            type = type.charAt(0).toUpperCase() + type.slice(1);

            if (consecCount >= ALERT_THRESHOLD) {
                let cause = generateAlertCause(type);
                let alertRow = {
                    type: type,
                    cause: cause,
                    startDate: checkcalls[consecFirst]["date"],
                    endDate: checkcalls[i]["date"]
                };
                alerts.push(alertRow);
            }

            consecCount = 1;
            consecFirst = i+1;
        }
    }
    
    let consecCount = 0;
    let consecFirst = 0;
    
    for (let i = 0; i < CHECKCALL_COUNT - 1; i++) {
    }

    return alerts;
}

function randomDate() {
    return new Date(START + (Math.random() * (END - START)));
}