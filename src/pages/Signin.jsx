import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signin.css';

const Signin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('signin'); // 'signin', 'signup', or 'admin'
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Hardcoded list of valid admin users as requested
  const validAdmins = {
    "2400032599@kluniversity.in": "32599AK",
    "2400030653@kluniversity.in": "30653RA",
    "2400030159@kluniversity.in": "30159SA" // Note: As per your request, password for this user is 'SA'
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on new input
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' }); // Reset form on tab switch
    setError('');
  };

  const handleAuthSuccess = (user) => {
    localStorage.setItem('currentUser', JSON.stringify({ name: user.name, isLoggedIn: true, email: user.email }));
    alert(`Success! Welcome, ${user.name}.`);
    navigate('/dashboard'); // Redirect to dashboard on successful login/signup
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.email === formData.email)) {
      setError('A user with this email already exists. Please sign in.');
      return;
    }
    const newUser = { name: formData.name, email: formData.email, password: formData.password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    handleAuthSuccess(newUser); // Automatically log in the new user
    setIsLoading(false);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === formData.email && u.password === formData.password);
    if (user) {
      handleAuthSuccess(user);
      setIsLoading(false);
    } else {
      setError('Invalid email or password.');
      setIsLoading(false);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (validAdmins[formData.email] && validAdmins[formData.email] === formData.password) {
      alert('Admin login successful. Access granted.');
      setIsLoading(false);
      // Here you could navigate to a dedicated admin dashboard if you build one
      // For now, it just shows an alert.
    } else {
      setError('Invalid admin credentials. Access denied.');
      setIsLoading(false);
    }
  };

  return (
    <div className="signin-page-container">
      <div className="signin-form-box">
        {/* These are the new tabs for the three portals */}
        <div className="auth-tabs">
          <button onClick={() => handleTabClick('signin')} className={activeTab === 'signin' ? 'active' : ''}>Sign In</button>
          <button onClick={() => handleTabClick('signup')} className={activeTab === 'signup' ? 'active' : ''}>Sign Up</button>
          <button onClick={() => handleTabClick('admin')} className={activeTab === 'admin' ? 'active' : ''}>Admin</button>
        </div>
        
        <div className="form-content">
          {/* Sign In Form */}
          {activeTab === 'signin' && (
            <form onSubmit={handleSignIn}>
              <h2>Client Sign In</h2>
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="form-input" required />
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="form-input" required />
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="signin-submit-btn" disabled={isLoading}>{isLoading ? 'Processing...' : 'Sign In'}</button>
            </form>
          )}

          {/* Sign Up Form */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignUp}>
              <h2>Create Your Account</h2>
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="form-input" required />
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="form-input" required />
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="form-input" required />
              <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="form-input" required />
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="signin-submit-btn" disabled={isLoading}>{isLoading ? 'Processing...' : 'Sign Up'}</button>
            </form>
          )}

          {/* Admin Login Form */}
          {activeTab === 'admin' && (
            <form onSubmit={handleAdminLogin}>
              <h2>Admin Access</h2>
              <input type="email" name="email" placeholder="Admin Email (@kluniversity.in)" value={formData.email} onChange={handleChange} className="form-input" required />
              <input type="password" name="password" placeholder="Admin Password" value={formData.password} onChange={handleChange} className="form-input" required />
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="signin-submit-btn" disabled={isLoading}>{isLoading ? 'Processing...' : 'Login as Admin'}</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signin;