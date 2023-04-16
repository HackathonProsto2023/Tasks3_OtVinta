const json = require('../figma/test.json')

let parse = (data) => {
    let res = [];
    let obj = {};
    obj.name = data.name;
    obj.id = data.id;
    obj.type = data.type;
    obj.parent = (data.parent) ? data.parent.id : '-';
    obj.x = (data.x) ? data.x : '';
    obj.y = (data.y) ? data.y : '';
    obj.width = (data.width) ? data.width : '';
    obj.height = (data.height) ? data.height : '';
    if(['FRAME', 'GROUP'].includes(obj.type)) {
        res.push(obj);
        console.log(data)
    }
    if(data.children) {
        for(let el of data.children) {
            let d = parse(el);
            for(let dd of d) {
                res.push(dd);
            }
        }
    }
    return res;
}

let main = () => {
    let data = parse(json);
    console.log(json);
    console.log(data);
}

main();