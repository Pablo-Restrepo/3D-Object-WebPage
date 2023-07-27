// Declaración de variables globales
let scene, camera, renderer, controls;

// Función de inicialización
function init() {
    // Crear una nueva escena y establecer el color de fondo
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xDBDBDB);

    // Crear una cámara de perspectiva y establecer su posición y rotación
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
    camera.rotation.y = 45 / 180 * Math.PI;
    camera.position.x = -30;
    camera.position.y = 14;
    camera.position.z = -13;

    // Crear un renderizador WebGL y agregarlo al documento
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Crear controles de órbita para interactuar con la escena
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.addEventListener('change', render);

    // Agregar una luz ambiental a la escena
    hlight = new THREE.AmbientLight(0x404040, 2);
    scene.add(hlight);

    // Agregar una luz direccional a la escena
    directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
    directionalLight.position.set(0, 1, 0);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Agregar cuatro luces puntuales en diferentes posiciones
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

    // Cargar un modelo 3D usando el GLTFLoader
    const loader = new THREE.GLTFLoader();
    loader.load('Object/scene.gltf', function (gltf) {
        // Obtener el objeto del modelo cargado y ajustar su escala
        const object = gltf.scene.children[0];
        object.scale.set(50, 50, 50);
        scene.add(gltf.scene);

        // Obtener el cuadro delimitador del objeto y centrarlo en la escena
        const boundingBox = new THREE.Box3().setFromObject(object);
        const center = new THREE.Vector3();
        boundingBox.getCenter(center);
        object.position.sub(center);

        // Iniciar la animación
        animate();
    });
}

// Función para renderizar la escena
function render() {
    renderer.render(scene, camera);
}

// Función para realizar la animación
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
}

// Función para manejar el cambio de tamaño de la ventana del navegador
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Inicializar la escena al cargar la página
init();

// Agregar un evento para manejar el cambio de tamaño de la ventana
window.addEventListener('resize', onWindowResize);
