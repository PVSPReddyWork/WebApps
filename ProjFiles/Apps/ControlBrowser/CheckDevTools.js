//some don't work when console is docked


/*
var devtools = /./;
devtools.toString = function() {
  if (!this.opened) {
    alert("Opened");
  }
  this.opened = true;
}

console.log('%c', devtools);
*/


/*
var checkStatus;
    
    var element = document.createElement('any');
    element.__defineGetter__('id', function() {
        checkStatus = 'on';
    });
    
    setInterval(function() {
        checkStatus = 'off';
        console.log(element);
        console.clear();
    }, 1000);

    */

/*
var element = new Image();
Object.defineProperty(element, 'id', {
get: function () {
/* TODO * /
alert('囧');
}
});
console.log('%cHello', element);

var r = /./;
r.toString = function() {
  document.title = 'on';
};
console.log(r);
*/


/*
var checkStatus;
var indicator = document.querySelector('#devtool-status');

var element = new Image();
Object.defineProperty(element, 'id', {
  get: function() {
    checkStatus='on';
    throw new Error("Dev tools checker");
  }
});

requestAnimationFrame(function check() {
  checkStatus = 'off';
  console.dir(element);
  indicator.className  = checkStatus;
  requestAnimationFrame(check);
});
*/

/*
window.addEventListener('devtoolschange', function (e) {
    console.log('is DevTools open?', e.detail.open);
});
*/