var dir = angular.module("CustomDirective",[]);

dir.filter('startFrom', function () {
    return function (input, start) {
        if(!input) return;
        start = +start;
        return input.slice(start);
    }
});

dir.directive("globalSearchDir",function($timeout){
  function linkFun(scope, ele, attr){
    scope.globalSearch = '';
    scope.options = scope.obj;
    scope.optselected = "";
    scope.selected = false;


    scope.focus_lost = function(){
      // $timeout(function(){
      //   scope.selected = true;
      // },100);
      scope.selectOption(scope.globalSearch);
    };
    scope.change_selected = function(event){
      if(scope.selected == true)
        scope.selected = false;
      if(event.which == 13)
        scope.selectOption(scope.globalSearch);
      scope.options = scope.obj;
    };
    scope.selectOption = function(opt){
      // document.getElementById("GlobalSearch").focus();
      console.log(ele);
      scope.globalSearch = opt;
      scope.selected  = true;
      console.log(opt);
      scope.optselected = opt;
    };
  }
  return{
    templateUrl:"directive/index.html",
    scope:{
      obj:"=",
      optselected : "="
    },
    link: linkFun,
    restrict: "E"
  };
});

dir.directive("moviesList",function(){
  return{
    templateUrl: "directive/movieList.html",
    scope: {
      moviesList: "=movieslist",
      selected: '=selected'
    },
    link: function(scope,ele,attr){
        scope.start = 0;
        scope.$watch('selected',function(newVal,oldVal){
          scope.start = 0;
        });
        scope.next = function(){
          scope.start = scope.start + 10;
          if(scope.start>scope.filtered.length)
            scope.start = scope.start - 10;
          else
            scrollTo(0,0);
        };
        scope.pre = function(){

          scope.start = scope.start - 10;
          if(scope.start<0)
            scope.start = scope.start + 10;
          else
          scrollTo(0,0);
        };
    },
    restrict:"E"
  };
});
