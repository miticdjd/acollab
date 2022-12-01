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