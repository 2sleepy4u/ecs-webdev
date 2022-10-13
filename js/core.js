function Entity() {
    this.id = (+new Date()).toString(16) + 
        (Math.random() * 100000000 | 0).toString(16) + World.entities.length
    return this
}

function Struct(...args){
    for(var i of args) this[i] = {}
    return this
}

Struct._ = function(name){
    var Constructor = new Function("return function " + name + "(...args) {for(var i in args) this[i] = args[i]; return this};")()
    Constructor._ = function(...args){
        let prop = JSON.stringify(args)
        var Constructor = new Function("return function " + name + "(...args) {var prop ="+prop+"; for(var i in prop) this[prop[i]] = args[i]; return this};")()
        return Constructor
    }
    window[name] = function(...args){return new Constructor(...args)}
    return Constructor 
}


function Commands(entity) {
    this.entity = entity ?? {}
    this.saved = {}

    this.spawn = function spawn(){
        this.entity  = new Entity()
        World.add_entity(this.entity)
        return this
    }
    this.insert = function insert(component){
        let index = World.entities.findIndex(itm => itm.id == this.entity.id)
        World.entities[index][component.constructor.name] = component
        return this
    }
    this.query = function query(...components){
        let entities = World.entities
        for(var component of components){
            entities = entities.filter(itm => itm[component().constructor.name] != null)
        }
        return entities
    }
    this.save = function save(){
        this.saved = this.entity
        return this
    }
    this.get = function get(){
        return this.saved
    }
    this.inherit = function inherit(parent){
        Object.assign(this.entity, parent)
        return this
    }
}

class World {
    static entities = []

    static add_entity(entity){
        World.entities.push(entity)
    }

    static get(id){
        return World.entities.filter(itm => itm.id == id)[0]
    }

    static query(condition){
        return World.entities.filter(condition)[0]
    }
}

class App {
    constructor(){
        this.systems = []
        this.resources = []
        this.commands = new Commands()
    }

    add_system(system){
        this.systems.push(system.bind(this))
        return this
    }
    
    run(){
        for(var system of this.systems) system(this.commands, this.resources)
    }

    static new(){
        return new App()
    }
}

export {
    App,
    World,
    Struct
}
