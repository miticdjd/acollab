export function getIssueStatusBg(status) {

    if (status === 'open') {
        
        return 'bg-primary';
    }

    if (status === 'in_progress') {

        return 'bg-secondary';
    }

    if (status === 'qa_ready') {

        return 'bg-warning';
    }

    if (status === 'removed') {

        return 'bg-danger';
    }

    return 'bg-success';
};

export function getIssueStatusColor(status) {

    if (status === 'open') {
        
        return 'primary';
    }

    if (status === 'in_progress') {

        return 'secondary';
    }

    if (status === 'qa_ready') {

        return 'warning';
    }

    if (status === 'removed') {

        return 'danger';
    }

    return 'success';
};

export function getAllStatuses() {

    return [
        'open',
        'in_progress',
        'qa_ready',
        'done'
    ];
}