var FinIncomeData2013;
var currentArray;
var colorArray = [];
var container, stats, info;
var obj4;
var camera, scene, renderer;

var group;

var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;


var lookAtX = 0;
var lookAtY = -26;
var lookAtZ = 0;

//sets which dataset to be displayed
var controller = 0;

var boolTopView;
var boolNormalView;

var boolDataSwitch;

var windowHalfX = window.innerWidth / 2;
//container = document.createElement('div');
container = document.getElementById( 'canvas123' );
document.body.appendChild(container);

var info = document.createElement('div');
info.style.position = 'absolute';
// info.style.top = '700%';
// info.style.width = '100%';
info.style.textAlign = 'center';
info.innerHTML = null;
container.appendChild(info);


var control, controls;
//raycaster
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(),
    INTERSECTED;

function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
}

function getMinOfArray(numArray) {
    return Math.min.apply(null, numArray);
}

function createValArray(objArray) {

    return objArray.map(a => a.value);
}

function getMinAndMax(objArray) {
    let minMax = [];

    minMax.push(getMinOfArray(createValArray(objArray)));
    minMax.push(getMaxOfArray(createValArray(objArray)));

    let tempNumArray = createValArray(objArray);
    for (let i = 0; i < 33; i++) {
        if (tempNumArray[i] == minMax[0]) {
            var newMinIndex = i;
        }

        if (tempNumArray[i] == minMax[1]) {
            var newMaxIndex = i;
        }
    }



    let newMinMax = [];
    newMinMax.push(newMinIndex);
    newMinMax.push(newMaxIndex);

    return newMinMax;
}



init();
animate();
//addControls();

function addControls(controlObject) {
    var gui = new dat.GUI();


    gui.add(controlObject, 'cameraPosX', -5, 5);
    gui.add(controlObject, 'cameraPosY', -5, 5);
    gui.add(controlObject, 'cameraPosZ', -5, 5);

    gui.add(controlObject, 'lookAtX', -.5, .5);
    gui.add(controlObject, 'lookAtY', -.5, .5);
    gui.add(controlObject, 'lookAtZ', -.5, .5);

    var obj = {
        reset: function() {
            boolNormalView = true;
            boolTopView = false;
            var normalCamZ = -250;
            var normalCamY = -200;
            //	scene.children[1].rotation.z=Math.PI;
            // var topCamZ=-350;
            // var topCamY=0;
            // 								while(camera.position.z!=normalCamZ&&camera.position.y!=normalCamY){
            //
            //
            //
            // 								if(camera.position.z<normalCamZ){
            // 									camera.position.z+=1;}
            //
            // 									if(camera.position.y>normalCamY){
            // 								camera.position.y-=1;
            // 							}
            // }
            camera.position.x = 0;
            camera.position.y = normalCamY;
            camera.position.z = normalCamZ;
            control.cameraPosX = 0;
            control.cameraPosY = 0;
            control.cameraPosZ = 0;

            control.lookAtY = 0;
            control.lookAtX = 0;
            control.lookAtZ = 0;

        }
    };
    gui.add(obj, 'reset');

    var obj3 = {
        topView: function() {
            boolTopView = true;
            boolNormalView = false;
            var topCamZ = -350;
            var topCamY = 0;
            // var normalCamZ=-250;
            // var normalCamY=-200;
            // 	while(camera.position.z!=topCamZ&&camera.position.y!=topCamY){
            //
            // 		if(camera.position.y<topCamY){
            //
            // 		 camera.position.y+=1;
            //
            // 	 }
            //
            // 	if(camera.position.z>topCamZ){
            //
            // 	 camera.position.z-=1;
            //  }}

            camera.position.x = 0;
            camera.position.y = 0;
            camera.position.z = topCamZ;
            control.cameraPosX = 0;
            control.cameraPosY = 0;
            control.cameraPosZ = 0;

            control.lookAtY = 0;
            control.lookAtX = 0;
            control.lookAtZ = 0;

        }
    };

    obj4 = {
        ShowMinMax: true
    };

    obj5 = {
        boolDataSwitch: true
    };

    // Checkbox field
    gui.add(obj4, "ShowMinMax");

    gui.add(obj5, "boolDataSwitch");



    gui.add(obj3, 'topView');

    var obj2 = {
        PrintData: function() {
            console.log("x position is " + camera.position.x);
            console.log("y position is " + camera.position.y);
            console.log("z position is " + camera.position.z);

            console.log("camLookat x position is " + lookAtX);
            console.log("camLookat y position is " + lookAtY);
            console.log("camLookat z position is " + lookAtZ);
        }
    };
    gui.add(obj2, 'PrintData');
}

