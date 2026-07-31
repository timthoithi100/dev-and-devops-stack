# The Terminal

---

### Lesson 1: Navigation
- `pwd` — where you are
- `ls`, `ls -l`, `ls -la` — list contents, with detail, including hidden files
- `cd` — move around; `~` is home, `..` is parent, `.` is current
- Absolute paths start from `/`; relative paths start from where you are

---

### Lesson 2: File Operations
- `touch` — create empty files
- `mkdir` — create directories
- `cp` — copy files
- `mv` — move or rename files
- `rm` / `rm -r` / `rm -rf` — delete files / folders (no recycle bin)
- `echo "text" > file` — overwrite; `>>` — append
- `cat`, `head -n`, `tail -n`, `wc -l`, `wc -w` — read and count file contents

---

### Lesson 3: Permissions
- Every file has owner, group, others permissions: `rwx`
- `r=4, w=2, x=1` — add them for octal: `chmod 755`, `chmod 600`
- Symbolic mode: `chmod u+x`, `chmod g-w`, `chmod o=r`
- `chown user:group file` — change ownership (needs `sudo`)

---

### Lesson 4: DNF & System Config
- `sudo dnf update`, `install`, `remove`, `search`, `info`
- `cat /etc/os-release`, `uname -r`, `hostname`, `whoami`, `df -h`, `free -h`

---

### Lesson 5: What a Shell Is
- Shell sits between you and the OS
- bash — default on Fedora, industry standard for scripting
- sh — minimal POSIX shell; zsh/fish — alternatives, not installed on your system
- `echo $SHELL`, `cat /etc/shells` — check available shells

---

### Lesson 6: `less`
- Better than `cat` for long files — scrollable pager
- `Space/f` page down, `b` page up, `j/k` line by line, `G` end, `g` top, `/word` search, `q` quit

---

### Lesson 7 & 8: Text Editors
- **nano** — beginner friendly: `Ctrl+O` save, `Ctrl+X` exit, `Ctrl+W` search
- **vim** — modal editor: `i` insert, `Esc` normal, `:wq` save & quit, `:q!` force quit, `dd` delete line, `u` undo

---

### Lesson 9: Piping & Redirection
- `|` — pipe output of one command into another
- `>` — overwrite to file; `>>` — append to file
- `2>` — redirect stderr; `2>&1` — merge stderr into stdout
- `/dev/null` — discard output entirely

---

### Lesson 10: Environment Variables
- `$HOME`, `$PATH`, `$USER` — built-in variables
- `$PATH` — colon-separated list of directories bash searches for commands
- `MY_VAR="value"` — local to current shell
- `export MY_VAR` — makes it available to child processes
- `.bashrc` — runs every new terminal; `.bash_profile` — runs on login shells
- Custom aliases: `update`, `tidy`, `checkup` added to `~/.bashrc`
