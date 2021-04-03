    
    var scene = new THREE.Scene();
    var cam = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 100)
    var renderer = new THREE.WebGL1Renderer({ antialias: true });
    let vertex = new THREE.Vector3();
    let rain

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

    let points = [];
    let vertices = [];
    let point_ammount = 1000;
    let velocities = [];
    let accelerations = [];
    

    // for ( let i = 0; i < 10000; i ++ ) {

    //     const x = THREE.MathUtils.randFloatSpread( 2000 );
    //     const y = THREE.MathUtils.randFloatSpread( 2000 );
    //     const z = THREE.MathUtils.randFloatSpread( 2000 );
    
    //     points.push( x, y, z );
    
    // }
    
    const pGeo = new THREE.BufferGeometry();


    for(var i=0; i<point_ammount; i++){
        for(var j=0; j<point_ammount; j++){
            const point = {
                position : new THREE.Vector3(i-point_ammount/2, 0, j-point_ammount/2),
                velocity : new THREE.Vector3(0, Math.random()*0.01, 0)
            }
            points.push(point);
            vertices.push(i-point_ammount/2, 0, j-point_ammount/2)
            velocities.push( 0 );
            accelerations.push( Math.random() );
        }
    }

    pGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    
    // let pGeo = new THREE.SphereGeometry(3, 40,40)
    let pMat = new THREE.PointsMaterial({
        size: 0.5,
        color: 0xff0000
    });
    let particle = new THREE.Points(pGeo, pMat);
    scene.add(particle);

    let controls = new THREE.OrbitControls(cam, renderer.domElement)


    function rainVariation() {

        var positionAttribute = pGeo.getAttribute('position');
        
        for ( var i = 0; i < positionAttribute.count; i ++ ) {
        
            vertex.fromBufferAttribute( positionAttribute, i );
            vertex.y += Math.random()*0.1;
            if (vertex.y > 100) {
                vertex.y = 0;
            }
            positionAttribute.setXYZ( i, vertex.x, vertex.y, vertex.z);
        }
    
        positionAttribute.needsUpdate = true;
    
    }

    function draw() {
        requestAnimationFrame(draw)
        rainVariation();
        renderer.render(scene, cam)
    }

    draw()


