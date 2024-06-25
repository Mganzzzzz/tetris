import './style.css'
import {Scene} from "./scene.ts";

const setupCanvas = () => {
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <canvas class="app"></canvas>
  </div>
`

}

function main() {
    setupCanvas()
    const scene = new Scene()
    scene.init()
    const loop = () => {

        requestAnimationFrame(() => {
            scene.update()
            scene.draw()
            loop()
        })
    }
    loop()
}


main()
