describe 'LoginForm', ->
  describe 'on submit', ->
    it 'gets a "waiting" class', ->

    it 'forgets any previous errors', ->

    it 'submits a username and password to the authentication iframe', ->

  describe 'on login error', ->
    it 'gets an "error" class', ->

    it 'loses its "waiting" class', ->

    it 'displays the error', ->

  describe 'when given a bad username/password combo', ->
    it 'gets an "error" class', ->

    it 'loses its "waiting" class', ->

    it 'displays the error', ->

  describe 'on successful login', ->
    it 'updates the logged in username', ->

    it 'clears the login form', ->
