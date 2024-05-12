import {BaseActor} from "./BaseActor.js";
import {Transform} from "../maths/Transform.js";

export class TransformActor extends BaseActor {
    constructor(engine) {
        super(engine);
        this.transform = new Transform();
    }

    getTransform()
    {
        if (this.parent != null && this.parent.prototype instanceof TransformActor)
        {
            return this.transform.combineWithParent(this.parent.transform.getMatrix());
        }

        return this.transform.getMatrix();
    }
}