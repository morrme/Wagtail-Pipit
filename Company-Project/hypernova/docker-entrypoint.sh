#!/bin/bash
CMD=$1

case "$CMD" in
    "start" )
        cd /app && npm install && cd -
        exec node bootstrap.js
        ;;
    * )
        # Run custom command. Thanks to this line we can still use
        # "docker run our_container /bin/bash" and it will work
        exec $CMD ${@:2}
        ;;
esac
