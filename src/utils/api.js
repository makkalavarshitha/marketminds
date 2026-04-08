const API_BASE_URL = '/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('marketmind-token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
};

export const authAPI = {
  register: (userData) => apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  getMe: () => apiRequest('/auth/me'),
};

export const productsAPI = {
  getProducts: () => apiRequest('/products'),
  createProduct: (product) => apiRequest('/products', {
    method: 'POST',
    body: JSON.stringify(product),
  }),
  updateProduct: (id, product) => apiRequest(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(product),
  }),
  deleteProduct: (id) => apiRequest(`/products/${id}`, {
    method: 'DELETE',
  }),
};

export const salesAPI = {
  getSales: () => apiRequest('/sales'),
  createSale: (saleData) => apiRequest('/sales', {
    method: 'POST',
    body: JSON.stringify(saleData),
  }),
  getDashboardStats: () => apiRequest('/sales/dashboard/stats'),
};

export const storeAPI = {
  getProfile: () => apiRequest('/store'),
  updateProfile: (data) => apiRequest('/store', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

export const notificationsAPI = {
  getNotifications: (limit = 50, skip = 0, read) => {
    const params = new URLSearchParams();
    params.append('limit', limit);
    params.append('skip', skip);
    if (read !== undefined) {
      params.append('read', read);
    }
    return apiRequest(`/notifications?${params.toString()}`);
  },
  getNotification: (id) => apiRequest(`/notifications/${id}`),
  markAsRead: (id) => apiRequest(`/notifications/${id}`, {
    method: 'PUT',
  }),
  markAllAsRead: () => apiRequest('/notifications/mark-all/read', {
    method: 'PUT',
  }),
  deleteNotification: (id) => apiRequest(`/notifications/${id}`, {
    method: 'DELETE',
  }),
};

export const getProduct = (id) => apiRequest(`/products/${id}`);