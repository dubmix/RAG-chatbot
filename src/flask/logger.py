import datetime
import logging

GREEN = "\033[92m"
YELLOW = "\033[93m"
RESET_PRINT = "\033[0m"

timestamp = datetime.datetime.now().strftime("%Y-%m-%d-%H")
filename = f"backend-{timestamp}.log"


class ColoredLogs(logging.StreamHandler):
    def emit(self, record):
        msg = self.format(record)
        if record.levelno == logging.INFO:
            msg = f"{GREEN}{msg}{RESET_PRINT}"
        if record.levelno == logging.DEBUG:
            msg = f"{YELLOW}{msg}{RESET_PRINT}"
        print(msg)


# for docker build, use this line:
# file_handler = logging.FileHandler(f"/logs/{filename}")
file_handler = logging.FileHandler(f"../../logs/{filename}")
file_handler.setLevel(logging.DEBUG)
formatter = logging.Formatter("%(asctime)s - %(filename)s - %(levelname)s - %(message)s")
file_handler.setFormatter(formatter)

logger = logging.getLogger(__name__)
logger.addHandler(file_handler)
logger.addHandler(ColoredLogs())
logger.setLevel(logging.DEBUG)
