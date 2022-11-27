<?php

namespace App\Http\Controllers\Issue;

use App\Http\Responses\BasicResponse;
use Illuminate\Routing\Controller;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\Issue\AddRequest;
use App\Http\Requests\Issue\UploadAttachmentRequest;
use App\Models\Issue;
use App\Models\IssueAttachment;
use App\Services\Audit\Event;
use App\Services\Issue\Attachment;
use App\Services\Audit\EventTypes;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Symfony\Component\HttpFoundation\Response;

class AttachmentController extends Controller
{
    /**
     * Upload new file
     * @param AddRequest $request
     * @param Issue $issueService
     * @return JsonResponse
     */
    public function upload(Issue $issue, UploadAttachmentRequest $request, Attachment $attachmentService, Event $eventService): JsonResponse
    {
        $fields = $request->validated();

        if (isset($fields['attachments'])) {
            foreach ($fields['attachments'] as $data) {
                $attachment = $attachmentService->add($issue->id, $data);
                $data['file'] = $attachment->file;
                $eventService->add($attachment->id, IssueAttachment::class, EventTypes::ENTITY_CREATED, $data);
            }
        }

        return (new BasicResponse())
            ->setMessage('Fajl je uspešno uploadovan.')
            ->response();
    }

    /**
     * Attachment removed
     *
     * @param IssueAttachment $attachment
     * @param Attachment $attachmentService
     * @return JsonResponse
     */
    public function remove(IssueAttachment $attachment, Attachment $attachmentService, Event $eventService): JsonResponse
    {
        if ($attachment) {
            $attachmentService->remove($attachment);
            Storage::delete($attachment->file);
            $eventService->add($attachment->id, IssueAttachment::class, EventTypes::ENTITY_DELETED, $attachment->toArray());
        }

        return (new BasicResponse())
            ->setMessage('Fajl je uspešno obrisan.')
            ->response();
    }

    /**
     * Issue attachment
     *
     * @param IssueAttachment $attachment
     * @return void
     */
    public function download(IssueAttachment $attachment, Event $eventService): StreamedResponse
    {
        if ($attachment) {
            $eventService->add($attachment->id, IssueAttachment::class, EventTypes::FILE_DOWNLOADED, $attachment->toArray());

            return Storage::download($attachment->file);
        }

        return (new BasicResponse())
            ->response()
            ->setStatusCode(Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}
