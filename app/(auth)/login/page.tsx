export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-card">
          <h1>Welcome Back</h1>
          <p>Sign in to access your account</p>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>

          <div className="login-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>

          <button className="login-btn">Sign In</button>
        </div>
      </div>

      <div className="login-right">
        <div className="overlay">
          <h2>Motor Transport Managers</h2>
          <p>
            Securely manage your insurance policies and business from one
            place.
          </p>
        </div>
      </div>
    </div>
  );
}

