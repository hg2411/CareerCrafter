export const calculateProfileCompletion = (user) => {
  if (!user) return { percentage: 0, missingFields: [] };
  
  const checks = [
    { field: "fullname", label: "Full Name" },
    { field: "email", label: "Email" },
    { field: "phoneNumber", label: "Phone Number" },
    { field: "profilePhoto", label: "Profile Photo", path: ["profile", "profilePhoto"] },
    { field: "bio", label: "Bio", path: ["profile", "bio"] },
    { field: "skills", label: "Skills", path: ["profile", "skills"] },
    { field: "resume", label: "Resume", path: ["profile", "resume"] },
  ];

  let filledCount = 0;
  let missingFields = [];

  for (const check of checks) {
    let value;
    if (check.path) {
      value = check.path.reduce((obj, key) => (obj ? obj[key] : undefined), user);
    } else {
      value = user[check.field];
    }

    if (
      value &&
      (Array.isArray(value) ? value.length > 0 : true)
    ) {
      filledCount++;
    } else {
      missingFields.push(check.label);
    }
  }

  const percentage = Math.round((filledCount / checks.length) * 100);

  return { percentage, missingFields };
};
