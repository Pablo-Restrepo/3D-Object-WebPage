let scene, camera, renderer, controls;

function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xDBDBDB);

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
    camera.rotation.y = 45 / 180 * Math.PI;
    camera.position.x = -30;
    camera.position.y = 14;
    camera.position.z = -13;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.addEventListener('change', render);

    hlight = new THREE.AmbientLight(0x404040, 2);
    scene.add(hlight);

    directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
    directionalLight.position.set(0, 1, 0);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    light = new THREE.PointLight(0xc4c4c4, 0.5);
    light.position.set(0, 300, 500);
    scene.add(light);

    light2 = new THREE.PointLight(0xc4c4c4, 0.5);
    light2.position.set(500, 100, 0);
    scene.add(light2);

    light3 = new THREE.PointLight(0xc4c4c4, 0.5);
    light3.position.set(0, 100, -500);
    scene.add(light3);

    light4 = new THREE.PointLight(0xc4c4c4, 0.5);
    light4.position.set(-500, 300, 500);
    scene.add(light4);

    const loader = new THREE.GLTFLoader();
    loader.load('Object/scene.gltf', function (gltf) {
        const object = gltf.scene.children[0];
        object.scale.set(50, 50, 50);
        scene.add(gltf.scene);
        const boundingBox = new THREE.Box3().setFromObject(object);
        const center = new THREE.Vector3();
        boundingBox.getCenter(center);

        object.position.sub(center);
        animate();
    });
}

function render() {
    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();

window.addEventListener('resize', onWindowResize);