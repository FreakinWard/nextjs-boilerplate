module.exports = {
    apps : [
        {
            name: "Frontend",
            cwd: "/var/www/html/frontend",
            script: "npm run dev || (rm -rf node_modules && npm install && npm run dev)"
        },
        {
            name: "Backend",
            cwd: "/var/www/html/backend",
            script: './.venv/bin/uvicorn main:app --host "0.0.0.0" --port "8000" --reload'
        }
    ]
}
