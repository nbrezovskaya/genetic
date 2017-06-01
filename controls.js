define([
    "levels"
], function (Levels) {
    var singleton = function () {
        return {
            init: function (onSelectChange) {
                var select = document.getElementById('levelselect');
                for (var name in Levels.list) {
                    if (!Levels.list.hasOwnProperty(name)) {
                        continue;
                    }
                    var option = document.createElement('option');
                    option.value = name;
                    option.innerHTML = name;
                    if (!select.length) {
                        onSelectChange(name);
                    }
                    select.appendChild(option);
                }
                select.onchange = function () {
                    onSelectChange(this.value);
                };
            },
            addButton: function (label, callback) {
                var btn = document.createElement("button");
                btn.appendChild(document.createTextNode(label));
                btn.onclick = callback;
                var controls = document.getElementById('controls-holder');
                controls.appendChild(document.createElement("br"));
                controls.appendChild(btn);
            }
        }
    };
    return singleton();
});