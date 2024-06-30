import './style.css'
import {Scene} from "./scene.ts";
import {GameCanvas} from "./game-canvas.ts";

const setupCanvas = () => {
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <canvas class="app" width="200" height="600"></canvas>
  </div>
`

}

function main() {
    setupCanvas()
    const canvas = document.querySelector('.app')! as HTMLCanvasElement;
    const gameCanvas= GameCanvas.new(canvas);
    const scene = new Scene()
    scene.init()
    const loop = () => {

        requestAnimationFrame(() => {
            gameCanvas.clean()
            scene.update()
            scene.draw()
            loop()
        })
    }
    loop()
}


main()
