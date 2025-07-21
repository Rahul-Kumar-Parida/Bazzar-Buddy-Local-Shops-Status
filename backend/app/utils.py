from datetime import datetime

def format_time(dt: datetime) -> str:
    return dt.strftime("%Y-%m-%d %H:%M:%S") 