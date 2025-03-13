export const validateUsername = (username) => {
    if (!username) return "Username is required.";
    if (username.length < 3) return "Username must be at least 3 characters.";
    if (!/^[a-zA-Z0-9_]+$/.test(username)) return "Username can only contain letters, numbers, and underscores.";
    return "";
};

export const validateEmail = (email) => {
    if (!email) return 'Email is required.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim()) ? "" : "Invalid email format.";
}

export const validatePassword = (password) => {
    const errors = [];

    if (!password) return ["Password is required."];
    if (password.length < 8) errors.push("Password must be at least 8 characters long.");

    if (!/[A-Z]/.test(password)) errors.push("Password must include at least one uppercase letter.");
    if (!/[a-z]/.test(password)) errors.push("Password must include at least one lowercase letter.");
    if (!/[0-9]/.test(password)) errors.push("Password must include at least one number.");
    if (!/[!@#$%^&*]/.test(password)) errors.push("Password must include at least one special character (@, $, !, %, *, ?, &).");

    return errors.length > 0 ? errors : [];
}