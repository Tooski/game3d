/**
 * @author mrdoob / http://mrdoob.com/, Josef Nosov
 */

THREE.PointerLockControls = function(camera) {
    var speed = 100;
    var scope = this;
    camera.rotation.set(0, 0, 0);
    var pitchObject = new THREE.Object3D();
    pitchObject.add(camera);
    var yawObject = new THREE.Object3D();
    yawObject.position.y = 10;
    yawObject.add(pitchObject);
    var prevTime = performance.now();
    var velocity = new THREE.Vector3();
    var PI_2 = Math.PI / 2;
    var f = Math.sqrt(2);


    // Keyboard listeners//
    {
        var keybinds = (function() {
            var binds = {
                'w': {
                    action: function() {
                        var position = pitchObject.quaternion._x * f;
                        velocity.z += speed * ((position));
                        velocity.y += speed * (1 - Math.abs(position));
                    }
                },
                's': {
                    action: function() {
                        var position = pitchObject.quaternion._x * f;
                        velocity.z -= speed * ((position));
                        velocity.y -= speed * (1 - Math.abs(position));
                    }
                },
                'd': {
                    action: function() {
                        velocity.x += speed;
                    }
                },
                'a': {
                    action: function() {
                        velocity.x -= speed;
                    }
                },
                'space': {
                    action: function() {
                        velocity.y += speed;
                    }
                }
            };
            for (var bind in binds) {
                KeyboardJS.on(bind,
                        function() {
                            binds[bind].isDown = true;
                        }, function() {
                    binds[bind].isDown = false;
                });
            }
            return function() {
                var keys = KeyboardJS.activeKeys();
                for (var key in keys) {
                    if (binds[keys[key]]) {
                        binds[keys[key]].action();
                    }
                }
            };
        })();
    }

    // Mouse Listeners //
    {
        var onMouseMove = function(event) {
            var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
            var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
            if (event.button === 2) {
                if (scope.enabled === false)
                    return;
                yawObject.rotation.y -= movementX * 0.002;
                pitchObject.rotation.x -= movementY * 0.002;
                pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, pitchObject.rotation.x));
            } else if (event.button === 1) {
                var position = pitchObject.quaternion._x * f;
                yawObject.translateX(-movementX);
                yawObject.translateY(movementY * (1 - Math.abs(position)));
                yawObject.translateZ(movementY * position);
            }
        };
        var onMouseWheel = function(e) {
            var e = window.event || e;
            var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
            camera.position.z -= (delta * speed / 2);
            return false;
        };



        document.addEventListener('mousemove', onMouseMove, false);
        if (document.addEventListener) {
            document.addEventListener("mousewheel", onMouseWheel, false);
            document.addEventListener("DOMMouseScroll", onMouseWheel, false);
        } else {
            document.attachEvent("onmousewheel", onMouseWheel);
        }
    }




    this.enabled = false;
    this.getObject = function() {
        return yawObject;
    };
    this.getDirection = function() {
        var direction = new THREE.Vector3(0, 0, -1);
        var rotation = new THREE.Euler(0, 0, 0, "YXZ");
        return function(v) {
            rotation.set(pitchObject.rotation.x, yawObject.rotation.y, 0);
            v.copy(direction).applyEuler(rotation);
            return v;
        };
    }();
    this.update = function() {
        var time = performance.now();
        var delta = (time - prevTime) / 1000;
        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;
        velocity.y -= velocity.y * 10.0 * delta;
        yawObject.translateX(velocity.x * delta);
        yawObject.translateY(velocity.y * delta);
        yawObject.translateZ(velocity.z * delta);
        keybinds();
        prevTime = time;
    };
};




