#!/bin/bash

echo "--- Current processes ---"
ps aux | head -5

echo "--- Background job ---"
sleep 10 &
echo "Sleep running in background, PID: $!"

echo "--- Jobs ---"
jobs

echo "--- Foreground ---"
fg %1