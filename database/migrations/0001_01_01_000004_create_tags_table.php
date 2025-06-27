<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tags', function (Blueprint $table) {
            $table->string('tagname');
            $table->unsignedBigInteger('user_id');
            $table->primary(['tagname', 'user_id']);
            $table->timestamps();

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });
        Schema::create('links', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('link');
            $table->unsignedBigInteger('user_id');
            $table->timestamps();

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });
        Schema::create('link_tags', function (Blueprint $table) {
            $table->unsignedBigInteger('link_id');
            $table->string('tagname');
            $table->unsignedBigInteger('user_id');
            $table->timestamps();

            $table->primary(['link_id', 'tagname', 'user_id']);

            $table->foreign('link_id')
                ->references('id')
                ->on('links')
                ->onDelete('cascade');

            $table->foreign(['tagname', 'user_id'])
                ->references(['tagname', 'user_id'])
                ->on('tags')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tags');
        Schema::dropIfExists('links');
        Schema::dropIfExists('link_tags');
    }
};
