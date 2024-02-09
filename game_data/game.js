const can=canvas, ctx = can.getContext("2d");

const W=2160, W2 = W/2;
const H=3840, H2 = H/2;
var CW=W, CH=H, CX, CY, DW=W, DH=H, DX=1, DY=1, SCALE=1;
window.onresize = ()=>{G.needResize=true};

Mouse.newEventListener(can);

const G = {
  sound:true, needResize:true, c_i:0,
  newGame(){
    ClipPlayer.start_idle(bag_fill_1);
    Q.start();
  },
  run(){G.check_if_all_loaded()},
  check_if_all_loaded(){
    for (var v of ClipPlayer.scenes){
      if(v.readyState < 4) return
    }
    for (var m of Img_arr) if(!(m.complete && m.naturalHeight !== 0)) return; // check if all images loaded
    for (var s of Sound_arr) if(!s.ready) return; // check if all sounds loaded
    // if all loaded, replace function G.run by G.loop
    G.run=G.loop;
    G.newGame();

  },
  loop(){
    G.resizeCan();
    resetTransform();
    var c = ctx;
    c.textAlign = "left"; c.textBaseline = "top"; c.font = "bold 30px font1"; c.fillStyle = "#8B0000";
    c.fillStyle = '#a66b5d'; c.fillRect(0, 0,W,H);
    G.draw_bg();
  },
  draw_bg(){
    var c = ctx;
    ClipPlayer.draw();
    Q.draw();
  },
  resizeCan(){
    if(G.needResize){
      var w, h;
      w = CW = can.width = window.innerWidth;
      h = CH = can.height = window.innerHeight;
      if(w/h>W/H){
        var wh =  (W/H) / (w/h);
        w = Math.floor(w*wh);
        SCALE=h/H;
      }
      else {
        var wh = (H/W) / (h/w);
        h = Math.floor(h*wh);
        SCALE=w/W;
      }
      CX=Math.floor((CW-w)/2);
      CY=Math.floor((CH-h)/2);
      DX=Math.floor(CX/SCALE);
      DY=Math.floor(CY/SCALE);
      DW=w; DH=h;

      G.needResize = false;
    }
  },
};

