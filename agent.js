class Agent {

  constructor(crazy, name) {
    this.x = random(0, width);
    this.y = random(0, height);
    //     orientation
    this.o = random(0, TWO_PI);
    //     velocity
    this.v = 0.67 * 5 * 4;
    // how far agent can see 5
    this.r = 10
    //     turning characteristic
    this.a = PI * 2.001 * 4;
    //     neighborly influence on a
    this.b = radians(17 * 0.55);
    //     size of agent
    this.radius = 15

    this.colr = 0
    this.colg = 205
    this.colb = 50
    this.crazy = crazy || false
    this.name = name
  }

  show() {
    fill(agents[i].colr, agents[i].colg, agents[i].colb);
    ellipse(this.x, this.y, this.radius);
    fill(map(this.colr, 0, 255, 255, 0), map(this.colg, 0, 255, 255, 0) - 205, map(this.colb, 0, 255, 255, 0) - 50)
    textAlign(CENTER)
    textSize(this.radius / 2.59)
    // textSize(100)
    if (this.name) text(this.name, this.x, this.y)
    // var ox = this.radius / 2 * cos(this.o) + this.x;
    // var oy = this.radius / 2 * sin(this.o) + this.y;
    // line(this.x, this.y, ox, oy);
    // strokeWeight(1);
    // stroke(20); 
  }

  go() {
    var m = 0,
      neighbors = [],
      ln = [],
      rn = []
    for (let j = 0; j < agents.length; j++) {
      if (agents[j] != agents[i]) {
        var x1 = agents[i].x,
          x2 = agents[j].x,
          y1 = agents[i].y,
          y2 = agents[j].y

        var dx = x2 - x1,
          dy = y2 - y1,
          d = sqrt(pow(dx, 2) + pow(dy, 2))

        if (d < agents[i].radius) {
          neighbors.push(agents[j])

          var no = atan2(dy, dx)

          if (no > PI + agents[i].o - radians(45) || no < agents[i].o - radians(45)) ln.push(agents[j])
          else if (no < PI + agents[i].o - radians(135) || no > agents[i].o - radians(135)) rn.push(agents[j])
        }
      }
    }
    if (ln.length >= rn.length) m -= (agents[i].b * neighbors.length)
    else if (rn.length > ln.length) m = agents[i].b * neighbors.length

    agents[i].o = (agents[i].o + agents[i].a + m + TWO_PI) % TWO_PI;
    agents[i].x = agents[i].v * cos(agents[i].o) + agents[i].x;
    agents[i].y = agents[i].v * sin(agents[i].o) + agents[i].y;

    // torus (wraparound)
    if (agents[i].x > width) agents[i].x = 0
    else if (agents[i].x < 0) agents[i].x = width

    if (agents[i].y > height) agents[i].y = 0
    else if (agents[i].y < 0) agents[i].y = height

    if (this.crazy) {
      agents[i].colr += random(-20, 20) * (neighbors.length + 1)
      agents[i].colg += random(-20, 20) * (neighbors.length + 1)
      agents[i].colb += random(-20, 20) * (neighbors.length + 1)
      constrain(this.colr, 0, 255)
      constrain(this.colg, 0, 255)
      constrain(this.colb, 0, 255)

      let r = random(-2, 2)
      if (this.name) {
        let min = 100
        this.radius = this.radius + r < min ? min : this.radius + r
      } else this.radius += r
    }
  }
}