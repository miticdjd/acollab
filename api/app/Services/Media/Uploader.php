<?php

namespace App\Services\Media;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

class Uploader
{
    /**
     * Put uploaded file in folder
     * @param string $folder
     * @param UploadedFile $file
     * @param bool $isPublic
     * @return false|string
     */
    public function putFile(string $folder, UploadedFile $file, bool $isPublic = false)
    {
        $options = $isPublic ? 'public' : '';

        return Storage::putFile($folder, $file, $options);
    }

    /**
     * Put file in a folder
     * @param string $folder
     * @param string $content
     * @param string $extension
     * @param string|null $name
     * @param bool $isPublic
     * @return null|string
     */
    public function put(
        string $folder,
        string $content,
        string $extension,
        string $name = null,
        bool $isPublic = false
    ): ?string {
        $fileName = $name ? $name : Str::random(40);
        $path = $path = rtrim($folder, '/').'/';

        $saveFileTo = $path . $fileName . '.' . $extension;
        $options = $isPublic ? 'public' : '';

        $saved = Storage::put($saveFileTo, $content, $options);

        if ($saved) {
            return $saveFileTo;
        }

        return null;
    }

    /**
     * Remove existing file
     * @param string $filePath
     * @return bool
     */
    public function remove(string $filePath): bool
    {
        return Storage::delete($filePath);
    }
}
