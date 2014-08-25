var objects = [];
var raycaster;
// http://www.html5rocks.com/en/tutorials/pointerlock/intro/
var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;


if (havePointerLock) {

    var element = document.body;
    var pointerlockchange = function(event) {
        if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
            controls.enabled = true;
        } else {
            controls.enabled = false;
        }
    };

    document.addEventListener('pointerlockchange', pointerlockchange, false);
    document.addEventListener('mozpointerlockchange', pointerlockchange, false);
    document.addEventListener('webkitpointerlockchange', pointerlockchange, false);

    document.addEventListener('mousedown', function(event) {
        if (event.button !== 0) {   // Right click triggers this.d
            element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
            element.requestPointerLock();
        }
    }, false);
    document.addEventListener('mouseup', function(event) {
        if (event.button !== 0) {   // Right click triggers this.d
            document.exitPointerLock = document.exitPointerLock ||
                    document.mozExitPointerLock ||
                    document.webkitExitPointerLock;
            document.exitPointerLock();
        }
    });
}
else
{
    document.addEventListener('mousedown', function(event) {
       console.log(      controls.enabled = true) 
    });
    


}       



document.oncontextmenu = function(e) {
        e.preventDefault();
};