function init() {


    scene = new THREE.Scene();

    //BACKGROUND COLOR
    scene.background = new THREE.Color(0xf0f0f0); //f0f0f0

    // OrthographicCamera//PerspectiveCamera
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, -200, -250);


    scene.add(camera);
    //scene.add( new THREE.AmbientLight( 0xffffff, 0.2 ) );
    var light = new THREE.DirectionalLight(0xffffff, 0.8, );
    camera.add(light);

    // var light2 = new THREE.SpotLight( 0xffffff, 1 );
    // light2.position.set( 0,200,-250 );
    // scene.add( light2 );


    group = new THREE.Group();
    //group.position.y = 0;
    scene.add(group);

    var loader = new THREE.TextureLoader();
    //var texture = loader.load( "textures/UV_Grid_Sm.jpg" );

    // it's necessary to apply these settings in order to correctly display the texture on a shape geometry

    //texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    //texture.repeat.set( 0.008, 0.008 );

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth/1, window.innerHeight/1);
    container.appendChild(renderer.domElement);

    function addShape(shape, extrudeSettings, color, x, y, z, rx, ry, rz, s, name) {

        // flat shape with texture
        // note: default UVs generated by ShapeBufferGeometry are simply the x- and y-coordinates of the vertices

        // var geometry = new THREE.ShapeBufferGeometry( shape );
        //
        // var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { side: THREE.DoubleSide, map: texture } ) );
        // mesh.position.set( x, y, z - 175 );
        // mesh.rotation.set( rx, ry, rz );
        // mesh.scale.set( s, s, s );
        //group.add( mesh );

        // flat shape

        var geometry = new THREE.ShapeBufferGeometry(shape);

        var mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
            color: color,
            side: THREE.DoubleSide,
            shininess: 20
        }));

        mesh.position.set(x, y, z - 225);
        mesh.rotation.set(rx, ry, rz);
        mesh.scale.set(s, s, s);

        //group.add( mesh );

        // extruded shape

        var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        //Lambert
        var material = new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide,
            color: color,
            lights: true,
            flatShading: false,
            transparent: true,
            shininess: 90,
            specular: 0x050505,
            reflectivity: 10,
            refractionRatio: 0.98
        });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.name = name;


        //DO MATRIX TRANSFORMATION HERE
        mesh.position.set(x, y, z + 75);
        mesh.rotation.set(rx, ry, rz);
        mesh.scale.set(s, s, s);
        group.add(mesh);

        addLineShape(shape, color, x, y, z, rx, ry, rz, s);

    }

    function addLineShape(shape, color, x, y, z, rx, ry, rz, s) {

        // lines

        shape.autoClose = true;

        var points = shape.getPoints();
        var spacedPoints = shape.getSpacedPoints(50);

        var geometryPoints = new THREE.BufferGeometry().setFromPoints(points);
        var geometrySpacedPoints = new THREE.BufferGeometry().setFromPoints(spacedPoints);

        // solid line

        var line = new THREE.Line(geometryPoints, new THREE.LineBasicMaterial({
            color: color,
            linewidth: 3
        }));
        line.position.set(x, y, z - 75);
        line.rotation.set(rx, ry, rz);
        line.scale.set(s, s, s);
        //group.add( line );

        // line from equidistance sampled points

        var line = new THREE.Line(geometrySpacedPoints, new THREE.LineBasicMaterial({
            color: color,
            linewidth: 3
        }));
        line.position.set(x, y, z + 25);
        line.rotation.set(rx, ry, rz);
        line.scale.set(s, s, s);
        //group.add( line );

        // vertices from real points

        var particles = new THREE.Points(geometryPoints, new THREE.PointsMaterial({
            color: color,
            size: 4
        }));
        particles.position.set(x, y, z + 75);
        particles.rotation.set(rx, ry, rz);
        particles.scale.set(s, s, s);
        //group.add( particles );

        // equidistance sampled points

        var particles = new THREE.Points(geometrySpacedPoints, new THREE.PointsMaterial({
            color: color,
            size: 4
        }));
        particles.position.set(x, y, z + 125);
        particles.rotation.set(rx, ry, rz);
        particles.scale.set(s, s, s);
        //group.add( particles );

    }

    //City

    var City = [];
    City.push(new THREE.Vector2(322, 234));
    City.push(new THREE.Vector2(345, 228));
    City.push(new THREE.Vector2(344, 245));
    City.push(new THREE.Vector2(323, 245));

    for (var i = 0; i < City.length; i++) City[i].multiplyScalar(0.5);
    var CityShape = new THREE.Shape(City);
    CityShape.name = "City of London";


    //   BarkingAndDagenham
    var BarkingAndDagenham = [];
    BarkingAndDagenham.push(new THREE.Vector2(517, 145));
    BarkingAndDagenham.push(new THREE.Vector2(518, 175));
    BarkingAndDagenham.push(new THREE.Vector2(547, 183));
    BarkingAndDagenham.push(new THREE.Vector2(526, 240));
    BarkingAndDagenham.push(new THREE.Vector2(510, 233));
    BarkingAndDagenham.push(new THREE.Vector2(485, 237));
    BarkingAndDagenham.push(new THREE.Vector2(466, 204));
    BarkingAndDagenham.push(new THREE.Vector2(498, 190));

    for (var i = 0; i < BarkingAndDagenham.length; i++) BarkingAndDagenham[i].multiplyScalar(0.5);
    var BarkingAndDagenhamShape = new THREE.Shape(BarkingAndDagenham);
    BarkingAndDagenhamShape.name = "Barking And Dagenham";

    console.log('BarkingAndDagenham');
    for (i = 0; i < BarkingAndDagenham.length; i++) {

        console.log('[' + BarkingAndDagenham[i].x + ',' + BarkingAndDagenham[i].y + '],');
    }
    console.log('[' + BarkingAndDagenham[0].x + ',' + BarkingAndDagenham[0].y + ']');

    //Barnet
    var Barnet = [];
    Barnet.push(new THREE.Vector2(177, 91));
    Barnet.push(new THREE.Vector2(264, 56));
    Barnet.push(new THREE.Vector2(296, 97));
    Barnet.push(new THREE.Vector2(284, 168));
    Barnet.push(new THREE.Vector2(247, 193));
    Barnet.push(new THREE.Vector2(234, 174));
    Barnet.push(new THREE.Vector2(216, 170));
    Barnet.push(new THREE.Vector2(220, 156));

    for (var i = 0; i < Barnet.length; i++) Barnet[i].multiplyScalar(0.5);
    var BarnetShape = new THREE.Shape(Barnet);
    BarnetShape.name = Barnet;

    console.log('Barnet');
    for (i = 0; i < Barnet.length; i++) {

        console.log('[' + Barnet[i].x + ',' + Barnet[i].y + '],');
    }
    console.log('[' + Barnet[0].x + ',' + Barnet[0].y + ']');

    //Bexley
    var Bexley = [];
    Bexley.push(new THREE.Vector2(508, 244));
    Bexley.push(new THREE.Vector2(526, 250));
    Bexley.push(new THREE.Vector2(546, 273));
    Bexley.push(new THREE.Vector2(575, 273));
    Bexley.push(new THREE.Vector2(562, 312));
    Bexley.push(new THREE.Vector2(523, 368));
    Bexley.push(new THREE.Vector2(475, 346));
    Bexley.push(new THREE.Vector2(488, 294));
    Bexley.push(new THREE.Vector2(512, 288));

    for (var i = 0; i < Bexley.length; i++) Bexley[i].multiplyScalar(0.5);
    var BexleyShape = new THREE.Shape(Bexley);
    BexleyShape.name = "Bexley";

    console.log('Bexley');
    for (i = 0; i < Bexley.length; i++) {

        console.log('[' + Bexley[i].x + ',' + Bexley[i].y + '],');
    }
    console.log('[' + Bexley[0].x + ',' + Bexley[0].y + ']');

    //   Brent
    var Brent = [];
    Brent.push(new THREE.Vector2(202, 144));
    Brent.push(new THREE.Vector2(212, 157));
    Brent.push(new THREE.Vector2(207, 175));
    Brent.push(new THREE.Vector2(229, 180));
    Brent.push(new THREE.Vector2(255, 219));
    Brent.push(new THREE.Vector2(189, 222));
    Brent.push(new THREE.Vector2(154, 193));
    Brent.push(new THREE.Vector2(163, 163));

    for (var i = 0; i < Brent.length; i++) Brent[i].multiplyScalar(0.5);
    var BrentShape = new THREE.Shape(Brent);
    BrentShape.name = "Brent";

    console.log('Brent');
    for (i = 0; i < Brent.length; i++) {

        console.log('[' + Brent[i].x + ',' + Brent[i].y + '],');
    }
    console.log('[' + Brent[0].x + ',' + Brent[0].y + ']');


    //Bromley
    var Bromley = [];
    Bromley.push(new THREE.Vector2(354, 362));
    Bromley.push(new THREE.Vector2(410, 369));
    Bromley.push(new THREE.Vector2(450, 350));
    Bromley.push(new THREE.Vector2(476, 351));
    Bromley.push(new THREE.Vector2(527, 380));
    Bromley.push(new THREE.Vector2(515, 457));
    Bromley.push(new THREE.Vector2(483, 486));
    Bromley.push(new THREE.Vector2(476, 523));
    Bromley.push(new THREE.Vector2(429, 512));

    for (var i = 0; i < Bromley.length; i++) Bromley[i].multiplyScalar(0.5);
    var BromleyShape = new THREE.Shape(Bromley);
    BromleyShape.name = "Bromley";

    console.log('Bromley');
    for (i = 0; i < Bromley.length; i++) {

        console.log('[' + Bromley[i].x + ',' + Bromley[i].y + '],');
    }
    console.log('[' + Bromley[0].x + ',' + Bromley[0].y + ']');

    //Camden
    var Camden = [];
    Camden.push(new THREE.Vector2(250, 199));
    Camden.push(new THREE.Vector2(250, 199));
    Camden.push(new THREE.Vector2(285, 175));
    Camden.push(new THREE.Vector2(291, 177));
    Camden.push(new THREE.Vector2(317, 237));
    Camden.push(new THREE.Vector2(307, 238));
    Camden.push(new THREE.Vector2(286, 210));
    Camden.push(new THREE.Vector2(260, 212));

    for (var i = 0; i < Camden.length; i++) Camden[i].multiplyScalar(0.5);
    var CamdenShape = new THREE.Shape(Camden);
    CamdenShape.name = "Camden";

    console.log('Camden');
    for (i = 0; i < Camden.length; i++) {

        console.log('[' + Camden[i].x + ',' + Camden[i].y + '],');
    }
    console.log('[' + Camden[0].x + ',' + Camden[0].y + ']');

    // Croydon
    var Croydon = [];
    Croydon.push(new THREE.Vector2(314, 379));
    Croydon.push(new THREE.Vector2(344, 359));
    Croydon.push(new THREE.Vector2(398, 466));
    Croydon.push(new THREE.Vector2(380, 467));
    Croydon.push(new THREE.Vector2(323, 522));
    Croydon.push(new THREE.Vector2(296, 490));
    Croydon.push(new THREE.Vector2(323, 452));
    Croydon.push(new THREE.Vector2(314, 379));

    for (var i = 0; i < Croydon.length; i++) Croydon[i].multiplyScalar(0.5);
    var CroydonShape = new THREE.Shape(Croydon);
    CroydonShape.name = "Croydon";


    console.log('Croydon');
    for (i = 0; i < Croydon.length; i++) {

        console.log('[' + Croydon[i].x + ',' + Croydon[i].y + '],');
    }
    console.log('[' + Croydon[0].x + ',' + Croydon[0].y + ']');

    //Ealing
    var Ealing = [];
    Ealing.push(new THREE.Vector2(92, 211));
    Ealing.push(new THREE.Vector2(116, 199));
    Ealing.push(new THREE.Vector2(149, 197));
    Ealing.push(new THREE.Vector2(185, 232));
    Ealing.push(new THREE.Vector2(215, 225));
    Ealing.push(new THREE.Vector2(216, 257));
    Ealing.push(new THREE.Vector2(101, 265));
    Ealing.push(new THREE.Vector2(115, 236));

    for (var i = 0; i < Ealing.length; i++) Ealing[i].multiplyScalar(0.5);
    var EalingShape = new THREE.Shape(Ealing);
    EalingShape.name = "Ealing";

    console.log('Ealing');
    for (i = 0; i < Ealing.length; i++) {

        console.log('[' + Ealing[i].x + ',' + Ealing[i].y + '],');
    }
    console.log('[' + Ealing[0].x + ',' + Ealing[0].y + ']');

    //Enfield
    var Enfield = [];
    Enfield.push(new THREE.Vector2(269, 51));
    Enfield.push(new THREE.Vector2(282, 31));
    Enfield.push(new THREE.Vector2(319, 23));
    Enfield.push(new THREE.Vector2(395, 33));
    Enfield.push(new THREE.Vector2(395, 63));
    Enfield.push(new THREE.Vector2(370, 121));
    Enfield.push(new THREE.Vector2(300, 123));
    Enfield.push(new THREE.Vector2(305, 96));

    for (var i = 0; i < Enfield.length; i++) Enfield[i].multiplyScalar(0.5);
    var EnfieldShape = new THREE.Shape(Enfield);
    EnfieldShape.name = "Enfield";

    console.log('Enfield');
    for (i = 0; i < Enfield.length; i++) {

        console.log('[' + Enfield[i].x + ',' + Enfield[i].y + '],');
    }
    console.log('[' + Enfield[0].x + ',' + Enfield[0].y + ']');


    // Greenwich
    var Greenwich = [];
    Greenwich.push(new THREE.Vector2(411, 258));
    Greenwich.push(new THREE.Vector2(419, 259));
    Greenwich.push(new THREE.Vector2(429, 266));
    Greenwich.push(new THREE.Vector2(467, 266));
    Greenwich.push(new THREE.Vector2(486, 247));
    Greenwich.push(new THREE.Vector2(504, 244));
    Greenwich.push(new THREE.Vector2(506, 282));
    Greenwich.push(new THREE.Vector2(481, 289));
    Greenwich.push(new THREE.Vector2(469, 344));
    Greenwich.push(new THREE.Vector2(449, 344));
    Greenwich.push(new THREE.Vector2(420, 294));
    Greenwich.push(new THREE.Vector2(400, 292));
    Greenwich.push(new THREE.Vector2(396, 281));
    Greenwich.push(new THREE.Vector2(415, 278));

    for (var i = 0; i < Greenwich.length; i++) Greenwich[i].multiplyScalar(0.5);
    var GreenwichShape = new THREE.Shape(Greenwich);
    GreenwichShape.name = "Greenwich";

    console.log('Greenwich');
    for (i = 0; i < Greenwich.length; i++) {

        console.log('[' + Greenwich[i].x + ',' + Greenwich[i].y + '],');
    }
    console.log('[' + Greenwich[0].x + ',' + Greenwich[0].y + ']');

    //  Hackney
    var Hackney = [];
    Hackney.push(new THREE.Vector2(335, 175));
    Hackney.push(new THREE.Vector2(363, 173));
    Hackney.push(new THREE.Vector2(389, 197));
    Hackney.push(new THREE.Vector2(345, 220));
    Hackney.push(new THREE.Vector2(347, 196));
    for (var i = 0; i < Hackney.length; i++) Hackney[i].multiplyScalar(0.5);

    var HackneyShape = new THREE.Shape(Hackney);
    HackneyShape.name = "Hackney";

    console.log('Hackney');
    for (i = 0; i < Hackney.length; i++) {

        console.log('[' + Hackney[i].x + ',' + Hackney[i].y + '],');
    }
    console.log('[' + Hackney[0].x + ',' + Hackney[0].y + ']');

    //  HammersmithAndFulham
    var HammersmithAndFulham = [];
    HammersmithAndFulham.push(new THREE.Vector2(222, 226));
    HammersmithAndFulham.push(new THREE.Vector2(234, 227));
    HammersmithAndFulham.push(new THREE.Vector2(240, 264));
    HammersmithAndFulham.push(new THREE.Vector2(267, 291));
    HammersmithAndFulham.push(new THREE.Vector2(263, 298));
    HammersmithAndFulham.push(new THREE.Vector2(243, 294));
    HammersmithAndFulham.push(new THREE.Vector2(239, 276));
    HammersmithAndFulham.push(new THREE.Vector2(225, 271));
    HammersmithAndFulham.push(new THREE.Vector2(221, 257));

    for (var i = 0; i < HammersmithAndFulham.length; i++) HammersmithAndFulham[i].multiplyScalar(0.5);
    var HammersmithAndFulhamShape = new THREE.Shape(HammersmithAndFulham);
    HammersmithAndFulhamShape.name = "Hammersmith and Fulham";

    console.log('HammersmithAndFulham');
    for (i = 0; i < HammersmithAndFulham.length; i++) {

        console.log('[' + HammersmithAndFulham[i].x + ',' + HammersmithAndFulham[i].y + '],');
    }
    console.log('[' + HammersmithAndFulham[0].x + ',' + HammersmithAndFulham[0].y + ']');

    //  Haringey
    var Haringey = [];
    Haringey.push(new THREE.Vector2(299, 129));
    Haringey.push(new THREE.Vector2(366, 129));
    Haringey.push(new THREE.Vector2(354, 164));
    Haringey.push(new THREE.Vector2(325, 168));
    Haringey.push(new THREE.Vector2(292, 168));
    for (var i = 0; i < Haringey.length; i++) Haringey[i].multiplyScalar(0.5);
    var HaringeyShape = new THREE.Shape(Haringey);
    HaringeyShape.name = "Haringey";

    console.log('Haringey');
    for (i = 0; i < Haringey.length; i++) {

        console.log('[' + Haringey[i].x + ',' + Haringey[i].y + '],');
    }
    console.log('[' + Haringey[0].x + ',' + Haringey[0].y + ']');

    //			 Harrow
    var Harrow = [];
    Harrow.push(new THREE.Vector2(102, 124));
    Harrow.push(new THREE.Vector2(170, 95));
    Harrow.push(new THREE.Vector2(199, 136));
    Harrow.push(new THREE.Vector2(158, 161));
    Harrow.push(new THREE.Vector2(150, 191));
    Harrow.push(new THREE.Vector2(121, 191));
    for (var i = 0; i < Harrow.length; i++) Harrow[i].multiplyScalar(0.5);
    var HarrowShape = new THREE.Shape(Harrow);
    HarrowShape.name = "Harrow";

    console.log('Harrow');
    for (i = 0; i < Harrow.length; i++) {

        console.log('[' + Harrow[i].x + ',' + Harrow[i].y + '],');
    }
    console.log('[' + Harrow[0].x + ',' + Harrow[0].y + ']');


    //   Havering
    var Havering = [];
    Havering.push(new THREE.Vector2(524, 105));
    Havering.push(new THREE.Vector2(583, 96));
    Havering.push(new THREE.Vector2(623, 169));
    Havering.push(new THREE.Vector2(638, 166));
    Havering.push(new THREE.Vector2(659, 204));
    Havering.push(new THREE.Vector2(596, 216));
    Havering.push(new THREE.Vector2(579, 263));
    Havering.push(new THREE.Vector2(551, 265));
    Havering.push(new THREE.Vector2(534, 243));
    Havering.push(new THREE.Vector2(558, 179));
    Havering.push(new THREE.Vector2(528, 170));

    for (var i = 0; i < Havering.length; i++) Havering[i].multiplyScalar(0.5);
    var HaveringShape = new THREE.Shape(Havering);
    HaveringShape.name = "Havering";


    console.log('Havering');
    for (i = 0; i < Havering.length; i++) {

        console.log('[' + Havering[i].x + ',' + Havering[i].y + '],');
    }
    console.log('[' + Havering[0].x + ',' + Havering[0].y + ']');


    //   Hillingdon
    var Hillingdon = [];
    Hillingdon.push(new THREE.Vector2(33, 109));
    Hillingdon.push(new THREE.Vector2(95, 125));
    Hillingdon.push(new THREE.Vector2(113, 192));
    Hillingdon.push(new THREE.Vector2(84, 207));
    Hillingdon.push(new THREE.Vector2(106, 236));
    Hillingdon.push(new THREE.Vector2(59, 319));
    Hillingdon.push(new THREE.Vector2(27, 307));
    Hillingdon.push(new THREE.Vector2(45, 188));
    Hillingdon.push(new THREE.Vector2(34, 165));
    for (var i = 0; i < Hillingdon.length; i++) Hillingdon[i].multiplyScalar(0.5);
    var HillingdonShape = new THREE.Shape(Hillingdon);
    HillingdonShape.name = "Hillingdon";

    console.log('Hillingdon');
    for (i = 0; i < Hillingdon.length; i++) {

        console.log('[' + Hillingdon[i].x + ',' + Hillingdon[i].y + '],');
    }
    console.log('[' + Hillingdon[0].x + ',' + Hillingdon[0].y + ']');

    //Hounslow
    var Hounslow = [];
    Hounslow.push(new THREE.Vector2(97, 271));
    Hounslow.push(new THREE.Vector2(212, 264));
    Hounslow.push(new THREE.Vector2(219, 275));
    Hounslow.push(new THREE.Vector2(211, 287));
    Hounslow.push(new THREE.Vector2(188, 279));
    Hounslow.push(new THREE.Vector2(157, 298));
    Hounslow.push(new THREE.Vector2(152, 315));
    Hounslow.push(new THREE.Vector2(109, 322));
    Hounslow.push(new THREE.Vector2(108, 331));
    Hounslow.push(new THREE.Vector2(121, 343));
    Hounslow.push(new THREE.Vector2(111, 363));
    Hounslow.push(new THREE.Vector2(60, 332));
    for (var i = 0; i < Hounslow.length; i++) Hounslow[i].multiplyScalar(0.5);
    var HounslowShape = new THREE.Shape(Hounslow);
    HounslowShape.name = "Hounslow";

    console.log('Hounslow');
    for (i = 0; i < Hounslow.length; i++) {

        console.log('[' + Hounslow[i].x + ',' + Hounslow[i].y + '],');
    }
    console.log('[' + Hounslow[0].x + ',' + Hounslow[0].y + ']');


    //Islington
    var Islington = [];
    Islington.push(new THREE.Vector2(302, 177));
    Islington.push(new THREE.Vector2(328, 179));
    Islington.push(new THREE.Vector2(341, 199));
    Islington.push(new THREE.Vector2(336, 225));
    Islington.push(new THREE.Vector2(322, 228));
    for (var i = 0; i < Islington.length; i++) Islington[i].multiplyScalar(0.5);
    var IslingtonShape = new THREE.Shape(Islington);
    IslingtonShape.name = "Islington";

    console.log('Islington');
    for (i = 0; i < Islington.length; i++) {

        console.log('[' + Islington[i].x + ',' + Islington[i].y + '],');
    }
    console.log('[' + Islington[0].x + ',' + Islington[0].y + ']');


    //  KensingtonAndChelsea
    var KensingtonAndChelsea = [];
    KensingtonAndChelsea.push(new THREE.Vector2(240, 228));
    KensingtonAndChelsea.push(new THREE.Vector2(248, 227));
    KensingtonAndChelsea.push(new THREE.Vector2(271, 269));
    KensingtonAndChelsea.push(new THREE.Vector2(284, 265));
    KensingtonAndChelsea.push(new THREE.Vector2(290, 280));
    KensingtonAndChelsea.push(new THREE.Vector2(271, 283));
    KensingtonAndChelsea.push(new THREE.Vector2(249, 261));

    for (var i = 0; i < KensingtonAndChelsea.length; i++) KensingtonAndChelsea[i].multiplyScalar(0.5);
    var KensingtonAndChelseaShape = new THREE.Shape(KensingtonAndChelsea);
    KensingtonAndChelseaShape.name = "Kensington and Chelsea";

    console.log('KensingtonAndChelsea');
    for (i = 0; i < KensingtonAndChelsea.length; i++) {

        console.log('[' + KensingtonAndChelsea[i].x + ',' + KensingtonAndChelsea[i].y + '],');
    }
    console.log('[' + KensingtonAndChelsea[0].x + ',' + KensingtonAndChelsea[0].y + ']');


    // KingstonUponThames
    var KingstonUponThames = [];
    KingstonUponThames.push(new THREE.Vector2(178, 357));
    KingstonUponThames.push(new THREE.Vector2(194, 366));
    KingstonUponThames.push(new THREE.Vector2(218, 348));
    KingstonUponThames.push(new THREE.Vector2(230, 402));
    KingstonUponThames.push(new THREE.Vector2(176, 474));
    KingstonUponThames.push(new THREE.Vector2(163, 477));
    KingstonUponThames.push(new THREE.Vector2(180, 416));
    KingstonUponThames.push(new THREE.Vector2(174, 405));

    for (var i = 0; i < KingstonUponThames.length; i++) KingstonUponThames[i].multiplyScalar(0.5);
    var KingstonUponThamesShape = new THREE.Shape(KingstonUponThames);
    KingstonUponThamesShape.name = "Kensington upon Chelsea";

    console.log('KingstonUponThames');
    for (i = 0; i < KingstonUponThames.length; i++) {

        console.log('[' + KingstonUponThames[i].x + ',' + KingstonUponThames[i].y + '],');
    }
    console.log('[' + KingstonUponThames[0].x + ',' + KingstonUponThames[0].y + ']');

    //Lambeth
    var Lambeth = [];
    Lambeth.push(new THREE.Vector2(300, 303));
    Lambeth.push(new THREE.Vector2(325, 259));
    Lambeth.push(new THREE.Vector2(336, 304));
    Lambeth.push(new THREE.Vector2(329, 318));
    Lambeth.push(new THREE.Vector2(341, 351));
    Lambeth.push(new THREE.Vector2(312, 369));
    for (var i = 0; i < Lambeth.length; i++) Lambeth[i].multiplyScalar(0.5);
    var LambethShape = new THREE.Shape(Lambeth);
    LambethShape.name = "Lambeth";

    console.log('Lambeth');
    for (i = 0; i < Lambeth.length; i++) {

        console.log('[' + Lambeth[i].x + ',' + Lambeth[i].y + '],');
    }
    console.log('[' + Lambeth[0].x + ',' + Lambeth[0].y + ']');

    //   Lewisham
    var Lewisham = [];
    Lewisham.push(new THREE.Vector2(372, 279));
    Lewisham.push(new THREE.Vector2(384, 273));
    Lewisham.push(new THREE.Vector2(393, 301));
    Lewisham.push(new THREE.Vector2(414, 303));
    Lewisham.push(new THREE.Vector2(440, 343));
    Lewisham.push(new THREE.Vector2(405, 361));
    Lewisham.push(new THREE.Vector2(355, 353));
    Lewisham.push(new THREE.Vector2(382, 322));

    for (var i = 0; i < Lewisham.length; i++) Lewisham[i].multiplyScalar(0.5);
    var LewishamShape = new THREE.Shape(Lewisham);
    LewishamShape.name = "Lewisham";

    console.log('Lewisham');
    for (i = 0; i < Lewisham.length; i++) {

        console.log('[' + Lewisham[i].x + ',' + Lewisham[i].y + '],');
    }
    console.log('[' + Lewisham[0].x + ',' + Lewisham[0].y + ']');


    //Merton
    var Merton = [];
    Merton.push(new THREE.Vector2(225, 345));
    Merton.push(new THREE.Vector2(267, 343));
    Merton.push(new THREE.Vector2(271, 354));
    Merton.push(new THREE.Vector2(306, 373));
    Merton.push(new THREE.Vector2(307, 398));
    Merton.push(new THREE.Vector2(236, 398));

    for (var i = 0; i < Merton.length; i++) Merton[i].multiplyScalar(0.5);
    var MertonShape = new THREE.Shape(Merton);
    MertonShape.name = "Merton";

    console.log('Merton');
    for (i = 0; i < Merton.length; i++) {

        console.log('[' + Merton[i].x + ',' + Merton[i].y + '],');
    }
    console.log('[' + Merton[0].x + ',' + Merton[0].y + ']');


    //Newham
    var Newham = [];
    Newham.push(new THREE.Vector2(398, 197));
    Newham.push(new THREE.Vector2(446, 188));
    Newham.push(new THREE.Vector2(477, 239));
    Newham.push(new THREE.Vector2(463, 256));
    Newham.push(new THREE.Vector2(434, 257));
    Newham.push(new THREE.Vector2(419, 247));
    Newham.push(new THREE.Vector2(406, 233));

    for (var i = 0; i < Newham.length; i++) Newham[i].multiplyScalar(0.5);
    var NewhamShape = new THREE.Shape(Newham);
    NewhamShape.name = "Newham";

    console.log('Newham');
    for (i = 0; i < Newham.length; i++) {

        console.log('[' + Newham[i].x + ',' + Newham[i].y + '],');
    }
    console.log('[' + Newham[0].x + ',' + Newham[0].y + ']');

    // Redbridge
    var Redbridge = [];
    Redbridge.push(new THREE.Vector2(426, 101));
    Redbridge.push(new THREE.Vector2(467, 128));
    Redbridge.push(new THREE.Vector2(515, 108));
    Redbridge.push(new THREE.Vector2(516, 126));
    Redbridge.push(new THREE.Vector2(490, 186));
    Redbridge.push(new THREE.Vector2(464, 197));
    Redbridge.push(new THREE.Vector2(450, 177));
    Redbridge.push(new THREE.Vector2(425, 184));
    for (var i = 0; i < Redbridge.length; i++) Redbridge[i].multiplyScalar(0.5);
    var RedbridgeShape = new THREE.Shape(Redbridge);
    RedbridgeShape.name = "Redbridge";

    console.log('Redbridge');
    for (i = 0; i < Redbridge.length; i++) {

        console.log('[' + Redbridge[i].x + ',' + Redbridge[i].y + '],');
    }
    console.log('[' + Redbridge[0].x + ',' + Redbridge[0].y + ']');


    //RichmondUponThamesI and RichmondUponThamesII
    var RichmondUponThamesI = [];
    var RichmondUponThamesII = [];

    RichmondUponThamesI.push(new THREE.Vector2(114, 329));
    RichmondUponThamesI.push(new THREE.Vector2(155, 322));
    RichmondUponThamesI.push(new THREE.Vector2(160, 306)); //from this


    RichmondUponThamesI.push(new THREE.Vector2(169, 347)); //to this2
    RichmondUponThamesI.push(new THREE.Vector2(165, 397));
    RichmondUponThamesI.push(new THREE.Vector2(142, 379));
    RichmondUponThamesI.push(new THREE.Vector2(119, 376));
    RichmondUponThamesI.push(new THREE.Vector2(115, 371));
    RichmondUponThamesI.push(new THREE.Vector2(128, 339));


    RichmondUponThamesII.push(new THREE.Vector2(168, 303)); //to this
    RichmondUponThamesII.push(new THREE.Vector2(190, 290));
    RichmondUponThamesII.push(new THREE.Vector2(214, 297));
    RichmondUponThamesII.push(new THREE.Vector2(226, 282));
    RichmondUponThamesII.push(new THREE.Vector2(232, 283));
    RichmondUponThamesII.push(new THREE.Vector2(235, 300));
    RichmondUponThamesII.push(new THREE.Vector2(208, 313));
    RichmondUponThamesII.push(new THREE.Vector2(219, 340));
    RichmondUponThamesII.push(new THREE.Vector2(192, 357));
    RichmondUponThamesII.push(new THREE.Vector2(177, 347)); //from this2

    //RichmondUponThamesONE BIG thingy
    /*
    RichmondUponThamesI.push( new THREE.Vector2(114,329));
    RichmondUponThamesI.push( new THREE.Vector2(155,322));
    RichmondUponThamesI.push( new THREE.Vector2(160,306));//from this
    RichmondUponThamesII.push( new THREE.Vector2(168,303));//to this

    RichmondUponThamesII.push( new THREE.Vector2(190,290));
    RichmondUponThamesII.push( new THREE.Vector2(214,297));
    RichmondUponThamesII.push( new THREE.Vector2(226,282));
    RichmondUponThamesII.push( new THREE.Vector2(232,283));
    RichmondUponThamesII.push( new THREE.Vector2(235,300));
    RichmondUponThamesII.push( new THREE.Vector2(208,313));
    RichmondUponThamesII.push( new THREE.Vector2(219,340));
    RichmondUponThamesII.push( new THREE.Vector2(192,357));
    RichmondUponThamesII.push( new THREE.Vector2(177,347));//from this2

    RichmondUponThamesI.push( new THREE.Vector2(169,347));//to this2
    RichmondUponThamesI.push( new THREE.Vector2(165,397));
    RichmondUponThamesI.push( new THREE.Vector2(142,379));
    RichmondUponThamesI.push( new THREE.Vector2(119,376));
    RichmondUponThamesI.push( new THREE.Vector2(115,371));
    RichmondUponThamesI.push( new THREE.Vector2(128,339));

    */



    for (var i = 0; i < RichmondUponThamesI.length; i++) RichmondUponThamesI[i].multiplyScalar(0.5);

    var RichmondUponThamesIShape = new THREE.Shape(RichmondUponThamesI);

    for (var i = 0; i < RichmondUponThamesII.length; i++) RichmondUponThamesII[i].multiplyScalar(0.5);

    var RichmondUponThamesIIShape = new THREE.Shape(RichmondUponThamesII);
    RichmondUponThamesIShape.name = "Richmond upon Thames";
    RichmondUponThamesIIShape.name = "Richmond upon Thames";
    //   Southwark
    var Southwark = [];
    Southwark.push(new THREE.Vector2(331, 258));
    Southwark.push(new THREE.Vector2(375, 255));
    Southwark.push(new THREE.Vector2(380, 264));
    Southwark.push(new THREE.Vector2(360, 272));
    Southwark.push(new THREE.Vector2(372, 323));
    Southwark.push(new THREE.Vector2(347, 349));
    Southwark.push(new THREE.Vector2(335, 318));
    Southwark.push(new THREE.Vector2(344, 302));

    for (var i = 0; i < Southwark.length; i++) Southwark[i].multiplyScalar(0.5);
    var SouthwarkShape = new THREE.Shape(Southwark);
    SouthwarkShape.name = "Southwark";

    console.log('Southwark');
    for (i = 0; i < Southwark.length; i++) {

        console.log('[' + Southwark[i].x + ',' + Southwark[i].y + '],');
    }
    console.log('[' + Southwark[0].x + ',' + Southwark[0].y + ']');

    //Sutton
    var Sutton = [];
    Sutton.push(new THREE.Vector2(238, 403));
    Sutton.push(new THREE.Vector2(306, 404));
    Sutton.push(new THREE.Vector2(315, 451));
    Sutton.push(new THREE.Vector2(293, 482));
    Sutton.push(new THREE.Vector2(259, 452));
    Sutton.push(new THREE.Vector2(248, 459));
    Sutton.push(new THREE.Vector2(228, 415));
    for (var i = 0; i < Sutton.length; i++) Sutton[i].multiplyScalar(0.5);

    var SuttonShape = new THREE.Shape(Sutton);
    SuttonShape.name = "Sutton";

    console.log('Sutton');
    for (i = 0; i < Sutton.length; i++) {

        console.log('[' + Sutton[i].x + ',' + Sutton[i].y + '],');
    }
    console.log('[' + Sutton[0].x + ',' + Sutton[0].y + ']');

    //   TowerHamlets
    var TowerHamlets = [];
    TowerHamlets.push(new THREE.Vector2(354, 245));
    TowerHamlets.push(new THREE.Vector2(354, 227));
    TowerHamlets.push(new THREE.Vector2(393, 209));
    TowerHamlets.push(new THREE.Vector2(395, 234));
    TowerHamlets.push(new THREE.Vector2(411, 249));
    TowerHamlets.push(new THREE.Vector2(401, 252));
    TowerHamlets.push(new THREE.Vector2(404, 268));
    TowerHamlets.push(new THREE.Vector2(392, 271));
    TowerHamlets.push(new THREE.Vector2(383, 247));
    TowerHamlets.push(new THREE.Vector2(354, 247));

    for (var i = 0; i < TowerHamlets.length; i++) TowerHamlets[i].multiplyScalar(0.5);

    var TowerHamletsShape = new THREE.Shape(TowerHamlets);
    TowerHamletsShape.name = "Tower Hamlets";

    console.log('TowerHamlets');
    for (i = 0; i < TowerHamlets.length; i++) {

        console.log('[' + TowerHamlets[i].x + ',' + TowerHamlets[i].y + '],');
    }
    console.log('[' + TowerHamlets[0].x + ',' + TowerHamlets[0].y + ']');

    //WalthamForest
    var WalthamForest = [];
    WalthamForest.push(new THREE.Vector2(399, 79));
    WalthamForest.push(new THREE.Vector2(421, 85));
    WalthamForest.push(new THREE.Vector2(416, 185));
    WalthamForest.push(new THREE.Vector2(392, 190));
    WalthamForest.push(new THREE.Vector2(362, 162));
    for (var i = 0; i < WalthamForest.length; i++) WalthamForest[i].multiplyScalar(0.5);

    var WalthamForestShape = new THREE.Shape(WalthamForest);
    WalthamForestShape.name = "Waltham Forest";

    console.log('WalthamForest');
    for (i = 0; i < WalthamForest.length; i++) {

        console.log('[' + WalthamForest[i].x + ',' + WalthamForest[i].y + '],');
    }
    console.log('[' + WalthamForest[0].x + ',' + WalthamForest[0].y + ']');


    // / Wandsworth
    var Wandsworth = [];
    Wandsworth.push(new THREE.Vector2(239, 305));
    Wandsworth.push(new THREE.Vector2(269, 311));
    Wandsworth.push(new THREE.Vector2(275, 293));
    Wandsworth.push(new THREE.Vector2(300, 289));
    Wandsworth.push(new THREE.Vector2(292, 306));
    Wandsworth.push(new THREE.Vector2(303, 363));
    Wandsworth.push(new THREE.Vector2(274, 350));
    Wandsworth.push(new THREE.Vector2(272, 334));
    Wandsworth.push(new THREE.Vector2(227, 336));
    Wandsworth.push(new THREE.Vector2(219, 315));

    for (var i = 0; i < Wandsworth.length; i++) Wandsworth[i].multiplyScalar(0.5);

    var WandsworthShape = new THREE.Shape(Wandsworth);
    WandsworthShape.name = "Wandsworth";

    console.log('Wandsworth');
    for (i = 0; i < Wandsworth.length; i++) {

        console.log('[' + Wandsworth[i].x + ',' + Wandsworth[i].y + '],');
    }
    console.log('[' + Wandsworth[0].x + ',' + Wandsworth[0].y + ']');

    // Westminster
    var Westminster = [];
    Westminster.push(new THREE.Vector2(252, 226));
    Westminster.push(new THREE.Vector2(283, 219));
    Westminster.push(new THREE.Vector2(302, 246));
    Westminster.push(new THREE.Vector2(318, 247));
    Westminster.push(new THREE.Vector2(304, 276));
    Westminster.push(new THREE.Vector2(295, 278));
    Westminster.push(new THREE.Vector2(291, 258));
    Westminster.push(new THREE.Vector2(277, 261));
    for (var i = 0; i < Westminster.length; i++) Westminster[i].multiplyScalar(0.5);

    var WestminsterShape = new THREE.Shape(Westminster);
    WestminsterShape.name = "Westminster";

    console.log('Westminster');
    for (i = 0; i < Westminster.length; i++) {

        console.log('[' + Westminster[i].x + ',' + Westminster[i].y + '],');
    }
    console.log('[' + Westminster[0].x + ',' + Westminster[0].y + ']');

    //FINANCIAL INCOME DATA FOR 2012/2013
    //MAX and MIN are: 63620[City] , 28780[Newsham]

    selectData();

    let rangeMin = 150;
    let rangeMax = 1;




    let posX = -150;
    let posY = -120;
    let rotX = 0;
    let rotY = 0;
    let rotZ = 0;

    // a = 'varname';
    // str = a+' = '+'123';
    // eval(str);
    // alert(varname);
    //
    // FinIncomeData2013[i].name


    var extrusionData = [];
    var extrudeSettings2 = {
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 2,
        bevelSize: 1,
        bevelThickness: 1
    };
    for (let i = 0; i < 33; i++) {




        let value = THREE.Math.mapLinear(currentArray[i].value, getMaxOfArray(createValArray(currentArray)), getMinOfArray(createValArray(currentArray)), rangeMin, rangeMax);

        let Borough = {
            amount: -value,
            name: currentArray[i].name
        };
        extrusionData.push(Object.assign(Borough, extrudeSettings2));

    }
    console.log("getMinAndMax works " + getMinAndMax(currentArray));
    console.log("Extrusion Data is");
    console.log(extrusionData);

    // controls
    control = new function() {
        this.rotationSpeedX = 0.000;
        this.rotationSpeedY = 0.000;
        this.scale = 1;
        this.scale2 = 1; //0.3

        this.cameraPosX = 0;
        this.cameraPosY = 0;
        this.cameraPosZ = 0;

        this.lookAtX = 0;
        this.lookAtY = 0;
        this.lookAtZ = 0;
    };
    //addControls(control);


    for (let i = 0; i < 32; i++) {

        //addShape( scene.getObjectByName(extrusionData[i].name),  								extrusionData[i], (0.5,0,0), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[i].name);
    }

    // function colorVal(input,index){
    // 		let tempVal=THREE.Math.mapLinear ( currentArray[input].value, getMaxOfArray(createValArray(currentArray)),  getMinOfArray(createValArray(currentArray)) ,360, 250 );
    // 	//	console.log(tempVal);
    //
    // 		let tempStringVal="hsl("+tempVal +", 100%, 50%)";
    // 		colorArray.push({input, tempStringVal});
    // 		return tempStringVal;
    // }

    function colorVal(input) { //360 and 177
        let tempValR = THREE.Math.mapLinear(currentArray[input].value, getMaxOfArray(createValArray(currentArray)), getMinOfArray(createValArray(currentArray)), 0, 255);
        let tempValG = THREE.Math.mapLinear(currentArray[input].value, getMaxOfArray(createValArray(currentArray)), getMinOfArray(createValArray(currentArray)), 26, 245);
        let tempValB = THREE.Math.mapLinear(currentArray[input].value, getMaxOfArray(createValArray(currentArray)), getMinOfArray(createValArray(currentArray)), 0, 70);
        let tempValHSL = THREE.Math.mapLinear(currentArray[input].value, getMaxOfArray(createValArray(currentArray)), getMinOfArray(createValArray(currentArray)), 19, 95);
        let tempStringHSL = "hsl(" + tempValB + ", 100%," + parseInt(tempValHSL) + "%)";
        let tempStringRGB = "rgb(" + parseInt(tempValR) + "," + parseInt(tempValG) + "," + parseInt(tempValB) + ")";

        return tempStringHSL;
    }




    addShape(CityShape, extrusionData[0], colorVal(0), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[0].name);
    addShape(BarkingAndDagenhamShape, extrusionData[1], colorVal(1), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[1].name);
    addShape(BarnetShape, extrusionData[2], colorVal(2), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[2].name);
    addShape(BexleyShape, extrusionData[3], colorVal(3), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[3].name);
    addShape(BrentShape, extrusionData[4], colorVal(4), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[4].name);
    addShape(BromleyShape, extrusionData[5], colorVal(5), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[5].name);
    addShape(CamdenShape, extrusionData[6], colorVal(6), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[6].name);
    addShape(CroydonShape, extrusionData[7], colorVal(7), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[7].name);
    addShape(EalingShape, extrusionData[8], colorVal(8), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[8].name);
    addShape(EnfieldShape, extrusionData[9], colorVal(9), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[9].name);
    addShape(GreenwichShape, extrusionData[10], colorVal(10), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[10].name);
    addShape(HackneyShape, extrusionData[11], colorVal(11), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[11].name);
    addShape(HammersmithAndFulhamShape, extrusionData[12], colorVal(12), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[12].name);
    addShape(HaringeyShape, extrusionData[13], colorVal(13), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[13].name);
    addShape(HarrowShape, extrusionData[14], colorVal(14), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[14].name);
    addShape(HaveringShape, extrusionData[15], colorVal(15), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[15].name);
    addShape(HillingdonShape, extrusionData[16], colorVal(16), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[16].name);
    addShape(HounslowShape, extrusionData[17], colorVal(17), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[17].name);
    addShape(IslingtonShape, extrusionData[18], colorVal(18), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[18].name);
    addShape(KensingtonAndChelseaShape, extrusionData[19], colorVal(19), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[19].name);
    addShape(KingstonUponThamesShape, extrusionData[20], colorVal(20), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[20].name);
    addShape(LambethShape, extrusionData[21], colorVal(21), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[21].name);
    addShape(LewishamShape, extrusionData[22], colorVal(22), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[22].name);
    addShape(MertonShape, extrusionData[23], colorVal(23), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[23].name);
    addShape(NewhamShape, extrusionData[24], colorVal(24), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[24].name);
    addShape(RedbridgeShape, extrusionData[25], colorVal(26), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[26].name);
    addShape(RichmondUponThamesIShape, extrusionData[26], colorVal(26), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[26].name);
    addShape(RichmondUponThamesIIShape, extrusionData[26], colorVal(26), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[26].name);
    addShape(SouthwarkShape, extrusionData[27], colorVal(27), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[27].name);
    addShape(SuttonShape, extrusionData[28], colorVal(28), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[28].name);
    addShape(TowerHamletsShape, extrusionData[29], colorVal(29), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[29].name);
    addShape(WalthamForestShape, extrusionData[30], colorVal(30), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[30].name);
    addShape(WandsworthShape, extrusionData[31], colorVal(31), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[31].name);
    addShape(WestminsterShape, extrusionData[32], colorVal(32), posX, posY, 0, rotX, rotY, rotZ, 1, extrusionData[32].name);

    // console.log(thingy);
    //
    // console.log(thingy.toString());
    // //String(value)
    // //let thingy2= ;
    // console.log(scene.getObjectByName("Bexley"));

    //console.log(scene.getObjectByName("City of London"));



    // stats = new Stats();
    // container.appendChild( stats.dom );

    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);

    //raycaster
    window.addEventListener('mousemove', onMouseMove, false);



  //  window.addEventListener('resize', onWindowResize, false);




    scene.children[1].rotation.y = Math.PI
    scene.children[1].rotation.x = Math.PI;

} //init end