//W.after_submit(); alert(1);
const Q = {
  c_i:0,
  start(){
    var t = this;
    t.alp.logo = {delay:20, i:0, e:20};
    t.alp.screen_frame = {delay:40, i:0, e:20};
    t.alp.intro_box = {delay:60, i:0, e:20};
    //t.alp.intro_box = {delay:0, i:0, e:1};
    t.step = 0;
    setTimeout(function () {
      //t.reveal(0);
    }, 2000);
  },
  draw(){
    var t = this, c = ctx;
    t.setAlp("logo"); t.draw_m(img.logo, W2, 250, 0.7);
    t.setAlp("screen_frame"); c.drawImage(img.screen_frame, 0, 0, W, H);
    t[`d_step`+t.step]();
    c.globalAlpha = 1;
  },
  setAlp(n){
    var t = this, o = t.alp[n], c = ctx;
    if(o.delay > 0){
      c.globalAlpha = 0;
      o.delay--;
    }
    else if(o.i == o.e) c.globalAlpha = 1;
    else {
      c.globalAlpha = o.i/o.e;
      o.i++;
    }
  },
  draw_m(m, x, y, s){
    var t = this, c = ctx, w = m.width*s, h = m.height*s, w2 = w/2;
    c.drawImage(m, x-w2, y, w, h);

  },
  alp:{},
  next_step(){
    var t = this;
    t.step++;
    t.alp.intro_box = {delay:10, i:0, e:20};
  },
  d_step0(){
    var t = this, c = ctx, x = W2, y = H-750, rd = t.alp.intro_box.i == t.alp.intro_box.e;
    t.setAlp("intro_box"); t.draw_m(img.intro_box, x, y, 1);
    if(rd && DrawBtn(x, y+330, 800, 200, "Let's get started") && mld){
      t.next_step();
      ClipPlayer.start_play(bag_fill_1);
      Pmusic("music");
      Psound("click")
    }
  },
  d_step1(){
    var t = this, c = ctx, x = W2, y = H-1250, rd = t.alp.intro_box.i == t.alp.intro_box.e;
    t.setAlp("intro_box"); t.draw_m(img.question_box, x, y, 1);
    c.textAlign = "center"; c.textBaseline = "middle"; c.font = "bold 70px font1"; c.fillStyle = "#a66b5d"
    var d = QUESTION[1-1], y1 = y+100;
    for (var text of d.title) {
      c.fillText(text, x, y1);
      y1 += 70;
    }
    var y1 = y+300;
    for (var text of d.answers) {
      if(DrawBtn(x, y1, 1600, 200, text) && rd && mld){ t.next_step(); Psound("click")} y1 += 225;
    }
    if(mld && t.step != 1){ClipPlayer.start_play(bag_fill_2);}
  },
  d_step2(){
    var t = this, c = ctx, x = W2, y = H-1250, rd = t.alp.intro_box.i == t.alp.intro_box.e;
    t.setAlp("intro_box"); t.draw_m(img.question_box, x, y, 1);
    c.textAlign = "center"; c.textBaseline = "middle"; c.font = "bold 70px font1"; c.fillStyle = "#a66b5d"
    var d = QUESTION[2-1], y1 = y+100;
    for (var text of d.title) {
      c.fillText(text, x, y1);
      y1 += 75;
    }
    var y1 = y+300;
    for (var text of d.answers) {
      if(DrawBtn(x, y1, 1600, 200, text) && rd && mld){ t.next_step(); Psound("click")} y1 += 225;
    }
    if(mld && t.step != 2){ClipPlayer.start_play(bag_fill_3);}
  },
  d_step3(){
    var t = this, c = ctx, x = W2, y = H-1250, rd = t.alp.intro_box.i == t.alp.intro_box.e;
    t.setAlp("intro_box"); t.draw_m(img.question_box, x, y, 1);
    c.textAlign = "center"; c.textBaseline = "middle"; c.font = "bold 70px font1"; c.fillStyle = "#a66b5d"
    var d = QUESTION[3-1], y1 = y+150;
    for (var text of d.title) {
      c.fillText(text, x, y1);
      y1 += 75;
    }
    var y1 = y+300;
    for (var text of d.answers) {
      if(DrawBtn(x, y1, 1600, 300, text) && rd && mld){ t.next_step(); Psound("click")} y1 += 325;
    }
    if(mld && t.step != 3){ClipPlayer.start_play(bag_fill_4);}
  },
  d_step4(){
    var t = this, c = ctx, x = W2, y = H-1250, rd = t.alp.intro_box.i == t.alp.intro_box.e;
    t.setAlp("intro_box"); t.draw_m(img.question_box, x, y, 1);
    c.textAlign = "center"; c.textBaseline = "middle"; c.font = "bold 70px font1"; c.fillStyle = "#a66b5d"
    var d = QUESTION[4-1], y1 = y+100;
    for (var text of d.title) {
      c.fillText(text, x, y1);
      y1 += 75;
    }
    var y1 = y+300;
    for (var text of d.answers) {
      if(DrawBtn(x, y1, 1600, 200, text) && rd && mld){ t.next_step(); Psound("click")} y1 += 225;
    }
    if(mld && t.step != 4){ClipPlayer.start_play(bag_fill_5);}
  },
  d_step5(){
    var t = this, c = ctx, x = W2, y = H-1250, rd = t.alp.intro_box.i == t.alp.intro_box.e;
    t.setAlp("intro_box"); t.draw_m(img.question_box, x, y, 1);
    c.textAlign = "center"; c.textBaseline = "middle"; c.font = "bold 70px font1"; c.fillStyle = "#a66b5d"
    var d = QUESTION[5-1], y1 = y+100;
    for (var text of d.title) {
      c.fillText(text, x, y1);
    }
    var y1 = y+250, x1 = x - 380;
    for (var text of d.answers) {
      if(DrawBtn(x1, y1, 700, 160, text) && rd && mld){ t.next_step(); Psound("click")}
      if(x1<x) x1 = x + 380;
      else {
        y1 += 185; x1 = x - 380;
      }
    }
    if(mld && t.step != 5){ClipPlayer.start_play(bag_fill_6);}
  },
  d_step6(){
    var t = this, c = ctx, x = W2, y = H-1250, rd = t.alp.intro_box.i == t.alp.intro_box.e;
    t.setAlp("intro_box"); t.draw_m(img.question_box, x, y, 1);
    c.textAlign = "center"; c.textBaseline = "middle"; c.font = "bold 70px font1"; c.fillStyle = "#a66b5d"
    var d = QUESTION[6-1], y1 = y+100;
    for (var text of d.title) {
      c.fillText(text, x, y1);
      y1 += 75;
    }
    var y1 = y+250, x1 = x - 380, i = 0;
    for (var text of d.answers) {
      if(DrawBtn2(x1, y1, 700, 200, text) && rd && mld){ t.next_step(); t.c_i=i; Psound("click")}
      if(x1<x) x1 = x + 380;
      else {
        y1 += 225; x1 = x - 380;
      }
      i++;
    }
    if(mld && t.step != 6){ClipPlayer.start_play(bag_fill_7);}
  },
  d_step7(){
    var t = this, cp = ClipPlayer;
    if(cp.v.currentTime == cp.v.duration){
      ClipPlayer.start_play(bag_fill_8);
      t.next_step();
      Modal.open();
    }
  },
  d_step8(){
    var t = this, e = document.getElementById("mce-success-response");
    if(e && e.style.display != "none"){
      t.after_submit();
    }
  },
  d_step9(){
    var t = this, c = ctx, x = W2, y = H-1250, rd = t.alp.intro_box.i == t.alp.intro_box.e;
    t.setAlp("intro_box"); t.draw_m(img.end_box, x, y, 1);
    if(DrawBtn(x+450, y+750, 600, 160, "Shop now") && rd && mld) {
      window.open('https://www.tobysestate.com.au/shop/coffee', '_blank');
      Smusic("music");
    }
    var y1 = y+215, ss = ["Viva La Cumbre! A beautiful country", "with beautiful and bold coffee."];
    c.textAlign = "center"; c.textBaseline = "middle"; c.font = "bold 90px font2"; c.fillStyle = "#a66b5d"
    c.fillText(t.r.m_n, x, y1); y1 += 135;
    c.font = "60px font2";
    for (var text of t.r.m_t) {
      c.fillText(text, x, y1, W*0.75);
      y1 += 75;
    }
  },
  after_submit(){
    var t = this;
    t.reveal(t.c_i);
    Modal.close();
  },
  reveal(i){
    var t = this, o = FT.list[i], r = FT.v[choose(o.t)];
    r = FT.v[2]
    t.r = r;
    t.step = 9;
    ClipPlayer.start_play(r.v);
  },
};

