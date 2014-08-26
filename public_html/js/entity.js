function ECS() {
}

ECS.Entity = function Entity() {
    this.id = (+new Date()).toString(16) +
            (Math.random() * 100000000 | 0).toString(16) +
            ECS.Entity.prototype._count;

    ECS.Entity.prototype._count++;

    this.components = {};
    return  this;
};
ECS.Entity.prototype._count = 0;

ECS.Entity.prototype.addComponent = function addComponent(component) {
    this.components[component.name] = component;
    return this;
};
ECS.Entity.prototype.removeComponent = function removeComponent(component) {
    delete this.components[component.name];
    return this;
};

ECS.Entity.prototype.print = function print() {
    console.log(JSON.stringify(this, null, 4));
    return this;
};
ECS.System = function() {
    
};


ECS.System.update = function() {
    
};

ECS.System.render = function() {
    
};

ECS.prototype = new Observer();
ECS.prototype.constructor = ECS;