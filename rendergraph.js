class RenderGraph
{
    constructor(engine) {
        this.engine = engine;
        this.textures = {};
        this.buffers = {};
        this.passes = [];
    }

    async addTexture(id, textureDesc) {
        if (this.textures[id] == null) {
            console.log("Cannot create texture with this ID: Already exists");
            return this.textures[id];
        }

        this.textures[id] = await this.engine.device.createTexture(textureDesc);

        return this.textures[id];
    }

    async addBuffer(id, bufferDesc) {
        if (this.buffers[id] == null) {
            console.log("Cannot create buffer with this ID: Already exists");
            return this.buffers[id];
        }

        this.buffers[id] = await this.engine.device.createBuffer(bufferDesc);

        return this.buffers[id];
    }

    async addPass(callback)
    {
        this.passes.push(callback);
    }

    async clearPasses()
    {
        this.passes = [];
    }

    async render(encoder)
    {
        this.passes.forEach((callback) => {
            callback(this.engine, encoder);
        });
    }
}

export { RenderGraph };