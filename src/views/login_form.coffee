module.exports =
  signIn: '''
    <p class="title">Sign in with your Zooniverse account</p>
    <p class="errors"></p>
    <form>
      <label><span>Username</span> <input type="text" name="username" required="required" /></label>
      <label><span>Password</span> <input type="password" name="password" required="required" /></label>
      <button type="submit">Sign in</button>
    </form>
    <p class="progress">Signing in...</p>
  '''
  
  signUp: '''
    <p class="title">Sign up for a new Zooniverse account</p>
    <p class="errors"></p>
    <form>
      <label><span>Username</span> <input type="text" name="username" required="required" /></label>
      <label><span>Email address</span> <input type="text" name="email" required="required" /></label>
      <label><span>Password</span> <input type="password" name="password" required="required" /></label>
      <label><span>Password (confirm)</span> <input type="password" name="password-confirm" required="required" /></label>
      <label class="privacy-policy"><input type="checkbox" name="policy" required="required" /> I agree to the <a href="https://www.zooniverse.org/privacy" target="_blank">privacy policy</a></label>
      <button type="submit">Sign up</button>
    </form>
    <p class="progress">Creating account and signing in...</p>
  '''
  
  reset: '''
    <p>Enter your <strong>username</strong> or <strong>email address</strong> and we'll send you instructions on how to reset your password</p>
    <p class="errors"></p>
    <form>
      <label><input type="text" name="email" required="required" /></label>
      <button type="submit">Submit</button>
    </form>
    <p class="progress">Check your email for instructions!</p>
  '''
  
  signOut: '''
    <form>
      <p>Currently logged in as <strong class="current"></strong>. <button type="submit">Sign out</button></p>
    </form>
    <p class="progress">Signing out...</p>
  '''
  
  # This one combines the three.
  login: '''
    <div class="sign-in"></div>
    <div class="sign-up"></div>
    <div class="reset"></div>
    
    <div class="picker">
      <button name="sign-in">Already have an account? Sign in!</button>
      <button name="sign-up">Don't have an account? Create one!</button>
      <!--<button name="reset">Forgot your username or password?</button>-->
    </div>
    
    <div class="sign-out"></div>
  '''
