// Generated by CoffeeScript 1.3.3
(function() {
  var Api, User;

  User = require('./models/user');

  Api = require('./api');

  describe('User', function() {
    beforeEach(function() {
      return Api.init();
    });
    describe('Not logged in', function() {
      return it('should not fetch a user', function() {
        var userCheck;
        userCheck = false;
        User.fetch().always(function() {
          return userCheck = true;
        });
        waitsFor(function() {
          return userCheck;
        });
        return runs(function() {
          return expect(User.current).toBe(null);
        });
      });
    });
    describe('Logged in', function() {
      beforeEach(function() {
        var loggedIn;
        loggedIn = false;
        Api.getJSON('/login', function() {
          return loggedIn = true;
        });
        return waitsFor(function() {
          return loggedIn;
        });
      });
      afterEach(function() {
        var loggedOut;
        loggedOut = false;
        Api.getJSON('/logout', function() {
          return loggedOut = true;
        });
        return waitsFor(function() {
          return loggedOut;
        });
      });
      return it('should fetch a user', function() {
        User.fetch().always(function() {
          return expect(User.current.id).toBe('4fff22b8c4039a0901000002');
        });
        return waitsFor(function() {
          return User.current;
        });
      });
    });
    describe('#login', function() {
      beforeEach(function() {
        return User.current = null;
      });
      describe('with valid password', function() {
        return it('should set current user to the login', function() {
          User.login('user', 'password').always(function() {
            return expect(User.current.id).toBe('4fff22b8c4039a0901000002');
          });
          return waitsFor(function() {
            return User.current;
          });
        });
      });
      return describe('with invalid password', function() {
        return it('should set the current user to null', function() {
          User.login('user', 'password_not').always(function() {
            return expect(User.current).toBeNull();
          });
          return waitsFor(function() {
            return User.current;
          });
        });
      });
    });
    return describe('#logout', function() {
      beforeEach(function() {
        var userCheck;
        userCheck = false;
        User.current = User.login('user', 'password').always(function() {
          return userCheck = true;
        });
        return waitsFor(function() {
          return userCheck;
        });
      });
      return it('should set User.current to null', function() {
        var userCheck;
        userCheck = false;
        User.logout().always(function() {
          return userCheck = true;
        });
        waitsFor(function() {
          return userCheck;
        });
        return runs(function() {
          return expect(User.current).toBeNull();
        });
      });
    });
  });

}).call(this);
