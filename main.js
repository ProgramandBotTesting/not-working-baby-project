objects = [];

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);

    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = 'Status: detecting objects';
}

function preload() {
    img = loadImage('https://static.scientificamerican.com/blogs/cache/file/7069F0BB-A9AB-4932-84F508BBC0136458_source.jpg?w=590&h=800&F754D658-CE37-41EE-BE2C0EFC7134D582');
}

function draw() {
    image(video, 0, 0, 380, 380);

    if (status != false) {
        r = random(255);
        g = random(255);
        b = random(255);
        object_detector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById('status').innerHTML = "Status: object detected";
            document.getElementById('no_objects').innerHTML = "Number of objects detected are" + objects.length;
            fill(r, g, b);
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
        
    }
}

function modelLoaded() {
    console.log('boring');

    status = true;
}

function gotResult(err, results) {
    objects = results;
    if (err) return console.log(err);
    if (!err) return console.log(results);
}