// function onWindowResize() {
//
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//
//     renderer.setSize(window.innerWidth, window.innerHeight);
//
// }

function onMouseMove(event) {

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    mouse.x = (event.clientX / window.innerWidth*1) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight*1) * 2 + 1;

}

function onDocumentMouseDown(event) {

    event.preventDefault();

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
    document.addEventListener('mouseout', onDocumentMouseOut, false);

    mouseXOnMouseDown = event.clientX - windowHalfX;
    targetRotationOnMouseDown = targetRotation;

}

function onDocumentMouseMove(event) {

    mouseX = event.clientX - windowHalfX;

    targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.02;

}

function onDocumentMouseUp(event) {

    document.removeEventListener('mousemove', onDocumentMouseMove, false);
    document.removeEventListener('mouseup', onDocumentMouseUp, false);
    document.removeEventListener('mouseout', onDocumentMouseOut, false);

}

function onDocumentMouseOut(event) {

    document.removeEventListener('mousemove', onDocumentMouseMove, false);
    document.removeEventListener('mouseup', onDocumentMouseUp, false);
    document.removeEventListener('mouseout', onDocumentMouseOut, false);

}

function onDocumentTouchStart(event) {

    if (event.touches.length == 1) {

        event.preventDefault();

        mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
        targetRotationOnMouseDown = targetRotation;

    }

}

