module.exports = {
  async rewrites() {
    return [
      {
        source: '/login',
        destination: '/auth/login',
      },
      {
        source:'/profile-worker',
        destination:'/worker/profile-worker',
      },
      {
        source:'/register-user',
        destination:'/auth/register-user',
      },
      {
        source:'/register-perekrut',
        destination:'/auth/register-perekrut',
      },
      {
        source:'/worker-profile',
        destination:'/worker/worker-profile',
      }
    ]
  }
}