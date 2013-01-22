{spawn} = require 'child_process'

DEFAULT_PORT = 8000

run = ->
  child = spawn arguments...
  child.stdout.on 'data', process.stdout.write.bind process.stdout
  child.stderr.on 'data', process.stderr.write.bind process.stderr

option '-p', '--port [PORT]', 'Port on which to run the dev server'

task 'watch', 'Watch changes during development', ->
  console.log 'Watching for CoffeeScript in ./src'
  run 'coffee', ['--watch', '--output', '.', '--compile', './src/']

  console.log 'Watching for CoffeeScript in ./test-src'
  run 'coffee', ['--watch', '--output', './test', '--compile', './test-src/']

task 'serve', 'Run a dev server', (options) ->
  port = options.port || process.env.PORT || DEFAULT_PORT

  invoke 'watch'

  console.log "Running a server at http://localhost:#{port}"
  run 'python', ['-m', 'SimpleHTTPServer', port]
