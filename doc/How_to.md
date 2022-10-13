# Documentation

## ECS

### Entity

An entity is just a unique id.

### Component

A component stores data, that's it.

### System

A system interacts with entities' components to execute custom funcionalities.

It is just a normal JS function.  


    function system_name(commands, resources){
        ...your code here
    }

- commands: a set of commands to manage entities inside World
    + spawn(): spawn an entity
    + insert(component): insert the component to the entity
    + query(...components): query entities with specified components
    + save(): save the current entity for future use
    + get(): get the saved entity
    + inherit(parent): inherit any components or methods from another entity
- resources: resources inserted inside App


## Classes

### Struct

A struct is just a constructor for data (components).

- ._(name)
    parameter: name (string)

    create a component with "name" as name

    returns a Constructor

### Constructor

- ._(...names)
    parameters: ...names (string list separated by commas)

    create a component with multiple data storing capability

    returns the component

### App

The actual app.  
It manages the world throug systems.

- add_system(system){

    adds a system to the app
    
- run(){

    starts the app

- static new(){
    
    create and returns a new instance of App

### World

Describe the World and everything that's inside it.  
It generally stores entities with their components and inherited methods.

