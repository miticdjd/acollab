<?php

namespace App\Repository;

use App\Models\IssueAttachment;

class IssueAttachmentRepository
{
    /**
     * Create new issue attachment
     * @param array $fields
     * @return IssueAttachment
     */
    public function add(array $fields): IssueAttachment
    {
        $issueAttachment = new IssueAttachment();
        $issueAttachment->fill($fields);
        $issueAttachment->save();

        return $issueAttachment;
    }

    /**
     * Remove issue attachment
     * @param IssueAttachment $issueAttachment
     * @return bool|null
     * @throws \Exception
     */
    public function remove(IssueAttachment $issueAttachment): ?bool
    {
        return $issueAttachment->delete();
    }
}
