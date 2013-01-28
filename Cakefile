{spawn} = require 'child_process'
wrench = require 'wrench'
fs = require 'fs'
path = require 'path'
eco = require 'eco'

DEFAULT_PORT = 8000

run = ->
  child = spawn arguments...
  child.stdout.on 'data', process.stdout.write.bind process.stdout
  child.stderr.on 'data', process.stderr.write.bind process.stderr

toVarName = (file) ->
  path.basename(file).replace(/\.\w+$/, '').replace /\-(\w)/, (_, char) -> char.toUpperCase()

option '-p', '--port [PORT]', 'Port on which to run the dev server'

task 'watch', 'Watch CoffeeScript changes during development', ->
  console.log 'Watching for CoffeeScript in ./src'
  run 'coffee', ['--watch', '--output', '.', '--compile', './src/']

  console.log 'Watching for CoffeeScript in ./test-src'
  run 'coffee', ['--watch', '--output', './test', '--compile', './test-src/']

task 'watch-eco', 'Watch changes in eco templates', ->
  SRC_DIR = './src'
  DEST_DIR = '.'

  watchers = []
  templates = []

  recompile = ->
    watcher.close() for watcher in watchers

    changedTemplate = templates[watchers.indexOf @]
    console.log "#{changedTemplate} changed, recompiling templates" if changedTemplate

    watchers.splice 0
    templates.splice 0

    files = wrench.readdirSyncRecursive SRC_DIR
    for file in files when file.match /\.eco$/
      inFile = path.resolve SRC_DIR, file
      inContent = fs.readFileSync(inFile).toString()

      outFile = path.resolve DEST_DIR, file.replace /\.eco$/, '.js'
      compiledContent = try
        eco.precompile inContent
      catch e
        Function::toString.call -> console?.error 'Bad ECO template!'

      outContent = """
        window.zooniverse = window.zooniverse || {};
        window.zooniverse.views = window.zooniverse.views || {};
        template = #{compiledContent};
        window.zooniverse.views['#{toVarName inFile}'] = template;
        if (typeof module !== 'undefined') module.exports = template;\n
      """

      watchers.push fs.watch inFile, recompile
      templates.push path.relative process.cwd(), inFile

      fs.writeFileSync outFile, outContent

  console.log "Watching for ECO template changes in #{SRC_DIR}"
  recompile()

task 'watch-stylus', 'Recompile Stylus files when they change', ->
  console.log 'Watching .styl files in ./src/css'
  run 'stylus', ['--watch', './src/css', '--out', './css']

task 'serve', 'Run a dev server', (options) ->
  port = options.port || process.env.PORT || DEFAULT_PORT

  invoke 'watch'
  invoke 'watch-eco'
  invoke 'watch-stylus'

  console.log "Running a server at http://localhost:#{port}"
  run 'python', ['-m', 'SimpleHTTPServer', port]
