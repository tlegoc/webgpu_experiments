struct Camera {
    position: vec3f,
    viewProj: mat4x4f
}

@group(0) @binding(0) var<uniform> camera : Camera;

struct VertexOutput {
    @builtin(position) position : vec4f
}

@vertex
fn vertex_main(@builtin(vertex_index) vertexIndex : u32 /*, @location(0) position : vec3f*/) -> VertexOutput {
    var output : VertexOutput;

    let pos = array<vec3f, 3>(
      vec3f( 0.0,  0.5, 0.0),  // top center
      vec3f(-0.5, -0.5, 0.0),  // bottom left
      vec3f( 0.5, -0.5, 0.0)   // bottom right
    );



    return output;
}

@fragment
fn fragment_main() -> @location(0) vec4f {
    return vec4f(1.0, 1.0, 1.0, 1.0);
}