window.zooniverse ?= {}

enUs =
  topBar:
    username: 'Username'
    password: 'Password'
    email: 'Email address'
    realName: 'Real name'
    whyRealName: 'This will be used when we thank contributors, for example, in talks or on posters.<br />If you don\'t want to be mentioned publicly, leave this blank.'
    signIn: 'Sign in'
    signOut: 'Sign out'
    forgotPassword: 'Forgot your password?'
    noAccount: 'Don\'t have an account?'
    signUp: 'Sign up'

  user:
    badLogin: 'Incorrect username or password'
    signInFailed: 'Sign in failed.'

  footer:
    title: '''
      The Zooniverse is a collection of web-based citizen science projects that use the efforts of volunteers
      to help researchers deal with the flood of data that confronts them.
    '''

window.zooniverse.enUs = enUs
module?.exports = enUs
