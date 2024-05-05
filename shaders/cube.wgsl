struct Camera {
    position: vec3f,
    viewProj: mat4x4f
}

@group(0) @binding(0) var<uniform> camera : Camera;

struct VertexOutput {
  @builtin(position) Position : vec4f
}

@vertex
fn vertex_main(@location(0) position : vec3f) -> VertexOutput {
  var output : VertexOutput;



  return output;
}

@fragment
fn fragment_main() -> @location(0) vec4f {
  return vec4f(1.0, 1.0, 1.0, 1.0);
}