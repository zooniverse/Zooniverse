{spawn} = require 'child_process'
wrench = require 'wrench'
fs = require 'fs'
path = require 'path'
CoffeeScript = require 'coffee-script'
eco = require 'eco'

# Only include essential modules in a build.
# Manually resolve dependency order for now. :(
buildModules = [
  'vendor/base64.js'
  'src/lib/en-us.coffee'
  'src/lib/event-emitter.coffee'
  'src/lib/proxy-frame.coffee'
  'src/lib/api.coffee'
  'src/util/toggle-class.coffee'
  'src/util/offset.coffee'
  'src/lib/language-manager.coffee'
  'src/models/base-model.coffee'
  'src/models/user.coffee'
  'src/models/subject.coffee'
  'src/models/recent.coffee'
  'src/models/favorite.coffee'
  'src/models/classification.coffee'
  'src/views/zooniverse-logo-svg.eco'
  'src/views/group-icon-svg.eco'
  'src/views/mail-icon-svg.eco'
  'src/views/dialog.eco'
  'src/views/top-bar.eco'
  'src/views/login-form.eco'
  'src/views/login-dialog.eco'
  'src/views/signup-dialog.eco'
  'src/views/paginator.eco'
  'src/views/profile.eco'
  'src/views/profile-item.eco'
  'src/views/footer.eco'
  'src/views/groups-menu.eco'
  'src/views/languages-menu.eco'
  'src/views/zooniverse-logo-svg.eco'
  'src/views/group-icon-svg.eco'
  'src/views/mail-icon-svg.eco'
  'src/views/language-icon-svg.eco'
  'src/controllers/base-controller.coffee'
  'src/controllers/dialog.coffee'
  'src/controllers/login-form.coffee'
  'src/controllers/login-dialog.coffee'
  'src/controllers/signup-form.coffee'
  'src/controllers/signup-dialog.coffee'
  'src/controllers/dropdown.coffee'
  'src/controllers/groups-menu.coffee'
  'src/controllers/top-bar.coffee'
  'src/controllers/paginator.coffee'
  'src/controllers/profile.coffee'
  'src/controllers/footer.coffee'
  'src/util/active-hash-links.coffee'
]

run = (fullCommand) ->
  [command, args...] = fullCommand.split /\s+/
  child = spawn command, args
  child.stdout.on 'data', process.stdout.write.bind process.stdout
  child.stderr.on 'data', process.stderr.write.bind process.stderr

ecoToModule = (file, content) ->
  moduleName = path.basename(file).replace(/\.\w+$/, '').replace /\-(\w)/g, (_, char) -> char.toUpperCase()
  content ?= fs.readFileSync(file).toString()

  try
    template = eco.precompile content
  catch e
    console.log '', file, 'FAILED TO COMPILE'

  """
    window.zooniverse = window.zooniverse || {};
    window.zooniverse.views = window.zooniverse.views || {};
    template = #{template};
    window.zooniverse.views['#{moduleName}'] = template;
    if (typeof module !== 'undefined') module.exports = template;\n
  """

task 'watch-coffee', 'Watch CoffeeScript changes during development', ->
  console.log 'Watching for CoffeeScript in ./src'
  run 'coffee --watch --output . --compile ./src/'

  console.log 'Watching for CoffeeScript in ./test-src'
  run 'coffee --watch --output ./test --compile ./test-src/'

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
      srcFile = path.resolve SRC_DIR, file

      watchers.push fs.watch srcFile, recompile
      templates.push path.relative process.cwd(), srcFile

      outFile = path.resolve DEST_DIR, file.replace /\.eco$/, '.js'
      compiledContent = ecoToModule srcFile

      fs.writeFileSync outFile, compiledContent

  console.log "Watching for ECO template changes in #{SRC_DIR}"
  recompile()

task 'watch-stylus', 'Recompile Stylus files when they change', ->
  console.log 'Watching .styl files in ./src/css'
  run 'stylus --import node_modules/nib --watch ./src/css --out ./css --inline'

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
      when '.coffee' then CoffeeScript.compile content
      when '.eco' then ecoToModule module, content
      when '.js' then content
      else throw new Error "Could not compile '#{module}'"

  outContent = [
    ';(function(window) {'
    compiledModules...
    'if (typeof module !== \'undefined\') module.exports = window.zooniverse'
    '}(window));\n'
  ].join '\n'

  fs.writeFileSync outFile, outContent

task 'serve', 'Run a dev server', ->
  port = process.env.PORT || 3253

  invoke 'watch-coffee'
  invoke 'watch-eco'
  invoke 'watch-stylus'

  console.log "Running a server at http://localhost:#{port}"
  run 'serveup', ['--port', port]
