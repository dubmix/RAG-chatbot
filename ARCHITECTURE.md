# Project Architecture

```mermaid
---
title: Project Architecture
theme: base
---

flowchart LR
    subgraph docker[Docker Compose]
        backend[Backend]
        frontend[Client]
        database[Vector Database]
        nginx[Reverse Proxy]
    end

    subgraph llmapi[LLM API]
        llmendpoint[Endpoint]
    end

        backend <--> nginx
        backend <--> llmendpoint
        backend <--> database
        nginx <--> frontend
```
