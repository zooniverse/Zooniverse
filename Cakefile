{spawn} = require 'child_process'
wrench = require 'wrench'
fs = require 'fs'
path = require 'path'
CoffeeScript = require 'coffee-script'
eco = require 'eco'

# Only include essential modules in a build.
# Manually resolve dependency order for now. :(
buildModules = [
  'src/lib/en-us.coffee'
  'src/lib/event-emitter.coffee'
  'src/lib/proxy-frame.coffee'
  'src/lib/api.coffee'
  'src/models/base-model.coffee'
  'src/models/user.coffee'
  'src/models/subject.coffee'
  'src/models/recent.coffee'
  'src/models/favorite.coffee'
  'src/models/classification.coffee'
  'src/views/dialog.eco'
  'src/views/top-bar.eco'
  'src/views/login-form.eco'
  'src/views/login-dialog.eco'
  'src/views/signup-dialog.eco'
  'src/views/paginator.eco'
  'src/controllers/base-controller.coffee'
  'src/controllers/dialog.coffee'
  'src/controllers/login-form.coffee'
  'src/controllers/login-dialog.coffee'
  'src/controllers/signup-form.coffee'
  'src/controllers/signup-dialog.coffee'
  'src/controllers/top-bar.coffee'
  'src/controllers/paginator.coffee'
]

run = ->
  child = spawn arguments...
  child.stdout.on 'data', process.stdout.write.bind process.stdout
  child.stderr.on 'data', process.stderr.write.bind process.stderr

toVarName = (file) ->
  path.basename(file).replace(/\.\w+$/, '').replace /\-(\w)/, (_, char) -> char.toUpperCase()

wrapEcoTemplate = (file, content) -> """
  window.zooniverse = window.zooniverse || {};
  window.zooniverse.views = window.zooniverse.views || {};
  template = #{content};
  window.zooniverse.views['#{toVarName file}'] = template;
  if (typeof module !== 'undefined') module.exports = template;\n
"""

task 'watch-coffee', 'Watch CoffeeScript changes during development', ->
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

      outContent = wrapEcoTemplate inFile, compiledContent

      watchers.push fs.watch inFile, recompile
      templates.push path.relative process.cwd(), inFile

      fs.writeFileSync outFile, outContent

  console.log "Watching for ECO template changes in #{SRC_DIR}"
  recompile()

task 'watch-stylus', 'Recompile Stylus files when they change', ->
  console.log 'Watching .styl files in ./src/css'
  run 'stylus', ['--watch', './src/css', '--out', './css', '--inline']

task 'build', 'Build the whole library into a single file', ->
  d = new Date

  timestamp = [
    d.getFullYear()
    d.getMonth() + 1
    d.getDate()
    d.getHours()
    d.getMinutes()
    d.getSeconds()
  ].join '-'

  outFile = "zooniverse-#{timestamp}.js"

  console.log "Building the Zooniverse library into '#{outFile}'"

  compiledModules = []

  for module in buildModules
    console.log "Including #{module}"
    content = fs.readFileSync(module).toString()
    extension = path.extname module
    compiledModules.push switch extension
      when '.coffee' then CoffeeScript.compile content, bare: true
      when '.eco' then wrapEcoTemplate module, eco.precompile content
      else throw new Error "Could not compile '#{module}'"

  outContent = [
    ';(function(window) {'
    compiledModules...
    CoffeeScript.compile 'module?.exports = window.zooniverse', bare: true
    '}(window));\n'
  ].join '\n'

  fs.writeFileSync outFile, outContent

task 'serve', 'Run a dev server', ->
  invoke 'watch-coffee'
  invoke 'watch-eco'
  invoke 'watch-stylus'

  console.log "Running a server at http://localhost:#{port}"
  run 'serveup', ['--port', process.env.PORT || 3253]
