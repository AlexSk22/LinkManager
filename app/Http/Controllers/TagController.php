<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Auth::user()->tags()->with('links')->withCount('links')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'tagname' => 'required|max:255',
        ]);
        Tag::create(
            [
                'tagname' => $request->input('tagname'),
                'user_id' => Auth::user()->user_id,
            ]
        );


    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Auth::user()->tags()->with('links')->withCount('links')->where('tagname', $id)->get();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'tagname' => 'required|max:255',
        ]);

        try {
            $link = Auth::user()->tags()->where('id', $id)->firstOrFail();

            $link->update([
                'tagname' => $request->input('tagname'),
            ]);

            return response()->json(['message' => 'tagname updated']);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Tag not founded.'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while updating the tag.'], 500);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $tag = Tag::findOrFail($id);
            $tag->delete();
            return response()->json(['message' => 'Link deleted successfully.'], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Link not found.'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting the link.'], 500);
        }
    }
}
