import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './RegistrationForm.css';

const schema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[@$!%*?&#]/, 'Password must contain at least one special character'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  terms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions')
});

function RegistrationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: '', color: '' });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  });

  const password = watch('password', '');

  const calculatePasswordStrength = (pwd) => {
    let score = 0;
    if (!pwd) return { score: 0, label: '', color: '' };

    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[@$!%*?&#]/.test(pwd)) score++;

    if (score <= 2) return { score, label: 'Weak', color: '#ff4444' };
    if (score <= 4) return { score, label: 'Medium', color: '#ffaa00' };
    return { score, label: 'Strong', color: '#00aa00' };
  };

  const onSubmit = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const { confirmPassword, terms, ...submitData } = data;
    console.log('Form submitted:', submitData);
    setSubmittedData(submitData);
    setIsSubmitted(true);
    reset();
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPasswordStrength(calculatePasswordStrength(pwd));
  };

  if (isSubmitted) {
    return (
      <div className="success-message">
        <div className="success-icon">✓</div>
        <h2>Registration Successful!</h2>
        <div className="submitted-data">
          <h3>Submitted Information:</h3>
          <p><strong>Username:</strong> {submittedData?.username}</p>
          <p><strong>Email:</strong> {submittedData?.email}</p>
        </div>
        <button 
          onClick={() => setIsSubmitted(false)} 
          className="btn-primary"
        >
          Register Another User
        </button>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2>Registration Form</h2>
      <p className="form-description">
        Create your account with username, email, password validation, and password strength indicator
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="registration-form" noValidate>
        <div className="form-group">
          <label htmlFor="username">
            Username <span className="required">*</span>
          </label>
          <input
            type="text"
            id="username"
            {...register('username')}
            className={errors.username ? 'error' : ''}
            placeholder="Enter username"
            aria-invalid={errors.username ? 'true' : 'false'}
            aria-describedby={errors.username ? 'username-error' : undefined}
          />
          {errors.username && (
            <span id="username-error" className="error-message" role="alert">
              {errors.username.message}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Email Address <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className={errors.email ? 'error' : ''}
            placeholder="Enter email address"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <span id="email-error" className="error-message" role="alert">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">
            Password <span className="required">*</span>
          </label>
          <input
            type="password"
            id="password"
            {...register('password', {
              onChange: handlePasswordChange
            })}
            className={errors.password ? 'error' : ''}
            placeholder="Enter password"
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-describedby={errors.password ? 'password-error' : undefined}
          />
          {password && (
            <div className="password-strength">
              <div className="strength-bar">
                <div
                  className="strength-fill"
                  style={{
                    width: `${(passwordStrength.score / 6) * 100}%`,
                    backgroundColor: passwordStrength.color
                  }}
                ></div>
              </div>
              <span style={{ color: passwordStrength.color }}>
                {passwordStrength.label}
              </span>
            </div>
          )}
          {errors.password && (
            <span id="password-error" className="error-message" role="alert">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">
            Confirm Password <span className="required">*</span>
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword')}
            className={errors.confirmPassword ? 'error' : ''}
            placeholder="Confirm password"
            aria-invalid={errors.confirmPassword ? 'true' : 'false'}
            aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
          />
          {errors.confirmPassword && (
            <span id="confirm-password-error" className="error-message" role="alert">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <div className="form-group checkbox-group">
          <label htmlFor="terms" className="checkbox-label">
            <input
              type="checkbox"
              id="terms"
              {...register('terms')}
              aria-invalid={errors.terms ? 'true' : 'false'}
              aria-describedby={errors.terms ? 'terms-error' : undefined}
            />
            <span>
              I accept the <a href="#terms">Terms and Conditions</a>
            </span>
          </label>
          {errors.terms && (
            <span id="terms-error" className="error-message" role="alert">
              {errors.terms.message}
            </span>
          )}
        </div>

        <button 
          type="submit" 
          className="btn-primary btn-submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>

        <div className="password-requirements">
          <h4>Password Requirements:</h4>
          <ul>
            <li>At least 8 characters long</li>
            <li>Contains lowercase and uppercase letters</li>
            <li>Contains at least one number</li>
            <li>Contains at least one special character (@$!%*?&#)</li>
          </ul>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
