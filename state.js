const State = {
    scheduleStatus: {
        "deleted":      -99,
        "disabled":     -1,
        "scheduled":    0,
        "queue":        1,
        "running":      2, 
    },

    invertScheduleStatus: {
        "-99": "deleted",
        "-1": "disabled",
        "0": "scheduled",
        "1": "queue",
        "2": "running",
    },

    scheduleRepeatedType: {
        "costum":   0,
        "once":     1,
        "hourly":   2,
        "daily":    3,
        "weekly":   4,
    },

    invertScheduleRepeatedType: {
        0: "costum",
        1: "once",
        2: "hourly",
        3: "daily",
        4: "weekly",
    },

    scheduleIntervalValue: {
        "costum":   0,
        "once":     0,
        "hourly":   60,
        "daily":    1440,
        "weekly":   10080,
    },

    deviceType: {
        "all":      0,
        "website":  1,
        "android":  2,
        "ios":      3,
    },

    platform: {
        1 : "Website",
        2 : "Android",
        3 : "iOS"

    },

    journeyStatus: {
        "deleted":  0,
        "active":   1,
    },

    journeyTrackerStatus: {
        "undefined": 0,
        "notFound": 1,
        "notMatch": 2,
        "match": 3,
    },

    SIMULATOR_ACTION: {
        CLICK : 'tap',
        KEYS  : 'keys',
        SCROLL: 'scroll',
        ENTER : 'enter',
    },

    TRACKER_STATUS: {
        UNKNOWN  : -99,
        MATCH    : 'MATCH',//0,
        NOT_MATCH: 'NOT_MATCH',//1,
        NOT_FOUND: 'NOT_FOUND',//2,
        DUPLICATE: 'DUPLICATE',//3,
    },

    TRACKER_LABEL: {
        0       : "MATCH",      
        1       : "NOT MATCH",
        2       : "NOT FOUND",
        3       : "DUPLICATE",
    }
    
};

module.exports = State;