import * as mat4 from "../maths/mat4.js";
import * as vec3 from "../maths/vec3.js";

export class CameraData {
    constructor(fov, aspect) {
        this.position = vec3.create();
        this.fov = fov;
        this.aspect = aspect;
        this.proj = mat4.create();
        mat4.perspectiveNO(this.proj, this.fov, this.aspect, 0.01, 1000);
        this.rotation = mat4.create();
        mat4.identity(this.rotation);
    }

    getViewProjection()
    {
        let t = null;
        mat4.fromTranslation(t, this.position);
        return (t * this.rotation * this.proj);
    }
}