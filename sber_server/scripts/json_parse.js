const json = require('../figma/test.json')

const space = 20;

exports.parse = (sizes) => {
    let size = [+sizes[0], +sizes[1]]

    let json_data = parsing(json);

    // json_data = json_data.slice(1);

    let result = [];
    let all_size = [0, 0]
    let sub_result = [];
    let i = 0;

    for (let el of json_data) {

        let k = el.width/el.height;

        if(el.width > size[0]) {
            el.width = size[0] - space;
            el.height = Math.ceil(size[0]/k)
        } 

        if(el.height > size[1]) {
            el.height = size[1] - space;
            el.width = Math.ceil(size[1]*k);
        }

        if (el.name.split('_').length > 1) {
            if (sub_result.length > 0) {
                result.push(sub_result);
                all_size = [0, 0];
                sub_result = [];
            }
            el.x = all_size[0] + space;
            el.y = space * i + i * el.height;
            result.push([el]);
            i++;
        }
        else {
            if (all_size[0] + el.width + space <= size[0] && all_size[1] + el.height + space <= size[1]) {
                el.x = all_size[0] + space;
                el.y = space * i + i * el.height;
                sub_result.push(el);
                all_size = [all_size[0] + space + el.width, all_size[1] + space + el.height]
            }
            else {
                if(sub_result.length > 0) result.push(sub_result);
                i++;
                el.x = space;
                el.y = space * i + i * el.height;
                sub_result = [el];
                all_size = [el.width + space, el.height + space];
            }
        }
    }
    if (sub_result.length > 0) result.push(sub_result);
    return result;
}

const parsing = (data) => {
    let result = [];
    let unit = {};
    unit.name = data.name;
    unit.id = data.id;
    unit.type = data.type;
    unit.parent = (data.parent) ? data.parent.id : '-';
    unit.x = (data.x) ? data.x : '';
    unit.y = (data.y) ? data.y : '';
    unit.width = (data.width) ? data.width : '';
    unit.height = (data.height) ? data.height : '';
    if (['GROUP'].includes(unit.type)) {
        result.push(unit);
    }
    if (data.children) {
        for (let child of data.children) {
            let parse_res = parsing(child);
            for (let p_res of parse_res) {
                result.push(p_res);
            }
        }
    }
    return result;
}