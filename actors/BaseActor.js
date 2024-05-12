export class BaseActor {
    constructor(engine) {
        this.engine = engine;
        this.childs = [];
        this.parent = null;
    }

    addChild(child)
    {
        this.childs.push(child);
    }

    removeChild(child)
    {
        this.childs.splice(this.childs.indexOf(child), 1);
    }

    setParent(parent)
    {
        if (this.parent != null)
        {
            this.parent.removeChild(this);
        }

        parent.addChild(this);
        this.parent = parent;
    }

    update()
    {
        this.childs.forEach(child => child.update());
    }
}