const FT = {
  list:[
    {t:[0,1,2], a:["...who’s strong and bold"]},
    {t:[0,2], a:["...with a lot of layers.", "I like figuring them out"]},
    {t:[3], a:["...with a lot of SPUNK!"]},
    {t:[0], a:["...rich"]},
    {t:[4,1], a:["...elegant & regal"]},
    {t:[4,5], a:["...who’s sweet & mellow"]},
  ],

  v:[
    {i:0, n:"Costa Rica espresso", v:COSTARICA, m_n:"LA CUMBRE COSTA RICA", m_t:["Viva La Cumbre! A beautiful country", "with beautiful and bold coffee."]},
    {i:1, n:"Nicaragua filter", v:NICARAGUA, m_n:"LOS JILGUEROS NICARAGUA", m_t:["This filter coffee is well-balanced and smooth,", "with a depth of flavour that will have you hankering for more."]},
    {i:2, n:"Ethiopia Yirgacheffe", v:ETHIOPIA, m_n:"YIRGACHEFFE KOKE ETHIOPIA", m_t:["You won’t regret trying this Yirgacheffe", "from Ethiopia, a stacked (thick-stacked) coffee with", "natural flavours you’ve come to expect from this region."]},
    {i:3, n:"El Salvador espresso", v:ELSALVADOR, m_n:"REFORMA EL SALVADOR", m_t:["Get ready for a blast of flavour with this", "Washed El Salvador Bourbon from La Reforma!"]},
    {i:4, n:"Ethiopia gesha filter", v:ETHIOPIA100, m_n:"GESHA VILLAGE LOT 111 ETHIOPIA", m_t:["It’s a coffee that deserves to be savoured,", "paired with a fancy breakfast and a scenic view."]},
    {i:5, n:"Burundi filter", v:BURUNDI, m_n:"YAGIKAWA BURUNDI", m_t:["Don’t miss your chance to taste this Washed Bourbon", "from Burundi, a rare and exquisite origin."]},
  ],
};

