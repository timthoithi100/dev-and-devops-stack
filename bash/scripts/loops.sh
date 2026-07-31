#!/bin/bash

# List loop
echo "--- List loop ---"
for NAME in Tim Alice Bob; do
    echo "Hello, $NAME"
done

# Range loop
echo "--- Range loop ---"
for i in {1..5}; do
    echo "Number $i"
done

# C-style loop
echo "--- C-style loop ---"
for (( i=0; i<3; i++ )) do
    echo "Index $i"
done

# While loop
echo "--- While loop ---"
COUNT=1
while [ $COUNT -le 3 ]; do
    echo "Count is $COUNT"
    COUNT=$((COUNT + 1))
done
