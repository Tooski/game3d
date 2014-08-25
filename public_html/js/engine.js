var geometry, material, mesh;



var container, stats;

var camera, scene, renderer;
 var center;
var neighbors = [];

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;


init();
animate();

function init() {

//    container = document.createElement('div');

    neighbors.push(document.getElementById('left'));
    center = document.getElementById('center');
     var width = center.clientWidth;

    for(var n in neighbors) {
        width -= neighbors[n].clientWidth;
    }
    camera = new THREE.PerspectiveCamera(45, width/ center.clientHeight, 1, 10000);
    camera.position.z = 100;

    // scene

    scene = new THREE.Scene();

    var ambient = new THREE.AmbientLight(0x101030);
    scene.add(ambient);

    var directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);

    // texture

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

    // model

    var loader = new THREE.OBJLoader(manager);
    loader.load('assets/male02.obj', function(object) {

        object.traverse(function(child) {

            if (child instanceof THREE.Mesh) {

                child.material.map = texture;

            }

        });

        object.position.y = -80;
        scene.add(object);

    });

    //
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width-1, center.clientHeight-1);
    console.log(renderer.domElement);

   //renderer.domElement.width = 1000;
    center.appendChild(renderer.domElement);



    window.addEventListener('resize', onWindowResize, false);
    controls = new THREE.PointerLockControls(camera);
    scene.add(controls.getObject());
}
var controls;

var rotationX = 1.55,
        rotationY = 0;
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    
    var width = center.clientWidth;

    for(var n in neighbors) {
        width -= neighbors[n].clientWidth;
    }
    
    camera.aspect = width / center.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(width-1, center.clientHeight-1);
}
function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    controls.update();
    renderer.render(scene, camera);
}