function onDocumentTouchMove(event) {

    if (event.touches.length == 1) {

        event.preventDefault();

        mouseX = event.touches[0].pageX - windowHalfX;
        targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.05;

    }

}

//
var positionX = 0;
var positionY = 0;
var positionZ = 0;




function checkVal(boroughVal) {
    for (let i = 0; i < 33; i++) {
        if (boroughVal == currentArray[i].name) {
            return currentArray[i].value;
        }

    }

}
// var obj = { add:function(){ console.log("clicked") }};
// var gui2 = new dat.GUI()
// gui2.add(obj,'add');

function selectData() {
    FinIncomeData2013 = [{
            value: 63620,
            name: "City of London"
        },
        {
            value: 29420,
            name: "Barking and Dagenham"
        },
        {
            value: 40530,
            name: "Barnet"
        },
        {
            value: 36990,
            name: "Bexley"
        },
        {
            value: 32140,
            name: "Brent"
        },
        {
            value: 43060,
            name: "Bromley"
        },
        {
            value: 43750,
            name: "Camden"
        },
        {
            value: 37000,
            name: "Croydon"
        },
        {
            value: 36070,
            name: "Ealing"
        },
        {
            value: 33110,
            name: "Enfield"
        },
        {
            value: 35350,
            name: "Greenwich"
        },
        {
            value: 35140,
            name: "Hackney"
        },
        {
            value: 43820,
            name: "Hammersmith and Fulham"
        },
        {
            value: 35420,
            name: "Haringey"
        },
        {
            value: 38880,
            name: "Harrow"
        },
        {
            value: 36670,
            name: "Havering"
        },
        {
            value: 37040,
            name: "Hillingdon"
        },
        {
            value: 35330,
            name: "Hounslow"
        },
        {
            value: 39790,
            name: "Islington"
        },
        {
            value: 55620,
            name: "Kensington and Chelsea"
        },
        {
            value: 43940,
            name: "Kingston upon Thames"
        },
        {
            value: 38490,
            name: "Lambeth"
        },
        {
            value: 35900,
            name: "Lewisham"
        },
        {
            value: 41960,
            name: "Merton"
        },
        {
            value: 28780,
            name: "Newham"
        },
        {
            value: 36860,
            name: "Redbridge"
        },
        {
            value: 53470,
            name: "Richmond upon Thames"
        },
        {
            value: 37100,
            name: "Southwark"
        },
        {
            value: 39940,
            name: "Sutton"
        },
        {
            value: 34930,
            name: "Tower Hamlets"
        },
        {
            value: 33080,
            name: "Waltham Forest"
        },
        {
            value: 47480,
            name: "Wandsworth"
        },
        {
            value: 47510,
            name: "Westminster"
        }
    ];

    GreenData = [
        //area of greenspace
        {
            value: 4.8,
            name: "City of London"
        },
        {
            value: 33.6,
            name: "Barking and Dagenham"
        },
        {
            value: 41.3,
            name: "Barnet"
        },
        {
            value: 31.3,
            name: "Bexley"
        },
        {
            value: 21.9,
            name: "Brent"
        },
        {
            value: 57.8,
            name: "Bromley"
        },
        {
            value: 24.8,
            name: "Camden"
        },
        {
            value: 37.1,
            name: "Croydon"
        },
        {
            value: 30.9,
            name: "Ealing"
        },
        {
            value: 45.6,
            name: "Enfield"
        },
        {
            value: 34.4,
            name: "Greenwich"
        },
        {
            value: 23.2,
            name: "Hackney"
        },
        {
            value: 19.1,
            name: "Hammersmith and Fulham"
        },
        {
            value: 25.5,
            name: "Haringey"
        },
        {
            value: 34.6,
            name: "Harrow"
        },
        {
            value: 59.3,
            name: "Havering"
        },
        {
            value: 49.2,
            name: "Hillingdon"
        },
        {
            value: 39.6,
            name: "Hounslow"
        },
        {
            value: 12.4,
            name: "Islington"
        },
        {
            value: 15.1,
            name: "Kensington and Chelsea"
        },
        {
            value: 36.4,
            name: "Kingston upon Thames"
        },
        {
            value: 17.3,
            name: "Lambeth"
        },
        {
            value: 22.5,
            name: "Lewisham"
        },
        {
            value: 34.6,
            name: "Merton"
        },
        {
            value: 23.9,
            name: "Newham"
        },
        {
            value: 40.6,
            name: "Redbridge"
        },
        {
            value: 50.8,
            name: "Richmond upon Thames"
        },
        {
            value: 24.9,
            name: "Southwark"
        },
        {
            value: 32,
            name: "Sutton"
        },
        {
            value: 15.2,
            name: "Tower Hamlets"
        },
        {
            value: 31.4,
            name: "Waltham Forest"
        },
        {
            value: 26.9,
            name: "Wandsworth"
        },
        {
            value: 21.5,
            name: "Westminster"
        }
    ];


    switch (controller) {
        case 0:
            currentArray = FinIncomeData2013;
            break;
        case 1:
            currentArray = GreenData;
            break;


    }


}

