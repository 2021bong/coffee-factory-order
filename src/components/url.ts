const href = window?.location.href || 'http://localhost:3000';

const STATUS_URL = href + 'api/status';
const ALL_URL = href + 'api/all';
const ORDER_URL = href + 'api/order';

export { STATUS_URL, ALL_URL, ORDER_URL };
