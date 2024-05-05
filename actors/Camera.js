import {BaseActor} from "./BaseActor.js";
import {CameraData} from "../renderer/CameraData.js";

export class Camera extends BaseActor {
    constructor(engine, fov, aspect)
    {
        super(engine);
        this.cameradata = new CameraData(fov, aspect);

        this.setMainCamera();
    }

    setMainCamera()
    {
        this.engine.cameradata = this.cameradata;
    }
}