window.zooniverse ?= {}

enUs =
  topBar:
    heading: 'A Zooniverse project'
    username: 'Username'
    password: 'Password'
    email: 'Email address'
    realName: 'Real name'
    whyRealName: 'This will be used when we thank contributors, for example, in talks or on posters.<br />If you don\'t want to be mentioned publicly, leave this blank.'
    signIn: 'Sign in'
    signInTitle: 'Sign in to your Zooniverse account'
    signOut: 'Sign out'
    signUp: 'Sign up'
    signUpTitle: 'Sign up for a new account'
    forgotPassword: 'Forgot your password?'
    noAccount: 'Don\'t have an account?'
    privacyPolicy: '''
      I agree to the <a href="https://www.zooniverse.org/privacy" target="_blank">privacy policy</a>.
    '''

  user:
    badLogin: 'Incorrect username or password'
    signInFailed: 'Sign in failed.'

  footer:
    heading: '''
      The Zooniverse is a collection of web-based citizen science projects that use the efforts of volunteers
      to help researchers deal with the flood of data that confronts them.
    '''

window.zooniverse.enUs = enUs
module?.exports = enUs