function animate() {

    camera.lookAt(lookAtX, lookAtY, lookAtZ);

    requestAnimationFrame(animate);


    selectData();


    render();
    camera.position.x += control.cameraPosX;
    camera.position.y += control.cameraPosY;
    camera.position.z += control.cameraPosZ;

    lookAtX += control.lookAtX;
    lookAtY += control.lookAtY;
    lookAtZ += control.lookAtZ;
    //mesh.rotate.y+=1;


    var list = [];
    list = getMinAndMax(currentArray);
    var minBor = currentArray[list[0]];
    var maxBor = currentArray[list[1]];

    if (!obj4.ShowMinMax) {
        //scene.children[1].children[32].material.opacity = 0.1;
        for (let i = 0; i < 34; i++) {

            if (i == list[0] || i == list[1]) {
                continue;
            } else {
                scene.children[1].children[i].material.opacity = 0.1;

            }
            //scene.children[1].children[list[1]].material.opacity = 0.1;

        }

        //console.log("Min "+minBor.name);
        //console.log("Max "+maxBor.name);
        //String(currentArray[25].name)
        //scene.getObjectByName(String(minBor.name)).material.opacity = null;
        //scene.getObjectByName(String(maxBor.name)).material.opacity = null;
        // scene.getObjectByName(String(maxBor.name)).material.uniforms.needsUpdate = true;
        //  maxBor.material.opacity = 0.1;
        // console.log("obj4 "+ minBor);
    } else {
        for (let i = 0; i < 34; i++) {

            scene.children[1].children[i].material.opacity = 1;
            scene.children[1].children[i].material.opacity = 1;

        }
        //scene.getObjectByName(String(minBor.name)).material.opacity = 0.2;
        //scene.getObjectByName(String(maxBor.name)).material.opacity = 0.2;
        // scene.getObjectByName(String(minBor.name)).material.opacity = 0.1;
        // scene.getObjectByName(String(maxBor.name)).material.opacity = 0.1;
        // this.material.uniforms.needsUpdate = true;

    }


}



