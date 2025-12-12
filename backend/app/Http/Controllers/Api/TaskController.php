<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // It is assumed that task controller functions
        // are used only with protected routes
        // and the user is inserted by sanctum middleware in the request
        $user = $request->user();
        $tasks = $user->tasks()->select('id', 'title', 'description', 'status')->get();

        return response()->json([
            'tasks' => $tasks,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'status' => 'nullable|integer',
        ]);

        $user = $request->user();

        $task = $user->tasks()->create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'status' => $validated['status'] ?? 0,
        ]);

        return response()->json([
            'task' => [
                'id' => $task->id,
                'title' => $task->title,
                'description' => $task->description,
                'status' => $task->status,
            ],
            'message' => 'Task created',
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string',
            'description' => 'sometimes|required|string',
            'status' => 'sometimes|required|integer',
        ]);

        $user = $request->user();
        $task = $user->tasks()->findOrFail($id);
        $task->update($validated);

        return response()->json([
            'task' => [
                'id' => $task->id,
                'title' => $task->title,
                'description' => $task->description,
                'status' => $task->status,
            ],
            'message' => 'Task updated',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id)
    {
        $user = $request->user();
        $task = $user->tasks()->findOrFail($id);
        $task->delete();

        return response()->json([
            'message' => 'Task deleted',
        ], 200);
    }
}
