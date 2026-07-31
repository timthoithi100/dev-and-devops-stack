#!/bin/bash
set -e
set -u
set -o pipefail

cleanup() {
    echo "Script exited at line $1"
}
trap 'cleanup $LINENO' ERR EXIT

echo "Step 1: Starting script"

echo "Step 2: Creating temp file"
touch /tmp/test_trap.txt

echo "Step 3: This will succeed"
ls /tmp/test_trap.txt

echo "Step 4: This will fail"
ls /tmp/this_does_not_exist.txt

echo "Step 5: This should never run"