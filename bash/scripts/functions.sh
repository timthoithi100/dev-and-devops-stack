#!/bin/bash

# Basic function
greet() {
    echo "Hello, $1"
}

# Function with local variables
calculate() {
    local NUM1=$1
    local NUM2=$2
    local RESULT=$((NUM1 + NUM2))
    echo "$NUM1 + $NUM2 = $RESULT"
}

# Function with return code
file_exists() {
    if [ -f "$1" ]; then
        return 0
    else
        return 1
    fi
}

# Call the functions
greet "Tim"
greet "World"

calculate 10 5
calculate 100 200

file_exists "notes/todo.txt"
if [ $? -eq 0  ]; then
    echo "notes/todo.txt exists"
else
    echo "notes/todo.txt not found"
fi

file_exists "notes/ghost.txt"
if [ $? -eq 0  ]; then
    echo "notes/ghost.txt exists"
else
    echo "notes/ghost.txt not found"
fi
