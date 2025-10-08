# ============================
# 🧱 Development Image
# ============================
FROM oven/bun:1.1.34 AS dev

# Upgrade Node.js to 22.12+ for Vite
RUN apt-get update && \
    apt-get install -y curl ca-certificates gnupg git bash zsh && \
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

# Cache deps
COPY bun.lock package.json ./
RUN bun install --frozen-lockfile

# Copy app source
COPY . .

# Environment setup
ENV SHELL=/bin/bash
ENV TERM=xterm-256color
ENV HOST=0.0.0.0
ENV PORT=5173

# Expose Vite port
EXPOSE 5173

# Default dev command
CMD ["bun", "run", "dev"]


