from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from login import router as login_router
from process_request import router as process_request_router
from saved_messages import SavedMessages
from saved_messages import router as process_saved_messages
from settings import Settings


def get_lifespan():
    @asynccontextmanager
    async def lifespan(app: FastAPI):
        saved_messages = SavedMessages()
        app.state.saved_messages = saved_messages
        yield

    return lifespan


def app():
    app = FastAPI(lifespan=get_lifespan())
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get("/api/title")
    def title():
        return JSONResponse(content={"title": "helpme.ai"})

    app.include_router(login_router)
    app.include_router(process_request_router)
    app.include_router(process_saved_messages)

    return app


if __name__ == "__main__":
    settings = Settings()
    host = settings.UVICORN_HOST
    port = settings.UVICORN_PORT
    uvicorn.run("main:app", host=host, port=port, reload=True)
