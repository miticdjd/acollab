<?php

namespace App\Services\Issue;

use App\Repository\IssueAttachmentRepository;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Services\Audit\Event;
use App\Services\Media\Uploader;
use App\Models\IssueAttachment;
use App\Services\Media\MimeType;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Services\Audit\EventTypes;

class Attachment
{
    use AuthorizesRequests;

    /**
     * @var IssueAttachmentRepository
     */
    private IssueAttachmentRepository $issueAttachmentRepository;

    /**
     * Uploader
     *
     * @var Uploader
     */
    private Uploader $uploader;

    /**
     * Updated event service
     */
    private Event $eventService;

    /**
     * Issue constructor.
     * @param IssueAttachmentRepository $issueAttachmentRepository
     * @param Event $eventService
     */
    public function __construct(IssueAttachmentRepository $issueAttachmentRepository, Uploader $uploader, Event $eventService)
    {
        $this->issueAttachmentRepository = $issueAttachmentRepository;
        $this->uploader = $uploader;
        $this->eventService = $eventService;
    }

    /**
     * @param int $productId
     * @param array $fields
     * @return IssueAttachment
     */
    public function add(int $issueId, array $fields): IssueAttachment
    {
        $fields['issue_id'] = $issueId;
        $fields['name'] =  Attachment::slugKeepCase(pathinfo($fields['name'], PATHINFO_FILENAME));
        $fields['sha256'] = hash_file('sha256', $fields['file']);

        $attachment = $this->issueAttachmentRepository->add($fields);

        $uploadedFile = $this->uploadFile($attachment, $fields['file']);
        $fullPath = Storage::path($uploadedFile);
        $fileName = pathinfo($fullPath, PATHINFO_BASENAME);

        $attachment->mime = mime_content_type($fields['file']);
        $attachment->file = $uploadedFile;
        $attachment->name = $fileName;
        $attachment->save();

        return $attachment->refresh();
    }

    /**
     * Remove attachment
     *
     * @param IssueAttachment $issueAttachment
     * @return boolean
     */
    public function remove(IssueAttachment $issueAttachment): bool
    {
        $original = $issueAttachment->getOriginal();

        $deleted = $this->issueAttachmentRepository->remove($issueAttachment);
        $changes = $issueAttachment->getChanges();

        $data = [
            'changes' => $changes,
            'original' => $original,
        ];

        $this->eventService->add($issueAttachment->id, IssueAttachment::class, EventTypes::ENTITY_DELETED, $data);

        return $deleted;
    }

    /**
     * @param IssueAttachment $issueAttachment
     * @param string $uploadedFile
     * @return string
     */
    public function uploadFile(IssueAttachment $issueAttachment, string $uploadedFile): string
    {
        $mime = mime_content_type($uploadedFile);

        $data = explode('base64,', $uploadedFile);
        $decodedFile = base64_decode($data[1]);

        return $this->uploader->put(
            'attachments/' . $issueAttachment->id . '/',
            $decodedFile,
            MimeType::mime2ext($mime),
            $issueAttachment->name,
            false
        );
    }

    /**
     * Generate a URL friendly "slug" from a given string.
     *
     * @param  string  $title
     * @param  string  $separator
     * @param  string|null  $language
     * @return string
     */
    public static function slugKeepCase($title, $separator = '-', $language = 'en')
    {
        $title = $language ? Str::ascii($title, $language) : $title;

        // Convert all dashes/underscores into separator
        $flip = $separator === '-' ? '_' : '-';

        $title = preg_replace('!['.preg_quote($flip).']+!u', $separator, $title);

        // Replace @ with the word 'at'
        $title = str_replace('@', $separator.'at'.$separator, $title);

        // Remove all characters that are not the separator, letters, numbers, or whitespace.
        $title = preg_replace('![^'.preg_quote($separator).'\pL\pN\s]+!u', '', $title);

        // Replace all separator characters and whitespace by a single separator
        $title = preg_replace('!['.preg_quote($separator).'\s]+!u', $separator, $title);

        return trim($title, $separator);
    }
}
