import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './ProfileForm.css';

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().required('Email is required').email('Invalid email'),
  phone: yup.string().matches(/^[0-9]{10}$/, 'Phone must be 10 digits'),
  dob: yup.date().required('Date of birth is required').max(new Date(), 'Date cannot be in the future'),
  gender: yup.string().required('Please select gender'),
  country: yup.string().required('Country is required'),
  bio: yup.string().max(500, 'Bio must not exceed 500 characters'),
  website: yup.string().url('Must be a valid URL'),
  skills: yup.array().of(
    yup.object({
      name: yup.string().required('Skill name is required')
    })
  ).min(1, 'Add at least one skill')
});

function ProfileForm() {
  const [preview, setPreview] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      skills: [{ name: '' }],
      gender: '',
      country: ''
    },
    mode: 'onBlur'
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills'
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB');
        e.target.value = '';
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        alert('Only image files are allowed');
        e.target.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const submitData = {
      ...data,
      profilePicture: preview ? 'Uploaded' : 'No image'
    };
    console.log('Profile submitted:', submitData);
    setSubmittedData(submitData);
    setIsSubmitted(true);
    reset();
    setPreview(null);
  };

  if (isSubmitted) {
    return (
      <div className="success-message">
        <div className="success-icon">✓</div>
        <h2>Profile Updated Successfully!</h2>
        <div className="submitted-data">
          <h3>Submitted Profile:</h3>
          {submittedData?.profilePicture === 'Uploaded' && (
            <div className="profile-preview">
              <img src={preview} alt="Profile" />
            </div>
          )}
          <p><strong>Name:</strong> {submittedData?.firstName} {submittedData?.lastName}</p>
          <p><strong>Email:</strong> {submittedData?.email}</p>
          <p><strong>Phone:</strong> {submittedData?.phone || 'Not provided'}</p>
          <p><strong>Gender:</strong> {submittedData?.gender}</p>
          <p><strong>Country:</strong> {submittedData?.country}</p>
          <p><strong>Skills:</strong> {submittedData?.skills.map(s => s.name).join(', ')}</p>
        </div>
        <button 
          onClick={() => setIsSubmitted(false)} 
          className="btn-primary"
        >
          Edit Profile
        </button>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2>Profile Form</h2>
      <p className="form-description">
        Complete profile with file upload, multiple input types, and dynamic fields
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="profile-form" noValidate>
        <div className="form-section">
          <h3>Profile Picture</h3>
          <div className="file-upload-group">
            {preview && (
              <div className="image-preview">
                <img src={preview} alt="Preview" />
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null);
                    document.getElementById('profilePicture').value = '';
                  }}
                  className="btn-remove-image"
                >
                  Remove
                </button>
              </div>
            )}
            <label htmlFor="profilePicture" className="file-label">
              Choose Profile Picture
            </label>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
            <small>Maximum file size: 2MB. Accepted formats: JPG, PNG, GIF</small>
          </div>
        </div>

        <div className="form-section">
          <h3>Personal Information</h3>
          <div className="form-row">
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
                aria-invalid={errors.firstName ? 'true' : 'false'}
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
                aria-invalid={errors.lastName ? 'true' : 'false'}
              />
              {errors.lastName && (
                <span className="error-message" role="alert">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className={errors.email ? 'error' : ''}
                placeholder="Enter email"
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && (
                <span className="error-message" role="alert">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                {...register('phone')}
                className={errors.phone ? 'error' : ''}
                placeholder="10 digit number"
                aria-invalid={errors.phone ? 'true' : 'false'}
              />
              {errors.phone && (
                <span className="error-message" role="alert">
                  {errors.phone.message}
                </span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dob">
                Date of Birth <span className="required">*</span>
              </label>
              <input
                type="date"
                id="dob"
                {...register('dob')}
                className={errors.dob ? 'error' : ''}
                aria-invalid={errors.dob ? 'true' : 'false'}
              />
              {errors.dob && (
                <span className="error-message" role="alert">
                  {errors.dob.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <label>
                Gender <span className="required">*</span>
              </label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    value="male"
                    {...register('gender')}
                  />
                  Male
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    value="female"
                    {...register('gender')}
                  />
                  Female
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    value="other"
                    {...register('gender')}
                  />
                  Other
                </label>
              </div>
              {errors.gender && (
                <span className="error-message" role="alert">
                  {errors.gender.message}
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="country">
              Country <span className="required">*</span>
            </label>
            <select
              id="country"
              {...register('country')}
              className={errors.country ? 'error' : ''}
              aria-invalid={errors.country ? 'true' : 'false'}
            >
              <option value="">Select Country</option>
              <option value="india">India</option>
              <option value="usa">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="canada">Canada</option>
              <option value="australia">Australia</option>
              <option value="other">Other</option>
            </select>
            {errors.country && (
              <span className="error-message" role="alert">
                {errors.country.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="website">Website URL</label>
            <input
              type="url"
              id="website"
              {...register('website')}
              className={errors.website ? 'error' : ''}
              placeholder="https://example.com"
              aria-invalid={errors.website ? 'true' : 'false'}
            />
            {errors.website && (
              <span className="error-message" role="alert">
                {errors.website.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              {...register('bio')}
              className={errors.bio ? 'error' : ''}
              rows="4"
              placeholder="Tell us about yourself (max 500 characters)"
              aria-invalid={errors.bio ? 'true' : 'false'}
            />
            {errors.bio && (
              <span className="error-message" role="alert">
                {errors.bio.message}
              </span>
            )}
          </div>
        </div>

        <div className="form-section">
          <h3>Skills (Dynamic Fields)</h3>
          <div className="dynamic-fields">
            {fields.map((field, index) => (
              <div key={field.id} className="dynamic-field-row">
                <div className="form-group flex-grow">
                  <input
                    type="text"
                    {...register(`skills.${index}.name`)}
                    className={errors.skills?.[index]?.name ? 'error' : ''}
                    placeholder={`Skill ${index + 1}`}
                    aria-invalid={errors.skills?.[index]?.name ? 'true' : 'false'}
                  />
                  {errors.skills?.[index]?.name && (
                    <span className="error-message" role="alert">
                      {errors.skills[index].name.message}
                    </span>
                  )}
                </div>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="btn-remove"
                    aria-label={`Remove skill ${index + 1}`}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => append({ name: '' })}
            className="btn-add"
          >
            + Add Skill
          </button>
          {errors.skills && typeof errors.skills.message === 'string' && (
            <span className="error-message" role="alert">
              {errors.skills.message}
            </span>
          )}
        </div>

        <button 
          type="submit" 
          className="btn-primary btn-submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving Profile...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
}

export default ProfileForm;
