<?php

namespace App\Http\Controllers;

use App\Models\Link;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class LinkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Auth::user()->links()->with('tags')->get();
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:255',
            'link' => 'required|max:255',
            'tags' => 'array',
            'tags.*' => 'string|max:255',
        ]);
        $link = Auth::user()->links()->create([
            'name' => $request->input('name'),
            'link' => $request->input('link'),
        ]);
        $tags = $request->input('tags', []);
        foreach ($tags as $tagname) {
            $tag = Tag::firstOrCreate(
                ['tagname' => $tagname],
                ['user_id' => Auth::user()->id()]
            );

            $link->tags()->attach($tag->tagname, ['user_id' => Auth::id()]);
        }
        return response()->json(['message' => 'Link created with tags', 'link' => $link->load('tags')]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|max:255',
            'link' => 'required|max:255',
        ]);

        try {
            $link = Auth::user()->links()->where('id', $id)->firstOrFail();

            $link->update([
                'name' => $request->input('name'),
                'link' => $request->input('link'),
            ]);

            return response()->json(['message' => 'Link created with tags', 'link' => $link->load('tags')]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Link not found.'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while updating the link.'], 500);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $article = Link::findOrFail($id);
            $article->delete();
            return response()->json(['message' => 'Link deleted successfully.'], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Link not found.'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting the link.'], 500);
        }
    }

}
