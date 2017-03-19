var app = angular.module("myApp",['CustomDirective']);

app.controller("autoCompleteCtrl", function($scope,GetData){
 var displayList = '';
  GetData.getList().then(function(response){

     console.log(response);
     response.map(function(ele){
       var list = ele.genres.split('|');
       if(list.length >4)
        displayList = list[0]+' | '+list[1]+' | '+list[2]+' | '+list[3]+' ...';
      else
        displayList = ele.genres;
       angular.extend(ele, {
         'genres_array': ele.genres.split('|'),
         'displayList': displayList
       });
       ele.genres_array.push(ele.movie_title);
     });
    $scope.obj = response;
    $scope.optSelected = "True";
  });
});

app.service("GetData", function ($http){
  this.getList =  function(){
    return $http({
      method:"GET",
      url:"response.json"
    }).then(function(response){
      return response.data;
    });
  };
});
