const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576


c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.2
class Sprite {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity //measured in m/framerate
        this.height = 150 //why is this defined here?, unlike this.width?
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    update() {
        this.draw()

        this.position.x += this.velocity.x //what...
        this.position.y = this.position.y + this.velocity.y //what is this coding...

        if (this.position.y + this.height + this.velocity.y >= canvas.height) { //axis is opposite of that one in GeoGebra
            //! Will use this, just for the bottom, and not the top
            this.velocity.y = 0
        } else this.velocity.y += gravity
    }
}


const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
})



const enemy = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    }
})


console.log(player)



function animate() {
    window.requestAnimationFrame(animate) //ingenious way to call self
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()
}

animate() //first start


window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            player.velocity.x = 1
            break
    }
    console.log(event.key)
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            player.velocity.x = 0
            break
    }
    console.log(event.key)
})