function Observer() {
    this.observers = {};
    var that = this;
    return {
        /**
         * Requires params fn which is a string of the function name and callback of the function.
         * @param {type} cb
         * @returns {undefined}
         */
        addCallback: function(cb) {
            if (cb.callback) {
                for (var name in cb.fn) {
                    var fn = cb.fn[name].toLowerCase();
                    if (!that.observers[fn]) {
                        that.observers[fn] = [];
                    }
                    that.observers[fn].push(cb.callback);
                }
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
        }
    };
}
;





function EditorEngine() {
    var obs = new Observer();
    var mainCamera, scene, renderer, center, controls;
    var neighbors = [];
    var gameObjects = [];

    init();
    animate();

    function init() {
        neighbors.push(document.getElementById('left'));
        center = document.getElementById('center');
        var width = center.clientWidth;
        for (var n in neighbors) {
            width -= neighbors[n].clientWidth;
        }
        mainCamera = new THREE.PerspectiveCamera(45, width / center.clientHeight, 1, 10000);
        mainCamera.position.z = 100;
        scene = new THREE.Scene();
        var ambient = new THREE.AmbientLight(0x101030);
        scene.add(ambient);
        var directionalLight = new THREE.DirectionalLight(0xffeedd);
        directionalLight.position.set(0, 0, 1);
        scene.add(directionalLight);


        loadFunct();    // Loads init stuff.


        renderer = new THREE.WebGLRenderer();
        renderer.setSize(width - 20, center.clientHeight);



        center.appendChild(renderer.domElement);
        window.addEventListener('resize', onWindowResize, false);

        controls = new THREE.PointerLockControls(mainCamera);
        scene.add(controls.getObject());
    }

    function onWindowResize() {
        var width = center.clientWidth;
        for (var n in neighbors) {
            width -= neighbors[n].clientWidth;
        }

        mainCamera.aspect = width / center.clientHeight;
        mainCamera.updateProjectionMatrix();
        renderer.setSize(width - 4, center.clientHeight - 4);
    }
    function animate() {
        requestAnimationFrame(animate);
        render();
    }

    function render() {
        controls.update();
        renderer.render(scene, mainCamera);
    }

    return {
        scene: function() {
            return scene;
        },
        controls: function() {
            return controls;
        },
        addGameObject: function (object) {
            if (object instanceof GameObject) {
                gameObjects.push(object);
                obs.triggerCallback("addGameObject");
                return true;
            }
            return false;
        },
        getGameObjects: function() {
            return gameObjects.slice();
        },
        addCallback: function(observer) {
            obs.addCallback(observer);
        }
    };

}
;




var engine = new EditorEngine();
















function loadFunct() {
    var manager = new THREE.LoadingManager();
    manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
    };
    var texture = new THREE.Texture();

    var loader = new THREE.ImageLoader(manager);
    loader.load('assets/Amadeus maps/cs_havana_texture_0.jpg', function(image) {

        texture.image = image;
        texture.needsUpdate = true;

    });

    var loader = new THREE.OBJLoader(manager);
    loader.load('assets/male02.obj', function(object) {
        object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material.map = texture;
            }
        });
        object.position.y = -80;
        engine.scene().add(object);

    });
}



