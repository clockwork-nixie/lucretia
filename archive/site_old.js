(function () {
    var transitionEndEvent = (function () {
        // From modernizr.  See https://davidwalsh.name/css-animation-callback
        var element = document.createElement('myfakeelement');
        var candidates = {
            'transition':'transitionend',
            'OTransition':'oTransitionEnd',
            'MozTransition':'transitionend',
            'WebkitTransition':'webkitTransitionEnd'
        }

        for(var candidate in candidates){
            if(typeof el.style[candidate] !== 'undefined'){
                return candidates[candidate];
            }
        }
    })();

    var utilities = {
        chainTransitions: function (element) {
            if (transitions.length) {
                if (transitionEndEvent) {
                    var queue = element.nixieTransitions || (element.nixieTransitions = []);

                    var handler = function() {
                        if (queue.length && queue[0] === handler) {
                            if (handler.transitions.length) {
                                handler.transitions.pop()(element)
                            } else {
                                queue.pop()
                                element.removeEventListener(handler)
                                
                                if (queue.length) {
                                    queue[0]
                                }
                            }
                        }
                    }
                    handler.transitions = arguments.slice()
                    element.nixieTransitionQueue[element.nixieTransitionQueue.length] = handler
                    element.addEventListener(transitionEvent, handler)
                    handler()
                } else {
                    var transitions = arguments.slice(1)
                    
                    while (transitions.length) {
                        transitions.pop()(element)
                    }
                }
            }
        }
    }

    return { utilities }
})();