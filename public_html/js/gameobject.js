function GameObject(name) {
    ECS.call(this);
    this.name = name || "";
    this.parent = null;
    this.children = []; // Sorting with array since order may matter.
    var that = this;
    return {
        name : that.name,
        parent : that.parent,
        children : that.children,
        addChild : that.addChild,
        removeChild : that.removeChild,
        addCallback : GameObject.prototype.addCallback,
        id : ECS.Entity().id,
        instanceOf : function(type) { return that instanceof type; }
    };
}
GameObject.prototype = new ECS();
GameObject.prototype.constructor = GameObject;

GameObject.prototype.addChild = function(child) {
    
   

    // Is instance of game object and is not itself.
    if (child.instanceOf(GameObject) && child !== this) {
       
        if (child.parent) {
            child.parent.removeChild(child);
        }
      
        this.children.push(child);
        child.parent = this;
         
            console.log(GameObject.prototype.triggerCallback('addChild'));
       
        return true;
    }
    return false;
};


GameObject.prototype.removeChild = function(child) {
    if (child.instanceOf(GameObject)) {
        var i = this.children.length;
        while (i--) {
            if (this.children[i] === child) {
                this.children.splice(i, 1);
                child.parent = null;
                this.obs.triggerCallback('removeChild');
                return true;
            }
        }
    }
    return false;
};