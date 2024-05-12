import {
    vec3,
    mat4,
    quat4
} from 'https://wgpu-matrix.org/dist/2.x/wgpu-matrix.module.js';

export class Transform {
    constructor() {
        this.position = vec3.create();
        this.rotation = quat4.create();
        this.scale = vec3.create();
    }

    getMatrix()
    {
        return mat4.mul(mat4.mul(mat4.translation(this.position), mat4.fromQuat(this.rotation)), mat4.scale(this.scale));
    }

    combineWithParent(transform)
    {
        return mat4.mul(this.getMatrix(), transform.getMatrix());
    }
}