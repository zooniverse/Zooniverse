User = require '../models/user'
Controller = require './controller'
Form = require './base_form'

class TopBar extends Controller
  events: 
    'click button[name="login"]'   : 'logIn'
    'click button[name="signup"]'  : 'startSignUp'
    'click button[name="signout"]' : 'signOut'
    'keypress input'               : 'logInOnEnter'
    'click a.top-bar-button'       : 'toggleDisplay'
    'change select.language'       : 'setLanguage'

  constructor: ->
    super
    @app ||= "test"
    @appName ||= "Test Name"
    @currentLanguage ||= 'en'
    @signUp = new Form.SignUpForm

    User.project = @app
    User.bind 'sign-in', @setUser
    User.bind 'sign-in-error', @onError

    User.fetch().always =>
      @toggleDisplay() if User.current

    @render()
    @setAppName()
    @initLanguages()
    @setUser()

  elements:
    '#zooniverse-top-bar-container' : 'container'
    '#app-name'                     : 'appNameContainer'
    '#zooniverse-top-bar-login'     : 'loginContainer'
    'select.language'               : 'langSelect'

  logIn: (e) =>
    username = @el.find('input[name="username"]').val()
    password = @el.find('input[name="password"]').val()
    
    if (username != '') and (password != '')
      @el.find('.progress').show()
      login = User.login
        username: username
        password: password

  signOut: (e) =>
    User.logout()

  startSignUp: (e) =>
    @el.append @signUp.el

  toggleDisplay: (e) =>
    @el.parent().toggleClass 'hide-top-bar'

  render: =>
    @html require('../views/top_bar')

  setAppName: ->
    @appNameContainer.append @appName

  setUser: =>
    if User.current
      @signUp.el.remove()
      @loginContainer.html @userGreeting(User.current.name)
    else
      @loginContainer.html @loginForm

  loginForm: 
    """
      <input name="username" placeholder="username" type="text" />
      <input name="password" placeholder="password" type="password" />
      <button name="login" type="button">Login</button>
      <button name="signup" type="button">Sign Up</button>
      <div class="errors"></div>
      <div class="progress"><p>Signing In...</p></div>
   """

  userGreeting: (user) ->
    """
      <h3> Hi, <strong>#{user}</strong>. Welcome to #{@appName}!</h3>
      <button name="signout" type="button">Sign Out</button>
    """

  onError: (error) =>
    @el.find('.progress').hide()
    @el.find('.errors').append error
    @el.find('.errors').show()

  initLanguages: =>
    for shortLang, longLang of @languages
      @langSelect.append """<option value="#{shortLang}">#{shortLang.toUpperCase()} - #{longLang.toUpperCase()}</option>"""
    @langSelect.val('en')

  setLanguage: (e) =>
    @currentLanguage = @langSelect.val()
    @el.trigger 'request-translation', @currentLanguage

  logInOnEnter: (e) =>
    @logIn() if (e.keyCode == 13)

module.exports = TopBar
