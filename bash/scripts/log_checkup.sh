#!/bin/bash

LOG="$HOME/Documents/Projects/bash-fundamentals/notes/system.log"

echo "=== $(date) ===" >> $LOG
echo "Disk:" >> $LOG
df -h / | tail -1 >> $LOG
echo "Memory:" >> $LOG
free -h | grep Mem >> $LOG
echo "" >> $LOG
