import Velocity from '../animations/Velocity'
import Particles from '../animations/Particles'

var $browser = $("#browser .content");
export default function Zoo() {
    this.animals = new Map();
    this.getAnimal = function (name) {
        return this.animals.get(name);
    }
    this.init = function (state) {
        this.animals.set("Velocity",new Velocity($browser));
        this.animals.set("Particles",new Particles($browser,state));
    }
}
