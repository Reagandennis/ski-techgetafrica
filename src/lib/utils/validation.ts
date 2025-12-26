/**
 * Form Validation Utilities
 * Reusable validation rules for forms
 */

interface ValidationError {
	field: string
	message: string
}

/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

/**
 * Validate password strength
 * Requirements: At least 8 chars, 1 uppercase, 1 number, 1 special char
 */
export const validatePassword = (password: string): { valid: boolean; strength: 'weak' | 'medium' | 'strong' } => {
	const hasLength = password.length >= 8;
	const hasUpperCase = /[A-Z]/.test(password);
	const hasLowerCase = /[a-z]/.test(password);
	const hasNumber = /[0-9]/.test(password);
	const hasSpecialChar = /[!@#$%^&*]/.test(password);

	const strengthScore =
		(hasLength ? 1 : 0) +
		(hasUpperCase ? 1 : 0) +
		(hasLowerCase ? 1 : 0) +
		(hasNumber ? 1 : 0) +
		(hasSpecialChar ? 1 : 0);

	const strength: 'weak' | 'medium' | 'strong' =
		strengthScore <= 2 ? 'weak' : strengthScore <= 4 ? 'medium' : 'strong';

	return {
		valid: strengthScore >= 4, // At least 4 criteria
		strength,
	};
};

/**
 * Validate required field
 */
export const validateRequired = (value: any): boolean => {
	if (typeof value === 'string') return value.trim().length > 0;
	return value !== null && value !== undefined;
};

/**
 * Validate min length
 */
export const validateMinLength = (value: string, min: number): boolean => {
	return value.length >= min;
};

/**
 * Validate max length
 */
export const validateMaxLength = (value: string, max: number): boolean => {
	return value.length <= max;
};

/**
 * Validate phone number (basic international format)
 */
export const validatePhone = (phone: string): boolean => {
	const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
	return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Validate URL
 */
export const validateUrl = (url: string): boolean => {
	try {
		new URL(url);
		return true;
	} catch {
		return false;
	}
};

/**
 * Validate age (must be 18+)
 */
export const validateAge = (dateOfBirth: Date | string): boolean => {
	const dob = typeof dateOfBirth === 'string' ? new Date(dateOfBirth) : dateOfBirth;
	const today = new Date();
	let age = today.getFullYear() - dob.getFullYear();
	const monthDiff = today.getMonth() - dob.getMonth();

	if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
		age--;
	}

	return age >= 18;
};

/**
 * Validate form object against rules
 */
export interface FormRules {
	[field: string]: Array<{
		type: 'required' | 'email' | 'password' | 'minLength' | 'maxLength' | 'phone' | 'url' | 'age'
		value?: any
		message?: string
	}>
}

export const validateForm = (formData: Record<string, any>, rules: FormRules): ValidationError[] => {
	const errors: ValidationError[] = [];

	Object.entries(rules).forEach(([field, fieldRules]) => {
		const fieldValue = formData[field];

		fieldRules.forEach((rule) => {
			let isValid = true;
			let errorMessage = rule.message;

			switch (rule.type) {
				case 'required':
					isValid = validateRequired(fieldValue);
					errorMessage ??= 'This field is required';
					break;
				case 'email':
					isValid = !fieldValue || validateEmail(fieldValue);
					errorMessage ??= 'Please enter a valid email';
					break;
				case 'password':
					isValid = validatePassword(fieldValue).valid;
					errorMessage ??= 'Password must be at least 8 characters with uppercase, number, and special character';
					break;
				case 'minLength':
					isValid = validateMinLength(fieldValue, rule.value);
					errorMessage ??= `Minimum length is ${rule.value} characters`;
					break;
				case 'maxLength':
					isValid = validateMaxLength(fieldValue, rule.value);
					errorMessage ??= `Maximum length is ${rule.value} characters`;
					break;
				case 'phone':
					isValid = !fieldValue || validatePhone(fieldValue);
					errorMessage ??= 'Please enter a valid phone number';
					break;
				case 'url':
					isValid = !fieldValue || validateUrl(fieldValue);
					errorMessage ??= 'Please enter a valid URL';
					break;
				case 'age':
					isValid = validateAge(fieldValue);
					errorMessage ??= 'You must be at least 18 years old';
					break;
			}

			if (!isValid) {
				errors.push({ field, message: errorMessage });
			}
		});
	});

	return errors;
};
