import {
    vec3,
    mat4,
} from 'https://wgpu-matrix.org/dist/2.x/wgpu-matrix.module.js';

export class CameraData {
    constructor(fov, aspect) {
        this.position = vec3.create();
        this.fov = fov;
        this.aspect = aspect;
        this.proj = mat4.perspective(this.fov, this.aspect, 0.01, 1000);
        this.view = mat4.lookAt([0, 0, 0], [0, 0, 0], [0, 1, 0]);
    }
}