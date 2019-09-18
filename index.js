const Constant = require('./state');
const fs = require('fs');
const R_actual   = JSON.parse(fs.readFileSync('./actual.json').toString('utf8'));
const R_expected = JSON.parse(fs.readFileSync('./expected.json').toString('utf8'));

const DYNAMIC_TAG    = '{}';
const IGNORED_VALUES = [
    0,
    null,
    'IsNotNullOrUndefined',
    '',
];

class ValidatorEntity {
    __isEmptyGTM(gtm) {
        for(const key in gtm) {
            if(gtm.hasOwnProperty(key))
            return false;
        }
        
        return true;
    }

    
    __findDuplicate(gtm, dataLayer) {
        let total       = 0;
        const gtmString = JSON.stringify(gtm);
        for(const i in dataLayer) {
            const data = JSON.stringify(dataLayer[i]);
            if (gtmString === data) {
                total++;
            }
        }
        
        return total;
    }


    __compareString(actual, expected) {
        if (!expected) {
            return false
        }

        const value = expected.split('{}');
        if (value.length > 1) {
            let regex = '';
            const flagPositoin = value.indexOf('');
            switch(flagPositoin) {
                case 0 :
                    regex = new RegExp(`${value[1]}$`,'g')
                    break;
                case 1:
                    regex = new RegExp(`^${value[0]}`,'g')
                    break;
                default:
                    regex = new RegExp(`${value[0]}.+${value[1]}`,'g')
            }
            
            return actual.match(regex) && actual.match(regex).length > 0;
        }

        return actual === expected;
    }


    __compareGTM(actual, expected, keyPrefix = null) {
        keyPrefix = keyPrefix ? keyPrefix +'.': '';
        let result = [];
        for(const key in expected) {
            const fieldName   = keyPrefix + key;
            const ignoreValue = IGNORED_VALUES.includes(expected[key]);
            const keyFound    = actual.hasOwnProperty(key);

            if(!keyFound) {
                result.push({
                    key   : fieldName,
                    expect: expected[key],
                    actual: actual[key],
                    status: Constant.TRACKER_STATUS.NOT_FOUND,
                });
                continue;
            }

            if(ignoreValue) {
                result.push({
                    key   : fieldName,
                    expect: expected[key],
                    actual: actual[key],
                    status: Constant.TRACKER_STATUS.MATCH,
                });
                continue;
            }

            let status  = Constant.TRACKER_STATUS.MATCH;
            switch(expected[key].constructor.name) {
                case 'String':
                    if(!this.__compareString(actual[key], expected[key])) {
                        status  = Constant.TRACKER_STATUS.NOT_MATCH;
                    }

                    result.push({
                        key    : fieldName,
                        expect: expected[key],
                        actual: actual[key] || null,
                        status : status,
                    });
                    break;

                case 'Number':
                    if(expected[key] !== actual[key]) {
                        status  = Constant.TRACKER_STATUS.NOT_MATCH;
                    }

                    result.push({
                        key    : fieldName,
                        expect: expected[key],
                        actual: actual[key] || null,
                        status : status,
                    });
                    break;

                case 'Array':
                    if(expected[key].length < 1 || actual[key].length < 1) {
                        result.push({
                            key   : fieldName,
                            expect: expected[key],
                            actual: actual[key],
                            status: Constant.TRACKER_STATUS.MATCH,
                        });
                    }

                    result = result.concat(this.__compareGTM(actual[key], expected[key], fieldName));
                    break;

                case 'Object':
                    result = result.concat(this.__compareGTM(actual[key], expected[key], fieldName));
                    break;

                default: 
                    result.push({
                        key    : fieldName,
                        expect: expected[key],
                        actual: actual[key],
                        status : Constant.TRACKER_STATUS.UNKNOWN,
                    });
            }
        }
        
        return result;
    }


    __haveMatchPattern(actual, expected) {
        for (const i in expected) {

            if (!IGNORED_VALUES.includes(expected[i])
                && !actual.hasOwnProperty(i)
            ) {
                return false;
            }
        }

        return true;
    }

    __getMatchEvent(actual, expected) {
        let result = [];
        if (this.__isEmptyGTM(expected)) {
            return result;
        }

        for(const key in actual){
            const data = actual[key];
            if (this.__haveMatchPattern(data, expected)) {
                result.push(data);
            }
            // if(data 
            //     && data.event !== undefined && this.__compareString(data.event, expected.event)
            //     && data.eventCategory !== undefined && this.__compareString(data.eventCategory, expected.eventCategory)
            //     && data.eventAction !== undefined && this.__compareString(data.eventAction, expected.eventAction)
            // ) {
            //     result.push(data);
            // }
        }
        
        return result;
    }


    validate(actual, expected) {
        let result = [];
        let total  = {
            match    : 0,
            notMatch : 0,
            notFound : 0,
            duplicate: 0,
            trackers : 0,
        };

        for(const key in expected) {
            total.trackers++;

            const data      = this.__getMatchEvent(actual, expected[key]);
            const found     = data.length > 0;
            const duplicate = data.length > 1;
            if(!found) {
                result.push({
                    tracker  : key,
                    duplicate: duplicate,
                    found    : found,
                    match    : false,
                    details  : [],
                    total    : {
                        match   : 0,
                        notMatch: 0,
                        notFound: 0,
                    },
    
                });
                total.notFound++;
                continue;
            }

            if (duplicate) {
                total.duplicate++;
            }
            
            const details    = this.__compareGTM(data.shift(), expected[key]);
            let match        = true;
            let fieldsStatus = [];
            fieldsStatus[Constant.TRACKER_STATUS.MATCH]     = 0;
            fieldsStatus[Constant.TRACKER_STATUS.NOT_MATCH] = 0;
            fieldsStatus[Constant.TRACKER_STATUS.NOT_FOUND] = 0;

            details.forEach(e => {
                match = match && (e.status === Constant.TRACKER_STATUS.MATCH);
                fieldsStatus[e.status]++;
            });

            if (match) {
                total.match++;
            } else {
                total.notMatch++;
            }

            result.push({
                tracker  : key,
                duplicate: duplicate,
                found    : found,
                match    : match,
                total    : {
                    match   : fieldsStatus[Constant.TRACKER_STATUS.MATCH],
                    notMatch: fieldsStatus[Constant.TRACKER_STATUS.NOT_MATCH],
                    notFound: fieldsStatus[Constant.TRACKER_STATUS.NOT_FOUND],
                },
                details  : details,
            });
        }

        return {
            summary: total,
            details: result,
        };
    }
}

const validator = new ValidatorEntity();
const result = validator.validate(R_actual, R_expected);

console.log(JSON.stringify(result, null, 2));