# Shell Scripting

---

### Lesson 1: Your First Script
- Every script starts with a **shebang**: `#!/bin/bash` — tells the OS which interpreter to use
- Make executable with `chmod +x script.sh`, run with `./script.sh`
- `$USER`, `$HOME` etc. are available inside scripts as environment variables
- `$(command)` — **command substitution**: runs a command and inserts its output inline

---

### Lesson 2: Variables, Quoting & Arithmetic
- Assign variables with `NAME="value"` — no spaces around `=`
- Reference with `$NAME` or `${NAME}`
- **Double quotes** `"$NAME"` — variable expands to its value
- **Single quotes** `'$NAME'` — treated as literal text, no expansion
- `$(command)` — command substitution, runs in a subshell and returns output
- Arithmetic with `$((expression))` — integers only: `SUM=$((NUM1 + NUM2))`
- `date +%A` — format flags let you extract specific parts of command output

---

### Lesson 3: Positional Parameters
| Variable | Meaning |
|----------|---------|
| `$0` | Script name |
| `$1`, `$2` | First, second argument |
| `$@` | All arguments |
| `$#` | Number of arguments |
| `$?` | Exit code of last command — `0` = success, non-zero = failure |

- Unset positional parameters expand to empty string, no error
- `$?` is used in scripts to check if a command succeeded before continuing

---

### Lesson 4: if/elif/else
```bash
if [ condition ]; then
    # commands
elif [ condition ]; then
    # commands
else
    # commands
fi
```
- `fi` closes the block — `if` backwards, consistent with bash convention (`esac` for `case`)
- Use `[ ]` for conditions, `[[ ]]` for extended conditions (regex, `&&`, `||`)

**Common test conditions:**
| Condition | Meaning |
|-----------|---------|
| `-eq` / `-ne` | Equal / not equal (numbers) |
| `-lt` / `-gt` | Less than / greater than |
| `-z "$VAR"` | String is empty |
| `-n "$VAR"` | String is not empty |
| `-f file` | File exists |
| `-d dir` | Directory exists |

---

### Lesson 5: Loops

**List loop:**
```bash
for NAME in Tim Alice Bob; do
    echo "Hello, $NAME"
done
```

**Range loop:**
```bash
for i in {1..5}; do
    echo "Number $i"
done
```

**C-style loop:**
```bash
for (( i=0; i<3; i++ )); do
    echo "Index $i"
done
```

**While loop:**
```bash
COUNT=1
while [ $COUNT -le 3 ]; do
    echo "Count is $COUNT"
    COUNT=$((COUNT + 1))
done
```
- Forgetting to increment in a while loop creates an **infinite loop** — kill with `Ctrl+C`
- `do`/`done` wraps loop bodies

---

### Lesson 6: grep
- Purpose-built for **searching** — prefer over `sed -n '/pattern/p'` for simple searches
- Never use `cat file | grep` — use `grep "pattern" file` directly (useless use of cat)

| Flag | Meaning |
|------|---------|
| `-i` | Case insensitive |
| `-n` | Show line numbers |
| `-v` | Invert match (lines that don't match) |
| `-c` | Count matching lines |
| `-r` | Search recursively through directories |

- grep matches **patterns not whole words** by default — `"Line 1"` also matches `"Line 10"`, `"Line 19"` etc.
- Use anchors for exact matching: `^Line 1$` matches only that line

---

### Lesson 7: awk
- Processes text **column by column** — built for structured data
- `$1`, `$2`... refer to columns; `$NF` is always the last column
- Comma between fields adds a space; no comma concatenates

| Syntax | Meaning |
|--------|---------|
| `awk '{print $1}'` | Print first column |
| `awk -F:` | Set delimiter to `:` |
| `awk 'NR>1'` | Skip header row (`NR` = row counter) |
| `awk '$5 > "50%"'` | Conditional — only print matching rows |

---

### Lesson 8: sed
- **Stream editor** — reads line by line, applies transformations
- Without `-i`, output goes to stdout only — file is not changed
- With `-i`, edits the file **in-place**

| Syntax | Meaning |
|--------|---------|
| `s/old/new/` | Replace first match per line |
| `s/old/new/g` | Replace all matches per line (global) |
| `/pattern/d` | Delete matching lines |
| `-n '/pattern/p'` | Print only matching lines |
| `-i` | Edit file in place |

- `sed -n '/pattern/p'` is functionally equivalent to `grep "pattern"` — but use `grep` for searching, `sed` for transforming

---

### Lesson 9: find & xargs
- `find` locates files; `xargs` runs a command on each result

| Command | Meaning |
|---------|---------|
| `find dir/ -name "*.sh"` | Find by filename pattern |
| `find . -mtime -1` | Modified in last 24 hours |
| `find dir/ -name "*.sh" -ls` | Find with full details |
| `find . -name "*.tmp" -delete` | Find and delete |
| `find ... \| xargs wc -l` | Run `wc -l` on every result |

- `find . -mtime -1` includes `.git` internals — exclude with `-not -path "./.git/*"`
- `xargs` gives a **total** when running `wc -l` across multiple files

---

### Lesson 10: cron
- Schedules scripts to run automatically
- `crontab -e` — edit jobs; `crontab -l` — list jobs; `crontab -r` — delete all jobs
- Always use **absolute paths** in cron jobs — cron doesn't know your working directory

**Cron syntax:**
```
* * * * * command
│ │ │ │ │
│ │ │ │ └── day of week (0-7)
│ │ │ └──── month (1-12)
│ │ └────── day of month (1-31)
│ └──────── hour (0-23)
└────────── minute (0-59)
```

| Expression | Schedule |
|------------|----------|
| `* * * * *` | Every minute |
| `0 8 * * *` | Daily at 8am |
| `0 9 * * 1` | Every Monday at 9am |
| `*/15 * * * *` | Every 15 minutes |
| `0 12 1 * *` | 1st of every month at noon |

- Cron fails **silently** — always test scripts manually before scheduling
- A typo in the filename means cron runs but nothing happens — always verify with `crontab -l`