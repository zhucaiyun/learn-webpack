import { helloWorld } from "./helloWorld";
// import './imgs/jobs.jpg'
// import './index.css'  // 报错；l
import img from './imgs/jobs.jpg'
// import './index.css'  // 报错；l
import './index.scss'
import {a} from './tree-shaking'
document.write('dasd s')
document.write(helloWorld())
console.log('erro console')
const divElement = document.createElement("div");
divElement.className = "my-class";
divElement.innerHTML = "hello"
// function a () {
//   console.log('haha')
// }
// const b  = new Promise(a())
// b.then(()=>{
//   console.log('b')
// })
