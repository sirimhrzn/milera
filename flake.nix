{
  description = "libcalendar";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    rust-overlay = {
      url = "github:oxalica/rust-overlay";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = {
    self,
    nixpkgs,
    rust-overlay,
    ...
  }: let
    systems = ["aarch64-darwin" "x86_64-linux"];
    forAllSystems = nixpkgs.lib.genAttrs systems;
    overlays = [rust-overlay.overlays.default];
  in {
    devShells = forAllSystems (system: let
      pkgs = import nixpkgs {inherit system overlays;};
      version = "1.88.0";
      rust = pkgs.rust-bin.stable.${version}.default.override {
        targets = [
          "aarch64-apple-ios"
          "aarch64-apple-ios-sim"
          "x86_64-apple-ios"

          "aarch64-linux-android"
          "x86_64-linux-android"
          "armv7-linux-androideabi"

          "wasm32-unknown-unknown"
        ];
        extensions = [
          "rustfmt"
          "clippy"
          "rust-analyzer"
        ];
      };
    in {
      default = pkgs.mkShell {
        buildInputs = with pkgs; [pkg-config openssl nodejs_22 cargo-ndk  android-tools sqlx-cli ] ++ [rust];
        shellHook = ''
          export SDKROOT=/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator.sdk
          # export ANDROID_NDK_HOME=/Users/$USER/Library/Android/sdk/ndk/29.0.13846066
          export CPPFLAGS="-I/opt/homebrew/opt/llvm/include"
          export LDFLAGS="-L/opt/homebrew/opt/llvm/lib"
          export CC=/opt/homebrew/opt/llvm/bin/clang
          export CXX=/opt/homebrew/opt/llvm/bin/clang++
          export AR=/opt/homebrew/opt/llvm/bin/llvm-ar
          export PATH=$PATH:/Users/$USER/.cargo/bin

        '';
        LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [pkgs.openssl.dev];
        OPENSSL_STATIC = "1";
        OPENSSL_LIB_DIR = "${pkgs.pkgsStatic.openssl.out}/lib";
        OPENSSL_INCLUDE_DIR = "${pkgs.pkgsStatic.openssl.dev}/include";
        # SDKROOT = "/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/SDKs/iPhoneOS.sdk";
      };
    });
  };
}