function Psound(s) {if(G.sound) playSound(sound[s]);}
function Pmusic(s) {if(G.sound) playMusic(sound[s]);}
function Smusic(s) {stopSound(sound[s]);}
function resetTransform(){
  var c = ctx;
  c.resetTransform();
  c.translate(CX, CY);
  c.scale(SCALE, SCALE);
}
var sound = {
  click:loadSound(PATH+"click.mp3"),
  music:loadSound(PATH+"music.mp3"),
};
var img = {
  screen_frame:newImage('screen_frame.png'),
  question_box:newImage('question_box.png'),

  logo:newImage('logo.png'),
  intro_box:newImage('intro_box.png'),
  end_box:newImage('end_box.png'),
};

var fpsInterval=1000/30, then = Date.now(), elapsed;
function animate() {
  requestAnimationFrame(animate); // request another frame
  var now = Date.now(); elapsed = now - then; // calc elapsed time since last loop
  // if enough time has elapsed, draw the next frame
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval); // Get ready for next frame by setting then=now, but also, adjust for fpsInterval not being multiple of 16.67
    /* Mouse */Mouse.UpdateShortKeys();
    G.run();
    /* Mouse */Mouse.Update();
  }
}
animate();

const Modal = {
  open(){
    myModal.style.display = "block";
  },
  close(){
    myModal.style.display = "none";
  },
  href(){
    var s = document.getElementById("mce-EMAIL").value.trim();
    if(validateEmail(s)){
      location.href = `https://www.tobysestate.com.au`;
    }
  },
};
//Modal.open();

const ClipPlayer = {
  start_idle(v){
    var t = this;
    t.v = v;
    v.pause();
    v.currentTime = 0;
  },
  start_play(v){
    var t = this;
    t.v = v;
    v.currentTime = 0;
    v.play();
  },
  draw(){
    var t = this, c = ctx, v = t.v;
    c.drawImage(v, 0, 0, W, H);
  },

  scenes:[
    bag_fill_1,
    bag_fill_2,
    bag_fill_3,
    bag_fill_4,
    bag_fill_5,
    bag_fill_6,
    bag_fill_7,
    bag_fill_8,
    BURUNDI,
    COSTARICA,
    ELSALVADOR,
    ETHIOPIA,
    ETHIOPIA100,
    NICARAGUA,
  ],
};

const ClipPlayer2 = {
  target:undefined, state:'stop', active:false, text_pop_timer:0,

  reset(){
    var t = this;
    if(t.target){
      t.target.pause();
      t.target.currentTime = 0;
      t.target = undefined;
      t.state = 'stop';
    }
  },
  volume(v){
    var t = this;
    if(t.target){
      t.target.volume = v;
    }
  },
  update(){
    var t = this, s = t.scenes[lvl_i];
    t.active = false;
    if(G.state == "game" && t.state == 'start'){
      var v = s.v;
      if (!v.paused && !v.ended) {
        t.active = true; Music.stop();
      }
      else {
        t.state = 'stop';
        if(s.on_start){
          if(music_wait){
            Music.play();
            music_wait = false;
            //setTimeout(function () {hero.set_beat_boss();}, 500);
          }
        }
        if(G.level_complete) G.next_level();
      }
    }
  },
  start(on_start){
    var t = this, s = t.scenes[lvl_i];
    t.reset();
    if(on_start){
      if(s.on_start){
        ClipPlayer.reset();
        t.target = s.v;
        t.target.currentTime = 0;
        //t.target.currentTime = t.target.duration-1;
        t.volume(G.sound?1:0);
        t.target.play();
        t.state = 'start';
        t.text_pop_timer = 80;
        t.active = true;
      }
      else {
        t.text_pop_timer = 80;
        Music.play();
      }
    }
    else {
      if(s && !s.on_start){
        ClipPlayer.reset();
        t.target = s.v;
        //t.target.currentTime = t.target.duration-1;
        t.target.currentTime = 0;
        t.volume(G.sound?1:0);
        t.target.play();
        t.state = 'start';
      }
      else {
        G.next_level();
      }
    }
  },
  draw(){
    var t = this, c = p_ctx, s = t.scenes[lvl_i];
    if(t.state == 'start'){
      var v = s.v;
      if (!v.paused && !v.ended) {
        c.drawImage(v, dx, dy, W, H);
      }
    }
  },
  scenes:[
    bag_fill_1,
    bag_fill_2,
    bag_fill_3,
    bag_fill_4,
    bag_fill_5,
    bag_fill_6,
    bag_fill_7,
    bag_fill_8,
    BURUNDI,
    COSTARICA,
    ELSALVADOR,
    ETHIOPIA,
    ETHIOPIA100,
    NICARAGUA,
  ],
};
