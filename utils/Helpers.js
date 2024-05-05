export async function readFileText(file)
{
    return await fetch('./shaders/debug_shader.wgsl').then(r => r.text());
}

export function degreeToRadian(degree)
{
    return degree * Math.PI / 180;
}