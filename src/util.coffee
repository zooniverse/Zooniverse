Spine = require 'spine'
$ = require 'jqueryify'

days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

dateWords =
  year: (date) -> "#{date.getUTCFullYear()}" # 1984
  y: (date) -> "#{date.getUTCFullYear()}".slice 0, 2 # 84
  month: (date) -> months[date.getUTCMonth()] # February
  mon: (date) -> months[date.getUTCMonth()].slice 0, 3 # Feb
  m: (date) -> date.getUTCMonth() + 1 # 2
  date: (date) -> "#{date.getUTCDate()}" # 25
  day: (date) -> days[date.getUTCDay()] # Thursday
  d: (date) -> days[date.getUTCDay()].slice 0, 3 # Thu
  time24: (date) -> "#{date.getUTCHours()}:#{('0' + date.getUTCMinutes()).slice -2}" # 15:00
  time12: (date) -> "#{(((date.getUTCHours() % 12) + 12) % 12)}:#{('0' + date.getUTCMinutes()).slice -2}" # 3:00
  ampm: (date) -> if date.getUTCHours() >= 12 then 'am' else 'pm' # pm

module.exports =
  # Join a line-broken string.
  joinLines: (string) ->
    string.replace /\n/g, ''

  arraysMatch: (first, second) ->
    return false if first.length isnt second.length
    for item, i in first
      if first[i] instanceof Spine.Model
        return false unless first[i].eql second[i]
      else if first[i] instanceof $
        return false unless first[i].is second[i]
      else
        return false unless first[i] is second[i]
    return true

  getObject: (path, root) ->
    path = path.split '.'
    until path.length is 0
      root = root[path.shift()]
      return unless root?
    root

  # Sugar for splicing values out of an array. Can compare Spine models and jQuery instances.
  # Call like `remove thing, from: listOfThings`
  remove: (thing, {from: array}) ->
    for something, i in array
      if thing instanceof Spine.Model
        continue unless thing.eql something
      else if thing instanceof $
        continue unless thing.is something
      else
        continue unless thing is something

      array.splice i, 1
      break

  # Backward (callback last) `setTimeout` works better with CoffeeScript.
  # If not given a delay, works like Node's `nextTick`.
  delay: (duration, callback) ->
    if typeof duration is 'function'
      callback = duration
      duration = 1

    setTimeout callback, duration

  # Format a date. See the `dateWords` object for symbols.
  formatDate: (date, format = '(date) (month) (year), (time12) (ampm)') ->
    date = new Date date unless date instanceof Date

    for word, convert of dateWords
      format = format.replace "(#{word})", convert date if ~format.indexOf "(#{word})"

    format

  # Keep a number between two other numbers.
  clamp: (n, {min, max} = {min: 0, max: 1}) ->
    Math.min Math.max(n, min), max
