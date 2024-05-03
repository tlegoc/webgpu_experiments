import {readFile, sleep} from "./helpers.js";

class Engine {
    constructor(canvas) {
        this.canvas = canvas;
    }

    async init() {
        console.log("Initializing engine...");
        if (!navigator.gpu) {
            throw new Error("WebGPU not supported on this browser.");
        }

        this.adapter = await navigator.gpu.requestAdapter();
        if (!this.adapter) {
            throw new Error("No appropriate GPUAdapter found.");
        }

        this.device = await this.adapter.requestDevice();

        this.context = this.canvas.getContext("webgpu");
        this.canvasFormat = navigator.gpu.getPreferredCanvasFormat();
        this.context.configure({
            device: this.device, format: this.canvasFormat,
        });

        console.log("Done.");

        // const vertices = new Float32Array([//   X,    Y,
        //     -0.8, -0.8, // Triangle 1 (Blue)
        //     0.8, -0.8, 0.8, 0.8,
        //
        //     -0.8, -0.8, // Triangle 2 (Red)
        //     0.8, 0.8, -0.8, 0.8,]);
        //
        // const vertexBuffer = this.device.createBuffer({
        //     label: "Cell vertices", size: vertices.byteLength, usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
        // });
        //
        // this.device.queue.writeBuffer(vertexBuffer, /*bufferOffset=*/0, vertices);
        // const vertexBufferLayout = {
        //     arrayStride: 8, attributes: [{
        //         format: "float32x2", offset: 0, shaderLocation: 0, // Position, see vertex shader
        //     }],
        // };
        //
        // const code = await readFile("./shaders/debug_shader.wgsl");
        //
        // const cellShaderModule = this.device.createShaderModule({
        //     label: 'Cell shader', code: code
        // });
        //
        // const cellPipeline = this.device.createRenderPipeline({
        //     label: "Cell pipeline", layout: "auto", vertex: {
        //         module: cellShaderModule, entryPoint: "vertexMain", buffers: [vertexBufferLayout]
        //     }, fragment: {
        //         module: cellShaderModule, entryPoint: "fragmentMain", targets: [{
        //             format: canvasFormat
        //         }]
        //     }
        // });
        //
        // const encoder = this.device.createCommandEncoder();
        //
        // const pass = encoder.beginRenderPass({
        //     colorAttachments: [{
        //         view: context.getCurrentTexture().createView(), loadOp: "clear", clearValue: {r: 0, g: 0, b: 0, a: 1}, // New line
        //         storeOp: "store",
        //     }],
        // });
        //
        // pass.setPipeline(cellPipeline);
        // pass.setVertexBuffer(0, vertexBuffer);
        // pass.draw(vertices.length / 2); // 6 vertices
        //
        // pass.end();
        //
        // const commandBuffer = encoder.finish();
        // this.device.queue.submit([commandBuffer]);
    }

    async run() {
        console.log("Running engine...");
        requestAnimationFrame(this.updateInternal.bind(this));
    }

    async updateInternal(chrono)
    {
        let lastTime = 0.0;
        if (this.currentTime != undefined)
        {
            lastTime = this.currentTime;
        }

        this.currentTime = chrono;
        this.deltaTime = this.currentTime - lastTime;

        document.title = "FPS: " + (1000.0/this.deltaTime).toFixed();

        this.update();

        requestAnimationFrame(this.updateInternal.bind(this));
    }

    async update()
    {

    }

    async cleanup()
    {

    }
}

export {Engine};