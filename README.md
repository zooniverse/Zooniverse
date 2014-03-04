Some terminology
================

The basic idea of a project is for the back end (Ouroboros) to send **subjects** to **users**, who will create one or more **annotations**, which are bundled into a **classification** and returned to the back end.

Getting set up
==============

The library is available in a private GitHub repo, zooniverse/Zooniverse. There are a couple branches; this document describes the **no-deps** branch, which is pretty similar to master, but has minimal dependencies and a couple more generic models.

We've been building apps in CoffeeScript, using Spine (spine/spine) as an MVC library and Hem (spine/hem) as a dev server/builder.

Let's use Spine.app to generate an initial framework for the app:

```
npm install --global spine.app
spine new Demo-Zoo
cd Demo-Zoo
npm install
```

Run `hem server --port 8080` and open **http://localhost:8080/** to make sure everything is running okay.

Now let's install the Zooniverse library:

```
npm install --save zooniverse
```

Edit **public/index.html** and remove the weird little "start" script that's there. Let's also **move the other script tags into the body** element so we don't have to wait for it to load every time we do something.

Add the top bar
===============

Now open up **app/index.coffee**. First we'll create a new API. We'll piggyback on the **planet_four** project for now. If there's a project set up on the back end, use its name here instead.

```
Api = require 'zooniverse/lib/api'
new Api project: 'planet_four'
```

Now we'll add the top bar first so we can log in.

```
TopBar = require 'zooniverse/controllers/top-bar'
topBar = new TopBar
topBar.el.appendTo document.body
```

We'll also have to tell Hem about the modules we're using by adding them to the "dependencies" array in **slug.json** and restarting the server. Add `zooniverse/lib/api` and `zooniverse/controllers/top-bar` now.

We also need to tell Hem about the base-64 library, which isn't an NPM module. Add `node_modules/zooniverse/vendor/base64.js` to the "libs" array in **slug.json**

Let's add the CSS, too. In **css/index.styl**, add:

```
@import "../node_modules/zooniverse/src/css/top-bar"
@import "../node_modules/zooniverse/src/css/dialog"
```

We should check to see if a user is already logged in when the page loads. Back in **app/index.coffee**:

```
User = require 'zooniverse/models/user'
User.fetch()
```

Don't forget to add `zooniverse/models/user` to your **slug.json**. Hem is fun.

Create the classification interface
===================================

We'll base this on Spine's `Controller` class. Check out the Spine docs if you're not familiar.

```
Spine = require 'spine'
Subject = require 'zooniverse/models/subject'
$ = require 'jqueryify'
Classification = require 'zooniverse/models/classification'

class Classifier extends Spine.Controller
  events:
    'change input[name="quality"]': 'onChangeAnnotate'
    'click button[name="next"]': 'onClickNext'

  constructor: ->
    super
```

When the user changes, we'll load a new subject. This is to keep users from seeing the same subject more than once. We can also check to see if the user has completed the tutorial.

```
    User.on 'change', (e, user) =>
      if user?.project.tutorial_done
        if @classification.subject.metadata.tutorial
          # A user is logged in and they've already finished the tutorial.
          Subject.next()
      else
        # Load the tutorial subject and start the tutorial!
```

When a new subject is selected, create a new classification to go with it and update the view in the classifier.

```
    Subject.on 'select', =>
      @classification = new Classification subject: Subject.current
      @render()

  render: ->
    @el.html """
      <img src='#{Subject.current.location.standard}' style="max-width: 200px;" />
      <label><input type="radio" name="quality" value="awesome" />Awesome</label>
      <label><input type="radio" name="quality" value="lame" />Lame</label>
      <button name="next">Next</button>
    """

  onChangeAnnotate: (e) ->
    value = $(e.target).val()

    # Update the classification when the user works the controls:
    @classification.removeAnnotation @classification.annotations[0]
    @classification.annotate quality: value
```

Usually we have an intermittent step directing people to Talk, but we'll skip that for this example.

```
  onClickNext: ->
    @classification.send()
    Subject.next()

classifier = new Classifier
classifier.el.appendTo document.body
```

Developing the library
======================

```
hub clone -p zooniverse/Zooniverse -b no-deps
cd Zooniverse
npm install
cake serve
mocha-phantomjs http://localhost:8000/test/runner.html
```

i18n
====

Each new language adds about 1.4kb gzipped. So we need to be careful about how many languages we add.
