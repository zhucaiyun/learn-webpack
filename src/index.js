import { helloWorld } from "./helloWorld";
document.write (helloWorld())
function a () {
  console.log('haha')
}
const b  = new Promise(a())
b.then(()=>{
  console.log('b')
})