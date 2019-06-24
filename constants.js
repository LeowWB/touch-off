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

const MOOD = 0;
const MIND = 1;
const HEALTH = 2;
const LEFT_WORD = 0;
const GOOD = 1;
const BAD = 2;

const MOOD_WORDS = [
    ["Mood", "Good", "Not good"],
    ["Mind", "Clear", "Confused"],
    ["Health", "Healthy", "Unwell"]
];