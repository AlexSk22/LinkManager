<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
            // Create the tag if it doesn't exist
            $tag = Tag::firstOrCreate(
                ['tagname' => $tagname],
                ['user_id' => Auth::user()->id()]
            );

            // Attach tag to link
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
