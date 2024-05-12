import {BasePass} from "./BasePass.js";

export class ClearPass extends BasePass
{
    render(encoder)
    {
        const pass = encoder.beginRenderPass({
            colorAttachments: [
            //     {
            //     view: this.engine.context.getCurrentTexture().createView(),
            //     loadOp: "clear",
            //     clearValue: {
            //         r: 0,
            //         g: 0,
            //         b: 0,
            //         a: 1
            //     },
            //     storeOp: "store",
            // }
            ],
        });

        pass.end();
    }
}