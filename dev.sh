#!/usr/bin/env bash
# Portfolio dev server — runs server.js (Node built-ins, no install) detached.
# Port 4830 is reserved for this project so it won't collide with other dev servers.
# Log and PID live outside the repo so they don't show up in git status.
#
#   ./dev.sh start    # launch in background (survives closing Terminal)
#   ./dev.sh stop     # shut it down
#   ./dev.sh status   # is it running?
#   ./dev.sh log      # tail the output

set -euo pipefail

PORT=4830
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG="${TMPDIR:-/tmp}/karlmiguerez-dev.log"
PIDFILE="${TMPDIR:-/tmp}/karlmiguerez-dev.pid"

running() { [ -f "$PIDFILE" ] && kill -0 "$(cat "$PIDFILE")" 2>/dev/null; }

case "${1:-start}" in
  start)
    if running; then
      echo "Already running (pid $(cat "$PIDFILE")) → http://localhost:$PORT"
      exit 0
    fi
    if lsof -i :"$PORT" >/dev/null 2>&1; then
      echo "Port $PORT is already in use by something else. Free it or pick another port."
      exit 1
    fi
    cd "$DIR"
    PORT="$PORT" nohup node server.js >"$LOG" 2>&1 &
    echo $! >"$PIDFILE"
    echo "Starting on http://localhost:$PORT (pid $!)"
    echo "First boot takes a few seconds — check readiness with: ./dev.sh log"
    ;;
  stop)
    if running; then
      pkill -P "$(cat "$PIDFILE")" 2>/dev/null || true   # vercel spawns children
      kill "$(cat "$PIDFILE")" 2>/dev/null || true
      rm -f "$PIDFILE"
      echo "Stopped."
    else
      echo "Not running."
      rm -f "$PIDFILE"
    fi
    ;;
  status)
    if running; then
      echo "Running (pid $(cat "$PIDFILE")) → http://localhost:$PORT"
    else
      echo "Not running."
    fi
    ;;
  log)
    tail -f "$LOG"
    ;;
  *)
    echo "Usage: ./dev.sh {start|stop|status|log}"
    exit 1
    ;;
esac
