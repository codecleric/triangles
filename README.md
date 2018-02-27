# triangles
A simple programming exercise in vanilla js


# Why is this here
The goal is show the thought process of solving the given problem, so the code
is more pedantic than it otherwise might be. The actual problem is not included
in this repository, although if you can't glean what is happening, then this is
likely a failure ;-)

This is implemented in Vanilla Javascript, no jQuery, no CSS libraries, no
build pipelines (grunt, babel, gulp, browserify, etc), or UI frameworks (react,
angular, etc) to keep it drop dead simple. This is all module level functions
with no namespacing or classes (redundant, I know), again, to keep it very,
very simple.

The original problem specified essentially a row major order 6 x 12 matrix, but
the code works with any size; I can't help but generalize! 


## Running the example

All that is needed to run this is a simple web server, or nodejs on the command
line. For example, if you have python 3 installed, you can:

    cd triangles
    python -m http.server 9999

For python 2:

    cd triangles
    python -m SimpleHTTPServer 9999

Then point your browser to http://localhost:9999

If you have nodejs installed, just:

    cd triangles
    node triangles.js

(node might be nodejs, depending on the platform)


