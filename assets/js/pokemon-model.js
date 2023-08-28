class Pokemon {
    number;
    name;
    type;
    types = [];
    photo;
    abilities = [];
    height;
    weight;
    moves = [];
    stats = new Stat();
    species = new Specie();
    speciesURL;
}

class Stat {
    hp;
    attack;
    deffense;
    specialAttack;
    specialDeffense;
    speed;
}

class Specie {
    habitat;
    shape;
    eggGroups = [];
    evolutionURL;
    evolveTo;

}