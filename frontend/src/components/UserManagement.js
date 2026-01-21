// // src/components/UserManagement.js
// import React, { useState, useEffect } from 'react';
// import ApiService from '../services/apiService';

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     email: '',
//     full_name: ''
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const usersData = await ApiService.getAllUsers();
//       setUsers(usersData);
//       setIsLoading(false);
//     } catch (err) {
//       console.error('Error fetching users:', err);
//       setError('Failed to fetch users');
//       setIsLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
    
//     try {
//       await ApiService.createUser(formData);
//       setSuccess('User created successfully');
//       setFormData({
//         username: '',
//         password: '',
//         email: '',
//         full_name: ''
//       });
//       setShowAddForm(false);
//       fetchUsers();
//     } catch (err) {
//       setError('Failed to create user');
//       console.error('Error creating user:', err);
//     }
//   };

//   const handleDelete = async (userId) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         await ApiService.deleteUser(userId);
//         setSuccess('User deleted successfully');
//         fetchUsers();
//       } catch (err) {
//         setError('Failed to delete user');
//         console.error('Error deleting user:', err);
//       }
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>User Management</h2>
//         <button 
//           className="btn btn-primary" 
//           onClick={() => setShowAddForm(!showAddForm)}
//         >
//           {showAddForm ? 'Cancel' : 'Add New User'}
//         </button>
//       </div>

//       {error && <div className="alert alert-danger">{error}</div>}
//       {success && <div className="alert alert-success">{success}</div>}

//       {showAddForm && (
//         <div className="card mb-4">
//           <div className="card-header">
//             <h5>Create New User</h5>
//           </div>
//           <div className="card-body">
//             <form onSubmit={handleSubmit}>
//               <div className="row">
//                 <div className="col-md-6 mb-3">
//                   <label htmlFor="username" className="form-label">Username</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="username"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label htmlFor="password" className="form-label">Password</label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     id="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label htmlFor="email" className="form-label">Email</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label htmlFor="full_name" className="form-label">Full Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="full_name"
//                     name="full_name"
//                     value={formData.full_name}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>
//               <button type="submit" className="btn btn-primary">Create User</button>
//             </form>
//           </div>
//         </div>
//       )}

//       {isLoading ? (
//         <div className="text-center my-5">
//           <div className="spinner-border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       ) : (
//         <div className="card">
//           <div className="card-body">
//             <div className="table-responsive">
//               <table className="table table-striped">
//                 <thead>
//                   <tr>
//                     <th>Username</th>
//                     <th>Full Name</th>
//                     <th>Email</th>
//                     <th>Created At</th>
//                     <th>Last Login</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.map(user => (
//                     <tr key={user.id}>
//                       <td>{user.username}</td>
//                       <td>{user.full_name || '-'}</td>
//                       <td>{user.email || '-'}</td>
//                       <td>{new Date(user.createdAt).toLocaleDateString()}</td>
//                       <td>{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}</td>
//                       <td>
//                         <button 
//                           className="btn btn-sm btn-danger" 
//                           onClick={() => handleDelete(user.id)}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserManagement;