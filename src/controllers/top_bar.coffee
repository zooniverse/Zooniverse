User = require '../models/user'
Controller = require './controller'
Form = require './base_form'
Dialog = require '../dialog'
LoginForm = require 'zooniverse/lib/controllers/login_form'

class TopBar extends Controller
  className: 'zooniverse-top-bar'

  events: 
    'click button[name="login"]'   : 'logIn'
    'click button[name="signup"]'  : 'onClickSignUp'
    'click button[name="signout"]' : 'signOut'
    'keypress input'               : 'logInOnEnter'
    'click a.top-bar-button'       : 'toggleDisplay'
    'change select.language'       : 'setLanguage'

  constructor: ->
    super
    @app ||= "test"
    @appName ||= "Test Name"
    @currentLanguage ||= 'en'

    User.project = @app
    User.bind 'sign-in', @setUser
    User.bind 'sign-in-error', @onError

    User.fetch().always =>
      @toggleDisplay() unless User.current

    @render()
    @setAppName()
    @initLanguages()
    @setUser()

    @loginForm = new LoginForm
    @loginDialog = new Dialog
      content: @loginForm.el
      buttons: ['Close': null]
    @loginDialog.dialog.addClass 'login'

  elements:
    '#zooniverse-top-bar-container'        : 'container'
    '#app-name'                            : 'appNameContainer'
    '#zooniverse-top-bar-login .login'     : 'loginContainer'
    '#zooniverse-top-bar-login .welcome'   : 'welcomeContainer'
    'select.language'                      : 'langSelect'
    '.login .progress'                     : 'progress'
    '.login .errors'                       : 'errors'

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
    form = new Form.SignUpForm

    d = new Dialog
      content: form.el.html()
      buttons: []
      attachment:
        to: '.dialog-underlay'

    d.el.find('.dialog').addClass 'sign-up'
    d.open()

    console.log d

  toggleDisplay: (e) =>
    e?.preventDefault?()
    @el.parent().toggleClass 'show-top-bar'

  render: =>
    @html require('../views/top_bar')

  setAppName: ->
    @appNameContainer.append @appName

  setUser: =>
    if User.current
      @signUp?.el.remove()
      @loginContainer.hide()
      @errors.empty()
      @welcomeContainer.html @userGreeting(User.current.name)
      @welcomeContainer.show()
      setTimeout @toggleDisplay, 1000 if @el.parent().hasClass 'show-top-bar'
    else
      @welcomeContainer.hide()
      @loginContainer.show()
      @progress.hide()

  userGreeting: (user) ->
    """
    <div class="inputs">
      <h3> Hi, <strong>#{user}</strong>. Welcome to #{@appName}!</h3>
    </div>
    <div class="buttons">
      <button name="signout" type="button">Sign Out</button>
    </div>
    """

  onError: (error) =>
    @progress.hide()
    @errors.text(error)
    @errors.show()

  initLanguages: =>
    for shortLang, longLang of @languages
      @langSelect.append """<option value="#{shortLang}">#{shortLang.toUpperCase()}</option>"""
    @langSelect.val('en')

  setLanguage: (e) =>
    @currentLanguage = @langSelect.val()
    @el.trigger 'request-translation', @currentLanguage

  logInOnEnter: (e) =>
    @logIn() if (e.keyCode == 13)

  onClickSignUp: =>
    @loginDialog.open()
    @loginForm.signUpButton.click()

module.exports = TopBar
