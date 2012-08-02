{print} = require 'util'
{spawn} = require 'child_process'

task 'build', 'Build lib/ from src/', ->
  coffee = spawn 'coffee', ['-c', '-o', 'lib', 'src']
  coffee.stderr.on 'data', (data) ->
    process.stderr.write data.toString()
  coffee.stdout.on 'data', (data) ->
    print data.toString()
  coffee.on 'exit', (code) ->
    callback?() if code is 0

task 'watch', 'Watch src/ for changes', ->
  coffee_src = spawn 'coffee', ['-w', '-c', '-o', 'lib', 'src']
  coffee_src.stderr.on 'data', (data) -> process.stderr.write data.toString()
  coffee_src.stdout.on 'data', (data) -> print data.toString()
  
  coffee_test = spawn 'coffee', ['-w', '-c', '-o', 'test', 'test']
  coffee_test.stderr.on 'data', (data) -> process.stderr.write data.toString()
  coffee_test.stdout.on 'data', (data) -> print data.toString()
