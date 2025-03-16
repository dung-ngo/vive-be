module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'qrController.index',
    config: {
      policies: [],
    },
  },
  {
    method: 'PUT',
    path: '/',
    handler: 'qrController.update',
    config: {
      policies: [],
    },
  },
];
