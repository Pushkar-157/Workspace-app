from flask import Blueprint, request, jsonify
from config import supabase
from auth_middleware import require_auth

api_bp = Blueprint("api", __name__)

@api_bp.route("/notes", methods=["GET"])
@require_auth
def get_notes():
    user_id = request.user.id
    response = supabase.table("notes").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
    return jsonify(response.data), 200

@api_bp.route("/notes", methods=["POST"])
@require_auth
def create_note():
    user_id = request.user.id
    data = request.json
    new_note = {
        "user_id": user_id,
        "title": data.get("title", "Untitled"),
        "content": data.get("content", "")
    }
    response = supabase.table("notes").insert(new_note).execute()
    return jsonify(response.data[0]), 201

@api_bp.route("/notes/<note_id>", methods=["DELETE"])
@require_auth
def delete_note(note_id):
    user_id = request.user.id
    supabase.table("notes").delete().eq("id", note_id).eq("user_id", user_id).execute()
    return jsonify({"message": "Note deleted"}), 200

@api_bp.route("/tasks", methods=["GET"])
@require_auth
def get_tasks():
    user_id = request.user.id
    response = supabase.table("tasks").select("*").eq("user_id", user_id).order("created_at", desc=False).execute()
    return jsonify(response.data), 200

@api_bp.route("/tasks", methods=["POST"])
@require_auth
def create_task():
    user_id = request.user.id
    data = request.json
    new_task = {
        "user_id": user_id,
        "task_text": data.get("task_text"),
        "is_completed": False,
        "reminder_date": data.get("reminder_date")
    }
    response = supabase.table("tasks").insert(new_task).execute()
    return jsonify(response.data[0]), 201

@api_bp.route("/tasks/<task_id>", methods=["PATCH"])
@require_auth
def toggle_task(task_id):
    user_id = request.user.id
    data = request.json
    response = supabase.table("tasks").update({
        "is_completed": data.get("is_completed")
    }).eq("id", task_id).eq("user_id", user_id).execute()
    return jsonify(response.data[0]), 200

@api_bp.route("/tasks/<task_id>", methods=["DELETE"])
@require_auth
def delete_task(task_id):
    user_id = request.user.id
    supabase.table("tasks").delete().eq("id", task_id).eq("user_id", user_id).execute()
    return jsonify({"message": "Task deleted"}), 200
