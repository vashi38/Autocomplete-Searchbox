var dir = angular.module("CustomDirective",[]);

dir.filter('startFrom', function () {
    return function (input, start) {
        if(!input) return;
        start = +start;
        return input.slice(start);
    };
});

dir.directive("globalSearchDir",function($timeout){
  function linkFun(scope, ele, attr){
    scope.globalSearch = '';
    scope.options = scope.obj;
    scope.optselected = {
      'item': '',
      'sort': '',
      'dir': ''
    };
    
    scope.selected = false;
    scope.filter_view = false;
    scope.filterObj = {
      'by':'',
      'dir':''
    };
    scope.clear_filter = function(){
      scope.filterObj = {
        'by':'',
        'dir':''
      };
      scope.filterFun();
    };
    scope.filterFun = function(){
      scope.optselected.sort = scope.filterObj.by;
      scope.optselected.dir = parseInt(scope.filterObj.dir);
    };
    scope.focus_lost = function(){
      $timeout(function(){
        scope.selected = true;
        scope.selectOption(scope.globalSearch);
      },100);

    };
    scope.change_selected = function(event){
      if(scope.selected == true)
        scope.selected = false;
      if(event.which == 13)
        scope.selectOption(scope.globalSearch);
      scope.options = scope.obj;
    };
    scope.selectOption = function(opt){
      scope.globalSearch = opt;
      scope.selected  = true;
      scope.optselected.item = opt;
    };
  }
  return{
    templateUrl:"directive/index.html",
    scope:{
      obj:"=",
      optselected : "=",
      orderby_arr : "=orderby"
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
      selected: "=selected"
    },
    link: function(scope,ele,attr){
        scope.start = 0;
        scope.show_next = true;
        scope.results_per_page = 10;
        scope.$watch('selected',function(newVal,oldVal){
          scope.start = 0;
          // console.log(newVal);
        });
        scope.next = function(){
          scope.start = scope.start + scope.results_per_page;
          if(scope.start>scope.filtered.length)
            scope.start = scope.start - scope.results_per_page;
          else
            scrollTo(0,0);
        };
        scope.pre = function(){

          scope.start = scope.start - scope.results_per_page;
          if(scope.start<0)
            scope.start = scope.start + scope.results_per_page;
          else
          scrollTo(0,0);
        };
    },
    restrict:"E"
  };
});
