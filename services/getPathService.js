app.service('getPath', function() {
    this.currentPath = function (x) {
         var url = window.location.href;
         var args = url.split('#').pop().split('=').pop();
         return args.replace("page:","");
    }
});
 