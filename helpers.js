export async function readFile(file)
{
    return await fetch('./shaders/debug_shader.wgsl').then(r => r.text());
}