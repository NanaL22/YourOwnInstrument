let mainFont;

let resetButton;
let directToExt;

let rgbColor;
let mainH; let mainS; let mainB;


let startingPage = true;
let startingImg;
let starting;
//추가: 
//startingPage soundEffects
let doorBell; let doorOpening;
let family; let knock; let snowStepping; let streetLamp;
//bgm
let startingBGM;

let insideBGM;
//단계 추가: withMasterPage
let withMasterPage = false;
let withMasterImg;
let withMaster;
let master1;
let footStep;

//단계 추가: extractGuidePage
let extractGuidePage = false;
let extractGuideImg;
let extractGuide;
let master2;
let cleaning;
//

let extractorPage = false;
let extractorImg;
let extractor;
let cam;

let between;
let betweenExtToDraw = false;

let drawingPage_1 = false;
let drawingPage_2 = false;
let drawingApp;
let textManager;

let myGraph;

//
let loadingImage;
let drawingPage_3 = false;
let developingPage = false;
//

let analyzeParaPage = false;
let analyzePara;

let betweenDrawToPlay = false;


let playPage = false;
// Play Page
let masterImg2;
let insideWorkshopImg;
let pressedKeys = new Set();
//

let betweenPlayToMusician = false;

// Musician Page
let musicianPage = false;
let streetImg;
let musicianImg1;
let musicianImg2;
let musicianImg3;
//
let crowd;

// Save and Load Page
let saveAndLoadPage = false;
let musicianHome;
let saveAndLoad;

let winds = [];
let strings = [];
let keyboards = [];
let guitars = [];
let organs = [];
let brass = [];
let myInst;



function preload() {
  mainFont = loadFont("assets/YeongdeokBlueroad.otf");

  //수정된 이미지로 변경하여 로드
  startingImg = loadImage("assets/workshop_outside.png");
  withMasterImg = loadImage("assets/workshop_inside.png");
  master1 = loadImage("assets/master_1.png");
  extractGuideImg = loadImage("assets/table_mess.png");
  master2 = loadImage("assets/master_2.png");
  extractorImg = loadImage("assets/table_clean.png");
  cam = createCapture(VIDEO);
  cam.hide();

  penImage = loadImage('assets/pen.png');
  eraserImage = loadImage('assets/eraser.png');

  // 작업대 이미지 파일 불러오기
  tableImage = loadImage('assets/table_clean.PNG');

  // 로딩 화면 이미지 파일 불러오기
  loadingImage = loadImage('assets/table_mess.PNG');
  silenceSound = loadSound('assets/silence.mp3');

  // Play Page images
  // masterImg2 = loadImage("assets/master_2.png")
  insideWorkshopImg = loadImage("assets/workshop_inside.png")
  //

  // Musician Page images
  streetImg = loadImage("assets/street.png");
  musicianImg1 = loadImage("assets/musician_normal.png");
  musicianImg2 = loadImage("assets/musician_surprised.png");
  musicianImg3 = loadImage("assets/musician_smile.png");
  //

  //saveAndLoad Page images
  musicianHome = loadImage("assets/musicianHome.png")

  // 우상단 텍스트에 따라 나오는 효과음
  textSound1 = loadSound('assets/drawing.mp3'); // 도면 그리는 효과음
  textSound2 = loadSound('assets/cutting.mp3'); // 나무 자르는 효과음
  textSound3 = loadSound('assets/tuning.mp3');  // 악기 조율하는 효과음

  // 펜과 지우개 사용 시 나오는 효과음
  textSound4 = loadSound('assets/drawing2.mp3'); // 펜 사용 시 효과음
  textSound5 = loadSound('assets/erasing.mp3'); // 지우개 사용 시 효과음



  for (let i = 1; i <= 4; i++) {
    for (let j = 1; j <= 13; j++) {
      let windsFilename = 'assets/winds/winds' + i + '_' + j + '.mp3';
      winds.push(loadSound(windsFilename));

      let stringsFilename = 'assets/strings/strings' + i + '_' + j + '.mp3';
      strings.push(loadSound(stringsFilename));

      let keyboardsFilename = 'assets/keyboards/keyboards' + i + '_' + j + '.mp3';
      keyboards.push(loadSound(keyboardsFilename));

      let guitarsFilename = 'assets/guitars/guitars' + i + '_' + j + '.mp3';
      guitars.push(loadSound(guitarsFilename));

      let organsFilename = 'assets/organs/organs' + i + '_' + j + '.mp3';
      organs.push(loadSound(organsFilename));

      let brassFilename = 'assets/brass/brass' + i + '_' + j + '.mp3';
      brass.push(loadSound(brassFilename));
    }
  }

  //추가: soundEffects
  doorBell = loadSound('assets/doorBell.mp3');
  doorOpening = loadSound('assets/doorOpeningnClosing.mp3');
  family = loadSound('assets/family.mp3');
  knock = loadSound('assets/knock.mp3');
  snowStepping = loadSound('assets/snowStepping.mp3');
  streetLamp = loadSound('assets/streetLamp.mp3');
  footStep = loadSound('assets/footStep.mp3');
  cleaning = loadSound('assets/cleaning.mp3');

  startingBGM = loadSound('assets/startingBGM.mp3');
  insideBGM = loadSound('assets/insideBGM.mp3');

  crowd = loadSound('assets/crowd.mp3');
  //
}


