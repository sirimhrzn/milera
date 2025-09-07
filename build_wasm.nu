let targets = [
  wasm32-unknown-unknown
]

let package = "milera-api"
let mode = "release"
let out  = "target/wasm" 
let wasm_dir = "./web-js"
let out_target = 'bundler' # value for --target of wasm-bindgen cli

def build [ pkg mode ] {
  $targets
  | each {|target|
    (
      cargo build --($mode)
      -p $pkg
      --target $target
    )
  }
}

def generate_ffi [ pkg out_dir out_target? = 'web' mode? = 'release' ] {

  $targets
  | each {|target| 

    let wasm_path = $"target/($target)/($mode)/($pkg).wasm"
    if ($out_dir | path exists) {
      rm -rf $out_dir  
    }
    (
      wasm-bindgen $wasm_path
      --out-dir $out_dir
      --target $out_target
    )
  }
    
}

def move_to_wasm_dir [ pkg wasm_dir out_dir mode ] {

  mkdir -v $wasm_dir
  glob $"($out_dir)/*" | each {|file| mv $file $wasm_dir }

}

build $package $mode
generate_ffi ($package | str replace '-' '_') $out $out_target $mode
move_to_wasm_dir $package $wasm_dir $out $mode
