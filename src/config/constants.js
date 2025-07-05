const AUTH_TOKEN_TYPES = {
  ACCESS: 'access',
  REFRESH: 'refresh',
};

const USER_ROLES = {
  OWNER: 'owner',
  MANAGER: 'manager',
};

const STOCK_REQUEST_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

module.exports = {
  AUTH_TOKEN_TYPES,
  USER_ROLES,
  STOCK_REQUEST_STATUS,
}