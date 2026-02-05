import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import './MultiStepForm.css';

const step1Schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().required('Email is required').email('Invalid email')
});

const step2Schema = yup.object({
  phone: yup.string().required('Phone is required').matches(/^[0-9]{10}$/, 'Phone must be 10 digits'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  zipCode: yup.string().required('Zip code is required').matches(/^[0-9]{6}$/, 'Zip code must be 6 digits')
});

const step3Schema = yup.object({
  education: yup.string().required('Education is required'),
  experience: yup.string().required('Experience is required'),
  currentRole: yup.string().required('Current role is required')
});

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const getCurrentSchema = () => {
    switch (step) {
      case 1: return step1Schema;
      case 2: return step2Schema;
      case 3: return step3Schema;
      default: return step1Schema;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
    reset
  } = useForm({
    resolver: yupResolver(getCurrentSchema()),
    mode: 'onBlur',
    defaultValues: formData
  });

  const nextStep = async () => {
    const isValid = await trigger();
    if (isValid) {
      const currentData = getValues();
      setFormData({ ...formData, ...currentData });
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    const currentData = getValues();
    setFormData({ ...formData, ...currentData });
    setStep(step - 1);
  };

  const onSubmit = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const finalData = { ...formData, ...data };
    console.log('Multi-step form submitted:', finalData);
    setFormData(finalData);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setStep(1);
    setFormData({});
    setIsSubmitted(false);
    reset();
  };

  if (isSubmitted) {
    return (
      <div className="success-message">
        <div className="success-icon">✓</div>
        <h2>Application Submitted Successfully!</h2>
        <div className="submitted-data">
          <h3>Your Information:</h3>
          <div className="data-section">
            <h4>Personal Details:</h4>
            <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
            <p><strong>Email:</strong> {formData.email}</p>
          </div>
          <div className="data-section">
            <h4>Contact Information:</h4>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>Address:</strong> {formData.address}, {formData.city} - {formData.zipCode}</p>
          </div>
          <div className="data-section">
            <h4>Professional Details:</h4>
            <p><strong>Education:</strong> {formData.education}</p>
            <p><strong>Experience:</strong> {formData.experience}</p>
            <p><strong>Current Role:</strong> {formData.currentRole}</p>
          </div>
        </div>
        <button onClick={handleReset} className="btn-primary">
          Start New Application
        </button>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2>Multi-Step Form</h2>
      <p className="form-description">
        Complete the application in 3 easy steps
      </p>

      <div className="progress-bar">
        <div className="progress-steps">
          <div className={`progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-label">Personal Info</div>
          </div>
          <div className={`progress-line ${step > 1 ? 'completed' : ''}`}></div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-label">Contact Info</div>
          </div>
          <div className={`progress-line ${step > 2 ? 'completed' : ''}`}></div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-label">Professional</div>
          </div>
        </div>
      </div>

      <form className="multistep-form">
        {step === 1 && (
          <div className="form-step">
            <h3>Step 1: Personal Information</h3>
            <div className="form-group">
              <label htmlFor="firstName">
                First Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                {...register('firstName')}
                className={errors.firstName ? 'error' : ''}
                placeholder="Enter first name"
                defaultValue={formData.firstName}
              />
              {errors.firstName && (
                <span className="error-message" role="alert">
                  {errors.firstName.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">
                Last Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                {...register('lastName')}
                className={errors.lastName ? 'error' : ''}
                placeholder="Enter last name"
                defaultValue={formData.lastName}
              />
              {errors.lastName && (
                <span className="error-message" role="alert">
                  {errors.lastName.message}
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
                placeholder="Enter email"
                defaultValue={formData.email}
              />
              {errors.email && (
                <span className="error-message" role="alert">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="button-group">
              <button type="button" onClick={nextStep} className="btn-primary">
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-step">
            <h3>Step 2: Contact Information</h3>
            <div className="form-group">
              <label htmlFor="phone">
                Phone Number <span className="required">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                {...register('phone')}
                className={errors.phone ? 'error' : ''}
                placeholder="10 digit number"
                defaultValue={formData.phone}
              />
              {errors.phone && (
                <span className="error-message" role="alert">
                  {errors.phone.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="address">
                Address <span className="required">*</span>
              </label>
              <input
                type="text"
                id="address"
                {...register('address')}
                className={errors.address ? 'error' : ''}
                placeholder="Enter full address"
                defaultValue={formData.address}
              />
              {errors.address && (
                <span className="error-message" role="alert">
                  {errors.address.message}
                </span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">
                  City <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  {...register('city')}
                  className={errors.city ? 'error' : ''}
                  placeholder="City"
                  defaultValue={formData.city}
                />
                {errors.city && (
                  <span className="error-message" role="alert">
                    {errors.city.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="zipCode">
                  Zip Code <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="zipCode"
                  {...register('zipCode')}
                  className={errors.zipCode ? 'error' : ''}
                  placeholder="6 digits"
                  defaultValue={formData.zipCode}
                />
                {errors.zipCode && (
                  <span className="error-message" role="alert">
                    {errors.zipCode.message}
                  </span>
                )}
              </div>
            </div>

            <div className="button-group">
              <button type="button" onClick={prevStep} className="btn-secondary">
                ← Back
              </button>
              <button type="button" onClick={nextStep} className="btn-primary">
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-step">
            <h3>Step 3: Professional Details</h3>
            <div className="form-group">
              <label htmlFor="education">
                Highest Education <span className="required">*</span>
              </label>
              <select
                id="education"
                {...register('education')}
                className={errors.education ? 'error' : ''}
                defaultValue={formData.education}
              >
                <option value="">Select Education</option>
                <option value="highschool">High School</option>
                <option value="bachelor">Bachelor's Degree</option>
                <option value="master">Master's Degree</option>
                <option value="phd">PhD</option>
              </select>
              {errors.education && (
                <span className="error-message" role="alert">
                  {errors.education.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="experience">
                Years of Experience <span className="required">*</span>
              </label>
              <select
                id="experience"
                {...register('experience')}
                className={errors.experience ? 'error' : ''}
                defaultValue={formData.experience}
              >
                <option value="">Select Experience</option>
                <option value="0-1">0-1 years</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10+">10+ years</option>
              </select>
              {errors.experience && (
                <span className="error-message" role="alert">
                  {errors.experience.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="currentRole">
                Current/Desired Role <span className="required">*</span>
              </label>
              <input
                type="text"
                id="currentRole"
                {...register('currentRole')}
                className={errors.currentRole ? 'error' : ''}
                placeholder="e.g., Software Engineer"
                defaultValue={formData.currentRole}
              />
              {errors.currentRole && (
                <span className="error-message" role="alert">
                  {errors.currentRole.message}
                </span>
              )}
            </div>

            <div className="button-group">
              <button type="button" onClick={prevStep} className="btn-secondary">
                ← Back
              </button>
              <button type="button" onClick={handleSubmit(onSubmit)} className="btn-primary">
                Submit Application
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default MultiStepForm;
