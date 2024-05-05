export class BaseActor {
    constructor(engine) {
        this.engine = engine;
        this.childs = [];
    }

    addChild(child)
    {
        this.childs.push(child);
    }

    removeChild(child)
    {
        this.childs.splice(this.childs.indexOf(child), 1);
    }

    update()
    {
        this.childs.forEach(child => child.update());
    }
}