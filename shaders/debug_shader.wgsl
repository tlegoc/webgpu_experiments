@vertex
fn vertexMain(@location(0) pos: vec2f) ->
  @builtin(position) vec4f { // You can pass structs as long as they have the builtin tag, if you want to pass data to the fragment
  return vec4f(pos, 0, 1);
}

@fragment
fn fragmentMain() -> @location(0) vec4f { // Same as before
  return vec4f(1, 1, 1, 1);
}