#!/bin/bash

# Basic variables
NAME="Tim"
AGE=30
GREETING="Hello, $NAME. You are $AGE years old."

echo $GREETING

# Quoting rules
echo "Double quotes allow $NAME to expand"
echo 'Single quotes treat $NAME as literal text'

# Command substitution in a variable
TODAY=$(date +%A)
echo "Today is $TODAY"

# Arithmetic
NUM1=10
NUM2=5
SUM=$((NUM1 + NUM2))
echo "$NUM1 + $NUM2 = $SUM"
