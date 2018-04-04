import '../style/main.scss';
import Tesst from './test';

Tesst(()=>{
  // alert("yo")
})

const FF = {
  say_yo(text = "работает"){
    document.write(text);
  },
  yyy: 1
}


let gg = {
  ...FF,
  vv: 4
}

gg.say_yo(" спред !!!");






