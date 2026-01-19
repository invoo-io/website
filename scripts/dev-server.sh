#!/bin/bash
# Resilient dev server that auto-restarts on crash
# Usage: ./scripts/dev-server.sh [port]

PORT=${1:-5200}
MAX_RESTARTS=10
RESTART_COUNT=0
RESTART_DELAY=2

cleanup() {
    echo ""
    echo "Shutting down dev server..."
    kill $DEV_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

while [ $RESTART_COUNT -lt $MAX_RESTARTS ]; do
    echo "Starting Next.js dev server on port $PORT (attempt $((RESTART_COUNT + 1))/$MAX_RESTARTS)..."

    # Clear corrupted .next cache if it exists
    if [ -d ".next/static/development" ]; then
        rm -rf .next/static/development/_buildManifest.js.tmp.* 2>/dev/null
    fi

    # Start dev server
    npm run dev -- -p $PORT &
    DEV_PID=$!

    # Wait for the process to exit
    wait $DEV_PID
    EXIT_CODE=$?

    # If clean exit (Ctrl+C), don't restart
    if [ $EXIT_CODE -eq 0 ] || [ $EXIT_CODE -eq 130 ]; then
        echo "Dev server stopped cleanly."
        exit 0
    fi

    RESTART_COUNT=$((RESTART_COUNT + 1))

    if [ $RESTART_COUNT -lt $MAX_RESTARTS ]; then
        echo "Dev server crashed (exit code: $EXIT_CODE). Restarting in ${RESTART_DELAY}s..."
        sleep $RESTART_DELAY
    fi
done

echo "Max restarts ($MAX_RESTARTS) reached. Please check for errors."
exit 1
