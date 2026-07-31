#!/bin/bash

# Regular array
FRUITS=("apple" "banana" "mango" "orange")

echo "--- Regular Array ---"
echo "First: ${FRUITS[0]}"
echo "Third: ${FRUITS[2]}"
echo "All: ${FRUITS[@]}"
echo "Count: ${#FRUITS[@]}"

# Loop through array
echo "--- Loop ---"
for FRUIT in "${FRUITS[@]}"; do
    echo "Fruit: $FRUIT"
done

# Add to array
FRUITS+=("grape")
echo "After adding grape: ${FRUITS[@]}"

# Associative array (key-value)
echo "--- Associative Array ---"
declare -A PERSON
PERSON[name]="Tim"
PERSON[role]="Developer"
PERSON[city]="Nairobi"

echo "Name: ${PERSON[name]}"
echo "Role: ${PERSON[role]}"
echo "All keys: ${!PERSON[@]}"
echo "All values: ${PERSON[@]}"
