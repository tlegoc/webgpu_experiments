import {BaseActor} from "./BaseActor.js";
import {CameraData} from "../renderer/CameraData.js";

export class CameraActor extends BaseActor {
    constructor(engine, fov, aspect)
    {
        super(engine);
        this.cameradata = new CameraData(fov, aspect);

        this.setMainCamera();
    }

    static mainCameraData;

    setMainCamera()
    {
        CameraActor.mainCameraData = this.cameradata;
    }
}