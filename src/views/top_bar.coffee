module.exports = """
<div id="zooniverse-top-bar-container">
  <div id="zooniverse-top-bar-info">
    <h3><span id="app-name"></span> is a <a href="https://www.zooniverse.org">Zooniverse</a> project.</h3>
    <p>The Zooniverse is a collection of web-based Citizen Science projects that use the efforts and abilities of volunteers to help reseachers deal with the flood of data that confronts them.</p>
  </div>
  <div id="zooniverse-top-bar-projects">
    <h3><a href="https://www.zooniverse.org/projects">Our Projects</a></h3>
    <p>We currently have 12 projects on subjects ranging from <a href="https://www.zooniverse.org/#space">astronomy</a>, to <a href="https://www.zooniverse.org/#climate">climatology</a>, to <a href="https://www.zooniverse.org/#nature">biology</a>, to <a href="https://www.zooniverse.org/#humanities">humanities</a>.</p>
  </div>
  <div id="zooniverse-top-bar-languages">
    <select class="language"></select>
  </div>
  <div id="zooniverse-top-bar-login">
    <div class='login'>
      <div class="inputs">
        <div class="textboxs">
          <input name="username" placeholder="username" type="text" />
          <input name="password" placeholder="password" type="password" />
        </div>
        <div class="reset">
          <p class="password-recovery"><a href="https://www.zooniverse.org/password/reset">Forgot Password?</a></p>
        </div>
      </div>
      <div class="buttons">
        <button name="login" type="button">Login</button>
        <button name="signup" type="button">Sign Up</button>
      </div>
      <p class="errors"></p>
      <div class="progress"><p>Signing In...</p></div>
    </div>
    <div class='welcome'>
    </div>
  </div>
</div>
<div id="zooniverse-top-bar-button">
  <a href="#" class="top-bar-button"><img src="images/zoo-icon.png" /></a>
</div>

"""
