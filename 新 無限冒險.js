// 自動補血魔 自動打開自動戰鬥
// 切回主頁繼續執行腳本
// 自動清除error訊息 (in console)
// 回復健康度 付費/免費 切換按鈕

//可調變數
var looptime = 1000; //一個循環幾毫秒
var healHP = 20; // HP低於幾%才休息
var healMP = 20; // MP低於幾%才休息
var healFreeHealth = 25 // 免費時健康度低於多少才休息
var healPayHealth = 90 // 付費時健康度低於多少才休息
var init = 0; // 起始要住馬廄還是住房間 //1為免費 0為付費

//勿動變數
var timecount = 0;
var healHealth = healFreeHealth;
var HealthWay = 1 //1為免費 0為付費
var HpMp = document.getElementsByClassName("percentage_display");
var menubtn = document.getElementsByClassName("el-menu-item");
document.getElementsByClassName("el-menu-item")[0].setAttribute("onclick","mainloop();");
function mainloop(){
  var restbtn = document.getElementsByClassName("el-button el-tooltip el-button--success el-button--medium")[0];
  var autobtn = document.getElementsByClassName("el-switch__core")[0];
  var autobtn_c = document.getElementsByClassName("el-switch is-checked");
  var health_value = document.getElementsByClassName("attr")[12];
  var errors = document.getElementsByClassName("el-message el-message--error");
  (function loop() {
      setTimeout(
        function () {
          if(parseInt(HpMp[0].textContent.match(/\d+/)[0] ) < parseInt(HpMp[0].textContent.match(/\/\d+/)[0].split("/")[1]) * healHP / 100 || 
             parseInt(HpMp[1].textContent.match(/\d+/)[0] ) < parseInt(HpMp[1].textContent.match(/\/\d+/)[0].split("/")[1]) * healMP / 100){
              restbtn.click();
          }
          if(autobtn_c.length == 0){
              autobtn.click();
          }
          if(health_value.textContent.match(/\d+/)[0] < healHealth){
              health();
          }
          if(errors.length > 0){
              console.clear();
          }
          if(true){
              let dt = new Date();
              menubtn[0].textContent = '現在時間 :' + dt.getHours()+' : '+dt.getMinutes()+' : '+dt.getSeconds()+" 總時間 : "+ timecount
              delete dt;
          }
          timecount += looptime / 1000;
          loop();
        }
      , looptime );
  }() );
}

function switchHealth(){
  if(HealthWay == 1){
    HealthWay = 0;
    chose_Health.innerHTML = "住房間";
    healHealth = healPayHealth
  }else{
    HealthWay = 1;
    chose_Health.innerHTML = "住馬廄";
    healHealth = healFreeHealth;
  }
}

function health(){
  let m = 0;
  for(var i = 0; i < menubtn.length; ++i){
    if(menubtn[i].textContent == '旅店')
          m = i;
  }
  let tmpMenu = document.getElementsByClassName("el-menu-item");
  setTimeout(function(){tmpMenu[m].click()}, 1)
  setTimeout(function(){document.getElementsByClassName("el-button el-button--primary")[HealthWay].click()}, 1000)
  setTimeout(function(){tmpMenu[0].click()}, 2000)
}

var header = document.getElementsByClassName("el-menu--horizontal el-menu")[0];
var divv = document.createElement("div");
divv.setAttribute("style", "color:#D68B00;");
divv.innerHTML = "目前模式(點擊切換):"
header.appendChild(divv);
var chose_Health = document.createElement("button");
chose_Health.classList.add("el-button"); 
chose_Health.classList.add("el-button--primary1"); 
chose_Health.classList.add("el-button--medium");
chose_Health.innerHTML = "住馬廄";
chose_Health.setAttribute ("onclick", "switchHealth();" );
header.appendChild(chose_Health);

if(init == 0) switchHealth();

mainloop();
