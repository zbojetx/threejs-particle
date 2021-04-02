
    var scene = new THREE.Scene();
    var cam = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 100)
    var renderer = new THREE.WebGL1Renderer({ antialias: true });

    renderer.setSize(innerWidth, innerHeight)
    cam.position.z = 10;
    cam.position.y = 5;

    document.body.appendChild(renderer.domElement)


    var directionalLight = new THREE.DirectionalLight({
        color: 0xFFFFFF,
        intensity: 100
    })
    directionalLight.position.set(0, 1, 0);
    directionalLight.castShadow = true;
    scene.add(directionalLight)

    var ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
    scene.add(ambientLight)


    var cubeMesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshPhongMaterial({ color: 0xff0000 })
    )
    scene.add(cubeMesh)

    let grid = new THREE.GridHelper(100, 20, 0xfafafa, 0xfafafa)
    grid.position.set(0, -0.5, 0)
    scene.add(grid);

    let controls = new THREE.OrbitControls(cam, renderer.domElement)

    function draw() {
        requestAnimationFrame(draw)
        cubeMesh.rotation += 0.01
        renderer.render(scene, cam)
    }

    draw()


