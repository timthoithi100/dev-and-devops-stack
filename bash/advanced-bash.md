# Advanced Bash Concepts

---

### Lesson 1: Functions
- Functions group commands into reusable blocks — define once, call anywhere
- Basic syntax:
```bash
function_name() {
    # commands
}
```
- Arguments passed to functions work exactly like positional parameters — `$1`, `$2`, `$@`
- **`local`** scopes a variable to the function only — without it the variable is global and can cause hard-to-trace bugs in large scripts
- Functions return exit codes with `return 0` (success) or `return 1` (failure) — check with `$?`
- Return codes are not the same as output — use `echo` to return a value, `return` for status only

---

### Lesson 2: Error Trapping
Three safety headers every serious script should have — often written together:
```bash
set -euo pipefail
```

| Option | Meaning |
|--------|---------|
| `set -e` | Exit immediately if any command fails |
| `set -u` | Treat unset variables as errors and exit |
| `set -o pipefail` | Catch failures inside pipes, not just the last command |

**`trap`** — runs a function when a specific signal or event occurs:
```bash
trap 'cleanup $LINENO' ERR EXIT
```

| Signal | When it fires |
|--------|--------------|
| `ERR` | Any command fails |
| `EXIT` | Script exits for any reason |
| `INT` | User presses Ctrl+C |
| `TERM` | Script receives kill signal |

- `$LINENO` — built-in variable, holds the current line number — useful for pinpointing where a script failed
- Without `set -e` and `trap`, bash silently continues after failures — dangerous in deployment scripts
- Use the cleanup function to delete temp files, close connections, or send alerts on failure

---

### Lesson 3: Process Management

**Background jobs:**
| Command | Meaning |
|---------|---------|
| `command &` | Run command in background |
| `$!` | PID of last background process |
| `jobs` | List all background jobs |
| `fg %1` | Bring job 1 to foreground |
| `bg %1` | Send job 1 to background |
| `Ctrl+Z` | Suspend foreground process (SIGTSTP) — process paused but alive |
| `Ctrl+C` | Kill foreground process (SIGINT) — process terminated |

**Killing processes:**
| Command | Meaning |
|---------|---------|
| `kill PID` | Graceful kill — SIGTERM (default), allows cleanup |
| `kill -9 PID` | Force kill — SIGKILL, cannot be caught or ignored |
| `kill %1` | Kill job number 1 |
| `killall sleep` | Kill all processes named `sleep` |

**Viewing processes:**
| Command | Meaning |
|---------|---------|
| `ps aux` | All running processes with full detail |
| `ps aux \| grep name` | Filter processes by name |
| `ps aux \| grep name \| grep -v grep` | Filter out grep itself from results |
| `top` / `htop` | Live process monitor |

**`nohup`:**
- Runs a process that keeps going even after you log out — immune to SIGHUP
- Automatically redirects output to `nohup.out` in current directory
- Common pattern: `nohup ./script.sh &`
- Clean up `nohup.out` after — it stays in your working directory

**Job control works in live terminal only** — `fg` and `bg` don't work inside scripts because scripts run in non-interactive shells with job control disabled

---

### Lesson 4: Bash Arrays

**Regular arrays:**
```bash
FRUITS=("apple" "banana" "mango" "orange")
```

| Syntax | Meaning |
|--------|---------|
| `${FRUITS[0]}` | First element — arrays are zero-indexed |
| `${FRUITS[@]}` | All elements |
| `${#FRUITS[@]}` | Count of elements |
| `${!FRUITS[@]}` | All indices (0 1 2 3...) |
| `FRUITS+=("grape")` | Append to array |

- Regular arrays maintain **insertion order**
- Loop through with `for ITEM in "${FRUITS[@]}"; do`
- Always quote `"${FRUITS[@]}"` in loops — unquoted breaks on elements with spaces

**Associative arrays (key-value / hash maps):**
```bash
declare -A PERSON
PERSON[name]="Tim"
PERSON[role]="Developer"
```

| Syntax | Meaning |
|--------|---------|
| `${PERSON[name]}` | Value for key `name` |
| `${PERSON[@]}` | All values |
| `${!PERSON[@]}` | All keys |
| `declare -A` | Required — declares associative array |

- Associative arrays are **unordered** — keys come back in unpredictable order
- `!` is the indirection operator — gives you names/keys instead of values
- Must use `declare -A` before using associative arrays — unlike regular arrays which need no declaration