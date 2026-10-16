import os
from pathlib import Path
from dotenv import load_dotenv
from supabase import create_client, Client

# Explicitly load the .env file from the same directory as config.py
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

# Fetch keys and strip any accidental whitespace or quotes
SUPABASE_URL = os.getenv("SUPABASE_URL", "").strip().strip('"').strip("'")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "").strip().strip('"').strip("'")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Missing Supabase credentials in .env file!")

# Initialize and export the Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
