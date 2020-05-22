#!/bin/bash
CMD=$1

case "$CMD" in
    "start" )
        npm install
        exec npm start
        ;;
    "build" )
        exec npm run build
        ;;
    "test" )
        exec npm run test
        ;;
    * )
        # Run custom command. Thanks to this line we can still use
        # "docker run our_container /bin/bash" and it will work
        exec $CMD ${@:2}
        ;;
esac
