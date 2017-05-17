(function(){
  angular.module('app', ['angularMoment'])
  .component ('reddit',{
    controller: function(moment){
      const vm = this
      vm.tab = 1
      vm.setTab = function(selected){
        vm.tab = selected
      }
      vm.isSet = function(active){
        return vm.tab === active;
      }
      posts =[
        {title: " hello",
        votes: 5,
        author: "Izabela",
        body: "o mundo e azul quando temos amigos ao nosso lado",
        image: "http://kids.nationalgeographic.com/content/dam/kids/photos/animals/Reptiles/A-G/green-sea-turtle-closeup-underwater.jpg.adapt.945.1.jpg",
        createdOn: 1397490980837,
        comments: [
          {text:" Hello!"
        }

        ]
      },
      {title: " hello",
          votes: 3,
          author: "Izabela",
          body: "o mundo e azul quando temos amigos ao nosso lado",
          image: "http://kids.nationalgeographic.com/content/dam/kids/photos/animals/Reptiles/A-G/green-sea-turtle-closeup-underwater.jpg.adapt.945.1.jpg",
          createdOn: 1397490980837,
          comments: [
            {text:" Hello!"
          },
          {text: " Here I am"
        }

          ]
        },
      {title: " Boo",
      votes: 2,
      author: "Lee",
      body: "not so blue",
      image: "http://kids.nationalgeographic.com/content/dam/kids/photos/animals/Reptiles/A-G/green-sea-turtle-closeup-underwater.jpg.adapt.945.1.jpg",
      createdOn: 1397490980837,
      comments: []
      }
      ]
      console.log(posts);
      vm.posts = posts
      vm.addPost= function (){
        vm.post.createdOn = Date.now()
        vm.post.votes = 0
        vm.post.comments = []
        posts.push(vm.post)
        console.log(posts);
        delete vm.post
      }
      vm.upVote = function(post){
        post.votes++
      }
      vm.downVote = function(post){
        if (post.votes >= 1)
        post.votes--
      }
    },
    template: `
    <nav class="navbar navbar-default">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand">Reddit Clone</a>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        </div>
      </div>
    </nav>


    <main class="container">
    <div class="pull-right">
      <p><a ng-show= "$ctrl.isSet(1)" ng-click = "$ctrl.setTab(2)" class="btn btn-info">New Post</a></p>
    </div>

      <div class="pull-right">
        <p><a ng-show= "$ctrl.isSet(2)" ng-click = "$ctrl.setTab(1)" class="btn btn-info">View Posts</a></p>
      </div>

      <ul class="nav nav-pills">
        <li role="presentation" class="active">
          <input type="search" ng-model ="filterBox"class="form-control input-sm search-form" placeholder="Filter">
        </li>
        <div class="form-inline">
          <label for="sort">  Sort by </label>
          <select ng-model="sortData" ng-init="sortData = '-votes'"class="form-control" id="sort">
            <option value= "-title">Title Desc</option>
            <option value= "title">Title Asc</option>
            <option value= "-createdOn">Date Desc</option>
            <option value= "createdOn">Date Asc</option>
            <option value= "-votes">Votes Desc</option>
            <option value= "votes">Votes Asc</option>

          </select>
        </div>
      </ul>

      <div class="row">
        <div class="col-md-8">

          <form ng-show= "$ctrl.isSet(2)" ng-submit ="$ctrl.addPost()">
            <div>
              <label for="title">Title</label>
              <input ng-model= "$ctrl.post.title" id="title" class="form-control" required>
            </div>
            <div>
              <label for="body">Body</label>
              <textarea ng-model= "$ctrl.post.body" id="body" class="form-control" required></textarea>
            </div>
            <div>
              <label for="author">Author</label>
              <input ng-model= "$ctrl.post.author"id="author" class="form-control" required>
            </div>
            <div>
              <label for="image-url">Image URL</label>
              <input ng-model= "$ctrl.post.image" id="image-url" class="form-control" required>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary" ng-click = "$ctrl.setTab(1)">
                Create Post
              </button>
            </div>
          </form>

        </div>
      </div>

      <div ng-show= "$ctrl.isSet(1)" class="row">
        <div class="col-md-12">

          <div ng-repeat = "post in $ctrl.posts | orderBy: sortData | filter: { title: filterBox}" class="well">
            <div class="media-left">
              <img ng-src = "{{post.image}}" class="media-object">
            </div>
            <div class="media-body">
              <h4 class="media-heading">
                 {{post.title}}
                |
                <a ng-click="$ctrl.upVote(post)"><i class="glyphicon glyphicon-arrow-up"></i></a>
                <a ng-click="$ctrl.downVote(post)"><i class="glyphicon glyphicon-arrow-down"></i></a>
                {{post.votes}}
              </h4>
              <div class="text-right">
                {{post.author}}
              </div>
              <p>
                {{post.body}}
              </p>
              <div>
                <div am-time-ago = "post.createdOn"></div>
                |
                <i class="glyphicon glyphicon-comment"></i>
                <a>
                  <ng-pluralize count = "post.comments.length" when="{'0': 'no comments', '1': '1 comment', 'other':'{} comments'}"></ng-pluralize>
                </a>
              </div>
              <div class="row">
                <div class="col-md-offset-1">
                  <hr>
                  <p>
                    Comment text
                  </p>
                  <form class="form-inline">
                    <div class="form-group">
                      <input class="form-control">
                    </div>
                    <div class="form-group">
                      <input type="submit" class="btn btn-primary">
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
    `
  })
})()
