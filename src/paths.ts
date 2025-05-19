export const homePath = () => {
    return '/';
}

export const ticketsPath = () => {
    return '/tickets';
}

export const ticketPath = (ticketId: string) => {
    return `/tickets/${ticketId}`;
}

export const ticketEditPath = (ticketId: string) => {
    return `/tickets/${ticketId}/edit`;
}