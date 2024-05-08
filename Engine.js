import {SceneGraph} from "./actors/SceneGraph.js";
import {CameraData} from "./renderer/CameraData.js";
import {degreeToRadian} from "./utils/Helpers.js";
import {ClearPass} from "./passes/ClearPass.js";

export class Engine {
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

        this.currentTime = 0.0;

        this.updateCallbacks = [];

        this.passes = [];

        this.scenegraph = new SceneGraph(this);

        // Aspect ratio from canvas
        this.aspectRatio = this.canvas.width / this.canvas.height;

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
        //         view: this.context.getCurrentTexture().createView(), loadOp: "clear", clearValue: {r: 0, g: 0, b: 0, a: 1}, // New line
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

    async updateInternal(chrono) {
        let lastTime = this.currentTime;

        this.currentTime = chrono/1000.0;
        this.deltaTime = this.currentTime - lastTime;

        // console.log("FPS: " + (1.0 / this.deltaTime).toFixed());

        this.updateCallbacks.forEach((callback) => {
           callback(this);
        });

        this.update();
        this.render();

        requestAnimationFrame(this.updateInternal.bind(this));
    }

    /**
     * Add a callback that will be executed each frame.
     * @param callback a callback to run each frame. Must accept the engine as a parameter.
     */
    addUpdateCallback(callback)
    {
        this.updateCallbacks.push(callback);
    }

    update() {
        this.scenegraph.update();
    }

    addPass(pass)
    {
        this.passes.push(pass);
    }

    render() {
        const encoder = this.device.createCommandEncoder();

        this.passes.forEach((pass) => {
            pass.render(encoder);
        });

        const commandBuffer = encoder.finish();
        this.device.queue.submit([commandBuffer]);
    }

    cleanup() {

    }

    setupDefaultPasses()
    {
        this.addPass(new ClearPass(this));
    }
}