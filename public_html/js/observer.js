function Observer() {
    this.observers = {};
    var that = this;

    var callback = function(cb) {
        if (cb.callback) {
            for (var name in cb.fn) {
                var fn = cb.fn[name].toLowerCase();
                if (!that.observers[fn]) {
                    that.observers[fn] = [];
                }
                that.observers[fn].push(cb.callback);
            }
        }
    };



    return {
        /**
         * Requires params fn which is a string of the function name and callback of the function.
         * @param {type} cb
         * @returns {undefined}
         */
        addCallback: function(cb) {

    
            if (Object.prototype.toString.call(cb) === "[object Array]") {
                var i = cb.length;
           
                while (i--)
                    callback(cb[cb.length - i - 1]);
            } else {
                callback(cb);
            }


        },
        triggerCallback: function(name) {
            var fn = name.toLowerCase();
            var o = that.observers[fn];
            if (o) {
                for (var cb in o) {
                    o[cb]();
                }
            }
            return that.observers;
        }
    };
}