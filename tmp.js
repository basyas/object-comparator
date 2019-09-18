const x = [
    {expect: 'top nav {}', actual: 'top nav - \/', },
    {expect: '{} top nav', actual: '\/ top nav',   },
    {expect: 'top {} nav', actual: 'top \/ nav',   },
    {expect: '{}',         actual: 'top nav',      },
    {expect: '{}',         actual: '',             },
    {expect: 'top nav',    actual: 'top nav',      },
];

let a =[];

for (const i in x ) {
    const e = x[i].expect;
    const a = x[i].actual;
    let z = e.split('{}');

    if (z.length > 1) {
        const d = z.indexOf('');
        switch(d) {
            case 0 :
                z.push(new RegExp(`${z[1]}$`,'g'))
                break;
            case 1:
                z.push(new RegExp(`^${z[0]}`,'g'))
                break;
            default:
                z.push(new RegExp(`${z[0]}.+${z[1]}`,'g'));
        }
        
        const m = a.match(z[z.length -1]).length > 0;
        console.log('e ---', e, '---');
        console.log('a ---', a, '---');
        console.log('m ---', a, m);
    }
    console.log('---------------------------------------------------------------');
}