function render() {
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    // var intersects = raycaster.intersectObjects(scene.children[1].children);
    //
    // for ( var i = 0; i < intersects.length; i++ ) {
    //
    // 	intersects[ i ].object.material.color.set( 0xff0000 );
    //
    // }
    var intersects = raycaster.intersectObjects(scene.children[1].children);

    if (intersects.length > 0) {

        if (INTERSECTED != intersects[0].object) {

            if (INTERSECTED)

                INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
            INTERSECTED = intersects[0].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex(0xffffff);
            // console.log(INTERSECTED.name);
            // console.log(checkVal(String(INTERSECTED.name)));
            switch (controller) {
                case 0:
                    info.innerHTML = '<br>' + INTERSECTED.name + '<br>' + 'Total Income: £' + checkVal(INTERSECTED.name) + '';
                    break;
                case 1:
                    info.innerHTML = '<br>' + INTERSECTED.name + '<br>' + 'Area of Greenspace: ' + checkVal(INTERSECTED.name) + '';
                    break;
            }
        }

    } else {

        if (INTERSECTED) //I dont get how this works
            INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

        //INTERSECTED.material.opacity = 0.9;
        INTERSECTED = null;

    }


    group.rotation.z += (targetRotation - group.rotation.z) * 0.005;
    renderer.render(scene, camera);

}