function setup() {
  createCanvas(1000, 750);
  textFont(mainFont);
  resetButton = new ResetButton();
  directToExt = new DirectToExt();
  between = new Between();

  starting = new Starting(startingImg);
  //추가된 페이지들
  withMaster = new WithMaster(withMasterImg);
  extractGuide = new ExtractGuide(extractGuideImg);
  //
  extractor = new Extractor(extractorImg);

  drawingApp = new DrawingApp();
  textManager = new TextManager();

  myGraph = new MyGraph();

  analyzePara = new AnalyzePara();

  // Create Play object
  let playPageImages = [insideWorkshopImg, master1, master2];
  play = new Play(playPageImages);
  //

  // Create Musician object
  let musicianPageImages = [streetImg, musicianImg1, musicianImg2, musicianImg3];
  musician = new Musician(musicianPageImages);
  //  

  saveAndLoad = new SaveAndLoad()
}

function draw() {
  if (startingPage) {
    colorMode(RGB);
    starting.bgm();
    starting.show();
    starting.soundEffect();
    starting.coloring();
    starting.toTheWorkshop();
    starting.flip();
  } else if (withMasterPage) { // 추가된 페이지
    withMaster.bgm();
    withMaster.show();
    withMaster.messages();
    withMaster.nextMessage();
    withMaster.skip();
    withMaster.flip();

  } else if (extractGuidePage) { //추가된 페이지
    // extractGuide.bgm();
    withMaster.bgm();
    extractGuide.show();
    extractGuide.messages();
    extractGuide.nextMessage();
    extractGuide.skip();
    extractGuide.flip();
  }
  else if (extractorPage) { //기능 변경 & nextPage 삭제
    withMaster.bgm();
    extractor.select();
    extractor.check();
    extractor.final();
    extractor.extracting();
    extractor.nextButton();
    extractor.decide();
  } else if (betweenExtToDraw) {
    between.extToDraw();
  }  else if (drawingPage_1) {
    colorMode(HSB);
    drawingApp.drawFrame();
    drawingApp.penSetting();
    drawingPage_1 = false;
    drawingPage_2 = true;
  } else if (drawingPage_2) {
    withMaster.bgm();
    colorMode(HSB);
    drawingApp.draw();
    textManager.complete();
    myGraph.drawingAppGraph();
    // textManager.draw();
  } else if (drawingPage_3) { // 그림 그리기 완료 후 나오는 대화창 전용 시퀀스 새로 생성하였음
    withMaster.bgm();
    cursor(); // 커서 돌려 놓기 (playPage에 있던 것을 여기로 옮김)
    drawingApp.toNextPage();
  } else if (developingPage) {
    withMaster.bgm();
    colorMode(HSB);
    // background(themeColor);
    drawingApp.toNextNextPage();
    //textManager.draw();
  } else if (analyzeParaPage) {
    analyzePara.show();
    analyzePara.result();
    analyzePara.nextButton();
  } else if (betweenDrawToPlay) {
    between.drawToPlay();
  } else if (playPage) {
    colorMode(HSB, 360, 100, 100, 1);
    cursor();
    background(themeColor);
    // myInst.show();
    play.show(); // 추가
  } else if (betweenPlayToMusician) {
    between.playToMusician();
  } else if (musicianPage) { // 추가
    colorMode(HSB, 360, 100, 100, 1);
    musician.show();
  } else if (saveAndLoadPage) {
    console.log("showOK")
    saveAndLoad.show();
  }

  if (!startingPage) {
    colorMode(RGB);
    resetButton.show();
  }
  if (withMasterPage || extractGuidePage) {
    directToExt.show();
  }
}

function mouseClicked() {
  if (startingPage) {
    starting.switch();

    // if (mouseX > starting.buttonX -30 && mouseX < starting.buttonX +30 && mouseY > starting.buttonY - 15 && mouseY < starting.buttonY +15) {
    //   startingPage = false;
    //   extractorPage = true;
    // }
  } else if (withMasterPage) {
    withMaster.toNextMessage();
  } else if (extractGuidePage) {
    extractGuide.toNextMessage();
  } else if (extractorPage) {
    extractor.clickToDecide();
  } else if (betweenExtToDraw) {
    between.extToDraw();
  } else if (drawingPage_2) {
    drawingApp.mouseClicked();
    textManager.mouseClicked();
  } else if (drawingPage_3) {
    drawingApp.mouseClicked();
  } else if (analyzeParaPage) {
    analyzePara.next();
    analyzePara.checkSound();
  }
  // else if (developingPage) {
  //   drawingApp.mouseClicked();
  // } 
  else if (playPage) { // 추가
    play.mouseClicked();
  } else if (musicianPage) { // 추가
    musician.mouseClicked();
  } else if (saveAndLoadPage) {
    saveAndLoad.mouseClicked();
  }

  if (!startingPage) {
    resetButton.backToStart();
  }
  if (withMasterPage || extractGuidePage) {
    directToExt.jumpToExt();
  }
}



function mouseReleased() {
  if (drawingPage_2) {
    drawingApp.mouseReleased();
  }
}

function mouseDragged() {
  if (drawingPage_2) {
    drawingApp.mouseDragged();
  }
}

function keyPressed() {
  if (playPage) play.keyPressed(); // 수정

  if (keyCode === ESCAPE) {
    cursor();
    starting = new Starting(startingImg, width / 2, height / 2);
    startingPage = true; withMasterPage = false; extractGuidePage = false; extractorPage = false;
    drawingPage_1 = false; drawingPage_2 = false; drawingPage_3 = false; developingPage = false; playPage = false;

    starting.reset(); withMaster.reset(); drawingApp.reset(); textManager.reset();
    zoomToFlip = 0; flipFadeIn = 0; masterMessage = 1;

    textStartY = 450; pNotes = [];

    cam = createCapture(VIDEO);
    cam.hide();

    // 추가
    play.init();
    musician.init();
    //

    drawingApp.textIndex = 0;
    musician.player.stop();
  }
}


// 수정
function keyReleased() {
  if (playPage) play.keyReleased(); // 수정
}

