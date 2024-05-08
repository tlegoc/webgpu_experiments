export class BasePass
{
    constructor(engine)
    {
        this.engine = engine;
    }

    render(encoder)
    {
        console.log("Rendering BasePass");
    }
}